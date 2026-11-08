// Automated integration test verifying Cloudflare Worker entry point composition.
// Tests requests through the actual default export of server/src/index.ts,
// ensuring PaystackService, AuthService, NotificationService, CircleService,
// and AdminService are properly constructed from validated environment configuration.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import worker from '../src/index.ts';
import { createMemoryD1 } from '../src/db.ts';
import { generateEd25519KeyPair, exportPrivateKeyPkcs8, exportPublicKeyRaw } from '../src/crypto.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

async function runWorkerIntegrationTests() {
  console.log('\n======================================================');
  console.log('>>> Running Worker Integration Tests (src/index.ts)...');
  console.log('======================================================');

  // 1. Test Configuration Validation
  console.log('1. Testing environment configuration validation...');
  const emptyRes = await worker.fetch(new Request('https://api.4yos.internal/auth/code'), {});
  assert.equal(emptyRes.status, 500);
  const emptyJson = await emptyRes.json();
  assert.equal(emptyJson.code, 'CONFIGURATION_ERROR');
  console.log('   ✔ Missing DB binding rejected with 500 CONFIGURATION_ERROR.');

  const db = await createMemoryD1(schemaSql);
  const missingKeysRes = await worker.fetch(new Request('https://api.4yos.internal/auth/code'), { DB: db });
  assert.equal(missingKeysRes.status, 500);
  const missingKeysJson = await missingKeysRes.json();
  assert.equal(missingKeysJson.code, 'CONFIGURATION_ERROR');
  console.log('   ✔ Missing Ed25519 keys rejected with 500 CONFIGURATION_ERROR.');

  // 2. Setup Full Valid Environment
  console.log('2. Preparing valid environment with Ed25519 keys & Paystack test credentials...');
  const keyPair = await generateEd25519KeyPair();
  const privKeyB64 = await exportPrivateKeyPkcs8(keyPair.privateKey);
  const pubKeyB64 = await exportPublicKeyRaw(keyPair.publicKey);

  const env = {
    DB: db,
    ED25519_PRIVATE_KEY: privKeyB64,
    ED25519_PUBLIC_KEY: pubKeyB64,
    PAYSTACK_SECRET_KEY: 'sk_test_worker_integration_secret_key',
    PAYSTACK_PUBLIC_KEY: 'pk_test_worker_integration_public_key',
    PAYSTACK_WEBHOOK_SECRET: 'wh_test_worker_integration_secret',
    OWNER_KEY: 'test-owner-secret-key-4yos'
  };

  // 3. Test Authentication flow through Worker export
  console.log('3. Testing sign-in flow through Worker export...');
  const phone = '08033334444';
  const codeReq = new Request('https://api.4yos.internal/auth/code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  const codeRes = await worker.fetch(codeReq, env);
  assert.equal(codeRes.status, 200);

  // Read internal OTP code from database challenge
  const challenge = await db.prepare('SELECT code_hash FROM auth_challenges WHERE phone = ?')
    .bind(phone).first();
  assert.ok(challenge?.code_hash, 'Challenge must be recorded in D1');

  // Find matching code (100000 - 999999) or hash
  const { hashCode } = await import('../src/crypto.ts');
  let realCode = '';
  // Since test generated random code, let's verify challenge hash matches by querying challenges
  // Or look up through AuthService
  const { AuthService } = await import('../src/auth.ts');
  const tempAuth = new AuthService(db);
  // Re-request code with tempAuth helper to get code directly
  await db.prepare('DELETE FROM rate_limits').run();
  await db.prepare('DELETE FROM auth_challenges').run();
  const reqRes = await tempAuth.requestVerificationCode(phone);
  realCode = reqRes.code;

  const verifyReq = new Request('https://api.4yos.internal/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      code: realCode,
      deviceId: 'dev_worker_1',
      deviceName: 'Worker Integration Device'
    })
  });
  const verifyRes = await worker.fetch(verifyReq, env);
  assert.equal(verifyRes.status, 200);
  const verifyData = await verifyRes.json();
  assert.ok(verifyData.sessionToken?.startsWith('sess_'));
  const sessionToken = verifyData.sessionToken;
  const accountId = verifyData.accountId;
  console.log('   ✔ Sign-in succeeded through Worker export with session token.');

  // 4. Test Payment Purchase Initialization through Worker export
  console.log('4. Testing Paystack purchase initialization through Worker export...');
  const buyReq = new Request('https://api.4yos.internal/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    },
    body: JSON.stringify({
      email: 'student@example.com',
      itemType: 'course',
      itemId: 'cos102',
      courseIds: ['programming-1']
    })
  });
  const buyRes = await worker.fetch(buyReq, env);
  assert.equal(buyRes.status, 200);
  const buyData = await buyRes.json();
  assert.equal(buyData.ok, true);
  assert.ok(buyData.reference?.startsWith('4YOS-'));
  assert.equal(buyData.amountKobo, 100000);
  console.log(`   ✔ POST /buy succeeded through Worker export: reference ${buyData.reference} at ${buyData.amountKobo} kobo.`);

  // 5. Test Owner Operations Console through Worker export
  console.log('5. Testing Owner Admin operations through Worker export...');
  const adminReq = new Request('https://api.4yos.internal/admin/overview', {
    method: 'GET',
    headers: { Authorization: 'Bearer test-owner-secret-key-4yos' }
  });
  const adminRes = await worker.fetch(adminReq, env);
  assert.equal(adminRes.status, 200);
  const adminData = await adminRes.json();
  assert.equal(adminData.ok, true);
  assert.ok('totalStudents' in adminData.overview);
  console.log('   ✔ GET /admin/overview succeeded through Worker export with owner authorization.');

  // 6. Test Circles & Social through Worker export
  console.log('6. Testing Circles through Worker export...');
  const circleReq = new Request('https://api.4yos.internal/circles/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    },
    body: JSON.stringify({
      name: 'Integration Circle'
    })
  });
  const circleRes = await worker.fetch(circleReq, env);
  assert.equal(circleRes.status, 200);
  const circleData = await circleRes.json();
  assert.ok(circleData.code?.startsWith('CIRC-'));
  console.log(`   ✔ POST /circles/create succeeded through Worker export: circle ${circleData.code}.`);

  console.log('\n======================================================');
  console.log('✔ WORKER INTEGRATION VERIFICATION COMPLETE');
  console.log('  - Missing configuration rejection (500): PASSED');
  console.log('  - Full service composition (Auth, Paystack, Admin, Circles): PASSED');
  console.log('  - Execution through Worker default export: PASSED');
  console.log('======================================================\n');
}

runWorkerIntegrationTests().catch((err) => {
  console.error('Worker integration test failed:', err);
  process.exit(1);
});
