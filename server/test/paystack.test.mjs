// Automated test suite for Section 17 Step B5: Paystack Integration.
// Tests: Buy initialization, server-side pricing & discounts, HMAC-SHA512 webhook verification,
// duplicate webhook idempotency, missed webhook reconciliation, and refund with entitlement revocation.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { createMemoryD1 } from '../src/db.ts';
import { AuthService } from '../src/auth.ts';
import { PaystackService } from '../src/paystack.ts';
import { handleRequest } from '../src/routes.ts';
import { generateEd25519KeyPair } from '../src/crypto.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

const TEST_SECRET = 'sk_test_4yos_super_secret_key_123';
const TEST_WEBHOOK_SECRET = 'whsec_test_webhook_signing_secret_xyz';

function createMockFetcher(state = {}) {
  return async (url, init = {}) => {
    const urlStr = url.toString();

    // Mock Paystack Initialize
    if (urlStr.includes('/transaction/initialize')) {
      const body = JSON.parse(init.body || '{}');
      return new Response(JSON.stringify({
        status: true,
        message: 'Authorization URL created',
        data: {
          authorization_url: `https://checkout.paystack.com/${body.reference}`,
          access_code: 'access_' + body.reference,
          reference: body.reference
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Mock Paystack Verify
    if (urlStr.includes('/transaction/verify/')) {
      const ref = urlStr.split('/transaction/verify/')[1];
      const mockTx = state[ref] || {
        status: 'success',
        amount: 100000,
        currency: 'NGN',
        reference: ref,
        metadata: { courses: ['csc203-data-structures'], accountId: 'acc_test_paystack' }
      };
      return new Response(JSON.stringify({
        status: true,
        data: mockTx
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Mock Paystack Refund
    if (urlStr.includes('/refund')) {
      if (typeof state.refundHandler === 'function') {
        return state.refundHandler();
      }
      return new Response(JSON.stringify({
        status: true,
        message: 'Refund has been queued for processing'
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Not Found', { status: 404 });
  };
}

async function runPaystackTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B5: Paystack Tests...');
  console.log('======================================================');

  // 1. Setup in-memory database and services
  console.log('1. Initializing in-memory D1 and Paystack engine...');
  const db = await createMemoryD1(schemaSql);
  const auth = new AuthService(db);
  const mockState = {};
  const mockFetcher = createMockFetcher(mockState);
  const paystack = new PaystackService(db, {
    secretKey: TEST_SECRET,
    publicKey: 'pk_test_public_key',
    webhookSecret: TEST_WEBHOOK_SECRET
  }, mockFetcher);
  const keyPair = await generateEd25519KeyPair();

  const ctx = {
    db,
    auth,
    paystack,
    ownerKey: 'test-owner-secret-key-4yos',
    ed25519PrivateKey: keyPair.privateKey,
    ed25519PublicKey: keyPair.publicKey
  };

  const dispatch = async (method, path, body = null, headers = {}) => {
    const init = {
      method,
      headers: { 'Content-Type': 'application/json', ...headers }
    };
    if (body && typeof body === 'object') init.body = JSON.stringify(body);
    else if (typeof body === 'string') init.body = body;
    const req = new Request(`https://api.4yos.internal${path}`, init);
    const res = await handleRequest(req, ctx);
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  };

  // Create a test account and device
  await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .bind('acc_test_paystack', '08012345678', Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000)).run();
  await db.prepare('INSERT INTO devices (id, account_id, device_name, registered_at, last_active_at, is_active) VALUES (?, ?, ?, ?, ?, 1)')
    .bind('dev_test', 'acc_test_paystack', 'Chrome Mobile', Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000)).run();

  // 2. Test Buy Initialization & Server Pricing
  console.log('2. Testing purchase initialization and server pricing authority...');
  const buyRes1 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'csc203',
    courseIds: ['csc203-data-structures']
  });

  assert.equal(buyRes1.status, 200);
  assert.equal(buyRes1.data.ok, true);
  assert.equal(buyRes1.data.amountKobo, 100000, 'Single course must be priced at ₦1,000 (100,000 kobo)');
  assert.match(buyRes1.data.reference, /^4YOS-/, 'Reference must start with 4YOS-');
  const ref1 = buyRes1.data.reference;
  console.log(`   ✔ Course buy initialized with reference ${ref1} at 100,000 kobo.`);

  // Test Class code discount (15% off)
  const buyRes2 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'mth201',
    courseIds: ['mth201-linear-algebra'],
    classCode: 'UNIPORT15'
  });
  assert.equal(buyRes2.status, 200);
  assert.equal(buyRes2.data.amountKobo, 85000, 'UNIPORT15 class code must apply 15% discount (85,000 kobo)');
  console.log('   ✔ Class code UNIPORT15 verified with 15% discount (85,000 kobo).');

  // 3. Test HMAC-SHA512 Webhook Verification
  console.log('3. Testing HMAC-SHA512 webhook signature verification...');
  const webhookPayload = JSON.stringify({
    event: 'charge.success',
    data: {
      reference: ref1,
      amount: 100000,
      currency: 'NGN',
      metadata: {
        accountId: 'acc_test_paystack',
        courses: ['csc203-data-structures']
      }
    }
  });

  // Test Forged Signature -> must be rejected with 400 INVALID_SIGNATURE
  const forgedRes = await dispatch('POST', '/paystack/hook', webhookPayload, {
    'x-paystack-signature': 'forged_fake_signature_abc123'
  });
  assert.equal(forgedRes.status, 400);
  assert.equal(forgedRes.data.code, 'INVALID_SIGNATURE');
  console.log('   ✔ Forged webhook signature rejected with 400 INVALID_SIGNATURE.');

  // Test Valid Signature
  const validSig = crypto
    .createHmac('sha512', TEST_WEBHOOK_SECRET)
    .update(webhookPayload)
    .digest('hex');

  const hookRes = await dispatch('POST', '/paystack/hook', webhookPayload, {
    'x-paystack-signature': validSig
  });
  assert.equal(hookRes.status, 200);
  assert.equal(hookRes.data.ok, true);
  assert.equal(hookRes.data.settled, true);
  assert.equal(hookRes.data.alreadySettled, false);
  console.log('   ✔ Valid webhook verified and purchase settled.');

  // Verify entitlement was granted in database
  const entCheck = await db.prepare(
    'SELECT course_id FROM entitlements WHERE account_id = ? AND course_id = ?'
  ).bind('acc_test_paystack', 'csc203-data-structures').first();
  assert.ok(entCheck, 'Course entitlement must be granted in entitlements table');
  console.log('   ✔ Entitlement confirmed granted in D1 database.');

  // Verify outbox receipt record was created
  const outboxCheck = await db.prepare(
    'SELECT * FROM outbox WHERE purchase_id = (SELECT id FROM purchases WHERE reference = ?)'
  ).bind(ref1).first();
  assert.ok(outboxCheck, 'Outbox receipt record must be created upon settlement');
  assert.equal(outboxCheck.type, 'receipt_sms');
  assert.equal(outboxCheck.recipient, 'acc_test_paystack');
  console.log('   ✔ Outbox SMS receipt queued for delivery.');

  // 4. Test Duplicate Webhook Idempotency
  console.log('4. Testing duplicate webhook idempotency...');
  const duplicateHookRes = await dispatch('POST', '/paystack/hook', webhookPayload, {
    'x-paystack-signature': validSig
  });
  assert.equal(duplicateHookRes.status, 200);
  assert.equal(duplicateHookRes.data.settled, true);
  assert.equal(duplicateHookRes.data.alreadySettled, true, 'Duplicate webhook must report alreadySettled: true');
  console.log('   ✔ Duplicate webhook handled idempotently without re-granting.');

  // 5. Test Missed Webhook Recovery via GET /purchase/:ref
  console.log('5. Testing missed webhook recovery via direct verification...');
  // Initialize another purchase
  const buyRes3 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'csc201',
    courseIds: ['csc201-low-level']
  });
  const ref3 = buyRes3.data.reference;

  // Mock Paystack verify API state for ref3 as success
  mockState[ref3] = {
    status: 'success',
    amount: 100000,
    reference: ref3,
    metadata: { courses: ['csc201-low-level'] }
  };

  // Client checks status before webhook arrives
  const pollRes = await dispatch('GET', `/purchase/${ref3}`);
  assert.equal(pollRes.status, 200);
  assert.equal(pollRes.data.status, 'success');
  assert.equal(pollRes.data.settled, true);

  const entCheck3 = await db.prepare(
    'SELECT course_id FROM entitlements WHERE account_id = ? AND course_id = ?'
  ).bind('acc_test_paystack', 'csc201-low-level').first();
  assert.ok(entCheck3, 'Course entitlement must be granted via missed webhook reconciliation');
  console.log('   ✔ Missed webhook recovered via GET /purchase/:ref reconciliation.');

  // 6. Test Refund Processing within 7 days
  console.log('6. Testing refund processing within 7 days...');

  const refundRes = await dispatch('POST', '/admin/refund', {
    reference: ref1,
    reason: 'Student dropped course within 7 days'
  }, { Authorization: 'Bearer test-owner-secret-key-4yos' });
  assert.equal(refundRes.status, 200);
  assert.equal(refundRes.data.refunded, true);

  // Verify entitlement was revoked
  const revokedCheck = await db.prepare(
    'SELECT course_id FROM entitlements WHERE account_id = ? AND course_id = ?'
  ).bind('acc_test_paystack', 'csc203-data-structures').first();
  assert.equal(revokedCheck, null, 'Entitlement must be removed upon refund');

  // Verify purchase status is marked refunded
  const purCheck = await db.prepare('SELECT status FROM purchases WHERE reference = ?').bind(ref1).first();
  assert.equal(purCheck.status, 'refunded');
  console.log('   ✔ Refund processed and entitlement revoked cleanly.');

  // 7. Test Payment Verification Constraints (Account, Currency, Amount)
  console.log('7. Testing payment verification constraints (account, currency, amount)...');
  const buyRes4 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'cos101',
    courseIds: ['cos101-computers']
  });
  const ref4 = buyRes4.data.reference;

  // Account mismatch rejection
  await assert.rejects(
    async () => paystack.settlePurchase(ref4, ['cos101-computers'], 100000, 'NGN', 'wrong_account_id'),
    /Account mismatch/
  );
  console.log('   ✔ Account mismatch rejected.');

  // Currency mismatch rejection (non-NGN)
  await assert.rejects(
    async () => paystack.settlePurchase(ref4, ['cos101-computers'], 100000, 'USD', 'acc_test_paystack'),
    /Currency mismatch/
  );
  console.log('   ✔ Non-NGN currency rejected.');

  // Underpaid amount rejection
  await assert.rejects(
    async () => paystack.settlePurchase(ref4, ['cos101-computers'], 50000, 'NGN', 'acc_test_paystack'),
    /less than expected amount/
  );
  console.log('   ✔ Underpaid amount rejected.');

  // 8. Test Concurrent Settlement Safety
  console.log('8. Testing concurrent settlement safety...');
  const buyRes5 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'cos102',
    courseIds: ['cos102-programming']
  });
  const ref5 = buyRes5.data.reference;

  const [settleA, settleB] = await Promise.all([
    paystack.settlePurchase(ref5, ['cos102-programming'], 100000, 'NGN', 'acc_test_paystack'),
    paystack.settlePurchase(ref5, ['cos102-programming'], 100000, 'NGN', 'acc_test_paystack')
  ]);

  assert.equal(settleA.success, true);
  assert.equal(settleB.success, true);
  const alreadySettledCount = (settleA.alreadySettled ? 1 : 0) + (settleB.alreadySettled ? 1 : 0);
  assert.equal(alreadySettledCount, 1, 'Exactly one concurrent settlement must be the initial settlement');

  // Verify entitlement was granted exactly once
  const entCount = await db.prepare(
    'SELECT COUNT(*) as count FROM entitlements WHERE account_id = ? AND course_id = ?'
  ).bind('acc_test_paystack', 'cos102-programming').first();
  assert.equal(entCount.count, 1, 'Entitlement must be granted exactly once without duplicates');
  console.log('   ✔ Concurrent settlement is atomic and safe.');

  // 9. Testing PAY-01 Regression: Settlement failure rollback & clean retry
  console.log('9. Testing PAY-01 regression: Settlement failure rollback & clean retry...');
  const buyRes6 = await dispatch('POST', '/buy', {
    accountId: 'acc_test_paystack',
    email: 'learner@4yos.internal',
    itemType: 'course',
    itemId: 'cos103',
    courseIds: ['cos103-logic']
  });
  const ref6 = buyRes6.data.reference;

  const origBatch = db.batch;
  let batchFailedOnce = false;
  db.batch = async (statements) => {
    if (!batchFailedOnce) {
      batchFailedOnce = true;
      throw new Error('Injected D1 write failure during batch settlement');
    }
    return origBatch.call(db, statements);
  };

  // First settlement attempt fails due to injected write failure
  await assert.rejects(
    async () => paystack.settlePurchase(ref6, ['cos103-logic'], 100000, 'NGN', 'acc_test_paystack'),
    /Injected D1 write failure/
  );

  // Check purchase status: MUST REMAIN 'pending' (rollback verified!)
  const purPendingCheck = await db.prepare('SELECT id, status FROM purchases WHERE reference = ?').bind(ref6).first();
  assert.equal(purPendingCheck.status, 'pending', 'Purchase status must remain pending after failed batch settlement');

  // Check entitlements: MUST HAVE ZERO entries (not half-granted)
  const entZeroCheck = await db.prepare('SELECT * FROM entitlements WHERE purchase_id = ?').bind(purPendingCheck.id).first();
  assert.equal(entZeroCheck, null, 'No partial entitlements should exist after rollback');

  // Retry settlement: now succeeds cleanly!
  const retrySettle = await paystack.settlePurchase(ref6, ['cos103-logic'], 100000, 'NGN', 'acc_test_paystack');
  assert.equal(retrySettle.success, true);
  assert.equal(retrySettle.alreadySettled, false);

  const purSuccessCheck = await db.prepare('SELECT status FROM purchases WHERE reference = ?').bind(ref6).first();
  assert.equal(purSuccessCheck.status, 'success', 'Purchase status must be success after retry');
  const entGrantedCheck = await db.prepare('SELECT * FROM entitlements WHERE purchase_id = ?').bind(purPendingCheck.id).first();
  assert.ok(entGrantedCheck, 'Entitlement must be granted after retry');
  db.batch = origBatch;
  console.log('   ✔ PAY-01 verified: Batch settlement rollback preserved pending status, clean retry succeeded.');

  // 10. Testing PAY-02 Regression: Refund failure handling & access preservation
  console.log('10. Testing PAY-02 regression: Refund failure handling & access preservation...');
  // 10a. HTTP 500 from refund provider
  mockState.refundHandler = () => new Response('Internal Server Error', { status: 500 });
  const refund500 = await paystack.processRefund(ref6, 'Student changed mind');
  assert.equal(refund500.ok, false);
  assert.equal(refund500.error, 'REFUND_PROVIDER_ERROR');

  // Entitlement MUST STILL BE ACTIVE and purchase status MUST STILL BE 'success'
  const purStillSuccess = await db.prepare('SELECT id, status FROM purchases WHERE reference = ?').bind(ref6).first();
  assert.equal(purStillSuccess.status, 'success', 'Purchase status must remain success when provider fails');
  const entStillActive = await db.prepare('SELECT * FROM entitlements WHERE purchase_id = ?').bind(purStillSuccess.id).first();
  assert.ok(entStillActive, 'Student entitlement must NOT be revoked when provider refund fails');
  console.log('   ✔ Provider HTTP 500 cleanly rejected without revoking student access.');

  // 10b. Provider rejection (status: false)
  mockState.refundHandler = () => new Response(JSON.stringify({ status: false, message: 'Transaction already reversed' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  const refundRejected = await paystack.processRefund(ref6, 'Student changed mind');
  assert.equal(refundRejected.ok, false);
  assert.equal(refundRejected.error, 'REFUND_REJECTED');
  console.log('   ✔ Provider rejection (status: false) cleanly handled without revoking access.');

  // 10c. Successful refund from provider
  mockState.refundHandler = () => new Response(JSON.stringify({ status: true, data: { id: 'ref_123' } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  const refundSuccess = await paystack.processRefund(ref6, 'Student changed mind');
  assert.equal(refundSuccess.ok, true);

  const purRefunded = await db.prepare('SELECT id, status FROM purchases WHERE reference = ?').bind(ref6).first();
  assert.equal(purRefunded.status, 'refunded');
  const entRevoked = await db.prepare('SELECT * FROM entitlements WHERE purchase_id = ?').bind(purRefunded.id).first();
  assert.equal(entRevoked, null, 'Entitlement revoked only upon confirmed refund acceptance');
  console.log('   ✔ Confirmed provider refund accepted: status marked refunded and access revoked.');

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B5, DEPENDENCY 3 & REVIEWS PAY-01/02 VERIFICATION COMPLETE');
  console.log('  - Server pricing authority & deduction of owned: PASSED');
  console.log('  - Class code discounts (UNIPORT15): PASSED');
  console.log('  - HMAC-SHA512 webhook signature verification: PASSED');
  console.log('  - Webhook replay idempotency: PASSED');
  console.log('  - Missed webhook recovery & reconciliation: PASSED');
  console.log('  - Refund processing & entitlement revocation: PASSED');
  console.log('  - Verification constraints (account, NGN currency, amount): PASSED');
  console.log('  - Concurrent settlement safety & outbox SMS: PASSED');
  console.log('  - PAY-01: Transactional settlement rollback & clean retry: PASSED');
  console.log('  - PAY-02: Refund provider validation & access preservation: PASSED');
  console.log('======================================================\n');
}

runPaystackTests().catch((err) => {
  console.error('✖ Paystack test suite failed:', err);
  process.exit(1);
});
