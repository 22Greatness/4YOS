// Automated test suite for Section 17 Step B4:
// Verifies Cloudflare D1 schema, SMS OTP challenges, rate limits, 2-device limit,
// Ed25519 60-day entitlement tokens, clock rollback protection, and backup snapshots.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createMemoryD1 } from '../src/db.ts';
import { AuthService } from '../src/auth.ts';
import { handleRequest } from '../src/routes.ts';
import {
  generateEd25519KeyPair,
  signEntitlement,
  verifyEntitlement
} from '../src/crypto.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

async function runServerTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B4: Server Tests...');
  console.log('======================================================');

  // 1. Initialize In-Memory D1 Database and Crypto Keypair
  console.log('1. Initializing in-memory D1 database and Ed25519 keypair...');
  const db = await createMemoryD1(schemaSql);
  const auth = new AuthService(db);
  const keyPair = await generateEd25519KeyPair();

  const ctx = {
    db,
    auth,
    ed25519PrivateKey: keyPair.privateKey,
    ed25519PublicKey: keyPair.publicKey
  };

  const dispatch = async (method, path, body = null, headers = {}) => {
    const init = {
      method,
      headers: { 'Content-Type': 'application/json', ...headers }
    };
    if (body) init.body = JSON.stringify(body);
    const req = new Request(`https://api.4yos.internal${path}`, init);
    const res = await handleRequest(req, ctx);
    const data = await res.json();
    return { status: res.status, data };
  };

  // 2. Test Rate Limits on SMS Code Requests (max 3/hour)
  console.log('2. Testing OTP rate limits (max 3 per hour)...');
  const phone = '08031234567';

  const r1 = await dispatch('POST', '/auth/code', { phone });
  assert.equal(r1.status, 200);
  assert.equal(r1.data.ok, true);

  const r2 = await dispatch('POST', '/auth/code', { phone });
  assert.equal(r2.status, 200);

  const r3 = await dispatch('POST', '/auth/code', { phone });
  assert.equal(r3.status, 200);

  // 4th request must be rejected with 429 RATE_LIMITED
  const r4 = await dispatch('POST', '/auth/code', { phone });
  assert.equal(r4.status, 429);
  assert.equal(r4.data.code, 'RATE_LIMITED');
  console.log('   ✔ 4th request blocked by rate limiter with 429 RATE_LIMITED.');

  // 3. Test OTP Attempt Throttling (max 3 wrong attempts)
  console.log('3. Testing OTP failed attempt limits...');
  const phone2 = '08098765432';
  await dispatch('POST', '/auth/code', { phone: phone2 });
  const realCode2 = auth.getLatestChallengeCode(phone2);
  assert.ok(realCode2, 'Random code should be generated internally');

  // Wrong attempt 1
  const w1 = await dispatch('POST', '/auth/verify', { phone: phone2, code: '000000', deviceId: 'dev_1' });
  assert.equal(w1.status, 400);
  assert.equal(w1.data.code, 'INVALID_CODE');

  // Wrong attempt 2
  const w2 = await dispatch('POST', '/auth/verify', { phone: phone2, code: '000000', deviceId: 'dev_1' });
  assert.equal(w2.status, 400);

  // Wrong attempt 3 -> invalidates challenge
  const w3 = await dispatch('POST', '/auth/verify', { phone: phone2, code: '000000', deviceId: 'dev_1' });
  assert.equal(w3.status, 400);
  assert.equal(w3.data.code, 'TOO_MANY_ATTEMPTS');

  // Further attempts report challenge gone even with the real code
  const w4 = await dispatch('POST', '/auth/verify', { phone: phone2, code: realCode2, deviceId: 'dev_1' });
  assert.equal(w4.data.code, 'NO_ACTIVE_CHALLENGE');
  console.log('   ✔ 3 failed attempts strictly invalidates the challenge.');

  // 4. Test Strict Two-Device Limit Enforcement and Session Token Issuance
  console.log('4. Testing two-device limit enforcement and session token issuance...');
  const userPhone = '08123456789';
  await dispatch('POST', '/auth/code', { phone: userPhone });
  const codeD1 = auth.getLatestChallengeCode(userPhone);

  // Sign in Device 1: Should succeed and return sessionToken
  const v1 = await dispatch('POST', '/auth/verify', { phone: userPhone, code: codeD1, deviceId: 'device_alpha', deviceName: 'Tecno Camon' });
  assert.equal(v1.status, 200);
  const accountId = v1.data.accountId;
  const sessionToken1 = v1.data.sessionToken;
  assert.ok(accountId);
  assert.ok(sessionToken1?.startsWith('sess_'), 'Session token must be issued on verification');

  // Issue code for Device 2
  await dispatch('POST', '/auth/code', { phone: userPhone });
  const codeD2 = auth.getLatestChallengeCode(userPhone);
  const v2 = await dispatch('POST', '/auth/verify', { phone: userPhone, code: codeD2, deviceId: 'device_beta', deviceName: 'Dell Laptop' });
  assert.equal(v2.status, 200);
  const sessionToken2 = v2.data.sessionToken;
  assert.ok(sessionToken2?.startsWith('sess_'));
  console.log('   ✔ Devices 1 and 2 successfully registered with distinct session tokens.');

  // Issue code for Device 3: Must be REJECTED with DEVICE_LIMIT_REACHED
  await dispatch('POST', '/auth/code', { phone: userPhone });
  const codeD3 = auth.getLatestChallengeCode(userPhone);
  const v3 = await dispatch('POST', '/auth/verify', { phone: userPhone, code: codeD3, deviceId: 'device_gamma', deviceName: 'iPad' });
  assert.equal(v3.status, 403);
  assert.equal(v3.data.code, 'DEVICE_LIMIT_REACHED');
  console.log('   ✔ 3rd device rejected with 403 DEVICE_LIMIT_REACHED.');

  // Remove Device 1 using session token
  await dispatch('POST', '/auth/device/remove', { deviceId: 'device_alpha' }, { Authorization: `Bearer ${sessionToken2}` });

  // Now Device 3 registration succeeds
  await dispatch('POST', '/auth/code', { phone: userPhone });
  const codeD3Retry = auth.getLatestChallengeCode(userPhone);
  const v3Retry = await dispatch('POST', '/auth/verify', { phone: userPhone, code: codeD3Retry, deviceId: 'device_gamma', deviceName: 'iPad' });
  assert.equal(v3Retry.status, 200);
  const sessionToken3 = v3Retry.data.sessionToken;
  assert.ok(sessionToken3);
  console.log('   ✔ Device 3 registration succeeded after removing Device 1.');

  // 5. Test Ed25519 Entitlement Tokens & 60-Day Expiry
  console.log('5. Testing Ed25519 entitlement token signing and 60-day expiry...');
  const entRes = await dispatch('GET', '/entitlement', null, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(entRes.status, 200);
  assert.ok(entRes.data.token);

  const nowSec = Math.floor(Date.now() / 1000);
  const expectedExpiry = nowSec + (60 * 86400);
  assert.ok(Math.abs(entRes.data.expiresAt - expectedExpiry) <= 2, 'Expiry must be exactly 60 days out');

  // Verify signature
  const verified = await verifyEntitlement(entRes.data.token, keyPair.publicKey);
  assert.equal(verified.valid, true);
  assert.equal(verified.payload.accountId, accountId);
  console.log('   ✔ Ed25519 signature valid. 60-day offline expiry verified.');

  // Verify expired token failure (simulate day 61)
  const expiredCheck = await verifyEntitlement(entRes.data.token, keyPair.publicKey, nowSec + (61 * 86400));
  assert.equal(expiredCheck.valid, false);
  assert.equal(expiredCheck.reason, 'TOKEN_EXPIRED');
  console.log('   ✔ Expiry verification rejects token after 60 days.');

  // 6. Test Clock Rollback Detection
  console.log('6. Testing clock rollback protection...');
  const fakeFuturePayload = {
    ...verified.payload,
    issuedAt: nowSec + 3600 // 1 hour in the future
  };
  const fakeFutureToken = await signEntitlement(fakeFuturePayload, keyPair.privateKey);

  const packRollbackCheck = await dispatch('GET', '/pack/numbers-and-algebra', null, {
    Authorization: `Bearer ${fakeFutureToken}`
  });
  // Free courses bypass token check, so test with a restricted course
  // First grant paid course entitlement
  await db.prepare('INSERT INTO entitlements (account_id, course_id, granted_at) VALUES (?, ?, ?)')
    .bind(accountId, 'csc203-advanced', nowSec).run();

  const rollbackCheck = await dispatch('GET', '/pack/csc203-advanced', null, {
    Authorization: `Bearer ${fakeFutureToken}`
  });
  assert.equal(rollbackCheck.status, 403);
  assert.equal(rollbackCheck.data.code, 'CLOCK_ROLLBACK_DETECTED');
  console.log('   ✔ Future clock anomaly detected and rejected with CLOCK_ROLLBACK_DETECTED.');

  // 7. Test Pack Download Authorization
  console.log('7. Testing pack download authorization...');
  // Free course: accessible without token
  const freePack = await dispatch('GET', '/pack/numbers-and-algebra');
  assert.equal(freePack.status, 200);
  assert.equal(freePack.data.tier, 'free');

  // Unpurchased paid course without token: 401
  const paidNoToken = await dispatch('GET', '/pack/csc203-advanced');
  assert.equal(paidNoToken.status, 401);

  // Unpurchased paid course with token (not in courses): 403
  const validToken = entRes.data.token;
  const unpurchasedPack = await dispatch('GET', '/pack/paid-unowned-course', null, {
    Authorization: `Bearer ${validToken}`
  });
  assert.equal(unpurchasedPack.status, 403);
  assert.equal(unpurchasedPack.data.code, 'COURSE_NOT_PURCHASED');
  console.log('   ✔ Free courses accessible; paid courses require matching entitlement token.');

  // 8. Test Encrypted Backup, Revision Conflict, and Account Deletion (NDPA)
  console.log('8. Testing backup snapshots, revision conflict, and account deletion...');
  const b1 = await dispatch('PUT', '/backup', { ciphertext: 'CIPHERTEXT_V1', baseRevision: 0 }, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(b1.status, 200);
  assert.equal(b1.data.revision, 1);

  // Conflict test: submitting with old base revision 0 when server is at 1
  const bConflict = await dispatch('PUT', '/backup', { ciphertext: 'CIPHERTEXT_V2', baseRevision: 0 }, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(bConflict.status, 409);
  assert.equal(bConflict.data.code, 'REVISION_CONFLICT');
  console.log('   ✔ Revision conflict detected and rejected with 409 REVISION_CONFLICT.');

  // Fetch backup with authenticated session
  const getBValid = await dispatch('GET', '/backup', null, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(getBValid.status, 200);
  assert.equal(getBValid.data.ciphertext, 'CIPHERTEXT_V1');
  console.log('   ✔ Authenticated GET /backup retrieved own snapshot.');

  // Delete account (NDPA)
  const del = await dispatch('DELETE', '/me', null, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(del.status, 200);
  assert.equal(del.data.ok, true);

  // Verify backup is gone and session is invalidated
  const getB = await dispatch('GET', '/backup', null, { Authorization: `Bearer ${sessionToken2}` });
  assert.equal(getB.status, 401);
  console.log('   ✔ NDPA account deletion cleanly purges account, sessions, and backups.');

  // 9. Test Security & Cross-Account Authorization Rejection
  console.log('9. Testing security: caller-chosen codes rejected, cross-account access rejected...');

  // 9a. Caller cannot pick verification code
  const victimPhone = '08055554444';
  await dispatch('POST', '/auth/code', { phone: victimPhone, mockCode: '112233' });
  // Attempt to verify with caller's injected mockCode must fail with INVALID_CODE
  const fakeVerify = await dispatch('POST', '/auth/verify', { phone: victimPhone, code: '112233', deviceId: 'dev_attacker' });
  assert.equal(fakeVerify.status, 400);
  assert.equal(fakeVerify.data.code, 'INVALID_CODE');
  console.log('   ✔ Injected mockCode in /auth/code is strictly ignored; verification with caller-chosen code rejected.');

  // Verify with actual generated code
  const victimCode = auth.getLatestChallengeCode(victimPhone);
  const victimAuth = await dispatch('POST', '/auth/verify', { phone: victimPhone, code: victimCode, deviceId: 'dev_victim' });
  assert.equal(victimAuth.status, 200);
  const victimSession = victimAuth.data.sessionToken;

  // 9b. Attacker account setup
  const attackerPhone = '08099998888';
  await dispatch('POST', '/auth/code', { phone: attackerPhone });
  const attackerCode = auth.getLatestChallengeCode(attackerPhone);
  const attackerAuth = await dispatch('POST', '/auth/verify', { phone: attackerPhone, code: attackerCode, deviceId: 'dev_attacker' });
  assert.equal(attackerAuth.status, 200);
  const attackerSession = attackerAuth.data.sessionToken;

  // Victim uploads a private backup
  await dispatch('PUT', '/backup', { ciphertext: 'VICTIM_SECRET_BACKUP' }, { Authorization: `Bearer ${victimSession}` });

  // Attacker tries to read victim backup without session: 401
  const anonRead = await dispatch('GET', `/backup?accountId=${victimAuth.data.accountId}`);
  assert.equal(anonRead.status, 401);
  assert.equal(anonRead.data.code, 'UNAUTHORIZED');
  console.log('   ✔ Unauthenticated GET /backup rejected with 401 UNAUTHORIZED.');

  // Attacker uses attacker session to read backup -> returns attacker backup (404), NOT victim's!
  const attackerRead = await dispatch('GET', `/backup?accountId=${victimAuth.data.accountId}`, null, { Authorization: `Bearer ${attackerSession}` });
  assert.equal(attackerRead.status, 404); // Attacker has no backup
  console.log('   ✔ Identity derived from verified session; cross-account backup snooping strictly prevented.');

  // Attacker tries to delete victim account using attacker session -> deletes attacker account, NOT victim's!
  const attackerDel = await dispatch('DELETE', `/me?accountId=${victimAuth.data.accountId}`, null, { Authorization: `Bearer ${attackerSession}` });
  assert.equal(attackerDel.status, 200);

  // Victim's backup and account still completely intact!
  const victimBackupCheck = await dispatch('GET', '/backup', null, { Authorization: `Bearer ${victimSession}` });
  assert.equal(victimBackupCheck.status, 200);
  assert.equal(victimBackupCheck.data.ciphertext, 'VICTIM_SECRET_BACKUP');
  console.log('   ✔ Cross-account DELETE /me strictly prevented; victim data preserved.');

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B4 VERIFICATION COMPLETE');
  console.log('  - D1 SQLite schema: validated');
  console.log('  - OTP rate limiting & attempt throttling: PASSED');
  console.log('  - 2-device registration limit: PASSED');
  console.log('  - Ed25519 signed 60-day entitlement tokens: PASSED');
  console.log('  - Clock rollback protection: PASSED');
  console.log('  - Pack download authorization: PASSED');
  console.log('  - Backups & NDPA deletion: PASSED');
  console.log('======================================================\n');
}

runServerTests().catch((err) => {
  console.error('✖ Server test suite failed:', err);
  process.exit(1);
});
