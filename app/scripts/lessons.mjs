// Turns content/**/*.md into resources/content/lessons.json (shown to the learner) and
// checks.json (questions, answer keys and solutions, which the interface can never fetch).
// `node scripts/lessons.mjs --verify` also runs every Python example and test against the real interpreter.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';
import { compile } from '../src/expr.ts';
import { correct, instantiate, SEPARATOR } from '../src/core/paper.ts';
import { MATH_PATTERN } from '../src/mathText.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'content');
const fail = (file, why) => { throw Error(file + ': ' + why); };

function checkChart(spec, file) {
  if (!spec.alt || !spec.note) fail(file, 'a chart needs alt text, and a note saying where its numbers come from');
  if (spec.kind === 'function') compile(spec.fn);
  else if (spec.kind === 'hist') { if (!spec.values?.length) fail(file, 'a histogram needs values'); }
  else if (['bar', 'line', 'dot'].includes(spec.kind)) { if (!spec.data?.length || !spec.data.every(row => spec.x in row && spec.y in row)) fail(file, 'chart data needs its x and y on every row'); }
  else fail(file, 'unknown chart kind: ' + spec.kind);
}
function checkDiagram(spec, file) {
  if (!spec.alt) fail(file, 'a diagram needs alt text');
  if (spec.kind === 'venn') { if (!spec.a || !spec.b) fail(file, 'a Venn diagram needs two names'); }
  else if (spec.kind === 'bits') { if (!(spec.bits >= 1 && spec.bits <= 16)) fail(file, 'bits must be 1 to 16'); }
  else if (spec.kind === 'numberline') { if (!(spec.step > 0 && spec.max > spec.min && (spec.max - spec.min) / spec.step <= 40)) fail(file, 'a number line needs at most 40 steps'); }
  else if (spec.kind === 'graph') {
    if (!(spec.x?.[1] > spec.x?.[0] && spec.y?.[1] > spec.y?.[0])) fail(file, 'a graph needs x and y ranges');
    const vars = { x: 1, ...Object.fromEntries((spec.sliders ?? []).map(slider => [slider.name, slider.value])) };
    for (const curve of spec.curves ?? []) compile(curve.fn)(vars);
  } else fail(file, 'unknown diagram kind: ' + spec.kind);
}
/** Every formula in a lesson must really render, or the build fails. */
function checkMath(value, file) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(MATH_PATTERN)) { try { katex.renderToString(match[1], { throwOnError: true }); } catch (error) { fail(file, 'bad maths $' + match[1] + '$: ' + error.message); } }
  } else if (Array.isArray(value)) value.forEach(item => checkMath(item, file));
  else if (value && typeof value === 'object') {
    if (value.type === 'math') { try { katex.renderToString(value.tex, { throwOnError: true, displayMode: true }); } catch (error) { fail(file, 'bad maths: ' + error.message); } return; }
    if (value.type === 'code' || value.type === 'chart' || value.type === 'diagram') return;
    Object.values(value).forEach(item => checkMath(item, file));
  }
}

/** Parses the small Markdown subset used for lesson text into typed blocks. */
export function blocks(text, file = 'lesson') {
  const lines = text.split(/\r?\n/); const out = []; let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const body = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++]);
      if (i >= lines.length) fail(file, 'unclosed code block');
      i++;
      const code = body.join('\n');
      if (fence[1] === 'chart' || fence[1] === 'diagram') {
        let spec; try { spec = JSON.parse(code); } catch (error) { fail(file, fence[1] + ' is not valid JSON: ' + error.message); }
        (fence[1] === 'chart' ? checkChart : checkDiagram)(spec, file);
        out.push({ type: fence[1], spec });
        continue;
      }
      if (fence[1] === 'output') {
        const last = out[out.length - 1];
        if (last?.type !== 'code') fail(file, 'output block needs a code block before it');
        last.output = code;
      } else out.push({ type: 'code', lang: fence[1] ?? 'text', code });
      continue;
    }
    if (line.startsWith('$$')) {
      const body = [line.slice(2)]; i++;
      while (!body.at(-1).trimEnd().endsWith('$$')) { if (i >= lines.length) fail(file, 'unclosed $$ block'); body.push(lines[i++]); }
      out.push({ type: 'math', tex: body.join('\n').trimEnd().slice(0, -2).trim() });
      continue;
    }
    if (line.startsWith('### ')) { out.push({ type: 'heading', text: line.slice(4).trim() }); i++; continue; }
    if (line.startsWith('> ')) {
      const body = []; while (i < lines.length && lines[i].startsWith('> ')) body.push(lines[i++].slice(2));
      const joined = body.join(' ');
      const kind = joined.match(/^(Note|Mistake|Safety|Clip):\s*/);
      out.push({ type: 'callout', kind: (kind?.[1] ?? 'Note').toLowerCase(), text: joined.slice(kind?.[0].length ?? 0) });
      continue;
    }
    if (line.startsWith('?? ')) {
      const question = line.slice(3).trim(); i++;
      if (!lines[i]?.startsWith('=> ')) fail(file, 'pause question without an answer: ' + question);
      const answer = []; while (i < lines.length && lines[i].trim()) answer.push(lines[i++].replace(/^=> /, ''));
      out.push({ type: 'pause', question, answer: answer.join(' ') });
      continue;
    }
    if (line.startsWith('|')) {
      const rows = []; while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = row => row.replace(/^\||\|\s*$/g, '').split('|').map(cell => cell.trim());
      if (!/^\|[\s:|-]+\|?\s*$/.test(rows[1] ?? '')) fail(file, 'table needs a header separator');
      const head = cells(rows[0]); const body = rows.slice(2).map(cells);
      if (body.some(row => row.length !== head.length)) fail(file, 'table row width differs: ' + rows[0]);
      out.push({ type: 'table', head, rows: body });
      continue;
    }
    if (/^- /.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d/.test(line); const items = [];
      while (i < lines.length && (ordered ? /^\d+\. /.test(lines[i]) : /^- /.test(lines[i]))) items.push(lines[i++].replace(/^(- |\d+\. )/, ''));
      out.push({ type: 'list', ordered, items });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(```|\$\$|### |> |\?\? |\||- |\d+\. )/.test(lines[i])) para.push(lines[i++].trim());
    out.push({ type: 'p', text: para.join(' ') });
  }
  return out;
}

function parseChecks(text, file) {
  const questions = []; let current = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim(); if (!line) continue;
    const start = line.match(/^Q(\[transfer\])?:\s*(.+)$/);
    if (start) { current = { question: start[2], transfer: !!start[1], answers: [], feedback: '' }; questions.push(current); continue; }
    if (!current) fail(file, 'check text before the first Q: ' + line);
    if (line.startsWith('O: ')) { current.order = line.slice(3).split(SEPARATOR).map(item => item.trim()); current.answers = [current.order.join(SEPARATOR)]; continue; }
    if (line.startsWith('M: ')) { const [left, right] = line.slice(3).split(' => ').map(item => item.trim()); if (!right) fail(file, 'match needs "left => right": ' + line); (current.match ??= []).push([left, right]); current.answers = [current.match.map(pair => pair[1]).join(SEPARATOR)]; continue; }
    if (line.startsWith('Vars: ')) { current.vars = Object.fromEntries(line.slice(6).split(',').map(item => { const m = item.trim().match(/^(\w+)\s*=\s*(-?\d+)\.\.(-?\d+)$/); if (!m) fail(file, 'Vars needs "a=2..9": ' + line); return [m[1], [Number(m[2]), Number(m[3])]]; })); continue; }
    if (line.startsWith('Where: ')) { current.where = line.slice(7); continue; }
    if (line.startsWith('F: ')) { current.formula = line.slice(3); continue; }
    if (line.startsWith('Tol: ')) { current.tolerance = Number(line.slice(5)); continue; }
    if (line.startsWith('P: ')) { current.part = line.slice(3); continue; }
    if (line.startsWith('D: ')) { try { current.diagram = JSON.parse(line.slice(3)); } catch (error) { fail(file, 'diagram is not valid JSON: ' + error.message); } checkDiagram(current.diagram, file); continue; }
    if (line.startsWith('* ')) { (current.choices ??= []).push(line.slice(2)); current.answers.push(line.slice(2)); }
    else if (line.startsWith('- ')) (current.choices ??= []).push(line.slice(2));
    else if (line.startsWith('A: ')) current.answers.push(...line.slice(3).split('|').map(item => item.trim()));
    else if (line.startsWith('= ')) current.feedback = (current.feedback + ' ' + line.slice(2)).trim();
    else current.question += ' ' + line;
  }
  return questions;
}

export function parseLesson(name, content) {
  const [, head, body] = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? fail(name, 'missing front matter');
  const meta = Object.fromEntries(head.split(/\r?\n/).map(line => { const at = line.indexOf(':'); return [line.slice(0, at).trim(), line.slice(at + 1).trim()]; }));
  const parts = {};
  let key = null; let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith('```')) inFence = !inFence;
    const title = !inFence && line.match(/^# (.+)$/);
    if (title) { key = title[1].trim(); parts[key] = []; continue; }
    if (key) parts[key].push(line);
  }
  const part = title => (parts[title] ?? []).join('\n').trim();
  for (const required of ['Goal', 'Why', 'Lesson', 'Practice', 'Rubric', 'Summary', 'Check', 'Cards', 'Further']) if (!part(required)) fail(name, 'missing # ' + required);
  const sections = [];
  let lesson = null;
  const collect = [];
  const flush = () => { if (lesson) { lesson.blocks = blocks(collect.join('\n'), name); sections.push(lesson); collect.length = 0; } };
  inFence = false;
  for (const line of part('Lesson').split('\n')) {
    if (line.startsWith('```')) inFence = !inFence;
    if (!inFence && line.startsWith('## ')) { flush(); lesson = { title: line.slice(3).trim(), blocks: [] }; continue; }
    if (!lesson) fail(name, 'lesson text before the first ## section');
    collect.push(line);
  }
  flush();
  const list = title => blocks(part(title), name).flatMap(block => block.type === 'list' ? block.items : fail(name, '# ' + title + ' must be a list'));
  const cards = part('Cards').split(/\r?\n/).filter(Boolean).map(line => { const [front, back] = line.split(' :: '); if (!back) fail(name, 'card needs "front :: back": ' + line); return [front.trim(), back.trim()]; });
  const further = part('Further').split(/\r?\n/).filter(Boolean).map(line => { const m = line.match(/^- (.+?) :: (https:\/\/\S+)$/); if (!m) fail(name, 'further needs "- title :: https url": ' + line); return { title: m[1], url: m[2] }; });
  const code = title => { const m = part(title).match(/```\w*\n([\s\S]*?)\n```/); return m ? m[1] : undefined; };
  const num = key => meta[key] === undefined ? undefined : Number(meta[key]);
  const skills = key => (meta[key] ?? '').split(';').map(item => item.trim()).filter(item => item && item !== 'none');
  const public_ = {
    id: meta.id, pack: meta.pack, title: meta.title, minutes: num('minutes'), source: meta.source, url: meta.url, courses: meta.courses,
    ...(['yes', 'original', 'camp'].includes(meta.lecture) ? { bundledLecture: true, lectureCredit: meta.credit, start: num('start'), end: num('end') } : {}),
    ...(meta.lecture === 'original' ? { originalLecture: true, lectureTranscript: meta.lectureTranscript } : {}),
    ...(meta.lecture === 'camp' ? { campLecture: true } : {}),
    ...(meta.video ? { video: meta.video, lectureCredit: meta.credit, start: num('start'), end: num('end') } : {}),
    ...(meta.licence ? { lectureLicence: meta.licence } : {}),
    ...(meta.python === 'yes' ? { python: true } : {}),
    goal: part('Goal'), why: part('Why'), sections, ...(part('Warm-up') ? { warmup: blocks(part('Warm-up'), name) } : {}),
    format: num('format') ?? 1, teaches: skills('teaches'), uses: skills('uses'),
    practice: { blocks: blocks(part('Practice'), name), rubric: list('Rubric'), ...(code('Command') ? { command: code('Command') } : {}), ...(code('Starter') ? { starter: code('Starter') } : {}) },
    ...(code('Tests') ? { tests: code('Tests') } : {}),
    exercises: blocks(part('Exercises'), name), summary: list('Summary'), further,
  };
  const checks = { id: meta.id, questions: parseChecks(part('Check'), name), cards, ...(code('Solution') ? { solution: code('Solution') } : {}) };
  return { public: public_, private: checks };
}

export const words = lesson => JSON.stringify(lesson.sections).replace(/"(type|lang|blocks|title|text|code|output|items|head|rows|question|answer|kind|ordered)":/g, ' ').split(/\s+/).length;

/** Order, matching and generated questions must hold up, including 50 sets of generated numbers. */
function checkQuestion(q, file) {
  const stem = q.question;
  if (q.order && (q.order.length < 3 || new Set(q.order).size !== q.order.length)) fail(file, 'an order question needs 3 or more different items: ' + stem);
  if (q.match) {
    if (q.match.length < 3) fail(file, 'a match question needs 3 or more pairs: ' + stem);
    if (new Set(q.match.map(pair => pair[0])).size !== q.match.length || new Set(q.match.map(pair => pair[1])).size !== q.match.length) fail(file, 'match items must all differ: ' + stem);
  }
  if (q.diagram && !q.diagram.alt) fail(file, 'a diagram question needs alt text: ' + stem);
  if (q.diagram?.kind === 'graph') fail(file, 'a graph can teach, but it cannot be answered: ' + stem);
  if (q.diagram?.kind === 'venn' && ![q.diagram.a + ' only', q.diagram.b + ' only', 'Both', 'Neither'].includes(q.answers[0])) fail(file, 'a Venn answer must name a region: ' + stem);
  if (q.diagram?.kind === 'bits' && !new RegExp('^[01]{' + q.diagram.bits + '}$').test(q.answers[0])) fail(file, 'a bits answer must be ' + q.diagram.bits + ' bits: ' + stem);
  if (q.formula || q.vars) {
    if (!q.vars) fail(file, 'a formula needs Vars: ' + stem);
    if (!q.formula && !q.answers.length) fail(file, 'generated question has no answer: ' + stem);
    const seen = new Set();
    for (let seed = 0; seed < 50; seed++) {
      let made; try { made = instantiate(q, seed); } catch (error) { fail(file, error.message); }
      if (/\{[A-Za-z_]\w*\}/.test(made.question)) fail(file, 'a name was left unfilled: ' + made.question);
      if (!made.answers.every(answer => !/\{/.test(answer))) fail(file, 'answer not filled in: ' + stem);
      if (q.formula && !correct(made, made.answers[0])) fail(file, 'generated answer fails its own check: ' + stem);
      if (made.choices && new Set(made.choices).size !== made.choices.length) fail(file, 'generated choices collide; narrow Vars or add Where: ' + stem);
      seen.add(made.question);
    }
    if (seen.size < 4) fail(file, 'generated question barely varies: ' + stem);
  }
}

function validate(file, { public: lesson, private: key }) {
  for (const field of ['id', 'pack', 'title', 'minutes', 'source', 'url', 'courses']) if (!lesson[field]) fail(file, 'front matter needs ' + field);
  if (lesson.id + '.md' !== file) fail(file, 'file name must match the id');
  if (!lesson.url.startsWith('https://')) fail(file, 'source must be https');
  if (lesson.sections.length < 3) fail(file, 'needs at least 3 sections');
  if (words(lesson) < 600) fail(file, 'lesson text is thin: ' + words(lesson) + ' words');
  if (lesson.summary.length < 3) fail(file, 'needs at least 3 summary points');
  if (lesson.further.length < 1) fail(file, 'needs further reading');
  if (lesson.practice.rubric.length < 2) fail(file, 'needs at least 2 rubric points');
  if (!lesson.exercises.some(block => block.type === 'pause')) fail(file, 'needs worked exercises');
  if ((lesson.bundledLecture || lesson.video) && !JSON.stringify(lesson.sections).includes('"kind":"clip"')) fail(file, 'a lecture lesson must say what its clip covers');
  if (lesson.campLecture && (lesson.start !== 0 || !(lesson.end > 0) || !lesson.lectureCredit)) fail(file, 'a Camp lecture needs its runtime and credit');
  if (lesson.originalLecture && (lesson.start !== 0 || !(lesson.end > 0) || !lesson.lectureTranscript?.startsWith('https://') || !lesson.lectureCredit)) fail(file, 'the full original lecture needs its complete runtime, credit, and publisher notes');
  if (key.cards.length < 3) fail(file, 'needs at least 3 cards');
  const core = key.questions.filter(q => !q.transfer); const transfer = key.questions.filter(q => q.transfer);
  if (core.length < 8 || transfer.length < 3) fail(file, `needs 8 core and 3 transfer questions, has ${core.length} and ${transfer.length}`);
  const stems = new Set();
  for (const q of key.questions) {
    if (stems.has(q.question)) fail(file, 'duplicate question: ' + q.question); stems.add(q.question);
    if (!q.feedback) fail(file, 'question has no feedback: ' + q.question);
    if (!q.answers.length && !q.formula) fail(file, 'question has no answer: ' + q.question);
    checkQuestion(q, file);
    if (q.choices) {
      if (q.answers.length !== 1) fail(file, 'choice question needs exactly one correct: ' + q.question);
      if (q.choices.length < 3) fail(file, 'needs at least 3 choices: ' + q.question);
      if (new Set(q.choices).size !== q.choices.length) fail(file, 'duplicate choice: ' + q.question);
    }
  }
  if (lesson.format >= 2) {
    if (!lesson.teaches.length) fail(file, 'needs teaches: the skills this lesson gives you');
    if (lesson.uses.length && (lesson.warmup ?? []).filter(block => block.type === 'pause').length < 2) fail(file, 'needs a Warm-up with 2 questions from earlier lessons');
    const titles = new Set(lesson.sections.map(section => section.title));
    for (const q of key.questions) if (!titles.has(q.part)) fail(file, 'each question needs P: naming a section of this lesson: ' + q.question);
  }
  checkMath(lesson, file); checkMath(key.questions.map(q => [q.question, q.feedback, q.choices]), file); checkMath(key.cards, file);
  if (lesson.python && lesson.tests && !key.solution) fail(file, 'tests need a solution to prove them');
  const choice = key.questions.filter(q => q.choices);
  const longest = choice.filter(q => Math.max(...q.choices.map(c => c.length)) === q.answers[0].length).length;
  if (choice.length >= 6 && longest / choice.length > 0.6) fail(file, `the right answer is the longest choice in ${longest} of ${choice.length} questions`);
}

const python = (code, dir, name) => { const f = join(dir, name + '.py'); writeFileSync(f, code); return execFileSync('python', ['-I', '-X', 'utf8', f], { encoding: 'utf8', timeout: 20000, stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r\n/g, '\n').trimEnd(); };
function verifyCode(file, { public: lesson, private: key }) {
  const dir = mkdtempSync(join(tmpdir(), '4yos-lesson-'));
  let count = 0;
  try {
    const all = [...lesson.sections.flatMap(section => section.blocks), ...lesson.exercises, ...lesson.practice.blocks];
    for (const [index, block] of all.entries()) {
      if (block.type !== 'code' || block.lang !== 'python' || block.output === undefined) continue;
      let got; try { got = python(block.code, dir, 'ex' + index); } catch (error) { if (/^Traceback/.test(block.output)) got = String(error.stderr).replace(/\r\n/g, '\n').trimEnd(); else fail(file, 'example crashed:\n' + block.code + '\n' + error.stderr); }
      const same = /^Traceback/.test(block.output) ? got.split('\n').at(-1) === block.output.split('\n').at(-1) : got === block.output.trimEnd();
      if (!same) fail(file, `example output differs:\n${block.code}\n--- says\n${block.output}\n--- got\n${got}`);
      count++;
    }
    if (lesson.tests) {
      const run = code => python(code + '\n\n' + lesson.tests, dir, 'test');
      try { run(key.solution); count++; } catch (error) { fail(file, 'the solution fails its own tests:\n' + error.stderr); }
      if (lesson.practice.starter) { let passed = true; try { run(lesson.practice.starter); } catch { passed = false; } if (passed) fail(file, 'the starter code already passes the tests'); }
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
  return count;
}

const walk = dir => readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? walk(path) : [path]; });

/** A course file: name, goals, units and their lessons, the project, and the exam's own questions. */
export function parseCourse(path, lessonIds) {
  const content = readFileSync(path, 'utf8');
  const [, head, body] = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? fail(path, 'missing front matter');
  const meta = Object.fromEntries(head.split(/\r?\n/).map(line => { const at = line.indexOf(':'); return [line.slice(0, at).trim(), line.slice(at + 1).trim()]; }));
  const parts = {}; let key = null;
  for (const line of body.split(/\r?\n/)) { const title = line.match(/^# (.+)$/); if (title) { key = title[1].trim(); parts[key] = []; } else if (key) parts[key].push(line); }
  const part = title => (parts[title] ?? []).join('\n').trim();
  const units = []; for (const line of part('Units').split(/\r?\n/)) {
    const unit = line.match(/^## ([\w-]+) :: (.+?)(?: :: (.+))?$/); if (unit) { units.push({ id: unit[1], title: unit[2], ...(unit[3] ? { focus: unit[3] } : {}), lessons: [] }); continue; }
    const lesson = line.match(/^- ([\w-]+)$/); if (lesson) { if (!lessonIds.has(lesson[1])) fail(path, 'unknown lesson ' + lesson[1]); units.at(-1).lessons.push(lesson[1]); }
  }
  const questions = parseChecks(part('Exam'), path);
  const partial = meta.status === 'partial';
  if (!partial && (questions.filter(q => !q.transfer).length < 24 || questions.filter(q => q.transfer).length < 6)) fail(path, 'an exam needs 24 core and 6 transfer questions');
  for (const q of questions) checkQuestion(q, path);
  for (const q of questions) { if ((!q.answers.length && !q.formula) || !q.feedback) fail(path, 'incomplete exam question: ' + q.question); if (q.choices && q.answers.length !== 1) fail(path, 'exam choice needs one answer: ' + q.question); }
  const rubric = blocks(part('Project rubric'), path).flatMap(block => block.items ?? []);
  return { public: { id: meta.id, subject: meta.subject, title: meta.title, goal: part('Goal'), minutes: Number(meta.examMinutes), ...(partial ? { partial: true } : {}), ...(meta.level ? { level: Number(meta.level) } : {}), needs: (meta.needs ?? '').split(',').map(item => item.trim()).filter(Boolean), units, project: { title: meta.project, blocks: blocks(part('Project'), path), rubric } }, private: { id: 'exam:' + meta.id, questions, cards: [] } };
}

export function loadAll() {
  const problems = [];
  const all = walk(source).filter(path => path.endsWith('.md') && !path.endsWith('course.md')).sort().map(path => {
    const name = path.split(/[\\/]/).pop();
    try {
      const parsed = parseLesson(name, readFileSync(path, 'utf8'));
      validate(name, parsed);
      // A course is the folder a lesson sits in: content/<subject>/<course>/...
      parsed.folder = path.slice(source.length + 1).split(/[\\/]/)[1];
      return [name, parsed];
    } catch (error) { problems.push(error.message); return null; }
  });
  if (problems.length) throw Error(['Lesson problems:', ...problems].join(String.fromCharCode(10)));
  return all;
}

/**
 * The rule that makes "from the very basics" enforceable: a lesson may only use what an earlier lesson taught.
 * Every lesson teaches its own ID, plus any skills it names. It may use anything earlier in its course, or anything
 * in a course its course needs. A course is the folder a lesson sits in.
 */
export function checkSkills(all, courses) {
  const problems = [];
  const folderOf = new Map(all.map(([name, parsed]) => [parsed.public.id, parsed.folder]));
  const byFolder = new Map();
  for (const [, parsed] of all) { if (!byFolder.has(parsed.folder)) byFolder.set(parsed.folder, []); byFolder.get(parsed.folder).push(parsed); }
  const teachesOf = parsed => [parsed.public.id, ...parsed.public.teaches];
  const courseById = new Map(courses.map(course => [course.public.id, course]));
  const reach = (id, seen = new Set()) => { if (seen.has(id)) return seen; seen.add(id); for (const need of courseById.get(id)?.public.needs ?? []) reach(need, seen); return seen; };
  for (const course of courses) for (const need of course.public.needs) if (!courseById.has(need) && !byFolder.has(need)) problems.push(course.public.id + ': needs an unknown course: ' + need);
  const lessonById = new Map(all.map(([, parsed]) => [parsed.public.id, parsed]));
  for (const course of courses) {
    const taught = new Set();
    for (const need of reach(course.public.id)) { if (need !== course.public.id) for (const parsed of byFolder.get(need) ?? []) teachesOf(parsed).forEach(skill => taught.add(skill)); }
    for (const unit of course.public.units) for (const id of unit.lessons) {
      const parsed = lessonById.get(id);
      if ((parsed.public.format ?? 1) >= 2) for (const skill of parsed.public.uses) if (!taught.has(skill)) problems.push(id + ': uses "' + skill + '", which no earlier lesson teaches');
      teachesOf(parsed).forEach(skill => taught.add(skill));
    }
  }
  for (const [, parsed] of all) if ((parsed.public.format ?? 1) >= 2 && !courseById.has(folderOf.get(parsed.public.id)) ) {
    const taught = new Set(); for (const other of byFolder.get(parsed.folder) ?? []) if (other !== parsed) teachesOf(other).forEach(skill => taught.add(skill));
    for (const [, other] of all) if (other.folder !== parsed.folder && other.folder && parsed.public.uses.includes(other.public.id)) taught.add(other.public.id);
    for (const skill of parsed.public.uses) if (!taught.has(skill)) problems.push(parsed.public.id + ': uses "' + skill + '", which no earlier lesson teaches');
  }
  return problems;
}

export function writePacks(all, courses) {
  const packsDir = join(root, 'resources/packs');
  mkdirSync(packsDir, { recursive: true });

  const lessonById = new Map(all.map(([, parsed]) => [parsed.public.id, parsed]));
  const packsManifest = {
    schemaVersion: 1,
    generated: new Date().toISOString().split('T')[0],
    packs: []
  };

  for (const course of courses) {
    const courseId = course.public.id;
    const courseLessons = [];
    const courseChecks = [];

    for (const unit of course.public.units) {
      for (const lessonId of unit.lessons) {
        const parsed = lessonById.get(lessonId);
        if (parsed) {
          courseLessons.push(parsed.public);
          courseChecks.push(parsed.private);
        }
      }
    }

    courseChecks.push(course.private);

    const packData = {
      id: courseId,
      schemaVersion: 1,
      public: course.public,
      lessons: courseLessons,
      checks: courseChecks
    };

    const json = JSON.stringify(packData);
    const hash = createHash('sha256').update(json).digest('hex');
    const filename = `${courseId}.json`;
    const packPath = join(packsDir, filename);
    writeFileSync(packPath, json);
    const stat = statSync(packPath);

    packsManifest.packs.push({
      id: courseId,
      title: course.public.title,
      level: course.public.level ?? 100,
      filename,
      sha256: hash,
      bytes: stat.size,
      lessonsCount: courseLessons.length,
      unitsCount: course.public.units.length
    });
  }

  const manifestJson = JSON.stringify(packsManifest, null, 2);
  writeFileSync(join(packsDir, 'manifest.json'), manifestJson);
  return packsManifest;
}

export function generate({ verify = false } = {}) {
  const all = loadAll();
  if (verify) { let ran = 0; for (const [name, parsed] of all) ran += verifyCode(name, parsed); console.log(`Verified ${all.length} lessons, ${ran} Python examples and test suites.`); }
  const ids = new Set(all.map(([, parsed]) => parsed.public.id));
  const courses = walk(source).filter(path => path.endsWith('course.md')).sort().map(path => parseCourse(path, ids));
  const skillProblems = checkSkills(all, courses);
  if (skillProblems.length) throw Error(['Skill problems:', ...skillProblems].join(String.fromCharCode(10)));
  writeFileSync(join(root, 'resources/content/lessons.json'), JSON.stringify(all.map(([, parsed]) => parsed.public)));
  writeFileSync(join(root, 'resources/content/checks.json'), JSON.stringify([...all.map(([, parsed]) => parsed.private), ...courses.map(course => course.private)]));
  writeFileSync(join(root, 'resources/content/hcw-courses.json'), JSON.stringify(courses.map(course => course.public)));
  writePacks(all, courses);
  return all;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const all = generate({ verify: process.argv.includes('--verify') });
  if (process.argv.includes('--urls')) {
    const urls = [...new Set(all.flatMap(([, { public: lesson }]) => [lesson.url, ...lesson.further.map(item => item.url)]))];
    let bad = 0;
    for (const url of urls) {
      const status = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(25000) }).then(response => response.status, error => String(error.cause?.code ?? error.message));
      if (status !== 200) { bad++; console.log(status, url); }
    }
    console.log(`Checked ${urls.length} links, ${bad} did not return 200.`);
  }
  console.log(all.map(([, { public: lesson, private: key }]) => `${lesson.id}: ${words(lesson)} words, ${key.questions.length} questions, ${key.cards.length} cards`).join('\n'));
}
