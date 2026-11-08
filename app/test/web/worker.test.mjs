// Tests the platform adapter and core engine running in a Web Worker inside Chromium and WebKit.
// Fulfills Step B1 check from docs/14-master-plan.md Section 17.

import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, webkit } from 'playwright-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '../..');

// Simple static file server for testing
function createTestServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.wasm': 'application/wasm',
    '.json': 'application/json',
    '.css': 'text/css'
  };

  const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(appRoot, urlPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      // Required headers for OPFS / SharedArrayBuffer if needed
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function runBrowserTest(browserType, name, url) {
  console.log(`\n--- Running Core Worker Test on ${name} ---`);
  const browser = await browserType.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Listen to page console
    page.on('console', msg => console.log(`[${name} console]`, msg.text()));
    page.on('pageerror', err => console.error(`[${name} error]`, err));

    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    const result = await page.evaluate(async () => {
      return await window.runCoreTests();
    });

    console.log(`[${name} result]`, result.ok ? 'SUCCESS' : 'FAILED');
    if (result.logs) {
      for (const l of result.logs) {
        console.log(`  > ${l}`);
      }
    }

    assert.equal(result.ok, true, `${name} core worker test failed: ${result.error}`);
    console.log(`✔ ${name} core test passed with 0 errors.`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const { server, port } = await createTestServer();
  const testUrl = `http://127.0.0.1:${port}/test/web/runner.html`;

  try {
    // 1. Test in Chromium
    await runBrowserTest(chromium, 'Chromium', testUrl);

    // 2. Test in WebKit
    await runBrowserTest(webkit, 'WebKit', testUrl);

    console.log('\n======================================================');
    console.log('✔ All core worker tests passed in both Chromium and WebKit!');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

main().catch(err => {
  console.error('\n✖ Test suite failed:', err);
  process.exit(1);
});
