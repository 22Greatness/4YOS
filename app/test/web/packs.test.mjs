// Automated test for Section 17 Step B3:
// Verifies course packs output by scripts/lessons.mjs and their manifest.
// Confirms stable IDs, schema versions, SHA-256 integrity, and that every pack is under 15 MB.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const packsDir = path.resolve(root, 'resources/packs');

function runPacksTest() {
  console.log('\n======================================================');
  console.log('>>> Testing Section 17 Step B3: Course Packs Output...');
  console.log('======================================================');

  const manifestPath = path.join(packsDir, 'manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist in resources/packs');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.schemaVersion, 1, 'Schema version must be 1');
  assert.ok(Array.isArray(manifest.packs), 'manifest.packs must be an array');
  assert.ok(manifest.packs.length >= 4, 'Must have at least 4 generated course packs');

  console.log(`Manifest contains ${manifest.packs.length} course packs generated on ${manifest.generated}.`);

  const MAX_PACK_BYTES = 15 * 1024 * 1024; // 15 MB limit from Section 17 Table G

  for (const item of manifest.packs) {
    const packFile = path.join(packsDir, item.filename);
    assert.ok(fs.existsSync(packFile), `Pack file ${item.filename} must exist`);

    const raw = fs.readFileSync(packFile);
    assert.ok(raw.length < MAX_PACK_BYTES, `Pack ${item.id} must be under 15 MB (actual: ${(raw.length / 1024).toFixed(1)} KB)`);

    const computedHash = crypto.createHash('sha256').update(raw).digest('hex');
    assert.equal(computedHash, item.sha256, `SHA-256 checksum must match for ${item.id}`);

    const packData = JSON.parse(raw.toString('utf8'));
    assert.equal(packData.id, item.id);
    assert.ok(packData.public, `Pack ${item.id} must have public metadata`);
    assert.ok(Array.isArray(packData.lessons), `Pack ${item.id} must have lessons array`);
    assert.ok(Array.isArray(packData.checks), `Pack ${item.id} must have checks array`);

    console.log(`   ✔ [${item.id}] ${(raw.length / 1024).toFixed(1)} KB · ${packData.lessons.length} lessons · sha256:${item.sha256.slice(0, 10)}... (OK)`);
  }

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B3 VERIFICATION COMPLETE');
  console.log('  - All course packs verified under 15 MB limit.');
  console.log('  - Exact SHA-256 integrity confirmed.');
  console.log('  - Manifest schema version 1 validated.');
  console.log('======================================================\n');
}

runPacksTest();
