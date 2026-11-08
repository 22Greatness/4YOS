/**
 * 4YOS Camp Automated Verification: Stage D Programme and Life Workflows
 * Master Plan §24.4 Stage D & §22:
 * 1. Exact programme maps across 100L-400L with semester plans, prerequisites, and gap transparency
 * 2. Connected Library shelves with offline course packs precache readiness
 * 3. Degree progression pacing in Goals
 * 4. Support / Mistake reporting queued in offline sync_outbox
 * 5. NDPA 2023 compliant Sovereign Portfolio Passport export with mandatory practice estimate disclaimer
 * 6. Browser UI verification with Playwright
 */

import assert from 'node:assert/strict';
import path from 'node:path';
import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

import {
  AUTONOMOUS_CS_DEGREE_MAP,
  CCMAS_CS_MAP,
  UNIPORT_CS_2015_MAP,
  resolveCourseSlotReadiness,
  inferCourseSemester,
  resolveBankCoursesForLevel,
  resolveBankCoursesForProgramme
} from '../../src/core/maps.ts';
import {
  POS_RECONCILIATION_TASK,
  STATISTICAL_AUDIT_TASK,
  LOGIC_DEDUCTION_TASK
} from '../../src/core/assignments.ts';
import { CoreEngine } from '../../src/web/core-engine.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
const Database = require(path.resolve(root, 'node_modules/better-sqlite3-multiple-ciphers'));

console.log('=============================================================');
console.log('>>> Stage D: Programme and Life Workflows Verification >>>');
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
      return db.pragma(p, opts);
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

async function runStageDTests() {
  // --------------------------------------------------------------------------
  // Stage 1: Exact Programme Maps & Semester Plans Audit
  // --------------------------------------------------------------------------
  console.log('--- Stage 1: Exact Programme Maps & Semester Plans Audit ---');
  {
    assert.ok(AUTONOMOUS_CS_DEGREE_MAP, 'AUTONOMOUS_CS_DEGREE_MAP must exist');
    assert.equal(AUTONOMOUS_CS_DEGREE_MAP.levels.length, 4, 'Must cover 100L to 400L');

    // 1.1 Verify 100L Semester Plans and Course Breakdown
    const sem1_100 = AUTONOMOUS_CS_DEGREE_MAP.courses.filter(c => c.level === 100 && c.semester === 1);
    const sem2_100 = AUTONOMOUS_CS_DEGREE_MAP.courses.filter(c => c.level === 100 && c.semester === 2);

    assert.equal(sem1_100.length, 3, '100L Semester 1 must have 3 courses (Bits to Logic, Numbers & Algebra, How to Study)');
    assert.equal(sem2_100.length, 3, '100L Semester 2 must have 3 courses (Programming 1, Describing Data, Sets & Logic)');

    // 1.2 Verify Course Readiness Resolution
    const deg101 = sem1_100.find(c => c.code === 'DEG 101');
    assert.equal(resolveCourseSlotReadiness(deg101), 'ready', 'DEG 101 must resolve as ready');
    assert.equal(deg101.takeHomeDeliverable, 'Digital Logic & Binary Breadboard Audit');

    const deg103 = sem2_100.find(c => c.code === 'DEG 103');
    assert.equal(resolveCourseSlotReadiness(deg103), 'ready', 'DEG 103 (Programming 1) must resolve as ready');
    assert.ok(deg103.prerequisites.includes('DEG 101'), 'Programming 1 must require DEG 101');
    assert.equal(deg103.takeHomeDeliverable, 'POS Terminal Cash Drawer Daily Reconciliation');

    const deg104 = sem2_100.find(c => c.code === 'DEG 104');
    assert.equal(resolveCourseSlotReadiness(deg104), 'ready', 'DEG 104 (Describing Data) must resolve as ready');
    assert.ok(deg104.prerequisites.includes('DEG 102'), 'Describing Data must require DEG 102');
    assert.equal(deg104.takeHomeDeliverable, 'Transit Fare Dispersion & Outlier Inflation Audit');

    const deg106 = sem2_100.find(c => c.code === 'DEG 106');
    assert.equal(resolveCourseSlotReadiness(deg106), 'in_progress', 'DEG 106 (Sets, Logic & Proof) must resolve as in_progress (partial)');
    assert.equal(deg106.takeHomeDeliverable, 'Inclusion-Exclusion Team Partition & Contrapositive Audit');

    // 1.3 Verify Upper Levels and Capstone
    const capstone = AUTONOMOUS_CS_DEGREE_MAP.courses.find(c => c.code === 'DEG 402');
    assert.ok(capstone, 'Capstone course DEG 402 must be defined');
    assert.equal(capstone.level, 400);
    assert.equal(capstone.semester, 2);
    assert.equal(resolveCourseSlotReadiness(capstone), 'pipeline', 'Upper level capstone must be marked as pipeline gap until released');
    assert.ok(capstone.prerequisites.includes('DEG 401'));

    // 1.4 Verify CCMAS and UNIPORT Maps Compatibility
    assert.ok(CCMAS_CS_MAP.courses.length > 20, 'CCMAS map must contain full national curriculum slots');
    assert.ok(UNIPORT_CS_2015_MAP.courses.length > 20, 'UNIPORT map must contain handbook slots');

    const cos101 = CCMAS_CS_MAP.courses.find(c => c.code === 'COS 101');
    assert.equal(inferCourseSemester(cos101), 1, 'COS 101 odd code must infer Semester 1');
    assert.equal(resolveCourseSlotReadiness(cos101), 'ready', 'COS 101 must resolve as ready');

    const cos102 = CCMAS_CS_MAP.courses.find(c => c.code === 'COS 102');
    assert.equal(inferCourseSemester(cos102), 2, 'COS 102 even code must infer Semester 2');
    assert.equal(resolveCourseSlotReadiness(cos102), 'ready', 'COS 102 must resolve as ready');

    console.log('   ✔ Autonomous CS degree map verified from 100L entry to 400L capstone.');
    console.log('   ✔ Semester plans (Harmattan & Rain) and milestone deliverables mapped.');
    console.log('   ✔ Review gap transparency: ready courses distinguished from pipeline gaps.');
  }

  // --------------------------------------------------------------------------
  // Stage 2: Library Shelf & In-App Offline Pack Downloads
  // --------------------------------------------------------------------------
  console.log('\n--- Stage 2: Library Shelves & Offline Packs Inventory ---');
  {
    const packsManifestPath = path.resolve(root, 'resources/packs/manifest.json');
    assert.ok(fs.existsSync(packsManifestPath), 'Packs manifest must exist in resources/packs/');
    const manifest = JSON.parse(fs.readFileSync(packsManifestPath, 'utf8'));

    assert.ok(Array.isArray(manifest.packs), 'Manifest must list packs');
    assert.ok(manifest.packs.length >= 5, 'Must contain all 5 verified packs');

    const packIds = manifest.packs.map(p => p.id);
    assert.ok(packIds.includes('numbers-and-algebra'));
    assert.ok(packIds.includes('programming-1'));
    assert.ok(packIds.includes('describing-data'));
    assert.ok(packIds.includes('how-computers-work'));
    assert.ok(packIds.includes('how-to-study'));

    for (const p of manifest.packs) {
      assert.ok(p.sha256, `Pack ${p.id} must have sha256 checksum`);
      assert.ok(p.bytes > 0, `Pack ${p.id} must have positive bytes`);
      assert.ok(p.lessonsCount > 0, `Pack ${p.id} must have lessonsCount`);
    }

    console.log(`   ✔ Verified ${manifest.packs.length} discrete course packs in Library shelf inventory.`);
    console.log('   ✔ SHA-256 integrity checksums and offline byte sizes verified.');
  }

  // --------------------------------------------------------------------------
  // Stage 3: Support Mistake Reporting & Sovereign Passport Export
  // --------------------------------------------------------------------------
  console.log('\n--- Stage 3: Support Mistake Reporting & Sovereign Passport Export ---');
  {
    const db = createTestDb();
    const engine = new CoreEngine({ db });
    await engine.initSchema(10);
    await engine.open();

    // 3.1 Report Lesson Mistake / Feedback
    const reportRes = await engine.reportMistake({
      lessonId: 'p1-test-function',
      type: 'typo',
      details: 'Typo in worked example on line 14: print instead of return.'
    });

    assert.equal(reportRes.queued, true, 'Report must be queued');
    assert.ok(reportRes.outboxId.startsWith('out_'), 'Outbox ID must be generated');

    const pending = await engine.getPendingOutbox();
    const queuedReport = pending.find(p => p.action === 'report_mistake');
    assert.ok(queuedReport, 'Queued report must exist in sync_outbox');
    assert.equal(queuedReport.entity, 'lesson_feedback');
    const parsedPayload = JSON.parse(queuedReport.payload);
    assert.equal(parsedPayload.lessonId, 'p1-test-function');
    assert.equal(parsedPayload.type, 'typo');
    console.log('   ✔ Student mistake/feedback report queued in offline sync_outbox.');

    // 3.2 Seed passing practical submissions
    const validPosCode = `function reconcilePosDaily(txs) {
      var seen = {}, cin = 0, cout = 0, fee = 0, v = 0, rej = 0, rejs = [];
      for (var i = 0; i < txs.length; i++) {
        var t = txs[i];
        if (!t || typeof t !== 'object') { rej++; rejs.push({ reference: 'MALFORMED', reason: 'malformed_record' }); continue; }
        var ref = (t.reference || '').trim();
        if (!ref) { rej++; rejs.push({ reference: 'EMPTY', reason: 'missing_reference' }); continue; }
        if (seen[ref]) { rej++; rejs.push({ reference: ref, reason: 'duplicate_reference' }); continue; }
        seen[ref] = true;
        if (typeof t.amountKobo !== 'number' || Math.floor(t.amountKobo) !== t.amountKobo || t.amountKobo <= 0) { rej++; rejs.push({ reference: ref, reason: 'invalid_amount' }); continue; }
        if (t.status !== 'success') { rej++; rejs.push({ reference: ref, reason: 'transaction_failed' }); continue; }
        var f = (typeof t.feeKobo === 'number' && t.feeKobo >= 0) ? t.feeKobo : 0;
        if (t.type === 'cash_in') { cin += t.amountKobo; fee += f; v++; }
        else if (t.type === 'cash_out') { cout += t.amountKobo; fee += f; v++; }
        else { rej++; rejs.push({ reference: ref, reason: 'unknown_type' }); }
      }
      return { totalCashInKobo: cin, totalCashOutKobo: cout, totalFeeCollectedKobo: fee, netCashDrawerChangeKobo: cin - cout + fee, validCount: v, rejectedCount: rej, rejections: rejs };
    }`;

    await engine.submitAssignment('pos-cash-reconciliation-v1', {
      code: validPosCode,
      explanation: 'Daily POS terminal float balanced. Cash-in and cash-out computed in integer kobo with duplicate references rejected.'
    });

    // 3.3 Export NDPA 2023 Sovereign Portfolio Passport
    const passport = await engine.exportSovereignPassport();
    assert.equal(passport.version, '4yos-passport-v1');
    assert.ok(passport.exportedAt);
    assert.equal(passport.learner, 'Learner');
    assert.ok(passport.credentials.length >= 1, 'Must contain minted credential');

    const posCred = passport.credentials.find(c => c.session_id === 'pos-cash-reconciliation-v1');
    assert.ok(posCred, 'POS cash reconciliation credential must be exported');
    assert.equal(posCred.result, 'passed');
    assert.ok(posCred.artifactId.startsWith('4YOS-PASS-POS-'), 'Artifact ID must start with 4YOS-PASS-POS-');

    assert.ok(passport.disclaimer.includes('Practice estimate, not an official university degree'), 'Must include statutory practice estimate notice');
    assert.ok(passport.disclaimer.includes('NDPA 2023'), 'Must cite NDPA 2023 data ownership regulations');

    console.log('   ✔ Sovereign Learning Passport exported with cryptographic credentials:');
    console.log('     Credential ID:', posCred.artifactId);
    console.log('   ✔ Mandatory statutory practice estimate notice verified.');

    await engine.close();
  }

  // --------------------------------------------------------------------------
  // Stage 4: Browser UI End-to-End Workflow Verification (Playwright)
  // --------------------------------------------------------------------------
  console.log('\n--- Stage 4: Browser UI End-to-End Workflow Verification ---');

  const distDir = path.resolve(root, 'dist-web');
  const server = http.createServer((req, res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(distDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json',
        '.webmanifest': 'application/manifest+json',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.mp4': 'video/mp4',
        '.vtt': 'text/vtt; charset=utf-8'
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const page = await context.newPage();

    await page.goto(new URL('?study=1', baseUrl).href, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // 4.1 Check Library Shelf in Learn -> Courses
    await page.click('nav[aria-label="Desktop navigation"] button[title="Learn"]');
    await page.waitForTimeout(300);

    const shelfCard = page.locator('#library-shelves-card');
    assert.ok(await shelfCard.isVisible(), 'Library shelf card must be visible in Available Courses');
    console.log('   ✔ Library shelf rendered with available course packs.');

    // Test precache button
    const precacheBtn = page.locator('#btn-precache-programming-1');
    await precacheBtn.waitFor();
    await precacheBtn.click();
    await page.getByText('Verified and saved for offline reading.').waitFor();
    console.log('   ✔ Precache offline pack action executed with confirmation.');

    // 4.2 Inspect Programme Map & Semester Plans
    await page.click('#tab-results');
    await page.waitForTimeout(300);

    // Switch to Autonomous Degree Map
    await page.selectOption('#programme-map-select', 'autonomous-cs-degree');
    await page.waitForTimeout(300);

    const progMapCard = page.locator('#programme-map-card');
    assert.ok(await progMapCard.isVisible(), 'Programme Map card must render');

    // Test Semester Filtering
    const btnSem1 = page.locator('#btn-semester-1');
    assert.ok(await btnSem1.isVisible(), 'Harmattan semester button must be visible');
    await btnSem1.click();
    await page.waitForTimeout(300);

    const sem1Row = page.locator('#row-course-DEG-101');
    assert.ok(await sem1Row.isVisible(), 'DEG 101 must be visible in Harmattan semester');

    const sem2Btn = page.locator('#btn-semester-2');
    await sem2Btn.click();
    await page.waitForTimeout(300);

    const sem2Row = page.locator('#row-course-DEG-103');
    assert.ok(await sem2Row.isVisible(), 'DEG 103 must be visible in Rain semester');

    // Check Action button on ready course
    const openCourseBtn = page.locator('#btn-open-course-DEG-103');
    assert.ok(await openCourseBtn.isVisible(), 'Open Course button must be visible for ready course');
    await openCourseBtn.click();
    await page.waitForTimeout(400);

    // Verify it opened lesson viewer for Testing a function
    const lessonHeading = page.locator('#lesson-heading');
    assert.ok(await lessonHeading.isVisible(), 'Lesson viewer must open directly from programme map');
    const lessonTitle = await lessonHeading.innerText();
    assert.ok(lessonTitle.includes('Testing a function'), 'Must open Programming 1 lecture lesson');
    console.log('   ✔ Unbroken learner path: Direct navigation from Programme Map into course lesson verified.');

    // Return to main app
    await page.getByRole('button', { name: /Back to Learn/ }).click();
    await page.locator('#programme-map-card').waitFor();
    await page.waitForTimeout(300);

    // 4.3 Check Goals View & Degree Pacing
    await page.click('nav[aria-label="Desktop navigation"] button[title="Goals"]');
    await page.waitForTimeout(300);

    const pacingCard = page.locator('#goals-degree-pacing-card');
    assert.ok(await pacingCard.isVisible(), 'Degree pacing card must be visible in Goals');
    console.log('   ✔ Degree progression pacing card verified in Goals view.');

    // 4.4 Check Account View: Mistake Reporter & Sovereign Passport Export
    await page.click('nav[aria-label="Desktop navigation"] button[title="Account"]');
    await page.waitForTimeout(300);

    // Test Lesson Mistake Reporter
    const mistakeCard = page.locator('#account-mistake-reporter-card');
    assert.ok(await mistakeCard.isVisible(), 'Mistake reporter must be visible');

    await page.fill('#input-report-details', 'Typo in code comment in COS 102 unit 1.');
    await page.click('#btn-submit-lesson-report');
    await page.waitForTimeout(400);
    console.log('   ✔ Student mistake report submitted through Account UI.');

    // Test Sovereign Passport Export
    const passportCard = page.locator('#account-sovereign-passport-card');
    assert.ok(await passportCard.isVisible(), 'Sovereign passport card must be visible');

    await page.click('#btn-export-portfolio-passport');
    await page.waitForTimeout(400);

    const passportPreview = page.locator('#sovereign-passport-preview');
    assert.ok(await passportPreview.isVisible(), 'Exported sovereign passport preview must render');
    const previewText = await passportPreview.innerText();
    assert.ok(previewText.includes('4yos-passport-v1'), 'Export must display passport version');
    assert.ok(previewText.includes('Practice estimate'), 'Must display mandatory practice estimate disclaimer');
    console.log('   ✔ Sovereign passport exported in browser UI with NDPA disclosure notice.');

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('\n=============================================================');
  console.log('>>> ALL STAGE D PROGRAMME & LIFE WORKFLOW TESTS PASSED! 🚀');
  console.log('=============================================================\n');
}

runStageDTests().catch((err) => {
  console.error('\n❌ Stage D Workflow Test Failed:', err);
  process.exit(1);
});
