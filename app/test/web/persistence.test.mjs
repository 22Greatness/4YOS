// B1 Persistence Gate Test: verifies durable storage, close & reopen, previous-schema upgrade,
// concurrent initialization, multi-tab access, and the frozen error contract in Chromium and WebKit.
// Implements the verification gate for Codex from docs/14-master-plan.md §13 (Engineering Contract for Igba).

import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, webkit } from 'playwright-core';
import { buildWebScaffold } from '../../scripts/build-web.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '../..');

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

async function runBrowserGate(browserType, name, url) {
  console.log(`\n======================================================`);
  console.log(`>>> Running B1 Persistence Gate on ${name}...`);
  console.log(`======================================================`);

  const browser = await browserType.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', msg => console.log(`[${name}] ${msg.text()}`));
    page.on('pageerror', err => console.error(`[${name} ERROR]`, err));

    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    const result = await page.evaluate(async () => {
      return await window.runPersistenceGate();
    });

    assert.equal(result.ok, true, `${name} persistence gate failed: ${result.error}`);
    console.log(`\n✔ ${name} persistence gate PASSED. Storage backend: [${result.storageBackend}]`);
    return result;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('1. Building web scaffold from source (esbuild)...');
  await buildWebScaffold();
  console.log('   Web bundles built from source.\n');

  const { server, port } = await createTestServer();
  const testUrl = `http://127.0.0.1:${port}/test/web/persistence-runner.html`;

  try {
    // 1. Run in Chromium
    const chromRes = await runBrowserGate(chromium, 'Chromium', testUrl);

    // 2. Run in WebKit
    const webkitRes = await runBrowserGate(webkit, 'WebKit', testUrl);

    console.log('\n======================================================');
    console.log('✔ B1 PERSISTENCE GATE COMPLETE');
    console.log(`  - Chromium storage backend: ${chromRes.storageBackend}`);
    console.log(`  - WebKit storage backend:   ${webkitRes.storageBackend}`);
    console.log('  - Durable storage, reopen persistence, schema upgrade,');
    console.log('    concurrent initialization and two-tab access verified.');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

main().catch(err => {
  console.error('\n✖ Persistence gate failed:', err);
  process.exit(1);
});
