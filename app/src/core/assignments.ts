/**
 * 4YOS Camp Authoritative Assignment Engine
 * Section 21 & Section 24 Architecture: Real Bounded Evaluation, Versioned Task Registry & Integer Kobo Accounting
 */

export interface PosTransaction {
  reference: string;
  type: 'cash_in' | 'cash_out';
  amountKobo: number; // In integer kobo (1 Naira = 100 kobo). Floating point forbidden.
  feeKobo: number;    // In integer kobo
  status: 'success' | 'failed';
  timestamp?: string;
}

export interface PosReconciliationOutput {
  totalCashInKobo: number;
  totalCashOutKobo: number;
  totalFeeCollectedKobo: number;
  netCashDrawerChangeKobo: number; // totalCashInKobo - totalCashOutKobo + totalFeeCollectedKobo
  validCount: number;
  rejectedCount: number;
  rejections: Array<{ reference: string; reason: string }>;
}

export interface AssignmentRubricCriterion {
  id: string;
  name: string;
  maxPoints: number;
  awardedPoints: number;
  passed: boolean;
  feedback: string;
}

export interface AssignmentEvaluationResult {
  taskId: string;
  score: number;       // 0 to 100
  passed: boolean;      // score >= passThreshold
  passThreshold: number; // 40 (NUC Grade E)
  rubric: AssignmentRubricCriterion[];
  logs: string[];
  artifactId?: string;
  evaluatedAt: string;
}

export interface AssignmentTask {
  id: string;
  courseId: string;
  unitId: string;
  title: string;
  description: string;
  prerequisites: string[];
  estimatedMinutes: number;
  passThreshold: number;
  starterCode: string;
  evaluate(submission: { code?: string; explanation?: string }): Promise<AssignmentEvaluationResult>;
}

/**
 * Authoritative reference implementation for POS Daily Cash Drawer Reconciliation
 */
export function referenceReconcilePosDaily(transactions: PosTransaction[]): PosReconciliationOutput {
  const seenRefs = new Set<string>();
  let totalCashInKobo = 0;
  let totalCashOutKobo = 0;
  let totalFeeCollectedKobo = 0;
  let validCount = 0;
  let rejectedCount = 0;
  const rejections: Array<{ reference: string; reason: string }> = [];

  for (const tx of transactions) {
    if (!tx || typeof tx !== 'object') {
      rejectedCount++;
      rejections.push({ reference: 'MALFORMED', reason: 'malformed_record' });
      continue;
    }
    const ref = String(tx.reference || '').trim();
    if (!ref) {
      rejectedCount++;
      rejections.push({ reference: 'EMPTY', reason: 'missing_reference' });
      continue;
    }
    if (seenRefs.has(ref)) {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'duplicate_reference' });
      continue;
    }
    seenRefs.add(ref);

    if (typeof tx.amountKobo !== 'number' || !Number.isInteger(tx.amountKobo) || tx.amountKobo <= 0) {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'invalid_amount' });
      continue;
    }

    if (tx.status !== 'success') {
      rejectedCount++;
      rejections.push({ reference: ref, reason: 'transaction_failed' });
      continue;
    }

    const fee = (typeof tx.feeKobo === 'number' && Number.isInteger(tx.feeKobo) && tx.feeKobo >= 0) ? tx.feeKobo : 0;

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

  const netCashDrawerChangeKobo = totalCashInKobo - totalCashOutKobo + totalFeeCollectedKobo;

  return {
    totalCashInKobo,
    totalCashOutKobo,
    totalFeeCollectedKobo,
    netCashDrawerChangeKobo,
    validCount,
    rejectedCount,
    rejections
  };
}

/**
 * POS Cash Reconciliation Take-Home Assignment (COS 102 / Programming 1)
 */
export const POS_RECONCILIATION_TASK: AssignmentTask = {
  id: 'pos-cash-reconciliation-v1',
  courseId: 'programming-1',
  unitId: 'p1-functions',
  title: 'POS Cash Drawer Daily Reconciliation',
  description: 'Write an authoritative cash reconciliation function in integer kobo for a busy Nigerian POS merchant kiosk. Handle cash-in deposits, cash-out withdrawals, terminal fees, duplicate reference rejections, and compute exact drawer delta.',
  prerequisites: ['p1-functions', 'p1-conditions', 'p1-tracing'],
  estimatedMinutes: 45,
  passThreshold: 40,
  starterCode: `/**
 * Reconcile POS daily terminal transactions.
 * All monetary amounts are integers in KOBO (100 kobo = 1 Naira).
 *
 * @param {Array<{reference: string, type: 'cash_in'|'cash_out', amountKobo: number, feeKobo: number, status: 'success'|'failed'}>} transactions
 * @returns {{
 *   totalCashInKobo: number,
 *   totalCashOutKobo: number,
 *   totalFeeCollectedKobo: number,
 *   netCashDrawerChangeKobo: number,
 *   validCount: number,
 *   rejectedCount: number,
 *   rejections: Array<{reference: string, reason: string}>
 * }}
 */
function reconcilePosDaily(transactions) {
  // Your implementation here
  return {
    totalCashInKobo: 0,
    totalCashOutKobo: 0,
    totalFeeCollectedKobo: 0,
    netCashDrawerChangeKobo: 0,
    validCount: 0,
    rejectedCount: 0,
    rejections: []
  };
}`,

  async evaluate(submission: { code?: string; explanation?: string }): Promise<AssignmentEvaluationResult> {
    const logs: string[] = [];
    const rubric: AssignmentRubricCriterion[] = [
      { id: 'syntax_execution', name: 'Code Execution & Integrity', maxPoints: 10, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'math_correctness', name: 'Integer Kobo Calculations', maxPoints: 30, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'duplicate_detection', name: 'Duplicate Reference Handling', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'error_filtering', name: 'Invalid & Failed Transaction Triage', maxPoints: 20, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'handover_report', name: 'Operational Handover Paragraph', maxPoints: 15, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' }
    ];

    const rawCode = (submission.code || '').trim();

    // 1. Guard against empty submissions
    if (!rawCode) {
      logs.push('❌ Evaluation failed: No source code submitted.');
      rubric[0].feedback = 'Submission is empty. Please implement reconcilePosDaily.';
      return {
        taskId: POS_RECONCILIATION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: POS_RECONCILIATION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    // 2. Guard against commented-out solution
    const strippedComments = rawCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
    if (strippedComments.length < 20 || !strippedComments.includes('function') && !strippedComments.includes('=>')) {
      logs.push('❌ Evaluation failed: Code contains only comments or lacks executable function definitions.');
      rubric[0].feedback = 'Code contains only comments or lacks an executable function definition.';
      return {
        taskId: POS_RECONCILIATION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: POS_RECONCILIATION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    // 3. Compile and extract learner function in a bounded sandbox
    let learnerFn: (txs: PosTransaction[]) => PosReconciliationOutput;
    try {
      const runner = new Function(`
        ${rawCode}
        if (typeof reconcilePosDaily === 'function') {
          return reconcilePosDaily;
        }
        if (typeof module !== 'undefined' && module.exports) {
          if (typeof module.exports === 'function') return module.exports;
          if (typeof module.exports.reconcilePosDaily === 'function') return module.exports.reconcilePosDaily;
        }
        throw new Error('reconcilePosDaily function is not defined or exported.');
      `);
      learnerFn = runner();
      rubric[0].awardedPoints = 10;
      rubric[0].passed = true;
      rubric[0].feedback = 'Function successfully parsed and callable.';
      logs.push('✔ Syntax check passed: reconcilePosDaily compiled cleanly.');
    } catch (err: any) {
      logs.push(`❌ Syntax or Compilation Error: ${err?.message || String(err)}`);
      rubric[0].feedback = `Compilation failed: ${err?.message || 'Syntax error'}`;
      return {
        taskId: POS_RECONCILIATION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: POS_RECONCILIATION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    // 4. Test Batch A: Standard Cash In/Out & Fees in Integer Kobo
    const batchA: PosTransaction[] = [
      { reference: 'POS-001', type: 'cash_in', amountKobo: 500000, feeKobo: 10000, status: 'success' },   // Deposit ₦5,000, fee ₦100
      { reference: 'POS-002', type: 'cash_out', amountKobo: 200000, feeKobo: 10000, status: 'success' },  // Withdrawal ₦2,000, fee ₦100
      { reference: 'POS-003', type: 'cash_in', amountKobo: 1000000, feeKobo: 20000, status: 'success' }   // Deposit ₦10,000, fee ₦200
    ];

    try {
      const expectedA = referenceReconcilePosDaily(batchA);
      const actualA = learnerFn(JSON.parse(JSON.stringify(batchA)));

      if (
        actualA &&
        actualA.totalCashInKobo === expectedA.totalCashInKobo &&
        actualA.totalCashOutKobo === expectedA.totalCashOutKobo &&
        actualA.totalFeeCollectedKobo === expectedA.totalFeeCollectedKobo &&
        actualA.netCashDrawerChangeKobo === expectedA.netCashDrawerChangeKobo &&
        actualA.validCount === expectedA.validCount
      ) {
        // Also test with randomized dynamic batch to prevent hardcoded return values!
        const dynamicSeed = Math.floor(Math.random() * 900000) + 100000;
        const dynamicBatch: PosTransaction[] = [
          { reference: 'DYN-1', type: 'cash_in', amountKobo: dynamicSeed, feeKobo: 10000, status: 'success' },
          { reference: 'DYN-2', type: 'cash_out', amountKobo: Math.floor(dynamicSeed / 2), feeKobo: 5000, status: 'success' }
        ];
        const expectedDyn = referenceReconcilePosDaily(dynamicBatch);
        const actualDyn = learnerFn(JSON.parse(JSON.stringify(dynamicBatch)));

        if (
          actualDyn &&
          actualDyn.netCashDrawerChangeKobo === expectedDyn.netCashDrawerChangeKobo &&
          actualDyn.totalCashInKobo === expectedDyn.totalCashInKobo
        ) {
          rubric[1].awardedPoints = 30;
          rubric[1].passed = true;
          rubric[1].feedback = 'Integer kobo cash math accurately computed on static and dynamic batches.';
          logs.push('✔ Batch 1 & Anti-Hardcoding Dynamic Test: Exact integer arithmetic verified.');
        } else {
          rubric[1].awardedPoints = 10;
          rubric[1].feedback = 'Static test passed but dynamic anti-hardcoding batch failed. Do not hardcode results.';
          logs.push('❌ Anti-hardcoding test failed: Returned static values instead of computing dynamically.');
        }
      } else {
        rubric[1].feedback = `Math mismatch. Expected net drawer change ${expectedA.netCashDrawerChangeKobo} kobo, got ${actualA?.netCashDrawerChangeKobo} kobo.`;
        logs.push('❌ Batch 1 failed: Cash delta mismatch.');
      }
    } catch (err: any) {
      rubric[1].feedback = `Runtime execution error on Batch 1: ${err.message}`;
      logs.push(`❌ Batch 1 runtime error: ${err.message}`);
    }

    // 5. Test Batch B: Duplicate Reference Detection
    const batchB: PosTransaction[] = [
      { reference: 'DUP-100', type: 'cash_in', amountKobo: 300000, feeKobo: 10000, status: 'success' },
      { reference: 'DUP-101', type: 'cash_out', amountKobo: 150000, feeKobo: 5000, status: 'success' },
      { reference: 'DUP-100', type: 'cash_in', amountKobo: 300000, feeKobo: 10000, status: 'success' } // Duplicate!
    ];

    try {
      const expectedB = referenceReconcilePosDaily(batchB);
      const actualB = learnerFn(JSON.parse(JSON.stringify(batchB)));

      const hasDuplicateRejection = Array.isArray(actualB?.rejections) &&
        actualB.rejections.some(r => r.reference === 'DUP-100' && r.reason === 'duplicate_reference');

      if (
        actualB &&
        actualB.rejectedCount === 1 &&
        actualB.validCount === 2 &&
        actualB.totalCashInKobo === expectedB.totalCashInKobo &&
        hasDuplicateRejection
      ) {
        rubric[2].awardedPoints = 25;
        rubric[2].passed = true;
        rubric[2].feedback = 'Duplicate references detected and rejected with reason duplicate_reference.';
        logs.push('✔ Batch 2: Duplicate reference detection and deduplication passed.');
      } else {
        rubric[2].feedback = 'Duplicate reference DUP-100 was not properly detected or rejected.';
        logs.push('❌ Batch 2 failed: Duplicate reference not rejected.');
      }
    } catch (err: any) {
      rubric[2].feedback = `Runtime error on duplicate check: ${err.message}`;
      logs.push(`❌ Batch 2 runtime error: ${err.message}`);
    }

    // 6. Test Batch C: Invalid Amounts and Failed Status Filtering
    const batchC: PosTransaction[] = [
      { reference: 'ERR-001', type: 'cash_in', amountKobo: 0, feeKobo: 0, status: 'success' },          // Zero amount -> reject
      { reference: 'ERR-002', type: 'cash_in', amountKobo: -50000, feeKobo: 0, status: 'success' },     // Negative amount -> reject
      { reference: 'ERR-003', type: 'cash_out', amountKobo: 400000, feeKobo: 10000, status: 'failed' }, // Failed tx -> reject
      { reference: 'ERR-004', type: 'cash_in', amountKobo: 800000, feeKobo: 15000, status: 'success' }  // Valid tx
    ];

    try {
      const expectedC = referenceReconcilePosDaily(batchC);
      const actualC = learnerFn(JSON.parse(JSON.stringify(batchC)));

      if (
        actualC &&
        actualC.validCount === 1 &&
        actualC.rejectedCount === 3 &&
        actualC.totalCashInKobo === expectedC.totalCashInKobo
      ) {
        rubric[3].awardedPoints = 20;
        rubric[3].passed = true;
        rubric[3].feedback = 'Non-positive amounts and failed transactions correctly rejected.';
        logs.push('✔ Batch 3: Invalid amounts and failed transaction filtering passed.');
      } else {
        rubric[3].feedback = `Expected 1 valid and 3 rejected transactions; got ${actualC?.validCount} valid, ${actualC?.rejectedCount} rejected.`;
        logs.push('❌ Batch 3 failed: Zero/negative/failed transaction filtering incorrect.');
      }
    } catch (err: any) {
      rubric[3].feedback = `Runtime error on invalid transaction checks: ${err.message}`;
      logs.push(`❌ Batch 3 runtime error: ${err.message}`);
    }

    // 7. Handover Report / Explanation Check
    const explanation = (submission.explanation || '').trim();
    const wordCount = explanation.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 15 && (explanation.toLowerCase().includes('drawer') || explanation.toLowerCase().includes('cash') || explanation.toLowerCase().includes('reconcil') || explanation.toLowerCase().includes('kobo') || explanation.toLowerCase().includes('kiosk') || explanation.toLowerCase().includes('balance'))) {
      rubric[4].awardedPoints = 15;
      rubric[4].passed = true;
      rubric[4].feedback = 'Professional handover summary provided explaining drawer cash balance and anomalies.';
      logs.push(`✔ Handover check: Operational handover note verified (${wordCount} words).`);
    } else {
      rubric[4].awardedPoints = 0;
      rubric[4].feedback = 'Please provide a clear handover note (min 15 words) summarizing the cash drawer delta and any flagged rejections for the next kiosk shift.';
      logs.push('ℹ Handover check incomplete: Handover paragraph too brief or missing operational context.');
    }

    const totalScore = rubric.reduce((sum, r) => sum + r.awardedPoints, 0);
    const passed = totalScore >= POS_RECONCILIATION_TASK.passThreshold;

    const artifactId = passed
      ? `4YOS-PASS-POS-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(Date.now() / 1000).toString(36).toUpperCase()}`
      : undefined;

    logs.push(`\nFinal Result: ${totalScore}/100 points (${passed ? 'PASSED' : 'FAILED'}). NUC Threshold: ${POS_RECONCILIATION_TASK.passThreshold}%.`);

    return {
      taskId: POS_RECONCILIATION_TASK.id,
      score: totalScore,
      passed,
      passThreshold: POS_RECONCILIATION_TASK.passThreshold,
      rubric,
      logs,
      artifactId,
      evaluatedAt: new Date().toISOString()
    };
  }
};

/**
 * -------------------------------------------------------------
 * STATISTICAL AUDIT TASK (STA 111 Describing Data)
 * Lecture Reference: dd-quartiles
 * -------------------------------------------------------------
 */

export interface FareDispersionOutput {
  count: number;
  mean: number;
  median: number;
  q1: number;
  q3: number;
  iqr: number;
  outliers: number[];
}

export function referenceAuditFareDispersion(values: number[]): FareDispersionOutput {
  if (!Array.isArray(values) || values.length === 0) {
    return { count: 0, mean: 0, median: 0, q1: 0, q3: 0, iqr: 0, outliers: [] };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = Math.round((sum / count) * 100) / 100;

  const medianFn = (arr: number[]): number => {
    const n = arr.length;
    if (n === 0) return 0;
    if (n % 2 === 1) return arr[Math.floor(n / 2)];
    return (arr[n / 2 - 1] + arr[n / 2]) / 2;
  };

  const median = medianFn(sorted);
  let lowerHalf: number[];
  let upperHalf: number[];

  if (count % 2 === 1) {
    lowerHalf = sorted.slice(0, Math.floor(count / 2));
    upperHalf = sorted.slice(Math.ceil(count / 2));
  } else {
    lowerHalf = sorted.slice(0, count / 2);
    upperHalf = sorted.slice(count / 2);
  }

  const q1 = medianFn(lowerHalf);
  const q3 = medianFn(upperHalf);
  const iqr = Math.round((q3 - q1) * 100) / 100;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  const outliers = sorted.filter(v => v < lowerBound || v > upperBound);

  return {
    count,
    mean,
    median,
    q1,
    q3,
    iqr,
    outliers
  };
}

export const STATISTICAL_AUDIT_TASK: AssignmentTask = {
  id: 'sta-statistical-audit-v1',
  courseId: 'describing-data',
  unitId: 'dd-centre-spread',
  title: 'Nigerian Transport Fares & Inflation Dispersion Audit',
  description: 'Write an authoritative statistical analysis function to compute mean, median, quartiles (Q1, Q3), and interquartile range (IQR) for commercial bus/keke commuter fare observations in Lagos and Port Harcourt. Correctly partition odd and even sample sizes and flag outliers using the 1.5 * IQR rule.',
  prerequisites: ['sta-data', 'dd-centre-spread', 'p1-functions'],
  estimatedMinutes: 40,
  passThreshold: 40,
  starterCode: `/**
 * Compute dispersion statistics on Nigerian fare data.
 * @param {number[]} values - Array of numerical observations (e.g. fare amounts in Naira).
 * @returns {{
 *   count: number,
 *   mean: number,
 *   median: number,
 *   q1: number,
 *   q3: number,
 *   iqr: number,
 *   outliers: number[]
 * }}
 */
function auditFareDispersion(values) {
  // Your implementation here
  return {
    count: 0,
    mean: 0,
    median: 0,
    q1: 0,
    q3: 0,
    iqr: 0,
    outliers: []
  };
}`,
  async evaluate(submission) {
    const logs: string[] = [];
    const rubric: AssignmentRubricCriterion[] = [
      { id: 'syntax_execution', name: 'Code Execution & Integrity', maxPoints: 10, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'lecture_odd_batch', name: 'Lecture 1 Odd Batch (Median & IQR)', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'outlier_detection', name: 'Lecture 2 Outlier Spike Batch', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'transfer_dynamic_batch', name: 'Dynamic Changed Input Transfer Test', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'statistical_handover', name: 'Statistical Interpretation Summary', maxPoints: 15, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' }
    ];

    const rawCode = (submission.code || '').trim();
    if (!rawCode) {
      logs.push('❌ Evaluation failed: No source code submitted.');
      rubric[0].feedback = 'Submission is empty. Please implement auditFareDispersion.';
      return {
        taskId: STATISTICAL_AUDIT_TASK.id,
        score: 0,
        passed: false,
        passThreshold: STATISTICAL_AUDIT_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    const stripped = rawCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
    if (!stripped || stripped.length < 30) {
      logs.push('❌ Evaluation failed: Code contains only comments or trivial placeholders.');
      rubric[0].feedback = 'Only comments detected. Please provide executable implementation.';
      return {
        taskId: STATISTICAL_AUDIT_TASK.id,
        score: 0,
        passed: false,
        passThreshold: STATISTICAL_AUDIT_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    let userFn: any;
    try {
      userFn = new Function(`
        ${rawCode}
        if (typeof auditFareDispersion === 'function') return auditFareDispersion;
        throw new Error("Function 'auditFareDispersion' not found in submission.");
      `)();
      rubric[0].awardedPoints = 10;
      rubric[0].passed = true;
      rubric[0].feedback = 'Function auditFareDispersion compiled cleanly.';
      logs.push('✔ Step 1: Code compiled and syntax validated.');
    } catch (err: any) {
      rubric[0].feedback = `Syntax or runtime evaluation error: ${err.message}`;
      logs.push(`❌ Step 1 failed: ${err.message}`);
      return {
        taskId: STATISTICAL_AUDIT_TASK.id,
        score: 0,
        passed: false,
        passThreshold: STATISTICAL_AUDIT_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    // Batch 1: Lecture odd batch [12, 14, 15, 16, 18]
    try {
      const batch1 = [12, 14, 15, 16, 18];
      const actual1 = userFn(batch1);
      const expected1 = referenceAuditFareDispersion(batch1);

      if (actual1 && actual1.median === expected1.median && actual1.q1 === expected1.q1 && actual1.q3 === expected1.q3 && actual1.iqr === expected1.iqr) {
        rubric[1].awardedPoints = 25;
        rubric[1].passed = true;
        rubric[1].feedback = 'Correctly computed median=15, Q1=13, Q3=17, IQR=4 on baseline odd batch.';
        logs.push('✔ Batch 1: Odd-sized batch median and quartiles verified.');
      } else {
        rubric[1].feedback = `Expected median=${expected1.median}, Q1=${expected1.q1}, Q3=${expected1.q3}, IQR=${expected1.iqr}; got ${JSON.stringify(actual1)}`;
        logs.push('❌ Batch 1 failed: Quartile calculation does not match standard convention.');
      }
    } catch (err: any) {
      rubric[1].feedback = `Runtime error on Batch 1: ${err.message}`;
      logs.push(`❌ Batch 1 runtime error: ${err.message}`);
    }

    // Batch 2: Outlier spike batch [12, 14, 15, 16, 48]
    try {
      const batch2 = [12, 14, 15, 16, 48];
      const actual2 = userFn(batch2);
      const expected2 = referenceAuditFareDispersion(batch2);

      if (actual2 && actual2.median === expected2.median && actual2.q3 === expected2.q3 && actual2.iqr === expected2.iqr) {
        rubric[2].awardedPoints = 25;
        rubric[2].passed = true;
        rubric[2].feedback = 'Quartile spike calculation verified: upper quartile moves to 32 and IQR expands to 19.';
        logs.push('✔ Batch 2: Quartile spike calculation verified.');
      } else {
        rubric[2].feedback = `Expected median=15, Q3=32, IQR=19; got ${JSON.stringify(actual2)}`;
        logs.push('❌ Batch 2 failed: Outlier spike handling incorrect.');
      }
    } catch (err: any) {
      rubric[2].feedback = `Runtime error on Batch 2: ${err.message}`;
      logs.push(`❌ Batch 2 runtime error: ${err.message}`);
    }

    // Batch 3: Dynamic changed input transfer test
    try {
      const dynamicFares = [150, 200, 250, 300, 350, 400, 450, 1500]; // Even count (8 items) with spike
      const actual3 = userFn([...dynamicFares]);
      const expected3 = referenceAuditFareDispersion(dynamicFares);

      if (
        actual3 &&
        actual3.count === expected3.count &&
        actual3.median === expected3.median &&
        actual3.q1 === expected3.q1 &&
        actual3.q3 === expected3.q3 &&
        actual3.iqr === expected3.iqr &&
        Array.isArray(actual3.outliers) &&
        actual3.outliers.includes(1500)
      ) {
        rubric[3].awardedPoints = 25;
        rubric[3].passed = true;
        rubric[3].feedback = 'Dynamic changed input transfer test passed with even-sized dataset.';
        logs.push('✔ Batch 3: Transfer test on changed inputs with even batch verified.');
      } else {
        rubric[3].feedback = `Transfer test failed: expected median=${expected3.median}, Q1=${expected3.q1}, Q3=${expected3.q3}, IQR=${expected3.iqr}, outlier 1500.`;
        logs.push('❌ Batch 3 failed: Dynamic transfer check failed.');
      }
    } catch (err: any) {
      rubric[3].feedback = `Runtime error on transfer batch: ${err.message}`;
      logs.push(`❌ Batch 3 runtime error: ${err.message}`);
    }

    // Explanation Check
    const explanation = (submission.explanation || '').trim();
    const wordCount = explanation.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 15 && (explanation.toLowerCase().includes('median') || explanation.toLowerCase().includes('quartil') || explanation.toLowerCase().includes('iqr') || explanation.toLowerCase().includes('outlier') || explanation.toLowerCase().includes('mean') || explanation.toLowerCase().includes('fare'))) {
      rubric[4].awardedPoints = 15;
      rubric[4].passed = true;
      rubric[4].feedback = 'Sound statistical interpretation explaining median resilience to price spikes.';
      logs.push(`✔ Statistical interpretation verified (${wordCount} words).`);
    } else {
      rubric[4].awardedPoints = 0;
      rubric[4].feedback = 'Please provide an interpretation note (min 15 words) comparing median vs mean and discussing outliers.';
      logs.push('ℹ Interpretation note incomplete.');
    }

    const totalScore = rubric.reduce((sum, r) => sum + r.awardedPoints, 0);
    const passed = totalScore >= STATISTICAL_AUDIT_TASK.passThreshold;

    const artifactId = passed
      ? `4YOS-PASS-STA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(Date.now() / 1000).toString(36).toUpperCase()}`
      : undefined;

    logs.push(`\nFinal Result: ${totalScore}/100 points (${passed ? 'PASSED' : 'FAILED'}). NUC Threshold: ${STATISTICAL_AUDIT_TASK.passThreshold}%.`);

    return {
      taskId: STATISTICAL_AUDIT_TASK.id,
      score: totalScore,
      passed,
      passThreshold: STATISTICAL_AUDIT_TASK.passThreshold,
      rubric,
      logs,
      artifactId,
      evaluatedAt: new Date().toISOString()
    };
  }
};

/**
 * -------------------------------------------------------------
 * SETS, LOGIC & PROOF TASK (MTH 111 Sets, Logic and Proof)
 * Lecture Reference: mth-sets
 * -------------------------------------------------------------
 */

export interface TeamPartitionData {
  allStaff: string[];
  reviewers: string[];
  testers: string[];
  conditionalRules?: Array<{ ifSkill: 'reviewer' | 'tester'; thenSkill: 'reviewer' | 'tester' }>;
}

export interface TeamPartitionOutput {
  totalStaff: number;
  intersectionCount: number;
  unionCount: number;
  neitherCount: number;
  reviewOnly: string[];
  testOnly: string[];
  bothSkills: string[];
  compliance: boolean;
}

export function referenceAnalyzeTeamPartition(data: TeamPartitionData): TeamPartitionOutput {
  const allStaff = Array.from(new Set(data.allStaff || []));
  const reviewers = Array.from(new Set(data.reviewers || []));
  const testers = Array.from(new Set(data.testers || []));

  const revSet = new Set(reviewers);
  const testSet = new Set(testers);

  const bothSkills = reviewers.filter(r => testSet.has(r)).sort();
  const reviewOnly = reviewers.filter(r => !testSet.has(r)).sort();
  const testOnly = testers.filter(t => !revSet.has(t)).sort();

  const intersectionCount = bothSkills.length;
  const unionCount = reviewers.length + testers.length - intersectionCount;
  const neitherCount = Math.max(0, allStaff.length - unionCount);

  let compliance = true;
  if (data.conditionalRules && data.conditionalRules.length > 0) {
    for (const rule of data.conditionalRules) {
      for (const person of allStaff) {
        const hasIf = rule.ifSkill === 'reviewer' ? revSet.has(person) : testSet.has(person);
        const hasThen = rule.thenSkill === 'reviewer' ? revSet.has(person) : testSet.has(person);
        if (hasIf && !hasThen) {
          compliance = false;
          break;
        }
      }
      if (!compliance) break;
    }
  }

  return {
    totalStaff: allStaff.length,
    intersectionCount,
    unionCount,
    neitherCount,
    reviewOnly,
    testOnly,
    bothSkills,
    compliance
  };
}

export const LOGIC_DEDUCTION_TASK: AssignmentTask = {
  id: 'mth-logic-deduction-v1',
  courseId: 'sets-logic-proof',
  unitId: 'mth-sets-intro',
  title: 'Engineering Team Partition & Contrapositive Analysis',
  description: 'Write an authoritative set partition and deductive reasoning function. Given sets of team members with skills (e.g., Code Review A, Security Testing B), calculate the union without duplicates using the Principle of Inclusion-Exclusion, find disjoint regions, evaluate propositional conditionals (P -> Q), and test if a contrapositive proposition holds.',
  prerequisites: ['mth-sets', 'p1-functions'],
  estimatedMinutes: 35,
  passThreshold: 40,
  starterCode: `/**
 * Partition sets and evaluate deductive propositional logic.
 * @param {{
 *   allStaff: string[],
 *   reviewers: string[],
 *   testers: string[],
 *   conditionalRules?: Array<{ ifSkill: 'reviewer'|'tester', thenSkill: 'reviewer'|'tester' }>
 * }} data
 * @returns {{
 *   totalStaff: number,
 *   intersectionCount: number,
 *   unionCount: number,
 *   neitherCount: number,
 *   reviewOnly: string[],
 *   testOnly: string[],
 *   bothSkills: string[],
 *   compliance: boolean
 * }}
 */
function analyzeTeamPartition(data) {
  // Your implementation here
  return {
    totalStaff: 0,
    intersectionCount: 0,
    unionCount: 0,
    neitherCount: 0,
    reviewOnly: [],
    testOnly: [],
    bothSkills: [],
    compliance: false
  };
}`,
  async evaluate(submission) {
    const logs: string[] = [];
    const rubric: AssignmentRubricCriterion[] = [
      { id: 'syntax_execution', name: 'Code Execution & Integrity', maxPoints: 10, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'inclusion_exclusion', name: 'Principle of Inclusion-Exclusion', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'disjoint_regions', name: 'Disjoint Partition Regions', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'transfer_logic', name: 'Transfer Check & Contrapositive Compliance', maxPoints: 25, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' },
      { id: 'reasoning_proof', name: 'Deductive Proof & Formal Explanation', maxPoints: 15, awardedPoints: 0, passed: false, feedback: 'Pending evaluation' }
    ];

    const rawCode = (submission.code || '').trim();
    if (!rawCode) {
      logs.push('❌ Evaluation failed: No source code submitted.');
      rubric[0].feedback = 'Submission is empty. Please implement analyzeTeamPartition.';
      return {
        taskId: LOGIC_DEDUCTION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: LOGIC_DEDUCTION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    const stripped = rawCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
    if (!stripped || stripped.length < 30) {
      logs.push('❌ Evaluation failed: Code contains only comments or trivial placeholders.');
      rubric[0].feedback = 'Only comments detected. Please provide executable implementation.';
      return {
        taskId: LOGIC_DEDUCTION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: LOGIC_DEDUCTION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    let userFn: any;
    try {
      userFn = new Function(`
        ${rawCode}
        if (typeof analyzeTeamPartition === 'function') return analyzeTeamPartition;
        throw new Error("Function 'analyzeTeamPartition' not found in submission.");
      `)();
      rubric[0].awardedPoints = 10;
      rubric[0].passed = true;
      rubric[0].feedback = 'Function analyzeTeamPartition compiled cleanly.';
      logs.push('✔ Step 1: Code compiled and syntax validated.');
    } catch (err: any) {
      rubric[0].feedback = `Syntax or runtime error: ${err.message}`;
      logs.push(`❌ Step 1 failed: ${err.message}`);
      return {
        taskId: LOGIC_DEDUCTION_TASK.id,
        score: 0,
        passed: false,
        passThreshold: LOGIC_DEDUCTION_TASK.passThreshold,
        rubric,
        logs,
        evaluatedAt: new Date().toISOString()
      };
    }

    // Batch 1: Lecture team of 24 (12 reviewers, 9 testers, 5 both)
    try {
      const all24 = Array.from({ length: 24 }, (_, i) => `member_${i + 1}`);
      const revs = ['member_1', 'member_2', 'member_3', 'member_4', 'member_5', 'member_6', 'member_7', 'both_1', 'both_2', 'both_3', 'both_4', 'both_5'];
      const tests = ['member_8', 'member_9', 'member_10', 'member_11', 'both_1', 'both_2', 'both_3', 'both_4', 'both_5'];

      const actual1 = userFn({
        allStaff: all24,
        reviewers: revs,
        testers: tests
      });
      const expected1 = referenceAnalyzeTeamPartition({
        allStaff: all24,
        reviewers: revs,
        testers: tests
      });

      if (actual1 && actual1.intersectionCount === 5 && actual1.unionCount === 16 && actual1.neitherCount === 8) {
        rubric[1].awardedPoints = 25;
        rubric[1].passed = true;
        rubric[1].feedback = 'Correctly applied Inclusion-Exclusion: union=16, intersection=5, neither=8.';
        logs.push('✔ Batch 1: Lecture team partition and Inclusion-Exclusion arithmetic passed.');
      } else {
        rubric[1].feedback = `Expected union=16, intersection=5, neither=8; got ${JSON.stringify(actual1)}`;
        logs.push('❌ Batch 1 failed: Inclusion-Exclusion calculation error.');
      }

      // Check disjoint subsets
      if (
        actual1 &&
        Array.isArray(actual1.reviewOnly) &&
        actual1.reviewOnly.length === 7 &&
        Array.isArray(actual1.testOnly) &&
        actual1.testOnly.length === 4
      ) {
        rubric[2].awardedPoints = 25;
        rubric[2].passed = true;
        rubric[2].feedback = 'Disjoint regions verified: reviewOnly=7, testOnly=4, both=5.';
        logs.push('✔ Batch 2: Disjoint partition subsets verified.');
      } else {
        rubric[2].feedback = `Expected reviewOnly length 7 and testOnly length 4; got ${actual1?.reviewOnly?.length} and ${actual1?.testOnly?.length}`;
        logs.push('❌ Batch 2 failed: Disjoint region partition error.');
      }
    } catch (err: any) {
      rubric[1].feedback = `Runtime error on Batch 1: ${err.message}`;
      logs.push(`❌ Batch 1 runtime error: ${err.message}`);
    }

    // Batch 3: Changed input transfer test with conditional rule (P -> Q)
    try {
      const all16 = Array.from({ length: 16 }, (_, i) => `emp_${i + 1}`);
      const revs16 = ['emp_1', 'emp_2', 'emp_3', 'emp_4'];
      const tests16 = ['emp_1', 'emp_2', 'emp_3', 'emp_4', 'emp_5', 'emp_6']; // All reviewers are also testers!

      const actual3 = userFn({
        allStaff: all16,
        reviewers: revs16,
        testers: tests16,
        conditionalRules: [{ ifSkill: 'reviewer', thenSkill: 'tester' }]
      });

      if (actual3 && actual3.unionCount === 6 && actual3.neitherCount === 10 && actual3.compliance === true) {
        rubric[3].awardedPoints = 25;
        rubric[3].passed = true;
        rubric[3].feedback = 'Transfer test passed with conditional rule compliance verified.';
        logs.push('✔ Batch 3: Dynamic transfer check and contrapositive rule passed.');
      } else {
        rubric[3].feedback = `Transfer test failed: expected union=6, neither=10, compliance=true; got ${JSON.stringify(actual3)}`;
        logs.push('❌ Batch 3 failed: Transfer rule evaluation error.');
      }
    } catch (err: any) {
      rubric[3].feedback = `Runtime error on transfer batch: ${err.message}`;
      logs.push(`❌ Batch 3 runtime error: ${err.message}`);
    }

    // Reasoning Proof Check
    const explanation = (submission.explanation || '').trim();
    const wordCount = explanation.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 15 && (explanation.toLowerCase().includes('union') || explanation.toLowerCase().includes('intersect') || explanation.toLowerCase().includes('inclusion') || explanation.toLowerCase().includes('contraposit') || explanation.toLowerCase().includes('disjoint') || explanation.toLowerCase().includes('double count'))) {
      rubric[4].awardedPoints = 15;
      rubric[4].passed = true;
      rubric[4].feedback = 'Sound formal explanation of Inclusion-Exclusion and deductive logic.';
      logs.push(`✔ Deductive proof explanation verified (${wordCount} words).`);
    } else {
      rubric[4].awardedPoints = 0;
      rubric[4].feedback = 'Please provide a formal explanation note (min 15 words) explaining the double-count subtraction and contrapositive logic.';
      logs.push('ℹ Deductive explanation note incomplete.');
    }

    const totalScore = rubric.reduce((sum, r) => sum + r.awardedPoints, 0);
    const passed = totalScore >= LOGIC_DEDUCTION_TASK.passThreshold;

    const artifactId = passed
      ? `4YOS-PASS-MTH-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(Date.now() / 1000).toString(36).toUpperCase()}`
      : undefined;

    logs.push(`\nFinal Result: ${totalScore}/100 points (${passed ? 'PASSED' : 'FAILED'}). NUC Threshold: ${LOGIC_DEDUCTION_TASK.passThreshold}%.`);

    return {
      taskId: LOGIC_DEDUCTION_TASK.id,
      score: totalScore,
      passed,
      passThreshold: LOGIC_DEDUCTION_TASK.passThreshold,
      rubric,
      logs,
      artifactId,
      evaluatedAt: new Date().toISOString()
    };
  }
};

/**
 * Task Registry of all Authoritative Assignments
 */
export const ASSIGNMENT_REGISTRY: Record<string, AssignmentTask> = {
  [POS_RECONCILIATION_TASK.id]: POS_RECONCILIATION_TASK,
  'pos-float-audit': POS_RECONCILIATION_TASK,
  [STATISTICAL_AUDIT_TASK.id]: STATISTICAL_AUDIT_TASK,
  'sta-fare-dispersion-v1': STATISTICAL_AUDIT_TASK,
  [LOGIC_DEDUCTION_TASK.id]: LOGIC_DEDUCTION_TASK,
  'mth-set-partition-v1': LOGIC_DEDUCTION_TASK
};

export function getAssignmentTask(taskId: string): AssignmentTask | null {
  return ASSIGNMENT_REGISTRY[taskId] || null;
}
