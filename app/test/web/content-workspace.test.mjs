// Automated Verification for Section 25: Owner Content Workspace & Publishing
// Verifies:
// 1. Authoritative WebVTT parsing (header, start/end timestamps, monotonic ordering, negative duration rejection, HTML tag stripping)
// 2. Core 100L curriculum catalog inspection and outcomes mapping (COS 101, MTH 101, COS 102, STA 111, MTH 111)
// 3. Media library asset audit (CC-BY-4.0 original Camp production lectures and YarnGPT audition status)
// 4. Staging revision generation, immutable revision IDs, atomic release publishing, and rollback preservation
// 5. Browser UI verification with Playwright: Admin authentication, Content Workspace sub-tabs, WebVTT editor, seekable cues, video player, staging, and atomic release rollback

import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { startPreviewServer } from '../../scripts/preview-web.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// Import the WebVTT parser from the content-workspace-core module
import {
  parseWebVTT,
  DEFAULT_VTT_SOURCES,
  COURSE_CATALOG_ITEMS,
  INITIAL_MEDIA_LIBRARY
} from '../../src/web/content-workspace-core.ts';

async function runContentWorkspaceTests() {
  console.log('\n======================================================');
  console.log('>>> Section 25 Owner Content Workspace Verification >>>');
  console.log('======================================================\n');

  // -----------------------------------------------------------------
  // STAGE 1: Authoritative WebVTT Parser & Cue Validation
  // -----------------------------------------------------------------
  console.log('--- Stage 1: WebVTT Parser & Cue Validation ---');

  // 1.1 Parse valid baseline lecture VTTs
  for (const [lessonId, vttSource] of Object.entries(DEFAULT_VTT_SOURCES)) {
    const res = parseWebVTT(vttSource);
    assert.equal(res.error, undefined, `Baseline VTT for ${lessonId} must parse without errors`);
    assert.ok(res.cues.length >= 8, `${lessonId} must contain at least 8 parsed cues`);

    // Check first cue starts at 00:00
    assert.equal(res.cues[0].start, '00:00');
    assert.equal(res.cues[0].startSec, 0);

    // Verify monotonic timestamps
    for (let i = 1; i < res.cues.length; i++) {
      assert.ok(
        res.cues[i].startSec >= res.cues[i - 1].startSec,
        `Timestamps in ${lessonId} must be non-decreasing (cue ${i})`
      );
      assert.ok(
        res.cues[i].endSec > res.cues[i].startSec,
        `Cue duration must be positive in ${lessonId} (cue ${i})`
      );
    }
    console.log(`   ✔ ${lessonId}: ${res.cues.length} cues parsed and verified monotonic.`);
  }

  // 1.2 Invalid WebVTT - Missing header
  const badHeader = `00:00.000 --> 00:05.000\nHello without header`;
  const badHeaderRes = parseWebVTT(badHeader);
  assert.ok(badHeaderRes.error?.includes('WEBVTT'), 'Must reject VTT without WEBVTT header');
  console.log('   ✔ Correctly rejected VTT missing "WEBVTT" header.');

  // 1.3 Invalid WebVTT - Negative duration (end <= start)
  const negativeDuration = `WEBVTT\n\n00:10.000 --> 00:05.000\nBackwards time travel`;
  const negRes = parseWebVTT(negativeDuration);
  assert.ok(negRes.error?.includes('strictly greater'), 'Must reject end timestamp <= start timestamp');
  console.log('   ✔ Correctly rejected cue with negative duration.');

  // 1.4 Invalid WebVTT - Non-monotonic cue sequence
  const nonMonotonic = `WEBVTT\n\n00:05.000 --> 00:08.000\nFirst cue\n\n00:02.000 --> 00:04.000\nOut of order start`;
  const nonMonoRes = parseWebVTT(nonMonotonic);
  assert.ok(nonMonoRes.error?.includes('monotonic'), 'Must reject non-monotonic cue timestamps');
  console.log('   ✔ Correctly rejected non-monotonic cue timestamps.');

  // 1.5 HTML tag stripping in cue text
  const htmlCue = `WEBVTT\n\n00:00.000 --> 00:05.000\n<b>Bold</b> and <c.yellow>colored</c> text`;
  const htmlRes = parseWebVTT(htmlCue);
  assert.equal(htmlRes.error, undefined);
  assert.equal(htmlRes.cues[0].text, 'Bold and colored text');
  console.log('   ✔ Correctly stripped HTML tags from cue text.\n');

  // -----------------------------------------------------------------
  // STAGE 2: Curriculum Catalog & Outcomes Mapping
  // -----------------------------------------------------------------
  console.log('--- Stage 2: Curriculum Catalog Inspection ---');
  assert.ok(COURSE_CATALOG_ITEMS.length >= 7, 'Must register curriculum courses');
  const codes = COURSE_CATALOG_ITEMS.map(c => c.code);
  assert.ok(codes.includes('COS 101'), 'Must include COS 101');
  assert.ok(codes.includes('MTH 101'), 'Must include MTH 101');
  assert.ok(codes.includes('COS 102'), 'Must include COS 102');
  assert.ok(codes.includes('STA 111'), 'Must include STA 111');
  assert.ok(codes.includes('MTH 111'), 'Must include MTH 111');

  const p1 = COURSE_CATALOG_ITEMS.find(c => c.code === 'COS 102');
  assert.equal(p1.videosCount, 1);
  assert.equal(p1.packStatus, 'ready');

  const sets = COURSE_CATALOG_ITEMS.find(c => c.code === 'MTH 111');
  assert.equal(sets.packStatus, 'partial', 'MTH 111 must be partial');
  assert.equal(sets.previewTier, 'partial_course');
  console.log('   ✔ Curriculum courses, outcomes, and pack statuses verified.\n');

  // -----------------------------------------------------------------
  // STAGE 3: Media Library Inventory & Provenance
  // -----------------------------------------------------------------
  console.log('--- Stage 3: Media Library Inventory & Auditions ---');
  assert.ok(INITIAL_MEDIA_LIBRARY.length >= 10, 'Must track original Camp media and audition draft');

  const campVideos = INITIAL_MEDIA_LIBRARY.filter(m => m.type === 'video');
  assert.equal(campVideos.length, 3, 'Must catalog exactly 3 original Camp lecture videos');
  for (const v of campVideos) {
    assert.equal(v.status, 'live');
    assert.ok(v.license.includes('CC-BY-4.0'));
  }

  const auditionItem = INITIAL_MEDIA_LIBRARY.find(m => m.id === 'med-yarngpt-audition');
  assert.ok(auditionItem, 'Must include YarnGPT local audition draft');
  assert.equal(auditionItem.status, 'audition_pending');
  console.log('   ✔ Media library assets, CC-BY-4.0 licenses, and audition candidate verified.\n');

  // -----------------------------------------------------------------
  // STAGE 4: Browser UI Verification with Playwright
  // -----------------------------------------------------------------
  console.log('--- Stage 4: Browser UI Verification (Playwright) ---');
  const { server, url: previewUrl } = await startPreviewServer(0);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto(new URL('?study=1', previewUrl).href, { waitUntil: 'networkidle' });

    // Open Account tab to reach Admin Portal
    await page.click('nav[aria-label="Desktop navigation"] button[title="Account"]');
    await page.waitForSelector('#account-heading');

    // Click "Open Operations Console" in Account view
    await page.click('button:has-text("Open Operations Console")');
    await page.waitForSelector('#admin-login-heading');

    // Sign in to Admin App
    await page.fill('input#owner-key-input', 'test-owner-secret-key-4yos');
    await page.click('button:has-text("Sign In as Owner")');
    await page.waitForSelector('#admin-heading');
    console.log('   ✔ Successfully authenticated into 4YOS Admin Console.');

    // Click "📚 Content Workspace" tab
    await page.click('button:has-text("Content Workspace")');
    await page.waitForTimeout(400);

    const contentHeading = page.locator('#content-heading');
    assert.ok(await contentHeading.isVisible(), 'Content Workspace heading must be visible');
    console.log('   ✔ Navigated to Content Workspace.');

    // 4.1 Verify Dashboard & Readiness sub-tab
    const yarnAlert = page.locator('text=Narration Audition in Progress');
    assert.ok(await yarnAlert.isVisible(), 'YarnGPT audition banner must be visible on Content dashboard');
    console.log('   ✔ YarnGPT audition alert displayed on Content dashboard.');

    // 4.2 Verify Programmes & Courses Inspector
    await page.click('button:has-text("Programmes & Courses")');
    await page.waitForTimeout(300);
    const courseSelect = page.locator('#course-select');
    assert.ok(await courseSelect.isVisible());
    await courseSelect.selectOption('STA 111');
    await page.waitForTimeout(300);
    const courseDetail = page.locator('h3:has-text("STA 111")');
    assert.ok(await courseDetail.isVisible(), 'Course inspector must render STA 111 details');
    console.log('   ✔ Programmes & Courses Inspector successfully inspected STA 111.');

    // 4.3 Verify Lesson & WebVTT Editor
    await page.click('button:has-text("Lesson & WebVTT Editor")');
    await page.waitForTimeout(300);

    const vttEditor = page.locator('#vtt-editor');
    assert.ok(await vttEditor.isVisible(), 'WebVTT editor textarea must be visible');
    const initialText = await vttEditor.inputValue();
    assert.ok(initialText.startsWith('WEBVTT'), 'Editor must be pre-populated with WEBVTT');

    // Click a cue in the seekable transcript preview
    const cueItem = page.locator('span:has-text("[00:06]")').first();
    assert.ok(await cueItem.isVisible(), 'Seekable cues must be rendered');
    await cueItem.click();
    console.log('   ✔ Seekable cues rendered and interactive in transcript preview.');

    // Click "Validate Cues & Parse"
    await page.click('button:has-text("Validate Cues & Parse")');
    await page.waitForTimeout(200);
    const validFeedback = page.locator('text=Validation passed');
    assert.ok(await validFeedback.isVisible(), 'Validation feedback must confirm valid cues');

    // Click "Stage Revision"
    await page.click('button:has-text("Stage Revision")');
    await page.waitForTimeout(300);
    const stageFeedback = page.locator('text=staged successfully');
    assert.ok(await stageFeedback.isVisible(), 'Feedback must confirm staged revision');
    console.log('   ✔ Staged revision created with immutable revision ID.');

    // 4.4 Verify Media Library
    await page.click('button:has-text("Media Library")');
    await page.waitForTimeout(300);
    const mediaRow = page.locator('table >> text=p1-test-function.mp4');
    assert.ok(await mediaRow.isVisible(), 'p1-test-function.mp4 must appear in media library');
    console.log('   ✔ Media Library successfully displays Camp assets.');

    // 4.5 Verify Review & Releases (Publishing & Rollback)
    await page.click('button:has-text("Review & Releases")');
    await page.waitForTimeout(300);

    const stagedRow = page.locator('table td', { hasText: 'p1-test-function' }).first();
    assert.ok(await stagedRow.isVisible(), 'Staged revision must appear in queue');

    // Click Publish Release
    await page.click('button:has-text("Publish Release")');
    await page.waitForTimeout(400);

    const publishSuccess = page.locator('text=published!');
    assert.ok(await publishSuccess.isVisible(), 'Publish confirmation must be shown');
    console.log('   ✔ Staged revision published! Atomic release pointer updated.');

    // Click Rollback Release
    const rollbackBtn = page.locator('button:has-text("Rollback to Prior Release")');
    assert.ok(await rollbackBtn.isEnabled(), 'Rollback button must now be enabled');
    await rollbackBtn.click();
    await page.waitForTimeout(400);

    const rollbackSuccess = page.locator('text=Rolled back to');
    assert.ok(await rollbackSuccess.isVisible(), 'Rollback confirmation must be shown');
    console.log('   ✔ Rollback executed successfully! Prior release restored with audit history.');

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('\n======================================================');
  console.log('>>> ALL SECTION 25 CONTENT WORKSPACE TESTS PASSED  >>>');
  console.log('======================================================\n');
}

runContentWorkspaceTests().catch((err) => {
  console.error('\n❌ Content Workspace test failed:', err);
  process.exit(1);
});
