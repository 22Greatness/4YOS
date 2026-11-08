import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { CoreEngine } from '../../src/web/core-engine.ts';
import { POS_RECONCILIATION_TASK, referenceReconcilePosDaily } from '../../src/core/assignments.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
const Database = require(path.resolve(root, 'node_modules/better-sqlite3-multiple-ciphers'));

console.log('=============================================================');
console.log('>>> 4YOS Camp POS Assignment & Authoritative Evaluation Tests');
console.log('=============================================================\n');

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
        const res = await fn();
        db.exec('COMMIT;');
        return res;
      } catch (e) {
        db.exec('ROLLBACK;');
        throw e;
      }
    },
    async close() { db.close(); }
  };
}

async function createTestEngine() {
  const db = createTestDb();
  const engine = new CoreEngine({ db });
  await engine.initSchema();
  return { engine, db };
}

// Valid reference solution for tests
const VALID_POS_CODE = `
function reconcilePosDaily(transactions) {
  var seen = {};
  var totalCashInKobo = 0;
  var totalCashOutKobo = 0;
  var totalFeeCollectedKobo = 0;
  var validCount = 0;
  var rejectedCount = 0;
  var rejections = [];

  for (var i = 0; i < transactions.length; i++) {
    var tx = transactions[i];
    if (!tx || typeof tx !== 'object') {
      rejectedCount++;
      rejections.push({ reference: 'MALFORMED', reason: 'malformed_record' });
      continue;
    }
    var ref = (tx.reference || '').trim();
    if (!ref) {
      rejectedCount++;
      rejections.push({ reference: 'EMPTY', reason: 'missing_reference' });
      continue;
    }
    if (seen[ref]) {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'duplicate_reference' });
      continue;
    }
    seen[ref] = true;

    if (typeof tx.amountKobo !== 'number' || Math.floor(tx.amountKobo) !== tx.amountKobo || tx.amountKobo <= 0) {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'invalid_amount' });
      continue;
    }

    if (tx.status !== 'success') {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'transaction_failed' });
      continue;
    }

    var fee = (typeof tx.feeKobo === 'number' && tx.feeKobo >= 0) ? tx.feeKobo : 0;

    if (tx.type === 'cash_in') {
      totalCashInKobo += tx.amountKobo;
      totalFeeCollectedKobo += fee;
      validCount++;
    } else if (tx.type === 'cash_out') {
      totalCashOutKobo += tx.amountKobo;
      totalFeeCollectedKobo += fee;
      validCount++;
    } else {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'unknown_type' });
    }
  }

  var netCashDrawerChangeKobo = totalCashInKobo - totalCashOutKobo + totalFeeCollectedKobo;

  return {
    totalCashInKobo: totalCashInKobo,
    totalCashOutKobo: totalCashOutKobo,
    totalFeeCollectedKobo: totalFeeCollectedKobo,
    netCashDrawerChangeKobo: netCashDrawerChangeKobo,
    validCount: validCount,
    rejectedCount: rejectedCount,
    rejections: rejections
  };
}
`;

const VALID_HANDOVER = 'Daily POS terminal float balanced with zero discrepancy. Cash-in deposits and cash-out withdrawals reconciled in exact integer kobo, and duplicate transactions were audited.';

async function runTests() {
  // Test 1: Empty Submission Rejection
  console.log('[Test 1]: Empty Submission Rejection');
  {
    const { engine } = await createTestEngine();
    const result = await engine.submitAssignment('pos-cash-reconciliation-v1', { code: '', explanation: '' });
    assert.equal(result.score, 0, 'Empty code must score 0');
    assert.equal(result.passed, false, 'Empty code must fail');
    assert.equal(result.artifactId, undefined, 'No credential artifact for empty submission');

    const attempts = await engine.attempts();
    assert.equal(attempts.length, 1);
    assert.equal(attempts[0].percent, 0);
    assert.equal(attempts[0].passed, 0);
    console.log('  ✔ Empty code scores 0% and produces 0 passes');
  }

  // Test 2: Commented-out and Broken Code
  console.log('\n[Test 2]: Commented-out & Syntax Error Rejection');
  {
    const { engine } = await createTestEngine();
    const commentRes = await engine.submitAssignment('pos-cash-reconciliation-v1', {
      code: '/* function reconcilePosDaily(tx) { return { netCashDrawerChangeKobo: 500000 }; } */',
      explanation: 'I solved the assignment'
    });
    assert.equal(commentRes.score, 0);
    assert.equal(commentRes.passed, false);
    console.log('  ✔ Commented-out solution caught and scored 0%');

    const syntaxRes = await engine.submitAssignment('pos-cash-reconciliation-v1', {
      code: 'function reconcilePosDaily(tx) { return { broken syntax',
      explanation: VALID_HANDOVER
    });
    assert.equal(syntaxRes.score, 0);
    assert.equal(syntaxRes.passed, false);
    assert.ok(syntaxRes.logs.some(l => l.includes('Syntax or Compilation Error')));
    console.log('  ✔ Syntax error cleanly trapped without crashing worker');
  }

  // Test 3: Anti-Hardcoding Dynamic Verification
  console.log('\n[Test 3]: Anti-Hardcoding Dynamic Batch Rejection');
  {
    const { engine } = await createTestEngine();
    // Static return that matches Batch 1 values only
    const staticCode = `
      function reconcilePosDaily(tx) {
        return {
          totalCashInKobo: 1500000,
          totalCashOutKobo: 200000,
          totalFeeCollectedKobo: 40000,
          netCashDrawerChangeKobo: 1340000,
          validCount: 3,
          rejectedCount: 0,
          rejections: []
        };
      }
    `;
    const res = await engine.submitAssignment('pos-cash-reconciliation-v1', {
      code: staticCode,
      explanation: VALID_HANDOVER
    });
    assert.ok(res.score < 40, `Hardcoded static values must fail dynamic tests, got ${res.score}`);
    assert.equal(res.passed, false);
    console.log(`  ✔ Hardcoded return values failed dynamic batch (Score: ${res.score}%, Passed: false)`);
  }

  // Test 4: Valid Implementation & Sovereign Proof Minting
  console.log('\n[Test 4]: Valid Implementation & Sovereign Proof Minting');
  {
    const { engine } = await createTestEngine();
    const res = await engine.submitAssignment('pos-cash-reconciliation-v1', {
      code: VALID_POS_CODE,
      explanation: VALID_HANDOVER
    });
    assert.equal(res.score, 100, `Valid solution must score 100, got ${res.score}`);
    assert.equal(res.passed, true);
    assert.ok(res.artifactId && res.artifactId.startsWith('4YOS-PASS-POS-'), 'Must mint 4YOS-PASS sovereign credential');

    const attempts = await engine.attempts();
    assert.equal(attempts.length, 1);
    assert.equal(attempts[0].percent, 100);
    assert.equal(attempts[0].passed, 1);

    const outbox = await engine.getPendingOutbox();
    assert.equal(outbox.length, 1);
    assert.equal(outbox[0].entity, 'assignment_attempt');
    console.log(`  ✔ Valid code passed with 100% (Artifact ID: ${res.artifactId})`);
  }

  // Test 5: Rejection of Caller-Supplied Marks
  console.log('\n[Test 5]: Rejection of Caller-Supplied Marks');
  {
    const { engine } = await createTestEngine();
    // Caller passes score: 100 with empty code!
    const res = await engine.submitPracticalProject('pos-cash-reconciliation-v1', 100, {
      code: '',
      explanation: ''
    });
    // Engine must evaluate authoritatively and reject caller's 100!
    assert.equal(res.score, 0, 'Caller-supplied 100 must be overridden by actual evaluation');
    assert.equal(res.passed, false, 'Must fail because code was empty');
    assert.equal(res.artifactId, undefined, 'No pass artifact for failed code');

    const attempts = await engine.attempts();
    assert.equal(attempts[0].percent, 0);
    assert.equal(attempts[0].passed, 0);
    console.log('  ✔ Caller-supplied mark (100) rejected; authoritative grade (0) enforced');
  }

  // Test 6: Unknown Task ID Rejection
  console.log('\n[Test 6]: Unknown Task ID Rejection');
  {
    const { engine } = await createTestEngine();
    await assert.rejects(
      async () => {
        await engine.submitAssignment('non-existent-task-999', { code: VALID_POS_CODE });
      },
      /UNKNOWN_ASSIGNMENT_TASK/
    );
    const attempts = await engine.attempts();
    assert.equal(attempts.length, 0, 'No attempt recorded for unknown task');
    console.log('  ✔ Unknown task ID rejected without creating orphan records');
  }

  // Test 7: Atomic Transaction & Orphan Attempt Prevention
  console.log('\n[Test 7]: Atomic Transaction & Orphan Attempt Prevention');
  {
    const { engine, db } = await createTestEngine();
    // Simulate failure during outbox insert by making sync_outbox read-only or dropping it inside transaction
    // Or override queueOutbox to throw
    const originalQueueOutbox = engine.queueOutbox.bind(engine);
    engine.queueOutbox = async () => {
      throw new Error('INJECTED_OUTBOX_STORAGE_FAILURE');
    };

    await assert.rejects(
      async () => {
        await engine.submitAssignment('pos-cash-reconciliation-v1', {
          code: VALID_POS_CODE,
          explanation: VALID_HANDOVER
        });
      },
      /INJECTED_OUTBOX_STORAGE_FAILURE/
    );

    // Verify atomic rollback: attempts table MUST be completely empty!
    const attempts = await engine.attempts();
    assert.equal(attempts.length, 0, 'Atomic transaction must roll back attempts if outbox fails');
    console.log('  ✔ Injected outbox failure triggered clean rollback: 0 orphan attempts in SQLite');
  }

  // Test 8: Authoritative Exam Scoring & Unknown Exam Rejection
  console.log('\n[Test 8]: Authoritative Exam Scoring & Unknown Exam Rejection');
  {
    const { engine } = await createTestEngine();
    // Empty answers to exam must score 0%
    const resEmpty = await engine.assessmentSubmit('cos-102-exam', {});
    assert.equal(resEmpty.percent, 0, 'Empty exam submission must score 0%');
    assert.equal(resEmpty.passed, false, 'Empty exam must fail');

    // Unknown exam must produce 0%
    const resUnknown = await engine.assessmentSubmit('unknown-exam-999', { 1: 'A' });
    assert.equal(resUnknown.percent, 0, 'Unknown exam must produce 0%');
    assert.equal(resUnknown.passed, false, 'Unknown exam must fail');
    console.log('  ✔ Empty exam and unknown exam authoritatively scored 0% (zero false passes)');
  }

  console.log('\n=============================================================');
  console.log('✔ ALL 8 AUTHORITATIVE EVALUATION & ATOMIC SUITES PASSED! 🚀');
  console.log('=============================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test Suite Failed:', err);
  process.exit(1);
});
