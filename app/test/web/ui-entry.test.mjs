import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, webkit } from 'playwright-core';
import { startPreviewServer } from '../../scripts/preview-web.mjs';

const { server, url } = await startPreviewServer(0);
const screenshotDir = process.env.FOURYOS_UI_SCREENSHOTS;
if (screenshotDir) await mkdir(screenshotDir, { recursive: true });

async function verify(engine, width, height, reducedMotion) {
  const browser = await engine.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    page.setDefaultTimeout(15000);
    await page.goto(url);
    const welcome = page.getByRole('heading', { name: 'Pass your courses by really understanding them' });
    await welcome.waitFor();
    assert.equal(await page.locator('.web-shell').count(), 0);
    const ayo = page.getByRole('img', { name: 'Ayo tutor' });
    const expectedAyo = reducedMotion === 'reduce' ? /ayo-study-320\.webp$/ : /ayo-idle-160\.webp$/;
    await page.waitForFunction(() => document.querySelector('.camp-welcome img')?.naturalWidth > 0);
    assert.match(await ayo.evaluate(image => image.currentSrc), expectedAyo);
    assert.equal(await page.locator('.camp-welcome').evaluate(main => main.scrollWidth > main.clientWidth), false);
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'welcome-' + width + '.png') });

    await page.getByRole('link', { name: 'Start free', exact: true }).click();
    const start = page.getByRole('button', { name: 'Start lesson', exact: true });
    await start.waitFor();
    assert.match(await ayo.evaluate(image => image.currentSrc), expectedAyo);
    const next = await start.boundingBox();
    const shelf = await page.locator('.camp-lecture-shelf').boundingBox();
    assert.ok(next && shelf && next.y < shelf.y);
    assert.equal(await page.locator('.web-main').evaluate(main => main.scrollWidth > main.clientWidth), false);
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'home-' + width + '.png') });

    const title = await page.locator('#next-study-title').textContent();
    await start.click();
    await page.locator('.camp-reading').first().waitFor();
    assert.equal(await page.locator('#lesson-heading').textContent(), title);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'lesson-heading');
    await page.getByRole('button', { name: /Back to Home/ }).click();
    await start.waitFor();
    await page.waitForFunction(() => document.activeElement?.id === 'home-next-action');

    await page.getByRole('button', { name: /The median and quartiles/ }).click();
    await page.getByRole('textbox', { name: 'Your answer' }).fill('5');
    await page.getByRole('button', { name: 'Check answer' }).click();
    await page.getByText('Try again.', { exact: true }).waitFor();
    await page.getByRole('textbox', { name: 'Your answer' }).fill('6');
    await page.evaluate(() => {
      const call = window.os4.call.bind(window.os4);
      window.os4.call = (method, ...args) => {
        if (method === 'check') {
          window.os4.call = call;
          return Promise.reject(new Error('Test write failure'));
        }
        return call(method, ...args);
      };
    });
    await page.getByRole('button', { name: 'Check answer' }).click();
    await page.getByRole('alert').filter({ hasText: 'Your answer could not be saved' }).waitFor();
    assert.equal(await page.getByRole('textbox', { name: 'Your answer' }).inputValue(), '6');
    assert.equal(await page.getByText('Correct. Your check is saved.').count(), 0);
    await page.getByRole('button', { name: 'Check answer' }).click();
    await page.getByText('Correct. Your check is saved.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Back to Home', exact: true }).click();
    await page.getByText(/^1 of \d+ lessons with a passed check$/).waitFor();
    await page.reload();
    await page.getByText(/^1 of \d+ lessons with a passed check$/).waitFor();

    await page.getByRole('button', { name: 'Open Learn' }).click();
    await page.locator('#learn-heading').waitFor();
    await page.goBack();
    await welcome.waitFor();
    await page.getByRole('link', { name: 'Open account settings' }).click();
    const themeButton = page.getByRole('button', { name: 'Switch to Dark Mode' });
    await themeButton.click();
    const nav = page.getByRole('navigation', { name: width < 820 ? 'Mobile navigation' : 'Desktop navigation' });
    await nav.getByRole('button', { name: 'Home', exact: true }).click();
    await start.waitFor();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'home-dark-' + width + '.png') });

    await page.goto(url);
    await page.getByRole('link', { name: /Try a free lesson/ }).click();
    await page.getByRole('heading', { name: 'Testing a function', exact: true }).waitFor();
    await page.locator('.camp-reading').first().waitFor();
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'lesson-' + width + '.png') });
    await page.getByRole('button', { name: /Back to Learn/ }).click();
    await page.locator('#learn-heading').waitFor();
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'learn-' + width + '.png') });
    const saveOffline = page.locator('#btn-precache-programming-1');
    await saveOffline.click();
    await page.getByText('Verified and saved for offline reading.').waitFor();
    assert.ok(await page.evaluate(async () => Boolean(await caches.match('./packs/programming-1.json'))));

    await nav.getByRole('button', { name: 'Goals', exact: true }).click();
    await page.getByLabel('New study goal').fill('Work through the quartiles examples');
    await page.getByRole('button', { name: 'Add goal' }).click();
    await page.getByText('Work through the quartiles examples', { exact: true }).waitFor();
    await page.reload();
    await nav.getByRole('button', { name: 'Goals', exact: true }).click();
    await page.getByText('Work through the quartiles examples', { exact: true }).waitFor();
    if (screenshotDir) await page.screenshot({ path: path.join(screenshotDir, 'goals-' + width + '.png') });
    for (const testWidth of width < 600 ? [320, 768] : [1024, 1440]) {
      await page.setViewportSize({ width: testWidth, height });
      const currentNav = page.getByRole('navigation', { name: testWidth < 600 ? 'Mobile navigation' : 'Desktop navigation' });
      const main = page.locator('.web-main');
      const assertFits = async (view) => {
        const dimensions = await main.evaluate(element => [element.scrollWidth, element.clientWidth]);
        assert.ok(dimensions[0] <= dimensions[1], view + ' overflows at ' + testWidth + 'px: ' + dimensions.join('/'));
      };
      await currentNav.getByRole('button', { name: 'Learn', exact: true }).click();
      for (const tab of ['courses', 'results', 'interview', 'practicals']) {
        await page.locator('#tab-' + tab).click();
        if (tab === 'practicals') await page.locator('#practical-workspace').waitFor();
        await assertFits(tab);
      }
      await currentNav.getByRole('button', { name: 'Goals', exact: true }).click();
      await assertFits('goals');
      const accountButton = testWidth < 600 ? page.getByRole('button', { name: 'Your Account' }) : currentNav.getByRole('button', { name: 'Account' });
      await accountButton.click();
      await assertFits('account');
    }
    console.log(engine.name() + ' ' + width + 'px verified');
  } finally {
    await browser.close();
  }
}

try {
  await verify(chromium, 360, 800, 'no-preference');
  await verify(webkit, 1440, 900, 'reduce');
} finally {
  await new Promise(resolve => server.close(resolve));
}
