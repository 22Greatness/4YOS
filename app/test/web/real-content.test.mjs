// Automated verification for Dependency 4:
// Real learning content, course packs loading, saved evidence, streaks, and results.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { CoreEngine } from '../../src/web/core-engine.ts';
import { calculateStreak, resolveNextAction } from '../../src/core/persuasion.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const packsDir = path.resolve(root, 'resources/packs');
const require = createRequire(import.meta.url);
const Database = require(path.resolve(root, 'node_modules/better-sqlite3-multiple-ciphers'));

// Minimal DatabaseConnection adapter wrapping better-sqlite3 in memory for Node tests
function createTestDb() {
  const db = new Database(':memory:');
  return {
    storageBackend: 'memory',
    async exec(sql) { db.exec(sql); },
    async run(sql, params = []) {
      const info = db.prepare(sql).run(...params);
      return { changes: info.changes, lastInsertRowid: info.lastInsertRowid };
    },
    async get(sql, params = []) {
      return db.prepare(sql).get(...params);
    },
    async all(sql, params = []) {
      return db.prepare(sql).all(...params);
    },
    async pragma(p, opts = {}) {
      const res = db.pragma(p, opts);
      return opts.simple ? res : res;
    },
    async transaction(fn) {
      db.exec('BEGIN;');
      try {
        await fn();
        db.exec('COMMIT;');
      } catch (e) {
        db.exec('ROLLBACK;');
        throw e;
      }
    },
    async close() { db.close(); }
  };
}

async function runRealContentTests() {
  console.log('\n======================================================');
  console.log('>>> Running Dependency 4: Real Learning Content Tests...');
  console.log('======================================================');

  // 1. Initialize SQLite Database & CoreEngine
  console.log('1. Initializing SQLite engine in memory...');
  const testDb = createTestDb();
  const engine = new CoreEngine({ db: testDb });
  const schemaVer = await engine.initSchema();
  assert.ok(schemaVer >= 10, 'Schema version must be at least 10');
  console.log(`   ✔ SQLite schema initialized to version ${schemaVer}.`);

  // 2. Load Real Course Packs
  console.log('2. Loading actual course packs from resources/packs/manifest.json...');
  const manifestPath = path.join(packsDir, 'manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  for (const item of manifest.packs) {
    const packPath = path.join(packsDir, item.filename);
    const packJson = JSON.parse(fs.readFileSync(packPath, 'utf8'));
    const loaded = engine.loadPack(packJson);
    assert.equal(loaded.id, item.id);
    console.log(`   ✔ Loaded pack: ${item.id} (${loaded.lessonsCount} lessons)`);
  }

  const packList = engine.listPacks();
  assert.equal(packList.length, manifest.packs.length, 'Must load every pack in the manifest');
  console.log('   ✔ All manifest packs verified in engine registry.');

  // 3. Verify Real Lesson Details
  console.log('3. Inspecting real lesson details from loaded packs...');
  const lessonNa = engine.getLesson('na-place-value');
  assert.ok(lessonNa, 'Lesson na-place-value must be accessible');
  assert.equal(lessonNa.packId, 'numbers-and-algebra');
  assert.ok(Array.isArray(lessonNa.sections) && lessonNa.sections.length > 0);
  console.log(`   ✔ [na-place-value] "${lessonNa.title}" · ${lessonNa.sections.length} sections.`);

  const lessonP1 = engine.getLesson('p1-what-program');
  assert.ok(lessonP1, 'Lesson p1-what-program must be accessible');
  assert.equal(lessonP1.packId, 'programming-1');
  console.log(`   ✔ [p1-what-program] "${lessonP1.title}".`);

  // 4. Verify Streak & Study Dates Derivation from Saved Evidence
  console.log('4. Verifying streak & study dates derived from real evidence...');
  const todayIso = new Date().toISOString().slice(0, 10);

  // Before any activity: studyDates must be empty
  const initialDates = await engine.studyDates();
  assert.deepEqual(initialDates, [], 'Initial study dates must be empty');
  const initialStreak = calculateStreak(initialDates, todayIso);
  assert.equal(initialStreak.currentStreak, 0);
  assert.equal(initialStreak.studiedToday, false);
  assert.equal(initialStreak.status, 'new');
  console.log('   ✔ Fresh state: 0 study dates, 0 streak, status is "new" (no fake presets).');

  // Perform practice check
  console.log('   Testing real question grading for na-place-value ("What is the digit 3 worth in 53,214?")...');
  const wrongCheck = await engine.check('na-place-value', '50');
  assert.equal(wrongCheck.passed, false, 'Wrong answer must fail');
  console.log('   ✔ Incorrect answer (50) correctly failed.');

  const correctCheck = await engine.check('na-place-value', '3000');
  assert.equal(correctCheck.passed, true, 'Correct answer (3000) must pass');
  console.log('   ✔ Correct answer (3000) passed with genuine pack verification.');

  // Evidence and session progress must now exist in SQLite
  const datesAfter = await engine.studyDates();
  assert.ok(datesAfter.includes(todayIso), 'Today must now be in study dates from real evidence');
  const streakAfter = calculateStreak(datesAfter, todayIso);
  assert.equal(streakAfter.studiedToday, true);
  assert.equal(streakAfter.currentStreak, 1);
  assert.equal(streakAfter.status, 'active');
  console.log(`   ✔ Evidence recorded in SQLite: streak advanced to ${streakAfter.currentStreak} day (studiedToday: true).`);

  // 5. Verify Course Progress & Next Action
  console.log('5. Verifying course progress & next action derived from SQLite records...');
  const progressList = await engine.courseProgress();
  const naProg = progressList.find(p => p.courseId === 'numbers-and-algebra');
  assert.ok(naProg, 'Numbers and algebra progress must exist');
  assert.equal(naProg.completedLessons, 1);
  assert.equal(naProg.totalLessons, 35);

  const nextAction = resolveNextAction(progressList);
  assert.ok(nextAction.targetId, 'Next action must be resolved');
  assert.notEqual(nextAction.targetId, 'na-place-value', 'Next action must advance beyond the completed lesson');
  console.log(`   ✔ Course progress: 1 of 35 completed. Next action advanced to: "${nextAction.title}".`);

  // 6. Verify Assessments & Results Summary Derivation
  console.log('6. Verifying assessments and results summary derived from SQLite attempts...');
  // Submit Unit 1 test (85%)
  await engine.assessmentSubmit('numbers-and-algebra-unit-1', 85);
  // Submit Exam attempt (70%)
  await engine.assessmentSubmit('numbers-and-algebra-exam', 70);

  // Calculate official results summary
  const summary = await engine.resultsSummary('nigerian-university-5pt', 'ccmas-cs-2023');
  assert.ok(summary, 'Results summary must be returned');
  assert.match(summary.notice, /Practice estimate, not an official result/i, 'Must contain practice estimate notice');

  const mthResult = summary.courses.find(c => c.courseId === 'numbers-and-algebra');
  assert.ok(mthResult, 'MTH course result must be present in results summary');
  // CA = 85 (weight 0.3 = 25.5), Exam = 70 (weight 0.7 = 49), Final = 74.5 -> 75 (Grade A)
  assert.equal(mthResult.caScore, 85);
  assert.equal(mthResult.examScore, 70);
  assert.equal(mthResult.finalScore, 75);
  assert.equal(mthResult.letter, 'A');
  assert.equal(mthResult.passed, true);
  console.log(`   ✔ MTH 101 Result derived: CA ${mthResult.caScore}%, Exam ${mthResult.examScore}%, Final ${mthResult.finalScore}% (Grade ${mthResult.letter}, ${mthResult.points} points).`);

  console.log('\n======================================================');
  console.log('✔ DEPENDENCY 4 VERIFICATION COMPLETE');
  console.log('  - Real course packs loaded & registered: PASSED');
  console.log('  - Lesson sections and exercises accessible: PASSED');
  console.log('  - No preset dates: study dates derived from SQLite evidence: PASSED');
  console.log('  - Streak dynamically derived from saved events: PASSED');
  console.log('  - Course progress & next action dynamically resolved: PASSED');
  console.log('  - Results & grades derived from saved assessments: PASSED');
  console.log('======================================================\n');
}

runRealContentTests().catch((err) => {
  console.error('✖ Real content test suite failed:', err);
  process.exit(1);
});
