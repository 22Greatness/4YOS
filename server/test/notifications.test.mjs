// Automated test suite for Section 17 Step B8: Notifications & Honest Persuasion.
// Tests:
// - Default notification preferences (opt-in default false, quiet hours 10pm - 7am)
// - Preference updates (opt-in, study hour, one-tap mute)
// - Web Push endpoint registration
// - Quiet hours enforcement (10:00 PM – 7:00 AM)
// - Strict daily frequency cap: maximum 1 notification per calendar day
// - Honest persuasion content policy (rejection of manipulative / guilt-trip copy)

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createMemoryD1 } from '../src/db.ts';
import { AuthService } from '../src/auth.ts';
import { handleRequest } from '../src/routes.ts';
import { generateEd25519KeyPair } from '../src/crypto.ts';
import { NotificationService } from '../src/notifications.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

async function runNotificationTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B8: Notifications Tests...');
  console.log('======================================================');

  // 1. Initialize server and database
  console.log('1. Setting up D1 database and server context...');
  const db = await createMemoryD1(schemaSql);
  const auth = new AuthService(db);
  const notifications = new NotificationService(db);
  const keyPair = await generateEd25519KeyPair();

  const ctx = {
    db,
    auth,
    notifications,
    ed25519PrivateKey: keyPair.privateKey,
    ed25519PublicKey: keyPair.publicKey,
  };

  const accountId = 'acc_persuasion_user';
  await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .bind(accountId, '+2348011223344', Date.now(), Date.now())
    .run();

  // 2. Test default preferences
  console.log('2. Checking default notification preferences (opt-in = 0, quiet hours 22-7)...');
  const getPrefReq = new Request(`http://localhost/notifications/preferences?accountId=${accountId}`, {
    method: 'GET',
  });
  const getPrefRes = await handleRequest(getPrefReq, ctx);
  assert.equal(getPrefRes.status, 200);
  const prefData = await getPrefRes.json();
  assert.equal(prefData.ok, true);
  assert.equal(prefData.preferences.opt_in, 0); // Default off
  assert.equal(prefData.preferences.muted, 0);
  assert.equal(prefData.preferences.study_hour, 20); // 8:00 PM default
  assert.equal(prefData.preferences.quiet_hours_start, 22); // 10:00 PM
  assert.equal(prefData.preferences.quiet_hours_end, 7); // 7:00 AM
  console.log('   ✔ Default preferences verified: opt-in disabled by default, quiet hours 10pm-7am.');

  // 3. Test sending notification before opt-in -> rejected
  console.log('3. Verifying notification is rejected before learner opts in...');
  const unoptedReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'study_time',
        title: 'Study Time',
        body: 'Your 8:00 PM session is ready.',
      },
      timeOverride: { hour: 20, dateStr: '2026-11-07' },
    }),
  });
  const unoptedRes = await handleRequest(unoptedReq, ctx);
  assert.equal(unoptedRes.status, 403);
  const unoptedData = await unoptedRes.json();
  assert.equal(unoptedData.ok, false);
  assert.ok(unoptedData.reason.includes('not opted in'));
  console.log('   ✔ Successfully blocked notification when not opted in.');

  // 4. Test Web Push subscription endpoint registration
  console.log('4. Registering Web Push subscription endpoint...');
  const subReq = new Request('http://localhost/notifications/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      subscription: {
        endpoint: 'https://fcm.googleapis.com/fcm/send/sample_push_token_4yos',
        keys: {
          p256dh: 'BNcRdreALRF8JxQC8zq00q3qCCBQUWqNloSJ9tTU2Pw',
          auth: 'tBHItJI5svbpez7KI4CCXg',
        },
      },
    }),
  });
  const subRes = await handleRequest(subReq, ctx);
  assert.equal(subRes.status, 200);
  const subData = await subRes.json();
  assert.equal(subData.subscribed, true);

  // Check that subscription automatically activated opt-in
  const prefAfterSub = await notifications.getPreferences(accountId);
  assert.equal(prefAfterSub.opt_in, 1);
  console.log('   ✔ Subscription registered and opt-in enabled.');

  // 5. Test quiet hours suppression (10:00 PM – 7:00 AM)
  console.log('5. Testing quiet hours enforcement (10pm-7am)...');
  // Attempt at 11:30 PM (hour 23)
  const quietReq1 = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'study_time',
        title: 'Study Time',
        body: 'Evening study reminder.',
      },
      timeOverride: { hour: 23, dateStr: '2026-11-07' },
    }),
  });
  const quietRes1 = await handleRequest(quietReq1, ctx);
  assert.equal(quietRes1.status, 403);
  const quietData1 = await quietRes1.json();
  assert.ok(quietData1.reason.includes('Quiet hours active'));

  // Attempt at 5:00 AM (hour 5)
  const quietReq2 = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'cards_due',
        title: 'Review Cards',
        body: 'Your cards are ready.',
      },
      timeOverride: { hour: 5, dateStr: '2026-11-07' },
    }),
  });
  const quietRes2 = await handleRequest(quietReq2, ctx);
  assert.equal(quietRes2.status, 403);
  const quietData2 = await quietRes2.json();
  assert.ok(quietData2.reason.includes('Quiet hours active'));
  console.log('   ✔ Quiet hours strictly enforced (night hours 23:00 and 05:00 blocked).');

  // 6. Test manipulative content rejection (Honest Persuasion Policy)
  console.log('6. Testing rejection of manipulative / guilt-trip notification copy...');
  const badReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'study_time',
        title: 'Warning!',
        body: "You're about to lose everything if you don't open the app now!",
      },
      timeOverride: { hour: 15, dateStr: '2026-11-07' },
    }),
  });
  const badRes = await handleRequest(badReq, ctx);
  assert.equal(badRes.status, 403);
  const badData = await badRes.json();
  assert.ok(badData.reason.includes('honest persuasion'));
  console.log('   ✔ Manipulative copy ("lose everything") rejected by server policy.');

  // 7. Test valid notification delivery
  console.log('7. Sending valid notification within permitted hours...');
  const validReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'study_time',
        title: 'Study Time',
        body: 'Your scheduled 8:00 PM session is ready.',
      },
      timeOverride: { hour: 20, dateStr: '2026-11-07' },
    }),
  });
  const validRes = await handleRequest(validReq, ctx);
  assert.equal(validRes.status, 200);
  const validData = await validRes.json();
  assert.equal(validData.sent, true);
  console.log('   ✔ Valid study reminder successfully dispatched.');

  // 8. Test strict 1/day frequency cap
  console.log('8. Testing strict 1 notification per day cap...');
  const secondReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'circle_ginger',
        title: 'Ginger from a Friend',
        body: 'Chidi sent you a ginger!',
      },
      timeOverride: { hour: 21, dateStr: '2026-11-07' },
    }),
  });
  const secondRes = await handleRequest(secondReq, ctx);
  assert.equal(secondRes.status, 403);
  const secondData = await secondRes.json();
  assert.ok(secondData.reason.includes('maximum 1 notification per calendar day'));
  console.log('   ✔ Second notification on same calendar date strictly blocked by 1/day cap.');

  // 9. Next calendar day: allowed again
  console.log('9. Checking delivery is allowed on the next calendar day...');
  const nextDayReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'circle_ginger',
        title: 'Ginger from a Friend',
        body: 'Chidi sent you a ginger!',
      },
      timeOverride: { hour: 14, dateStr: '2026-11-08' },
    }),
  });
  const nextDayRes = await handleRequest(nextDayReq, ctx);
  assert.equal(nextDayRes.status, 200);
  const nextDayData = await nextDayRes.json();
  assert.equal(nextDayData.sent, true);
  console.log('   ✔ Next calendar day delivery succeeded.');

  // 10. Test one-tap mute
  console.log('10. Testing one-tap mute toggle...');
  const muteReq = new Request('http://localhost/notifications/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      muted: true,
    }),
  });
  const muteRes = await handleRequest(muteReq, ctx);
  assert.equal(muteRes.status, 200);
  const muteData = await muteRes.json();
  assert.equal(muteData.preferences.muted, 1);

  // Attempt delivery while muted
  const mutedSendReq = new Request('http://localhost/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      payload: {
        type: 'study_time',
        title: 'Study Time',
        body: 'Session ready.',
      },
      timeOverride: { hour: 15, dateStr: '2026-11-09' },
    }),
  });
  const mutedSendRes = await handleRequest(mutedSendReq, ctx);
  assert.equal(mutedSendRes.status, 403);
  const mutedSendData = await mutedSendRes.json();
  assert.ok(mutedSendData.reason.includes('muted'));
  console.log('   ✔ One-tap mute immediately blocks all notifications.');

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B8 NOTIFICATION VERIFICATION COMPLETE');
  console.log('  - Default opt-in disabled: PASSED');
  console.log('  - Quiet hours 10pm-7am suppression: PASSED');
  console.log('  - Strict 1/day frequency cap: PASSED');
  console.log('  - Manipulative copy rejection: PASSED');
  console.log('  - One-tap mute: PASSED');
  console.log('======================================================\n');
}

runNotificationTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
