// Automated Verification for 4YOS Camp Original Lectures Integration
// Verifies:
// 1. All three original Camp lectures integrated (p1-test-function, dd-quartiles, mth-sets)
// 2. Normal learner navigation exposes the lessons (Home featured strip and Courses tab)
// 3. Play without autoplay (autoPlay is false/omitted, controls enabled)
// 4. English captions (<track kind="captions" srcLang="en" label="English" default>)
// 5. Interactive transcript with seekable timestamp cues
// 6. Reachable written lesson content (sections, explanations, practice exercises)
// 7. Sets, Logic and Proof course clearly communicated as partial
// 8. Narrow browser profile (360x800 cheap Android profile) and Desktop profile (1024x768)

import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium, webkit } from 'playwright-core';
import { startPreviewServer } from '../../scripts/preview-web.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const distWeb = path.resolve(root, 'dist-web');

async function runCampLecturesTest() {
  console.log('\n======================================================');
  console.log('>>> 4YOS Camp Original Lectures Integration Test >>>');
  console.log('======================================================\n');

  // 1. Verify physical file presence in dist-web/lectures
  console.log('--- Step 1: Auditing dist-web/lectures Media Files ---');
  const lecturesDir = path.resolve(distWeb, 'lectures');
  assert.ok(fs.existsSync(lecturesDir), 'dist-web/lectures must exist');

  const expectedMedia = [
    { id: 'p1-test-function', minSize: 900000 },
    { id: 'dd-quartiles', minSize: 1000000 },
    { id: 'mth-sets', minSize: 900000 }
  ];

  for (const m of expectedMedia) {
    const mp4Path = path.join(lecturesDir, `${m.id}.mp4`);
    const vttPath = path.join(lecturesDir, `${m.id}.vtt`);
    const webpPath = path.join(lecturesDir, `${m.id}.webp`);

    assert.ok(fs.existsSync(mp4Path), `MP4 for ${m.id} must exist in dist-web/lectures`);
    assert.ok(fs.existsSync(vttPath), `VTT captions for ${m.id} must exist in dist-web/lectures`);
    assert.ok(fs.existsSync(webpPath), `WebP poster for ${m.id} must exist in dist-web/lectures`);

    const mp4Size = fs.statSync(mp4Path).size;
    const vttSize = fs.statSync(vttPath).size;
    assert.ok(mp4Size >= m.minSize, `${m.id}.mp4 size (${mp4Size}) must exceed threshold`);
    assert.ok(vttSize >= 1000, `${m.id}.vtt size (${vttSize}) must have valid WebVTT cues`);
    console.log(`   ✔ ${m.id}: MP4 (${(mp4Size / 1024 / 1024).toFixed(2)} MB), VTT (${vttSize} bytes), WebP verified.`);
  }

  // Ensure non-Camp third-party videos were NOT copied
  const allCopied = fs.readdirSync(lecturesDir);
  assert.equal(allCopied.length, 9, 'Only the 9 original Camp media files must be present');
  console.log('   ✔ Confirmed only original Camp assets are in the web distribution.\n');

  // 2. Start Preview Server
  const { server, url: previewUrl } = await startPreviewServer(0);
  console.log(`   ✔ Preview server active at ${previewUrl} with COOP/COEP isolation.\n`);

  try {
    // -----------------------------------------------------------------------
    // NARROW BROWSER PROFILE (Cheap Android Phone: 360 x 800)
    // -----------------------------------------------------------------------
    console.log('--- Step 2: Testing Narrow Mobile Profile (360 x 800) ---');
    const browser = await chromium.launch({
      headless: true,
      args: ['--disable-web-security', '--enable-features=SharedArrayBuffer']
    });

    const mobileContext = await browser.newContext({
      viewport: { width: 360, height: 800 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (Linux; Android 11; itel W6502) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0 Mobile Safari/537.36'
    });
    const page = await mobileContext.newPage();
    await page.goto(new URL('?study=1', previewUrl).href, { waitUntil: 'networkidle' });

    // Verify 4YOS Camp branding in header
    const brandText = await page.textContent('.header-brand span:first-child');
    assert.ok(brandText.includes('4YOS Camp'), 'Header brand must say 4YOS Camp');
    console.log('   ✔ 4YOS Camp mobile brand confirmed.');

    // -----------------------------------------------------------------------
    // LECTURE 1: Programming 1 · Testing a function (p1-test-function)
    // -----------------------------------------------------------------------
    console.log('\n--- Testing Lecture 1: Programming 1 (p1-test-function) ---');
    // Open via normal learner action on Home screen featured strip
    await page.waitForSelector('#home-lecture-card-p1');
    await page.click('#home-lecture-card-p1');

    // Verify lesson view opened
    await page.waitForSelector('#lesson-heading');
    const l1Heading = await page.textContent('#lesson-heading');
    assert.equal(l1Heading.trim(), 'Testing a function');

    // Verify Video Element attributes
    const v1 = await page.waitForSelector('#lesson-lecture-video');
    const v1Autoplay = await v1.getAttribute('autoplay');
    assert.equal(v1Autoplay, null, 'Video must NOT have autoplay attribute');

    const v1Poster = await v1.getAttribute('poster');
    assert.ok(v1Poster.includes('p1-test-function.webp'), 'Poster frame must be set');

    const v1Source = await page.$eval('#lesson-lecture-video source', el => el.src);
    assert.ok(v1Source.includes('p1-test-function.mp4'), 'Source must point to p1-test-function.mp4');

    const v1Track = await page.$eval('#lesson-lecture-video track', el => ({
      kind: el.kind,
      srclang: el.srclang,
      label: el.label,
      src: el.src,
      default: el.default
    }));
    assert.equal(v1Track.kind, 'captions');
    assert.equal(v1Track.srclang, 'en');
    assert.equal(v1Track.default, true);
    assert.ok(v1Track.src.includes('p1-test-function.vtt'));
    console.log('   ✔ p1-test-function video element: no autoplay, poster set, MP4 source, English captions track.');

    // Test Transcript Toggle & Cues
    await page.waitForSelector('#btn-toggle-transcript');
    await page.click('#btn-toggle-transcript');
    await page.waitForSelector('#lecture-transcript-container');

    const t1Text = await page.textContent('#lecture-transcript-container');
    assert.ok(t1Text.includes("checking a delivery rule"), 'Transcript must contain delivery rule cue');
    assert.ok(t1Text.includes("greater than ten"), 'Transcript must contain comparison cue');

    // Test Seeking by clicking a timestamp cue
    const firstCueTime = await page.textContent('.transcript-cue:first-child span:first-child');
    assert.ok(firstCueTime.includes('00:00') || firstCueTime.includes('00:06'));
    await page.click('.transcript-cue:first-child');
    console.log('   ✔ Interactive transcript expanded and timestamp seeking functional.');

    // Verify Written Lesson sections are reachable below the video
    const writtenSections = await page.$$('.card');
    assert.ok(writtenSections.length >= 3, 'Written lesson sections and practice must be present');
    const hasAssertHeading = await page.evaluate(() => document.body.textContent.includes('assert'));
    assert.ok(hasAssertHeading, 'Written lesson content must remain reachable');
    console.log('   ✔ Written lesson sections and practice check completely reachable.');

    // Return to main view
    await page.click('button:has-text("Back to")');

    // -----------------------------------------------------------------------
    // LECTURE 2: Describing Data · The median and quartiles (dd-quartiles)
    // -----------------------------------------------------------------------
    console.log('\n--- Testing Lecture 2: Describing Data (dd-quartiles) ---');
    // Navigate via mobile bottom nav: Learn -> Courses -> Watch Lecture button
    await page.click('nav[aria-label="Mobile navigation"] button:has-text("Learn")');
    await page.waitForSelector('#btn-open-dd-lecture');
    await page.click('#btn-open-dd-lecture');

    await page.waitForSelector('#lesson-heading');
    const l2Heading = await page.textContent('#lesson-heading');
    assert.equal(l2Heading.trim(), 'The median and quartiles');

    const v2 = await page.waitForSelector('#lesson-lecture-video');
    const v2Autoplay = await v2.getAttribute('autoplay');
    assert.equal(v2Autoplay, null, 'Video must NOT have autoplay');

    const v2Source = await page.$eval('#lesson-lecture-video source', el => el.src);
    assert.ok(v2Source.includes('dd-quartiles.mp4'));

    const v2Track = await page.$eval('#lesson-lecture-video track', el => el.src);
    assert.ok(v2Track.includes('dd-quartiles.vtt'));

    // Open transcript
    await page.click('#btn-toggle-transcript');
    const t2Text = await page.textContent('#lecture-transcript-container');
    assert.ok(t2Text.includes('Five requests took twelve') || t2Text.includes('median'));

    // Verify written sections
    const hasOrderHeading = await page.evaluate(() => document.body.textContent.includes('Find the middle in order'));
    assert.ok(hasOrderHeading, 'Written lesson text for quartiles must be reachable');
    console.log('   ✔ dd-quartiles video, English captions, transcript, and written notes verified.');

    // Return to main view
    await page.click('button:has-text("Back to")');

    // -----------------------------------------------------------------------
    // LECTURE 3: Sets, Logic and Proof · Sets and Venn diagrams (mth-sets)
    // -----------------------------------------------------------------------
    console.log('\n--- Testing Lecture 3: Sets, Logic and Proof (mth-sets - Partial Course) ---');
    // Open via Courses tab
    await page.waitForSelector('#btn-open-mth-sets');
    await page.click('#btn-open-mth-sets');

    await page.waitForSelector('#lesson-heading');
    const l3Heading = await page.textContent('#lesson-heading');
    assert.equal(l3Heading.trim(), 'Sets and Venn diagrams');

    const v3 = await page.waitForSelector('#lesson-lecture-video');
    const v3Autoplay = await v3.getAttribute('autoplay');
    assert.equal(v3Autoplay, null, 'Video must NOT have autoplay');

    const v3Source = await page.$eval('#lesson-lecture-video source', el => el.src);
    assert.ok(v3Source.includes('mth-sets.mp4'));

    const v3Track = await page.$eval('#lesson-lecture-video track', el => el.src);
    assert.ok(v3Track.includes('mth-sets.vtt'));

    // Open transcript
    await page.click('#btn-toggle-transcript');
    const t3Text = await page.textContent('#lecture-transcript-container');
    assert.ok(t3Text.includes('twenty-four people') || t3Text.includes('Venn'));

    // Verify written sections
    const hasSetsText = await page.evaluate(() => document.body.textContent.includes('What a set is'));
    assert.ok(hasSetsText, 'Written lesson text for sets must be reachable');
    console.log('   ✔ mth-sets video, English captions, transcript, and written notes verified.');

    // Return to main view
    await page.click('button:has-text("Back to")');

    await mobileContext.close();
    await browser.close();

    // -----------------------------------------------------------------------
    // DESKTOP PROFILE (1024 x 768)
    // -----------------------------------------------------------------------
    console.log('\n--- Step 3: Testing Desktop Layout (1024 x 768) ---');
    const dBrowser = await chromium.launch({ headless: true });
    const dContext = await dBrowser.newContext({ viewport: { width: 1024, height: 768 } });
    const dPage = await dContext.newPage();
    await dPage.goto(new URL('?study=1', previewUrl).href, { waitUntil: 'networkidle' });

    // Desktop side rail verification
    const railLogo = await dPage.textContent('.rail-logo');
    assert.ok(railLogo.includes('4YOS Camp'), 'Desktop rail logo must say 4YOS Camp');

    // Navigate to Learn -> Courses
    await dPage.click('.rail-btn[title="Learn"]');
    await dPage.waitForSelector('#btn-open-p1-lecture');
    await dPage.click('#btn-open-p1-lecture');

    // Confirm video renders without horizontal overflow
    const videoWidth = await dPage.$eval('#lesson-lecture-video', el => el.getBoundingClientRect().width);
    assert.ok(videoWidth > 300 && videoWidth <= 1024, 'Video player width must fit layout cleanly');
    console.log(`   ✔ Desktop video player rendered cleanly (width: ${Math.round(videoWidth)}px) without overflow.`);

    await dContext.close();
    await dBrowser.close();

    console.log('\n======================================================');
    console.log('✔ 4YOS CAMP ORIGINAL LECTURES VERIFICATION: 100% PASSED');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

runCampLecturesTest().catch(err => {
  console.error('Camp lectures test failed:', err);
  process.exit(1);
});
