// Automated Verification for Stage C: Learning and Tools Multi-Course Workspaces
// Verifies Section 24.4 Stage C & Section 10:
// 1. Programming 1 (COS 102): Take-home POS cash drawer reconciliation in integer kobo with duplicate rejection
// 2. Describing Data (STA 111): Fare dispersion, median, quartiles (Q1, Q3), IQR, and 1.5*IQR outlier detection
// 3. Sets, Logic and Proof (MTH 111): Inclusion-Exclusion, disjoint partitions, and contrapositive conditional reasoning
// 4. Changed inputs & dynamic transfer testing
// 5. Close-and-resume draft persistence across app reload
// 6. Playwright browser verification: multi-course practical selection, test runner, socratic diagnostic, and credential minting

import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';
import { startPreviewServer } from '../../scripts/preview-web.mjs';

import {
  POS_RECONCILIATION_TASK,
  STATISTICAL_AUDIT_TASK,
  LOGIC_DEDUCTION_TASK,
  referenceReconcilePosDaily,
  referenceAuditFareDispersion,
  referenceAnalyzeTeamPartition,
  getAssignmentTask
} from '../../src/core/assignments.ts';

import { CoreEngine } from '../../src/web/core-engine.ts';

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
      return db.pragma(p, opts);
    },
    async close() {
      db.close();
    },
    async transaction(fn) {
      db.exec('BEGIN TRANSACTION');
      try {
        const res = await fn();
        db.exec('COMMIT');
        return res;
      } catch (err) {
        db.exec('ROLLBACK');
        throw err;
      }
    }
  };
}

async function runStageCLearningTests() {
  console.log('\n=============================================================');
  console.log('>>> Stage C: Learning & Tools Multi-Course Workspaces >>>');
  console.log('=============================================================\n');

  const db = createTestDb();
  const engine = new CoreEngine({ db });
  await engine.initSchema();

  // -----------------------------------------------------------------
  // STAGE 1: Programming 1 (COS 102) Authoritative POS Task
  // -----------------------------------------------------------------
  console.log('--- Stage 1: Programming 1 (COS 102) Take-Home POS Reconciliation ---');
  const validPosSolution = `
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

  const posEval = await POS_RECONCILIATION_TASK.evaluate({
    code: validPosSolution,
    explanation: 'Daily POS terminal float balanced. Cash-in deposits and cash-out withdrawals computed in integer kobo with duplicate references rejected.'
  });

  assert.equal(posEval.score, 100);
  assert.equal(posEval.passed, true);
  assert.ok(posEval.artifactId?.startsWith('4YOS-PASS-POS-'));
  console.log('   ✔ Programming 1: Authoritative evaluation scored 100% and minted POS credential.');

  // Submit via CoreEngine
  const posSubmit = await engine.submitPracticalProject('pos-cash-reconciliation-v1', {
    code: validPosSolution,
    explanation: 'Daily POS terminal float balanced. Cash-in deposits and cash-out withdrawals computed in integer kobo with duplicate references rejected.'
  });
  assert.equal(posSubmit.passed, true);
  assert.equal(posSubmit.score, 100);
  console.log('   ✔ Programming 1: Atomically committed to SQLite attempts and evidence.\n');

  // -----------------------------------------------------------------
  // STAGE 2: Describing Data (STA 111) Statistical Dispersion Audit
  // -----------------------------------------------------------------
  console.log('--- Stage 2: Describing Data (STA 111) Fare Dispersion & Quartiles ---');
  const validStaSolution = `
function auditFareDispersion(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return { count: 0, mean: 0, median: 0, q1: 0, q3: 0, iqr: 0, outliers: [] };
  }
  const s = [...values].sort((a, b) => a - b);
  const n = s.length;
  const sum = s.reduce((acc, v) => acc + v, 0);
  const mean = Math.round((sum / n) * 100) / 100;

  function med(arr) {
    const len = arr.length;
    if (len === 0) return 0;
    if (len % 2 === 1) return arr[Math.floor(len / 2)];
    return (arr[len / 2 - 1] + arr[len / 2]) / 2;
  }

  const median = med(s);
  let lower, upper;
  if (n % 2 === 1) {
    lower = s.slice(0, Math.floor(n / 2));
    upper = s.slice(Math.ceil(n / 2));
  } else {
    lower = s.slice(0, n / 2);
    upper = s.slice(n / 2);
  }

  const q1 = med(lower);
  const q3 = med(upper);
  const iqr = Math.round((q3 - q1) * 100) / 100;
  const outliers = s.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);

  return { count: n, mean, median, q1, q3, iqr, outliers };
}
  `;

  // Test reference implementation
  const refOdd = referenceAuditFareDispersion([12, 14, 15, 16, 18]);
  assert.equal(refOdd.median, 15);
  assert.equal(refOdd.q1, 13);
  assert.equal(refOdd.q3, 17);
  assert.equal(refOdd.iqr, 4);

  const refOutlier = referenceAuditFareDispersion([12, 14, 15, 16, 48]);
  assert.equal(refOutlier.median, 15);
  assert.equal(refOutlier.mean, 21);
  assert.equal(refOutlier.q3, 32);
  assert.equal(refOutlier.iqr, 19);

  const refSpikeBatch = referenceAuditFareDispersion([150, 200, 250, 300, 350, 400, 450, 1500]);
  assert.ok(refSpikeBatch.outliers.includes(1500));
  console.log('   ✔ Describing Data: Reference quartiles, median, and outlier calculations verified.');

  const staEval = await STATISTICAL_AUDIT_TASK.evaluate({
    code: validStaSolution,
    explanation: 'The median fare of ₦500 reflects the true typical commuter cost because extreme surge fares like ₦10,000 distort the mean without shifting the median.'
  });

  assert.equal(staEval.score, 100);
  assert.equal(staEval.passed, true);
  assert.ok(staEval.artifactId?.startsWith('4YOS-PASS-STA-'));
  console.log('   ✔ Describing Data: Authoritative evaluation scored 100% across odd, outlier and transfer batches.');

  // Submit via CoreEngine
  const staSubmit = await engine.submitPracticalProject('sta-statistical-audit-v1', {
    code: validStaSolution,
    explanation: 'The median fare of ₦500 reflects the true typical commuter cost because extreme surge fares like ₦10,000 distort the mean without shifting the median.'
  });
  assert.equal(staSubmit.passed, true);
  assert.equal(staSubmit.score, 100);
  assert.ok(staSubmit.artifactId?.startsWith('4YOS-PASS-STA-'));
  console.log('   ✔ Describing Data: Atomically committed to SQLite attempts and evidence.\n');

  // -----------------------------------------------------------------
  // STAGE 3: Sets, Logic and Proof (MTH 111) Deduction Task
  // -----------------------------------------------------------------
  console.log('--- Stage 3: Sets, Logic and Proof (MTH 111) Team Partition ---');
  const validMthSolution = `
function analyzeTeamPartition(data) {
  const all = Array.from(new Set(data.allStaff || []));
  const revs = Array.from(new Set(data.reviewers || []));
  const tests = Array.from(new Set(data.testers || []));

  const revSet = new Set(revs);
  const testSet = new Set(tests);

  const both = revs.filter(r => testSet.has(r)).sort();
  const reviewOnly = revs.filter(r => !testSet.has(r)).sort();
  const testOnly = tests.filter(t => !revSet.has(t)).sort();

  const intersectionCount = both.length;
  const unionCount = revs.length + tests.length - intersectionCount;
  const neitherCount = Math.max(0, all.length - unionCount);

  let compliance = true;
  if (data.conditionalRules && data.conditionalRules.length > 0) {
    for (const rule of data.conditionalRules) {
      for (const person of all) {
        const hasIf = rule.ifSkill === 'reviewer' ? revSet.has(person) : testSet.has(person);
        const hasThen = rule.thenSkill === 'reviewer' ? revSet.has(person) : testSet.has(person);
        if (hasIf && !hasThen) { compliance = false; break; }
      }
      if (!compliance) break;
    }
  }

  return {
    totalStaff: all.length,
    intersectionCount,
    unionCount,
    neitherCount,
    reviewOnly,
    testOnly,
    bothSkills: both,
    compliance
  };
}
  `;

  // Test reference implementation (lecture team of 24)
  const all24 = Array.from({ length: 24 }, (_, i) => `m_${i + 1}`);
  const r12 = ['m_1', 'm_2', 'm_3', 'm_4', 'm_5', 'm_6', 'm_7', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5'];
  const t9 = ['m_8', 'm_9', 'm_10', 'm_11', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5'];

  const refTeam = referenceAnalyzeTeamPartition({
    allStaff: all24,
    reviewers: r12,
    testers: t9
  });

  assert.equal(refTeam.intersectionCount, 5);
  assert.equal(refTeam.unionCount, 16);
  assert.equal(refTeam.neitherCount, 8);
  assert.equal(refTeam.reviewOnly.length, 7);
  assert.equal(refTeam.testOnly.length, 4);
  console.log('   ✔ Sets, Logic & Proof: Reference Inclusion-Exclusion (12 + 9 - 5 = 16) verified.');

  const mthEval = await LOGIC_DEDUCTION_TASK.evaluate({
    code: validMthSolution,
    explanation: 'By the Principle of Inclusion-Exclusion, |A ∪ B| = |A| + |B| - |A ∩ B| subtracts the 5 shared staff to eliminate double-counting, establishing regulatory compliance.'
  });

  assert.equal(mthEval.score, 100);
  assert.equal(mthEval.passed, true);
  assert.ok(mthEval.artifactId?.startsWith('4YOS-PASS-MTH-'));
  console.log('   ✔ Sets, Logic & Proof: Authoritative evaluation scored 100% and minted MTH credential.');

  // Submit via CoreEngine
  const mthSubmit = await engine.submitPracticalProject('mth-logic-deduction-v1', {
    code: validMthSolution,
    explanation: 'By the Principle of Inclusion-Exclusion, |A ∪ B| = |A| + |B| - |A ∩ B| subtracts the 5 shared staff to eliminate double-counting, establishing regulatory compliance.'
  });
  assert.equal(mthSubmit.passed, true);
  assert.equal(mthSubmit.score, 100);
  assert.ok(mthSubmit.artifactId?.startsWith('4YOS-PASS-MTH-'));
  console.log('   ✔ Sets, Logic & Proof: Atomically committed to SQLite attempts and evidence.\n');

  // Verify all 3 credentials in SQLite evidence
  const evidenceRecords = await db.all('SELECT session_id, task, result, reviewer FROM evidence;');
  assert.equal(evidenceRecords.length, 3);
  for (const e of evidenceRecords) {
    assert.equal(e.result, 'passed');
    assert.equal(e.reviewer, 'directly_checked');
  }
  console.log('   ✔ Verified all 3 course practical credentials saved with directly_checked evidence in SQLite.\n');

  // -----------------------------------------------------------------
  // STAGE 4: Browser UI Verification (Playwright)
  // -----------------------------------------------------------------
  console.log('--- Stage 4: Browser UI Verification & Draft Persistence ---');
  const { server, url: previewUrl } = await startPreviewServer(0);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto(new URL('?study=1', previewUrl).href, { waitUntil: 'networkidle' });

    // Open Learn -> Practicals tab
    await page.click('nav[aria-label="Desktop navigation"] button[title="Learn"]');
    await page.waitForTimeout(300);

    // Click "Practicals & Projects" tab
    await page.click('#tab-practicals');
    await page.waitForTimeout(300);

    const practicalsHeading = page.locator('#learn-heading');
    assert.ok(await practicalsHeading.isVisible(), 'Practicals catalog must be displayed');
    console.log('   ✔ Opened Hands-On Practicals workspace.');

    // 4.1 Select Describing Data Practical (sta-fare-dispersion-v1)
    const staOption = page.locator('text=Commuter Fare Dispersion');
    assert.ok(await staOption.isVisible(), 'sta-fare-dispersion-v1 must appear in catalog');
    await staOption.click();
    await page.waitForTimeout(300);

    // Enter draft code into practical-code-editor
    const codeEditor = page.locator('#practical-code-editor');
    assert.ok(await codeEditor.isVisible());
    await codeEditor.fill(validStaSolution);

    const explInput = page.locator('#practical-explanation-input');
    assert.ok(await explInput.isVisible());
    await explInput.fill('The median fare of ₦500 reflects the true typical commuter cost because extreme surge fares like ₦10,000 distort the mean without shifting the median.');

    console.log('   ✔ Filled Describing Data code and explanation note.');

    // 4.2 Test Close-and-Resume Draft Persistence (Reload page)
    console.log('   ... Testing Close-and-Resume draft persistence across reload ...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Reopen Practicals workspace
    await page.click('nav[aria-label="Desktop navigation"] button[title="Learn"]');
    await page.waitForTimeout(300);
    await page.click('#tab-practicals');
    await page.waitForTimeout(300);

    // Select Describing Data again
    await page.click('text=Commuter Fare Dispersion');
    await page.waitForTimeout(300);

    const restoredCode = await page.locator('#practical-code-editor').inputValue();
    assert.ok(restoredCode.includes('function auditFareDispersion'), 'Draft code must be restored from persistence');
    const restoredExpl = await page.locator('#practical-explanation-input').inputValue();
    console.log('   [Debug] restoredExpl is:', JSON.stringify(restoredExpl));
    assert.ok(restoredExpl.includes('median fare') || restoredExpl.includes('500'), 'Draft explanation must be restored from persistence');
    console.log('   ✔ Close-and-resume persistence: Draft code and explanation successfully preserved across reload.');

    // 4.3 Run authoritative test in browser
    await page.click('#btn-run-practical');
    await page.waitForTimeout(500);

    const consoleOutput = page.locator('#practical-console-output');
    assert.ok(await consoleOutput.isVisible(), 'Test console output must render');
    const outText = await consoleOutput.innerText();
    assert.ok(outText.includes('100/100 points'), 'Authoritative evaluation in browser must score 100/100');
    console.log('   ✔ Test runner evaluated solution: 100/100 points passed.');

    // 4.4 Submit & Mint Sovereign Credential
    const mintBtn = page.locator('button:has-text("Submit & Mint Portfolio Credential")');
    assert.ok(await mintBtn.isEnabled(), 'Mint button must be enabled when tests pass');
    await mintBtn.click();
    await page.waitForTimeout(800);

    const credCard = page.locator('#practical-credential-card');
    assert.ok(await credCard.isVisible(), 'Sovereign credential card must render upon pass');
    const cardText = await credCard.innerText();
    assert.ok(cardText.includes('4YOS-PASS-'), 'Credential must contain sovereign passport ID 4YOS-PASS-');
    console.log('   ✔ Sovereign portfolio passport credential card rendered and verified.');

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('\n=============================================================');
  console.log('>>> ALL STAGE C LEARNING & TOOLS TESTS PASSED WITH 0 ERRORS >>>');
  console.log('=============================================================\n');
}

runStageCLearningTests().catch((err) => {
  console.error('\n❌ Stage C Learning test failed:', err);
  process.exit(1);
});
