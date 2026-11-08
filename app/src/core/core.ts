import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, existsSync, writeFileSync, renameSync, unlinkSync, statSync } from 'node:fs';
import { join } from 'node:path';
import Database from 'better-sqlite3-multiple-ciphers';
import { createEmptyCard, fsrs, Rating, type Card } from 'ts-fsrs';
import { olderBackupKey, unwrap, wrap, type VaultFile, type Wrapped } from './vault';
import { MIGRATIONS } from './schema';
import { daysBetween, examPriority, plan, previewWeek, type Candidate } from './planner';
import type { CourseInfo, Lesson } from '../shared';
import { downloads } from './downloads';
import { lessonReadiness } from '../curriculum';
import { relevantText } from '../lessonText';
import { EXAM_PASS } from './grades';
import { correct as isCorrect, drawPaper, passed as hasPassed, PROOF_DAYS, publicPaper, RETRY_DAYS, type Question } from './paper';
import { askLocalTutor, lessonPrompt } from './tutor';
import { renderSpeech } from './speech';
import { lookupCitation, parseDoi } from './citations';
import { calendarDateKey, readCalendar, type CalendarDate, type CalendarPreview } from './calendar';

const [directory, resources] = process.argv.slice(2);
mkdirSync(directory, { recursive: true });
const databaseFile = join(directory, 'records.db');
const MAX_BACKUP = 512 * 1024 * 1024;
type Backup = { format: 1; vault: VaultFile; snapshot: string } | { format: 2; wrapped: Wrapped; snapshot: string };
let pendingRestore: { envelope: Backup; key: Buffer } | undefined;

const courses: CourseInfo[] = JSON.parse(readFileSync(join(resources, 'content', 'hcw-courses.json'), 'utf8'));
const lessons: Lesson[] = JSON.parse(readFileSync(join(resources, 'content', 'lessons.json'), 'utf8'));
const answerKeys = new Map((JSON.parse(readFileSync(join(resources, 'content', 'checks.json'), 'utf8')) as { id: string; questions: Question[]; cards: [string, string][] }[]).map(item => [item.id, item]));
const scheduler = fsrs();
const port = process.parentPort!;
let database: Database.Database | undefined;
let databaseKey: Buffer | undefined;
const ayoJobs = new Map<string, { id: string; controller: AbortController }>();
let nextCitationLookup = 0;
let calendarImport: { id: string; school: string; rows: CalendarDate[]; expiry: NodeJS.Timeout } | undefined;

function clearCalendarImport() {
  if (calendarImport) clearTimeout(calendarImport.expiry);
  calendarImport = undefined;
}

function stopAyo() {
  for (const job of ayoJobs.values()) job.controller.abort();
  ayoJobs.clear();
}

async function runAyoJob<T>(kind: string, id: string, task: (signal: AbortSignal) => Promise<T>) {
  if (!/^[\da-f-]{36}$/i.test(id)) throw Error('Invalid request ID.');
  ayoJobs.get(kind)?.controller.abort();
  const controller = new AbortController();
  ayoJobs.set(kind, { id, controller });
  try {
    const result = await task(controller.signal);
    controller.signal.throwIfAborted();
    return result;
  } finally {
    if (ayoJobs.get(kind)?.controller === controller) ayoJobs.delete(kind);
  }
}

const now = () => new Date().toISOString();
const text = (value: unknown, max = 10000) => {
  if (typeof value !== 'string' || value.length > max) throw Error('Invalid text.');
  return value.trim();
};
const number = (value: unknown, min: number, max: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw Error('Number is out of range.');
  return value;
};
function db() {
  if (!database) throw Error('Your records are not open.');
  return database;
}
function open(file: string, key: Buffer, readonly = false) {
  const connection = new Database(file, { readonly, fileMustExist: readonly });
  try {
    connection.pragma("cipher='sqlcipher'");
    connection.pragma("key='" + key.toString('hex') + "'");
    connection.pragma('foreign_keys=ON');
    connection.prepare('select count(*) from sqlite_master').get();
    return connection;
  } catch (error) {
    connection.close();
    throw error;
  }
}
function saveUpgradeCopy(key: Buffer) {
  const temporary = databaseFile + '.' + randomUUID() + '.upgrade';
  try {
    writeFileSync(temporary, readFileSync(databaseFile), { flag: 'wx', flush: true });
    const copy = open(temporary, key, true);
    try {
      if (copy.pragma('integrity_check', { simple: true }) !== 'ok') throw Error('Upgrade safety copy could not be verified.');
    } finally { copy.close(); }
    renameSync(temporary, join(directory, 'records-before-upgrade.db'));
  } catch {
    if (existsSync(temporary)) unlinkSync(temporary);
    throw Error('4YOS could not save the encrypted upgrade safety copy. Your records have not changed.');
  }
}
function migrate(connection: Database.Database, key: Buffer, preservePrevious: boolean) {
  connection.transaction(() => {
    const version = connection.pragma('user_version', { simple: true }) as number;
    if (version > MIGRATIONS.length) throw Error('This workspace requires a newer version of 4YOS.');
    if (preservePrevious && version > 0 && version < MIGRATIONS.length) saveUpgradeCopy(key);
    for (const [index, migration] of MIGRATIONS.entries()) {
      if (index < version) continue;
      connection.exec(migration);
      connection.pragma('user_version=' + (index + 1));
    }
  }).immediate();
}
function unlock(key: Buffer) {
  const connection = open(databaseFile, key);
  try {
    migrate(connection, key, true);
  } catch (error) {
    connection.close();
    throw error;
  }
  database?.close();
  clearCalendarImport();
  databaseKey?.fill(0);
  database = connection;
  databaseKey = key;
  publishSettings();
}
function get<T>(key: string, fallback: T): T {
  const row = db().prepare('select v from settings where k=?').get(key) as { v: string } | undefined;
  return row ? JSON.parse(row.v) : fallback;
}
function put(key: string, value: unknown) {
  db().prepare('insert into settings values (?,?) on conflict(k) do update set v=excluded.v').run(key, JSON.stringify(value));
}
function settings() {
  return {
    onlineVideo: get('onlineVideo', false), hideAyo: get('hideAyo', false), reduceMotion: get('reduceMotion', false),
    streamHosts: ['cdn.cs50.net'],
  };
}
function publishSettings() { port.postMessage({ event: 'settings', data: settings() }); }
function lessonFor(id: unknown) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) throw Error('Lesson unavailable.');
  return lesson;
}
function keyFor(id: string) {
  const key = answerKeys.get(id);
  if (!key) throw Error('This lesson has no check.');
  return key;
}
/** One attempt is one submission, so this counts distinct submission times for the lesson's checked answers. */
function attemptsFor(id: string) {
  return db().prepare("select count(distinct at) from evidence where session_id=? and reviewer='directly_checked' and skill<>'Code tests'").pluck().get(id) as number;
}
function addDays(day: string, days: number) { return new Date(Date.parse(day + 'T00:00:00Z') + days * 86400000).toISOString().slice(0, 10); }
/** A unit test or exam's questions. An exam starts with its own questions, then moves into the lessons' on later attempts. */
function assessmentFor(id: string) {
  const [kind, ref] = id.split(':');
  if (kind === 'unit') {
    const unit = courses.flatMap(course => course.units).find(item => item.id === ref);
    if (!unit) throw Error('Test unavailable.');
    return { lessons: unit.lessons, questions: unit.lessons.flatMap(lesson => keyFor(lesson).questions), core: 10, transfer: 3, title: unit.title };
  }
  if (kind === 'exam') {
    const course = courses.find(item => item.id === ref);
    if (!course) throw Error('Exam unavailable.');
    const all = course.units.flatMap(unit => unit.lessons);
    return { lessons: all, questions: [...keyFor(id).questions, ...all.flatMap(lesson => keyFor(lesson).questions)], core: 24, transfer: 6, title: course.title };
  }
  throw Error('Test unavailable.');
}
function assessmentStatus(id: string) {
  return db().prepare('select * from course_assessments where id=?').get(id) as { status: string; attempts: number } | undefined;
}
function finishedLessons() { return new Set(db().prepare("select session_id from session_progress where status='finished'").pluck().all() as string[]); }
function assessmentOpen(id: string) {
  const { lessons: needed } = assessmentFor(id);
  const finished = finishedLessons();
  const units = id.startsWith('exam:') ? courses.find(course => 'exam:' + course.id === id)!.units.map(unit => 'unit:' + unit.id) : [];
  return needed.every(lesson => finished.has(lesson)) && units.every(unit => assessmentStatus(unit)?.status === 'passed');
}
function progress(id: string) {
  return db().prepare('select * from session_progress where session_id=?').get(id) as { step: number; status: string; video_seconds: number } | undefined;
}
function due() {
  return db().prepare('select id,front,back from cards where due<=? order by due,id').all(now());
}
function localDay() { return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Africa/Lagos' }).format(new Date()); }
function parseDate(value: unknown) {
  const input = text(value, 10);
  const parsed = new Date(input + 'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input) || !Number.isFinite(+parsed) || parsed.toISOString().slice(0, 10) !== input) throw Error('Enter a valid date.');
  return input;
}

function newCalendarDates(school: string, rows: CalendarDate[]) {
  const existing = db().prepare('select title,date from commitments where school=?').all(school) as CalendarDate[];
  const known = new Set(existing.map(calendarDateKey));
  return rows.filter(row => {
    const key = calendarDateKey(row);
    if (known.has(key)) return false;
    known.add(key);
    return true;
  });
}

const media = downloads(directory, lessons, () => get('onlineVideo', false), (action, destination, outcome) => {
  database?.prepare('insert into action_log(action,destination,outcome,at) values (?,?,?,?)').run(action, destination, outcome, now());
});

const methods = {
  mediaStatus: (id: unknown) => { db(); return media.mediaStatus(id); },
  mediaSize: media.mediaSize,
  mediaDownload: media.mediaDownload,
  mediaPause: media.mediaPause,
  status: () => ({ ready: !!database }),
  // Only the main process can call this: it holds the key Windows protects.
  open: (keyHex: unknown) => {
    if (typeof keyHex !== 'string' || !/^[\da-f]{64}$/.test(keyHex)) throw Error('Invalid key.');
    unlock(Buffer.from(keyHex, 'hex'));
  },
  authorizeLessonVideo: (id: unknown, kind: unknown) => {
    const lesson = lessonFor(id);
    if (!get('onlineVideo', false)) throw Error('Allow online video first.');
    const destination = kind === 'stream' ? lesson.video : kind === 'youtube' && lesson.youtube ? 'https://www.youtube-nocookie.com/embed/' + lesson.youtube : null;
    if (!destination) throw Error('This lesson has no video of that kind.');
    db().prepare('insert into action_log(action,destination,outcome,at) values (?,?,?,?)').run('Open lesson video', destination, 'requested', now());
  },
  settings,
  preference: (name: unknown, enabled: unknown) => {
    if (typeof name !== 'string' || !['onlineVideo', 'hideAyo', 'reduceMotion'].includes(name) || typeof enabled !== 'boolean') throw Error('Invalid preference.');
    db().transaction(() => {
      put(name, enabled);
      if (name === 'onlineVideo') db().prepare('insert into action_log(action,outcome,at) values (?,?,?)').run('Online video permission', enabled ? 'enabled' : 'disabled', now());
    })();
    if (name === 'onlineVideo' && !enabled) media.mediaPauseAll();
    publishSettings();
    return settings();
  },
  profile: () => get('profile', null),
  /** Asked once, on Today, instead of a setup screen. Anything not yet known stays "Not sure yet". */
  normalDay: (minutes: unknown) => {
    const value = number(minutes, 1, 1440);
    const current = get<Record<string, unknown> | null>('profile', null);
    put('profile', { uniport: 'Not sure yet', noun: 'Not sure yet', priority: 'Not set', off: [], internet: 'Not set', planning: null, ...current, minutes: value, origin: 'user_said', at: now() });
    put('dailyTime', { day: localDay(), minutes: value });
  },
  today: (override: unknown) => {
    const profile = get<{ minutes: number; off: number[]; priority: string } | null>('profile', null);
    const day = localDay();
    const weekday = new Date(day + 'T00:00:00Z').getUTCDay();
    const saved = get<{ day: string; minutes: number } | null>('dailyTime', null);
    const minutes = override === null
      ? (saved?.day === day ? saved.minutes : profile?.off.includes(weekday) ? 0 : profile?.minutes ?? 1440)
      : number(override, 0, 1440);
    if (override !== null) put('dailyTime', { day, minutes });
    const timeKnown = override !== null || saved?.day === day || !!profile;
    const deferred = new Set(db().prepare('select ref from defers where until>?').pluck().all(now()));
    const candidates: Candidate[] = [];
    const deadlines = db().prepare('select id,school,title,date,prep_minutes from commitments where date>=? and prep_minutes>0 and prepared_at is null order by date,id').all(day) as { id: number; school: string; title: string; date: string; prep_minutes: number }[];
    for (const deadline of deadlines) {
      const remaining = daysBetween(day, deadline.date);
      if (remaining > 14) break;
      candidates.push({ ref: 'school-' + deadline.id, title: 'Prepare for ' + deadline.title, minutes: deadline.prep_minutes,
        priority: 100 + examPriority(remaining), hard: remaining <= 1, area: deadline.school, dueDate: deadline.date,
        reason: 'You set a school deadline for ' + deadline.date + ' and estimated this preparation time.', kind: 'exam_prep' });
    }
    const finished = finishedLessons();
    for (const id of db().prepare("select id from course_assessments where status='passed'").pluck().all() as string[]) finished.add(id);
    for (const course of courses) {
      for (const unit of course.units) {
        const id = 'unit:' + unit.id;
        if (assessmentStatus(id)?.status !== 'passed' && assessmentOpen(id)) candidates.push({ ref: id, title: 'Unit test: ' + unit.title, minutes: 25, priority: 64, area: 'Learn', reason: 'You passed every lesson in this unit. This test mixes them together, and it opens the next unit.', kind: 'review' });
      }
      // A course still being written has no exam or project yet.
      if (course.partial) continue;
      const exam = 'exam:' + course.id;
      if (assessmentStatus(exam)?.status !== 'passed' && assessmentOpen(exam)) candidates.push({ ref: exam, title: 'Exam: ' + course.title, minutes: course.minutes, priority: 63, area: 'Learn', reason: 'You passed every unit in this course. The exam covers all of it, timed, with no notes.', kind: 'review' });
      const project = 'project:' + course.id;
      if (assessmentStatus(exam)?.status === 'passed' && assessmentStatus(project)?.status !== 'done') candidates.push({ ref: project, title: 'Project: ' + course.project.title, minutes: 120, priority: 62, area: 'Learn', reason: 'The last step of this course: use it on something real.', kind: 'review' });
    }
    for (const [index, ready] of lessonReadiness(finished, courses).entries()) {
      const lesson = lessonFor(ready.id);
      const started = progress(lesson.id)?.status === 'started';
      const priority = started ? 66 : index === 0 ? 57 : 50 - index / 100;
      candidates.push({ ref: lesson.id, title: lesson.title, minutes: lesson.minutes, priority, area: 'Curriculum', divisible: true,
        reason: started ? 'Continue the lesson you started.' : 'This lesson is available in your curriculum and its prerequisites are covered.', kind: 'session' });
    }
    for (const proof of db().prepare("select session_id,due from lesson_proofs where status='due' and due<=? order by due").all(day) as { session_id: string; due: string }[]) {
      const lesson = lessonFor(proof.session_id);
      candidates.push({ ref: 'proof-' + lesson.id, title: 'Prove it still holds: ' + lesson.title, minutes: 8, priority: 68, area: 'Learn', reason: 'You passed this lesson about a week ago. These are new questions with no notes, to show the idea stayed.', kind: 'review' });
    }
    if (due().length) candidates.push({ ref: 'review', title: 'Review flashcards', minutes: Math.min(10, due().length), priority: 70, area: 'Learn', reason: 'Your cards are due for recall.', kind: 'review' });
    const steps = db().prepare('select goal_steps.*, goals.area from goal_steps join goals on goals.id=goal_id where done_at is null and goals.status=\'active\' order by position,id').all() as { id: number; title: string; minutes: number; area: string }[];
    for (const step of steps) {
      const priority = step.area === 'career' ? (profile?.priority === 'Earning' ? 65 : profile?.priority === 'Both' ? 52 : 25) : 20;
      candidates.push({ ref: 'goal-' + step.id, title: step.title, minutes: step.minutes, priority, area: step.area, reason: 'A step you added to a goal.', kind: 'goal_step' });
    }
    return { ...plan(candidates.filter(item => !deferred.has(item.ref)), minutes), postponed: candidates.filter(item => deferred.has(item.ref)), timeKnown };
  },
  defer: (ref: unknown, choice: unknown) => {
    if (choice !== 'Later today' && choice !== 'Tomorrow' && choice !== 'Skip today') throw Error('Invalid time.');
    const nextDay = new Date(localDay() + 'T23:00:00Z');
    const until = choice === 'Later today' ? new Date(Math.min(Date.now() + 2 * 3600000, +nextDay)) : nextDay;
    db().prepare('insert or replace into defers values (?,?,?,?)').run(text(ref, 100), until.toISOString(), choice, now());
  },
  undoDefer: (ref: unknown) => db().prepare('delete from defers where ref=?').run(text(ref, 100)).changes,
  progress: () => db().prepare('select * from session_progress').all(),
  draft: (id: unknown) => db().prepare('select work,code from session_drafts where session_id=?').get(lessonFor(id).id) ?? { work: '', code: '' },
  saveDraft: (id: unknown, work: unknown, code: unknown) => {
    const lesson = lessonFor(id);
    if (progress(lesson.id)?.status !== 'started') return;
    if (typeof code !== 'string' || code.length > 100000 || typeof work !== 'string' || work.length > 10000) throw Error('Practice exceeds the save limit.');
    db().prepare('insert into session_drafts values (?,?,?,?) on conflict(session_id) do update set work=excluded.work,code=excluded.code,updated_at=excluded.updated_at').run(lesson.id, work, code, now());
  },
  start: (id: unknown) => {
    const lesson = lessonFor(id);
    db().prepare("insert or ignore into session_progress(session_id,status,started_at) values (?,'started',?)").run(lesson.id, now());
    return progress(lesson.id);
  },
  step: (id: unknown, step: unknown) => {
    const lesson = lessonFor(id);
    const next = number(step, 0, 2);
    if (next === 2) stopAyo();
    db().prepare("update session_progress set step=max(step,?) where session_id=? and status='started'").run(next, lesson.id);
  },
  position: (id: unknown, seconds: unknown) => {
    db().prepare('update session_progress set video_seconds=? where session_id=?').run(number(seconds, 0, 86400), lessonFor(id).id);
  },
  readingPart: (id: unknown, part: unknown) => {
    const lesson = lessonFor(id);
    const index = number(part, 0, lesson.sections.length + 1);
    if (!Number.isInteger(index)) throw Error('Choose a lesson part.');
    db().prepare('update session_progress set reading_part=? where session_id=?').run(index, lesson.id);
  },
  tutorAsk: async (lessonId: unknown, requestId: unknown, question: unknown) => {
    const lesson = lessonFor(lessonId);
    const current = progress(lesson.id);
    if (!current || current.status !== 'started' || current.step >= 2) throw Error('Ask Ayo before opening the lesson check.');
    const query = text(question, 350);
    if (!query) throw Error('Enter a lesson question.');
    const source = relevantText(lesson, query, 4700);
    const response = await runAyoJob('tutor', text(requestId, 36), signal => askLocalTutor(lessonPrompt(lesson.title, source, query), signal));
    db().prepare('insert into action_log(action,basis,outcome,at) values (?,?,?,?)').run('Local tutor', lesson.id, 'shown', now());
    return response;
  },
  tutorSpeak: (requestId: unknown, value: unknown) => {
    db();
    const spoken = text(value, 1000);
    if (!spoken) throw Error('There is no explanation to read.');
    return runAyoJob('speech', text(requestId, 36), signal => renderSpeech(spoken, signal));
  },
  tutorCancel: (requestId: unknown) => {
    for (const job of ayoJobs.values()) if (job.id === requestId) job.controller.abort();
  },
  citationLookup: async (input: unknown, requestId: unknown) => {
    db();
    const doi = parseDoi(text(input, 260));
    if (Date.now() < nextCitationLookup) throw Error('Wait a moment before looking up another DOI.');
    nextCitationLookup = Date.now() + 2000;
    return runAyoJob('citation', text(requestId, 36), signal => lookupCitation(doi, signal));
  },
  checkPaper: (id: unknown) => {
    const lesson = lessonFor(id);
    return publicPaper(keyFor(lesson.id).questions, attemptsFor(lesson.id));
  },
  codeTests: (id: unknown, passedAll: unknown, summary: unknown) => {
    const lesson = lessonFor(id);
    if (!lesson.tests || typeof passedAll !== 'boolean') throw Error('This lesson has no code tests.');
    db().prepare('insert into evidence(session_id,skill,task,answer,result,reviewer,assistance,at) values (?,?,?,?,?,?,?,?)').run(lesson.id, 'Code tests', 'Run the lesson tests against your code', text(summary, 2000), passedAll ? 'passed' : 'failed', 'directly_checked', 'unknown', now());
  },
  check: (id: unknown, answer: unknown, work: unknown) => {
    const lesson = lessonFor(id);
    const key = keyFor(lesson.id);
    const attempt = text(work);
    return db().transaction(() => {
      const current = progress(lesson.id);
      if (current?.status === 'finished') return { passed: true, recorded: false, correct: 0, total: 0, feedback: [] };
      if (current?.step !== 2) throw Error('Open the check from your lesson.');
      const paper = drawPaper(key.questions, attemptsFor(lesson.id));
      const submitted = Array.isArray(answer) ? answer : [];
      if (submitted.length !== paper.length) throw Error('Answer each question in the check.');
      const responses = submitted.map(value => text(value));
      if (!attempt || responses.some(value => !value)) throw Error('Record your practice and answer the check.');
      const outcomes = paper.map(({ question }, index) => ({ question, response: responses[index], passed: isCorrect(question, responses[index]) }));
      const score = outcomes.filter(outcome => outcome.passed).length;
      const passed = hasPassed(score, outcomes.length);
      const at = now();
      const priorFeedback = db().prepare("select 1 from evidence where session_id=? and result='failed' limit 1").get(lesson.id);
      const priorTutor = db().prepare("select 1 from action_log where action='Local tutor' and basis=? and outcome='shown' limit 1").get(lesson.id);
      const assistance = priorTutor ? (priorFeedback ? 'tutor_and_feedback' : 'tutor_available') : (priorFeedback ? 'feedback_available' : 'none_recorded');
      const evidence = db().prepare('insert into evidence(session_id,skill,task,answer,result,reviewer,assistance,at) values (?,?,?,?,?,?,?,?)');
      evidence.run(lesson.id, lesson.title, 'Practice', attempt, 'attempted', 'self_reported', 'unknown', at);
      for (const outcome of outcomes) evidence.run(lesson.id, lesson.title, outcome.question.question, outcome.response, outcome.passed ? 'passed' : 'failed', 'directly_checked', assistance, at);
      const proofDue = addDays(localDay(), process.env.FOURYOS_TEST_PROOF_NOW ? 0 : PROOF_DAYS);
      if (passed) {
        db().prepare("update session_progress set step=3,status='finished',finished_at=? where session_id=?").run(at, lesson.id);
        for (const [front, back] of key.cards) {
          const card = createEmptyCard(new Date(Date.now() + 86400000));
          db().prepare('insert into cards(session_id,front,back,state,due,created_at) values (?,?,?,?,?,?)').run(lesson.id, front, back, JSON.stringify(card), card.due.toISOString(), at);
        }
        db().prepare("insert or replace into lesson_proofs(session_id,due,status,attempts) values (?,?,'due',0)").run(lesson.id, proofDue);
      }
      return { passed, recorded: true, correct: score, total: outcomes.length, proofDue: passed ? proofDue : undefined,
        feedback: outcomes.filter(outcome => !outcome.passed).map(outcome => ({ question: outcome.question.question, feedback: outcome.question.feedback })) };
    })();
  },
  courses: () => courses,
  assessments: () => db().prepare('select id,status,score,attempts,passed_at from course_assessments').all(),
  /** Every unit test and exam attempt, oldest first, for the results page. */
  attempts: () => db().prepare('select assessment,percent,passed,at from attempts order by at, id').all(),
  assessmentPaper: (id: unknown) => {
    const key = text(id, 100); const set = assessmentFor(key);
    if (!assessmentOpen(key)) throw Error('Pass the lessons first.');
    return { title: set.title, minutes: key.startsWith('exam:') ? courses.find(course => 'exam:' + course.id === key)!.minutes : null, paper: publicPaper(set.questions as Question[], assessmentStatus(key)?.attempts ?? 0, set.core, set.transfer) };
  },
  assessmentSubmit: (id: unknown, answer: unknown) => {
    const key = text(id, 100); const set = assessmentFor(key);
    return db().transaction(() => {
      if (!assessmentOpen(key)) throw Error('Pass the lessons first.');
      const prior = assessmentStatus(key);
      // A passed exam can be retaken to raise its grade; a passed unit test has nothing left to prove.
      if (prior?.status === 'passed' && !key.startsWith('exam:')) throw Error('You have already passed this.');
      const paper = drawPaper(set.questions as Question[], prior?.attempts ?? 0, set.core, set.transfer);
      const submitted = Array.isArray(answer) ? answer : [];
      if (submitted.length !== paper.length) throw Error('The paper changed. Reopen it.');
      const outcomes = paper.map(({ question }, index) => ({ question, response: text(submitted[index]), passed: isCorrect(question, text(submitted[index])) }));
      const score = outcomes.filter(outcome => outcome.passed).length;
      // Exams pass at grade E (40%), as at university. Unit tests keep the 80% bar, so each unit is mastered before the next.
      const ok = key.startsWith('exam:') ? score / outcomes.length >= EXAM_PASS : hasPassed(score, outcomes.length);
      const at = now(); const skill = key.startsWith('exam:') ? 'Course exam' : 'Unit test';
      const evidence = db().prepare('insert into evidence(session_id,skill,task,answer,result,reviewer,assistance,at) values (?,?,?,?,?,?,?,?)');
      for (const outcome of outcomes) evidence.run(key, skill, outcome.question.question, outcome.response || '(no answer)', outcome.passed ? 'passed' : 'failed', 'directly_checked', 'none_recorded', at);
      db().prepare("insert into course_assessments(id,status,score,attempts,passed_at) values (?,?,?,1,?) on conflict(id) do update set status=case when status='passed' then 'passed' else excluded.status end,score=max(coalesce(score,0),excluded.score),attempts=attempts+1,passed_at=coalesce(passed_at,excluded.passed_at)").run(key, ok ? 'passed' : 'open', score / outcomes.length, ok ? at : null);
      db().prepare('insert into attempts(assessment,percent,passed,at) values (?,?,?,?)').run(key, Math.round(score / outcomes.length * 1000) / 10, ok ? 1 : 0, at);
      const missed = new Set(outcomes.filter(outcome => !outcome.passed).map(outcome => outcome.question.origin ?? outcome.question.question));
      const revisit = set.lessons.filter(lesson => keyFor(lesson).questions.some(question => missed.has(question.question)));
      return { passed: ok, recorded: true, correct: score, total: outcomes.length, revisit,
        feedback: outcomes.filter(outcome => !outcome.passed).map(outcome => ({ question: outcome.question.question, feedback: outcome.question.feedback })) };
    })();
  },
  projectSubmit: (id: unknown, work: unknown) => {
    const course = courses.find(item => item.id === id);
    if (!course) throw Error('Project unavailable.');
    const written = text(work, 20000);
    if (written.length < 200) throw Error('Write up what you did. It needs more detail than that.');
    if (assessmentStatus('exam:' + course.id)?.status !== 'passed') throw Error('Pass the exam first.');
    db().transaction(() => {
      const at = now();
      db().prepare('insert into evidence(session_id,skill,task,answer,result,reviewer,assistance,at) values (?,?,?,?,?,?,?,?)').run('project:' + course.id, 'Course project', course.project.title, written, 'attempted', 'self_reported', 'unknown', at);
      db().prepare("insert into course_assessments(id,status,attempts,work,passed_at) values (?,'done',1,?,?) on conflict(id) do update set status='done',attempts=attempts+1,work=excluded.work,passed_at=excluded.passed_at").run('project:' + course.id, written, at);
    })();
  },
  // "This confused me": kept in the learner's notes, and on a list that can be handed over for rewriting.
  flagConfusing: (id: unknown, part: unknown, body: unknown) => {
    const lesson = lessonFor(id);
    const where = text(part, 240), value = text(body, 800);
    if (!value) throw Error('Say what was unclear first.');
    db().prepare('insert into lesson_feedback(session_id,part,body,at) values (?,?,?,?)').run(lesson.id, where, value, now());
    methods.note(lesson.id, 'This confused me · ' + where + '\n' + value, null);
  },
  confusingList: () => db().prepare('select * from lesson_feedback order by id desc').all(),
  exportConfusing: (path: unknown) => {
    const output = text(path, 4096);
    if (!output.endsWith('.txt')) throw Error('Choose a text file.');
    const rows = db().prepare('select * from lesson_feedback order by session_id,id').all() as { session_id: string; part: string; body: string; at: string }[];
    writeFileSync(output, rows.map(row => `${lessonFor(row.session_id).title} (${row.session_id})\nPart: ${row.part}\nDate: ${row.at.slice(0, 10)}\n${row.body}\n`).join('\n'), 'utf8');
    return rows.length;
  },
  proofs: () => db().prepare('select * from lesson_proofs').all(),
  proofPaper: (id: unknown) => {
    const lesson = lessonFor(id);
    const proof = db().prepare("select due from lesson_proofs where session_id=? and status='due'").get(lesson.id) as { due: string } | undefined;
    if (!proof || proof.due > localDay()) throw Error('This check is not due yet.');
    return publicPaper(keyFor(lesson.id).questions, attemptsFor(lesson.id), 2, 1);
  },
  proofSubmit: (id: unknown, answer: unknown) => {
    const lesson = lessonFor(id);
    const key = keyFor(lesson.id);
    return db().transaction(() => {
      const proof = db().prepare("select due,attempts from lesson_proofs where session_id=? and status='due'").get(lesson.id) as { due: string; attempts: number } | undefined;
      if (!proof || proof.due > localDay()) throw Error('This check is not due yet.');
      const paper = drawPaper(key.questions, attemptsFor(lesson.id), 2, 1);
      const submitted = Array.isArray(answer) ? answer : [];
      if (submitted.length !== paper.length) throw Error('Answer each question in the check.');
      const responses = submitted.map(value => text(value));
      if (responses.some(value => !value)) throw Error('Answer each question in the check.');
      const outcomes = paper.map(({ question }, index) => ({ question, response: responses[index], passed: isCorrect(question, responses[index]) }));
      const score = outcomes.filter(outcome => outcome.passed).length;
      const passed = score === outcomes.length;
      const at = now();
      const evidence = db().prepare('insert into evidence(session_id,skill,task,answer,result,reviewer,assistance,at) values (?,?,?,?,?,?,?,?)');
      for (const outcome of outcomes) evidence.run(lesson.id, 'Delayed check', outcome.question.question, outcome.response, outcome.passed ? 'passed' : 'failed', 'directly_checked', 'delayed', at);
      const again = addDays(localDay(), RETRY_DAYS);
      if (passed) db().prepare("update lesson_proofs set status='held',passed_at=?,attempts=attempts+1 where session_id=?").run(at, lesson.id);
      else db().prepare('update lesson_proofs set due=?,attempts=attempts+1 where session_id=?').run(again, lesson.id);
      return { passed, recorded: true, correct: score, total: outcomes.length, proofDue: passed ? undefined : again,
        feedback: outcomes.filter(outcome => !outcome.passed).map(outcome => ({ question: outcome.question.question, feedback: outcome.question.feedback })) };
    })();
  },
  cards: () => due().slice(0, 10),
  libraryCards: () => db().prepare('select id,session_id,front,back,due from cards order by id desc').all(),
  rate: (id: unknown, rating: unknown) => db().transaction(() => {
    const row = db().prepare('select state,due from cards where id=?').get(number(id, 1, Number.MAX_SAFE_INTEGER)) as { state: string; due: string } | undefined;
    const at = new Date();
    if (!row || row.due > at.toISOString()) throw Error('This card is no longer due.');
    if (rating !== Rating.Again && rating !== Rating.Hard && rating !== Rating.Good && rating !== Rating.Easy) throw Error('Choose a recall rating.');
    const state = JSON.parse(row.state);
    const card: Card = { ...state, due: new Date(state.due), last_review: state.last_review ? new Date(state.last_review) : undefined };
    const result = scheduler.next(card, at, rating);
    db().prepare('update cards set state=?,due=? where id=?').run(JSON.stringify(result.card), result.card.due.toISOString(), id);
    db().prepare('insert into card_reviews(card_id,rating,at) values (?,?,?)').run(id, rating, at.toISOString());
  })(),
  note: (id: unknown, body: unknown, seconds: unknown) => db().transaction(() => {
    const lesson = lessonFor(id);
    const value = text(body);
    if (!value) throw Error('Write a note first.');
    const timestamp = seconds === null ? null : number(seconds, 0, 86400);
    const at = now();
    const row = db().prepare('insert into notes(session_id,body,video_seconds,created_at,updated_at) values (?,?,?,?,?)').run(lesson.id, value, timestamp, at, at);
    db().prepare("insert into search_index values ('note',?,?,?)").run(String(row.lastInsertRowid), lesson.title, value);
  })(),
  notes: (query: unknown) => {
    const terms = text(query, 200).match(/[\p{L}\p{N}]+/gu);
    if (!terms?.length) return db().prepare('select * from notes order by id desc').all();
    return db().prepare('select notes.* from search_index join notes on notes.id=search_index.ref where search_index match ? order by rank').all(terms.map(term => '"' + term + '"').join(' AND '));
  },
  lessonNotes: (id: unknown) => db().prepare('select * from notes where session_id=? order by id desc').all(lessonFor(id).id),
  results: () => db().prepare('select * from evidence order by id desc').all(),
  commitments: () => db().prepare('select id,school,title,kind,date,prep_minutes,prepared_at from commitments order by date,id').all(),
  addCommitment: (school: unknown, title: unknown, kind: unknown, day: unknown, minutes: unknown) => {
    const description = text(title, 180);
    if (!description || !['UNIPORT', 'NOUN'].includes(String(school)) || !['Exam', 'Assignment', 'Class', 'Other'].includes(String(kind))) throw Error('Enter a school, title and type.');
    db().prepare('insert into commitments(school,title,kind,date,prep_minutes,created_at) values (?,?,?,?,?,?)')
      .run(school, description, kind, parseDate(day), minutes === null ? null : number(minutes, 1, 1440), now());
  },
  previewCalendar: (school: unknown, content: unknown): CalendarPreview => {
    clearCalendarImport();
    if (school !== 'UNIPORT' && school !== 'NOUN') throw Error('Choose which school the dates are for.');
    const { rows, skipped } = readCalendar(content);
    const ready = newCalendarDates(school, rows);
    const id = randomUUID();
    if (ready.length) calendarImport = { id, school, rows: ready, expiry: setTimeout(clearCalendarImport, 10 * 60 * 1000).unref() };
    return { id, rows: ready, skipped, duplicates: rows.length - ready.length };
  },
  cancelCalendar: (id: unknown) => {
    if (calendarImport?.id === id) clearCalendarImport();
  },
  confirmCalendar: (id: unknown) => {
    const preview = calendarImport;
    if (!preview || preview.id !== id) throw Error('This preview has expired. Preview the file again.');
    const connection = db();
    const inserted = connection.transaction(() => {
      const rows = newCalendarDates(preview.school, preview.rows);
      const insert = connection.prepare("insert into commitments(school,title,kind,date,created_at) values (?,?,'Other',?,?)");
      const time = now();
      for (const { title, date } of rows) insert.run(preview.school, title, date, time);
      return rows.length;
    })();
    clearCalendarImport();
    return inserted;
  },
  finishPrep: (id: unknown) => db().prepare('update commitments set prepared_at=? where id=? and prep_minutes>0 and prepared_at is null').run(now(), number(id, 1, Number.MAX_SAFE_INTEGER)).changes,
  money: () => db().prepare('select * from money_entries order by date desc,id desc').all(),
  addMoney: (label: unknown, currency: unknown, kind: unknown, status: unknown, amount: unknown, day: unknown) => {
    if (!['NGN', 'USD'].includes(String(currency)) || !['income', 'expense', 'savings'].includes(String(kind)) || !['actual', 'estimate'].includes(String(status))) throw Error('Check the currency, type and status.');
    const description = text(label, 240);
    const decimal = text(amount, 16);
    if (!description || !/^\d{1,10}(?:\.\d{1,2})?$/.test(decimal)) throw Error('Enter a description and an amount with up to two decimal places.');
    const [whole, fraction = ''] = decimal.split('.');
    const minor = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    if (minor <= 0) throw Error('Enter an amount above zero.');
    db().prepare('insert into money_entries(label,currency,kind,minor_units,status,date,created_at) values (?,?,?,?,?,?,?)').run(description, currency, kind, minor, status, parseDate(day), now());
  },
  jobs: () => db().prepare('select * from job_entries order by updated_at desc,id desc').all(),
  saveJob: (id: unknown, role: unknown, organization: unknown, status: unknown, followUp: unknown) => {
    const title = text(role, 180), employer = text(organization, 180);
    if (!title || !employer || !['Interested', 'Applied', 'Interview', 'Closed'].includes(String(status))) throw Error('Enter the real role, organization and status.');
    const follow = followUp === '' ? null : parseDate(followUp);
    if (id === null) db().prepare('insert into job_entries(role,organization,status,follow_up,created_at,updated_at) values (?,?,?,?,?,?)').run(title, employer, status, follow, now(), now());
    else db().prepare('update job_entries set role=?,organization=?,status=?,follow_up=?,updated_at=? where id=?').run(title, employer, status, follow, now(), number(id, 1, Number.MAX_SAFE_INTEGER));
  },
  weekly: () => {
    const day = localDay();
    const today = new Date(day + 'T00:00:00+01:00');
    const start = new Date(+today - 6 * 86400000).toISOString();
    const end = new Date(+today + 86400000).toISOString();
    const profile = get<{ minutes: number; off: number[] } | null>('profile', null);
    const current = methods.today(null);
    const calendar = Array.from({ length: 7 }, (_, offset) => {
      const date = new Date(Date.parse(day + 'T00:00:00Z') + offset * 86400000);
      const minutes = offset === 0 ? current.minutes : profile?.off.includes(date.getUTCDay()) ? 0 : profile?.minutes ?? 0;
      return { day: date.toISOString().slice(0, 10), minutes };
    });
    const postponed = (current.postponed ?? []).map(candidate => {
      const until = db().prepare('select until from defers where ref=?').pluck().get(candidate.ref) as string;
      const available = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Africa/Lagos' }).format(new Date(until));
      return { ...candidate, availableFrom: available > day ? available : calendar[1].day };
    });
    const next = current.next ? [current.next] : [];
    const preview = previewWeek([...next, ...current.also, ...current.deferred, ...postponed], calendar);
    return {
      preview,
      lessons: db().prepare('select count(*) from session_progress where finished_at>=? and finished_at<?').pluck().get(start, end),
      steps: db().prepare('select count(*) from goal_steps where done_at>=? and done_at<?').pluck().get(start, end),
      reviews: db().prepare('select count(*) from card_reviews where at>=? and at<?').pluck().get(start, end),
      open: db().prepare('select title,minutes from goal_steps where done_at is null order by position,id').all(),
    };
  },
  channel: () => db().prepare("select * from channel_episodes order by case status when 'Published' then 1 else 0 end, id").all(),
  addEpisode: (title: unknown, pillar: unknown) => { const t = now(); db().prepare('insert into channel_episodes(title,pillar,created_at,updated_at) values (?,?,?,?)').run(text(title, 240), pillar ? text(pillar, 60) : null, t, t); },
  importEpisodes: (items: unknown) => {
    if (!Array.isArray(items) || items.length > 60) throw Error('Invalid list.');
    if (db().prepare('select count(*) from channel_episodes').pluck().get()) throw Error('Your channel list already has episodes.');
    const t = now(); const insert = db().prepare('insert into channel_episodes(title,pillar,origin,created_at,updated_at) values (?,?,?,?,?)');
    db().transaction(() => { for (const item of items as { title: unknown; pillar: unknown }[]) insert.run(text(item.title, 240), text(item.pillar, 60), 'imported', t, t); })();
  },
  updateEpisode: (id: unknown, field: unknown, value: unknown) => {
    const key = number(id, 1, Number.MAX_SAFE_INTEGER);
    const row = db().prepare('select * from channel_episodes where id=?').get(key) as { checked_sources: number; checked_privacy: number; checked_safe: number } | undefined;
    if (!row) throw Error('Episode not found.');
    const t = now();
    if (['checked_sources', 'checked_privacy', 'checked_safe'].includes(String(field))) { db().prepare(`update channel_episodes set ${String(field)}=?,updated_at=? where id=?`).run(value ? 1 : 0, t, key); return; }
    if (field === 'hours') { db().prepare('update channel_episodes set hours=?,updated_at=? where id=?').run(number(value, 0, 500), t, key); return; }
    if (field !== 'status' || !['Idea', 'Writing', 'Making', 'Ready', 'Published'].includes(String(value))) throw Error('Invalid change.');
    if (value === 'Published' && !(row.checked_sources && row.checked_privacy && row.checked_safe)) throw Error('Finish the three checks before marking this published.');
    db().prepare('update channel_episodes set status=?,published_on=?,updated_at=? where id=?').run(value, value === 'Published' ? localDay() : null, t, key);
  },
  removeEpisode: (id: unknown) => db().prepare('delete from channel_episodes where id=?').run(number(id, 1, Number.MAX_SAFE_INTEGER)).changes,
  goals: () => ({ goals: db().prepare('select * from goals order by id desc').all(), steps: db().prepare('select * from goal_steps order by id').all() }),
  addGoal: (area: unknown, title: unknown, date: unknown) => {
    if (!['school', 'career', 'money', 'personal', 'channel'].includes(String(area)) || !text(title, 240)) throw Error('Enter a goal and choose its area.');
    const raw = text(date, 10);
    const target = raw ? parseDate(raw) : '';
    db().prepare('insert into goals(area,title,target_date,created_at) values (?,?,?,?)').run(area, text(title, 240), target || null, now());
  },
  addStep: (id: unknown, title: unknown, minutes: unknown) => {
    if (!text(title, 240)) throw Error('Enter a step.');
    db().prepare('insert into goal_steps(goal_id,title,minutes,created_at) values (?,?,?,?)').run(number(id, 1, Number.MAX_SAFE_INTEGER), text(title, 240), number(minutes, 1, 1440), now());
  },
  finishStep: (id: unknown) => db().prepare('update goal_steps set done_at=? where id=? and done_at is null').run(now(), number(id, 1, Number.MAX_SAFE_INTEGER)).changes,
  backup: (path: unknown, password: unknown) => {
    const output = text(path, 4096);
    const secret = text(password, 1024);
    const key = databaseKey;
    db();
    if (!key || !output.endsWith('.4yosbak')) throw Error('Choose a 4YOS backup destination.');
    if (secret.length < 8) throw Error('Use a backup password of at least 8 characters.');
    const temporary = output + '.tmp';
    // DELETE journaling is the default. This process is the only writer and runs this operation synchronously.
    const snapshot = readFileSync(databaseFile);
    if (snapshot.length * 4 / 3 > MAX_BACKUP) throw Error('Your records have grown past what one backup file can restore, so this backup was not saved.');
    try {
      writeFileSync(temporary, snapshot, { flag: 'wx', flush: true });
      const copy = open(temporary, key, true);
      try {
        if (copy.pragma('integrity_check', { simple: true }) !== 'ok') throw Error('Backup could not be verified.');
      } finally { copy.close(); }
      const envelope = JSON.stringify({ format: 2, wrapped: wrap(key, secret), snapshot: snapshot.toString('base64') });
      writeFileSync(temporary, envelope, { flush: true });
      renameSync(temporary, output);
      put('lastBackup', now());
    } catch (error) {
      if (existsSync(temporary) && !(error instanceof Error && 'code' in error && error.code === 'EEXIST')) unlinkSync(temporary);
      throw error;
    }
  },
  previewRestore: (path: unknown, credential: unknown) => {
    pendingRestore?.key.fill(0);
    pendingRestore = undefined;
    const source = text(path, 4096);
    if (!source.endsWith('.4yosbak') || statSync(source).size > MAX_BACKUP) throw Error('Choose a valid 4YOS backup.');
    const envelope: Backup = JSON.parse(readFileSync(source, 'utf8'));
    if (typeof envelope.snapshot !== 'string') throw Error('Unrecognized backup.');
    const secret = text(credential, 1024);
    const key = envelope.format === 2 && envelope.wrapped ? unwrap(envelope.wrapped, secret) : envelope.format === 1 && envelope.vault ? olderBackupKey(envelope.vault, secret) : null;
    if (!key) throw Error('That password did not open this backup.');
    const temporary = join(directory, 'restore-preview.db');
    let preview: Database.Database | undefined;
    try {
      writeFileSync(temporary, Buffer.from(envelope.snapshot, 'base64'), { flush: true });
      preview = open(temporary, key, true);
      if (preview.pragma('integrity_check', { simple: true }) !== 'ok' || (preview.pragma('user_version', { simple: true }) as number) > MIGRATIONS.length) throw Error('This backup needs a newer version of 4YOS.');
      const counts = (connection: Database.Database) => ({
        notes: connection.prepare('select count(*) from notes').pluck().get() as number,
        evidence: connection.prepare('select count(*) from evidence').pluck().get() as number,
        goals: connection.prepare('select count(*) from goals').pluck().get() as number,
      });
      const result = { incoming: counts(preview), current: database ? counts(database) : null };
      pendingRestore = { envelope, key };
      return result;
    } finally {
      if (!pendingRestore) key.fill(0);
      preview?.close();
      if (existsSync(temporary)) unlinkSync(temporary);
    }
  },
  cancelRestore: () => { pendingRestore?.key.fill(0); pendingRestore = undefined; },
  restore: () => {
    if (!pendingRestore) throw Error('Preview a verified backup first.');
    if (!database || !databaseKey) throw Error('Your records are not open.');
    if (lessons.some(lesson => lesson.video && media.mediaStatus(lesson.id).active)) throw Error('Pause the video download before restoring.');
    const { envelope, key } = pendingRestore;
    pendingRestore = undefined;
    stopAyo();
    // The backup's records are re-locked with this laptop's key first, and only then swapped in.
    const current = Buffer.from(databaseKey);
    const incoming = databaseFile + '.restore';
    writeFileSync(incoming, Buffer.from(envelope.snapshot, 'base64'), { flush: true });
    try {
      const copy = open(incoming, key);
      try {
        copy.pragma("rekey='" + current.toString('hex') + "'");
        // The user-selected backup remains available. Upgrade its temporary copy before replacing live records.
        migrate(copy, current, false);
      } finally { copy.close(); }
      open(incoming, current, true).close();
      database.close();
      database = undefined;
      renameSync(incoming, databaseFile);
      unlock(current);
    } catch (error) {
      if (existsSync(incoming)) unlinkSync(incoming);
      if (!database) unlock(current);
      throw error;
    } finally { key.fill(0); }
  },
};

port.on('message', async ({ data }) => {
  const { id, method, args } = data;
  try {
    if (!Object.hasOwn(methods, method) || !Array.isArray(args)) throw Error('Unknown request.');
    const handler = methods[method as keyof typeof methods] as (...args: unknown[]) => unknown;
    port.postMessage({ id, ok: true, value: await handler(...args) });
  } catch (error) {
    port.postMessage({ id, ok: false, error: error instanceof Error ? error.message : 'The request failed.' });
  }
});

