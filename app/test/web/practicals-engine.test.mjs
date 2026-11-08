// Automated Verification for 4YOS Hands-On Practicals & Projects Engine
// Verifies:
// 1. CoreEngine.submitPracticalProject: attempts, evidence, sync_outbox, credential ID
// 2. Socratic Diagnostic Engine zero-answer policy & cultural analogies
// 3. Practical Opportunities Catalog (100L-400L briefs, real-world Nigerian scenarios)
// 4. Practical solution verification & credential minting

import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { CoreEngine } from '../../src/web/core-engine.ts';
import { SocraticDiagnosticEngine } from '../../src/core/tutor-engine.ts';
import { PRACTICAL_OPPORTUNITIES } from '../../src/core/opportunities.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
const Database = require(path.resolve(root, 'node_modules/better-sqlite3-multiple-ciphers'));

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

async function runPracticalsEngineTests() {
  console.log('\n=============================================================');
  console.log('>>> Running 4YOS Hands-On Practicals & Projects Engine Tests...');
  console.log('=============================================================');

  const db = createTestDb();
  const engine = new CoreEngine({ db });
  await engine.initSchema(10);
  await engine.open();

  // Test Suite 1: CoreEngine.submitPracticalProject
  console.log('\n[Suite 1]: CoreEngine Practical Project Submission & Persistence');
  {
    // A: Passing attempt (>= 40%)
    const resPass = await engine.submitPracticalProject('sme-inventory-sql', 95, {
      code: 'CREATE TABLE suppliers...',
      testsPassed: 3
    });
    assert.equal(resPass.passed, true, 'Score 95% must pass');
    assert.ok(resPass.attemptId > 0, 'Must generate numeric attempt ID');
    assert.ok(resPass.artifactId.startsWith('4YOS-PASS-SME-'), 'Must generate sovereign credential format');

    // Verify attempts table
    const attempt = await db.get('SELECT * FROM attempts WHERE assessment = ?', ['sme-inventory-sql']);
    assert.ok(attempt, 'Attempt record must exist');
    assert.equal(attempt.percent, 95);
    assert.equal(attempt.passed, 1);

    // Verify evidence table
    const ev = await db.get('SELECT * FROM evidence WHERE session_id = ?', ['sme-inventory-sql']);
    assert.ok(ev, 'Evidence record must exist');
    assert.equal(ev.task, 'practical-project');
    assert.equal(ev.result, 'passed');
    assert.equal(ev.reviewer, 'directly_checked');
    const parsedAnswer = JSON.parse(ev.answer);
    assert.equal(parsedAnswer.score, 95);
    assert.equal(parsedAnswer.artifactId, resPass.artifactId);

    // Verify sync_outbox
    const outboxItems = await engine.getPendingOutbox();
    const item = outboxItems.find(o => o.entity === 'practical_project');
    assert.ok(item, 'Outbox item for practical_project must be queued');
    assert.equal(item.action, 'submit');
    const outPayload = JSON.parse(item.payload);
    assert.equal(outPayload.projectId, 'sme-inventory-sql');
    assert.equal(outPayload.passed, true);
    assert.equal(outPayload.artifactId, resPass.artifactId);

    // B: Failing attempt (< 40%)
    const resFail = await engine.submitPracticalProject('micro-lending-risk-model', 30, {
      code: 'def incomplete...',
      testsPassed: 1
    });
    assert.equal(resFail.passed, false, 'Score 30% must fail under 40% threshold');
    const failAttempt = await db.get('SELECT * FROM attempts WHERE assessment = ?', ['micro-lending-risk-model']);
    assert.equal(failAttempt.passed, 0);

    console.log('  ✔ submitPracticalProject correctly persists attempts, evidence, and sync_outbox');
    console.log('  ✔ Enforces NUC 40% (Grade E) pass threshold');
    console.log('  ✔ Generates sovereign credential ID:', resPass.artifactId);
  }

  // Test Suite 2: Socratic AI Diagnostic Tutor Engine
  console.log('\n[Suite 2]: Socratic Diagnostic Engine Zero-Answer & Cultural Analogies');
  {
    // Test 2.1: Zero division trap
    const diagZero = SocraticDiagnosticEngine.diagnosePythonFailure({
      language: 'python',
      code: 'def calc(x): return x / 0',
      errorMessage: 'ZeroDivisionError: division by zero'
    });
    assert.equal(diagZero.category, 'boundary');
    assert.ok(diagZero.socraticHint.includes('denominator'), 'Hint must prompt conceptual question');
    assert.ok(diagZero.culturalAnalogy.includes('family meeting') || diagZero.culturalAnalogy.includes('₦10,000'), 'Must include authentic cultural analogy');

    // Test 2.2: IndexError keke analogy
    const diagIndex = SocraticDiagnosticEngine.diagnosePythonFailure({
      language: 'python',
      code: 'arr = [1, 2, 3]; x = arr[3]',
      errorMessage: 'IndexError: list index out of range'
    });
    assert.equal(diagIndex.category, 'boundary');
    assert.ok(diagIndex.socraticHint.includes('N - 1') || diagIndex.socraticHint.includes('zero-indexing'));
    assert.ok(diagIndex.culturalAnalogy.includes('keke'), 'Must use keke bus seat indexing analogy');

    // Test 2.3: Zero-answer policy check
    const zeroAnswerGuard = SocraticDiagnosticEngine.generateZeroAnswerGuardrail(
      'Write the complete Python code for POS reconciliation'
    );
    assert.ok(zeroAnswerGuard.includes('cannot write your solution for you'), 'Must maintain strict zero-answer policy');
    assert.ok(zeroAnswerGuard.includes('break down the problem'), 'Must provide guidance to self-repair');

    console.log('  ✔ Socratic engine maintains zero-answer policy');
    console.log('  ✔ Authentically diagnoses conceptual bugs with Nigerian cultural analogies');
  }

  // Test Suite 3: Practical Opportunities Catalog Integrity
  console.log('\n[Suite 3]: Practical Opportunities Catalog Structure');
  {
    assert.ok(PRACTICAL_OPPORTUNITIES.length >= 8, 'Must have at least 8 defined practical briefs');

    const levels = new Set(PRACTICAL_OPPORTUNITIES.map(p => p.level));
    assert.ok(levels.has(100), 'Must have 100L practicals');
    assert.ok(levels.has(200), 'Must have 200L practicals');
    assert.ok(levels.has(300), 'Must have 300L practicals');
    assert.ok(levels.has(400), 'Must have 400L practicals');

    for (const p of PRACTICAL_OPPORTUNITIES) {
      assert.ok(p.id, `Practical ${p.title} must have an ID`);
      assert.ok(p.title, `Practical ${p.id} must have a title`);
      assert.ok(p.description, `Practical ${p.id} must have a description`);
      assert.ok(p.realWorldScenario, `Practical ${p.id} must have a real-world scenario`);
      assert.ok(p.prerequisiteCourses.length > 0, `Practical ${p.id} must have prerequisites`);
      assert.ok(p.deliverable, `Practical ${p.id} must have a deliverable`);
    }

    // Specific Nigerian commercial context assertions
    const pos = PRACTICAL_OPPORTUNITIES.find(p => p.id === 'pos-float-audit');
    assert.ok(pos.description.includes('Moniepoint') || pos.realWorldScenario.includes('POS agent'));
    assert.ok(pos.estimatedEarningNaira.includes('₦25,000'));

    const sql = PRACTICAL_OPPORTUNITIES.find(p => p.id === 'sme-inventory-sql');
    assert.ok(sql.realWorldScenario.includes('Port Harcourt') || sql.realWorldScenario.includes('pharmacy'));

    const paystack = PRACTICAL_OPPORTUNITIES.find(p => p.id === 'paystack-webhook-processor');
    assert.ok(paystack.deliverable.includes('atomic') || paystack.deliverable.includes('settlement'));

    console.log('  ✔ All 8 practical opportunities across 100L-400L validated');
    console.log('  ✔ Nigerian commercial context and earning estimates verified');
  }

  // Test Suite 4: End-to-End Practical Execution & Results Summary Integration
  console.log('\n[Suite 4]: Results Summary Derivation with Practicals Evidence');
  {
    // Submit additional practicals
    await engine.submitPracticalProject('ussd-state-machine', 88, { testsPassed: 3 });
    await engine.submitPracticalProject('paystack-webhook-processor', 100, { testsPassed: 3 });

    // Derive resultsSummary
    const summary = await engine.resultsSummary('nigerian-university-5pt', 'ccmas-cs-2023');
    assert.ok(summary, 'Results summary must compute with saved practical evidence');
    assert.ok(Array.isArray(summary.courses), 'Courses array must be returned');

    const totalAttempts = await db.all('SELECT * FROM attempts;');
    assert.ok(totalAttempts.length >= 4, 'All practical attempts must be recorded in SQLite');

    console.log('  ✔ Practicals integrate seamlessly into student progress and results derivation');
  }

  await engine.close();
  console.log('\n=============================================================');
  console.log('>>> All 4 Hands-On Practicals & Projects Suites PASSED! 🚀');
  console.log('=============================================================\n');
}

runPracticalsEngineTests().catch((err) => {
  console.error('Practicals engine test failed:', err);
  process.exit(1);
});
