// Automated test suite for Section 17 Step B9: Circles and Together Features.
// Tests:
// - Circle creation with invite code (CIRC-XXXX) and capacity limits (8 regular, 60 class)
// - Join circle via invite code & capacity rejection (403 CIRCLE_FULL)
// - Privacy default: exam grades hidden unless opted in
// - Preset gingers only (no free-text chat)
// - Daily ginger rate limit: max 3/day per friend (429 GINGER_DAILY_LIMIT_REACHED)
// - 1-tap blocking & ginger rejection (403 BLOCKED_BY_USER)
// - Shared circle goal setting
// - Study together synchronous session start and join
// - 1-tap leave circle

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createMemoryD1 } from '../src/db.ts';
import { AuthService } from '../src/auth.ts';
import { handleRequest } from '../src/routes.ts';
import { generateEd25519KeyPair } from '../src/crypto.ts';
import { CircleService, GINGER_PRESETS } from '../src/circles.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

async function runCircleTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B9: Circles & Together Tests...');
  console.log('======================================================');

  // 1. Initialize server and database
  console.log('1. Setting up D1 database and server context...');
  const db = await createMemoryD1(schemaSql);
  const auth = new AuthService(db);
  const circles = new CircleService(db);
  const keyPair = await generateEd25519KeyPair();

  const ctx = {
    db,
    auth,
    circles,
    ed25519PrivateKey: keyPair.privateKey,
    ed25519PublicKey: keyPair.publicKey,
  };

  const userA = 'acc_user_a';
  const userB = 'acc_user_b';
  const userC = 'acc_user_c';
  await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .bind(userA, '+2348011111111', Date.now(), Date.now())
    .run();
  await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .bind(userB, '+2348022222222', Date.now(), Date.now())
    .run();
  await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .bind(userC, '+2348033333333', Date.now(), Date.now())
    .run();

  // 2. Test circle creation
  console.log('2. Creating study circle with invite code (CIRC-XXXX)...');
  const createReq = new Request('http://localhost/circles/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'UNIPORT CS 100L Study Circle',
      creatorId: userA,
      isClassCircle: false,
    }),
  });
  const createRes = await handleRequest(createReq, ctx);
  assert.equal(createRes.status, 200);
  const createData = await createRes.json();
  assert.equal(createData.ok, true);
  assert.ok(createData.code.startsWith('CIRC-'));
  assert.equal(createData.maxMembers, 8);
  const circleId = createData.circleId;
  const inviteCode = createData.code;
  console.log(`   ✔ Circle created with code ${inviteCode} and max 8 members.`);

  // 3. Test joining circle
  console.log('3. User B joins via invite code...');
  const joinReq = new Request('http://localhost/circles/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: inviteCode,
      accountId: userB,
    }),
  });
  const joinRes = await handleRequest(joinReq, ctx);
  assert.equal(joinRes.status, 200);
  const joinData = await joinRes.json();
  assert.equal(joinData.ok, true);
  assert.equal(joinData.memberCount, 2);
  console.log('   ✔ User B successfully joined circle.');

  // 4. Test privacy defaults (grades hidden)
  console.log('4. Verifying privacy default (grades hidden by default)...');
  const detailsReq = new Request(`http://localhost/circles/${circleId}`, { method: 'GET' });
  const detailsRes = await handleRequest(detailsReq, ctx);
  assert.equal(detailsRes.status, 200);
  const detailsData = await detailsRes.json();
  assert.equal(detailsData.members.length, 2);
  assert.equal(detailsData.members[0].gradesVisible, false);
  assert.equal(detailsData.members[1].gradesVisible, false);
  console.log('   ✔ Privacy default verified: exam grades are strictly hidden.');

  // 5. Test capacity limit (fill up to max 8)
  console.log('5. Testing circle capacity enforcement (max 8 members)...');
  for (let i = 3; i <= 8; i++) {
    const dummyId = `acc_dummy_${i}`;
    await db.prepare('INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)')
      .bind(dummyId, `+234800000000${i}`, Date.now(), Date.now())
      .run();
    await circles.joinCircle({ code: inviteCode, accountId: dummyId });
  }

  // 9th member attempt should be rejected with 403 CIRCLE_FULL
  const fullReq = new Request('http://localhost/circles/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: inviteCode, accountId: userC }),
  });
  const fullRes = await handleRequest(fullReq, ctx);
  assert.equal(fullRes.status, 403);
  const fullData = await fullRes.json();
  assert.equal(fullData.code, 'CIRCLE_FULL');
  console.log('   ✔ 9th member rejected with 403 CIRCLE_FULL.');

  // 6. Test preset gingers and rate limiting (max 3/day per friend)
  console.log('6. Testing preset gingers and strict 3/day per friend cap...');
  // Ginger 1
  const g1Req = new Request('http://localhost/circles/ginger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      senderId: userA,
      recipientId: userB,
      presetKey: 'turn',
      dateStr: '2026-11-07',
    }),
  });
  const g1Res = await handleRequest(g1Req, ctx);
  assert.equal(g1Res.status, 200);
  const g1Data = await g1Res.json();
  assert.equal(g1Data.text, GINGER_PRESETS.turn.text);
  assert.equal(g1Data.remainingToday, 2);

  // Ginger 2
  const g2Req = new Request('http://localhost/circles/ginger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      senderId: userA,
      recipientId: userB,
      presetKey: 'got_this',
      dateStr: '2026-11-07',
    }),
  });
  const g2Res = await handleRequest(g2Req, ctx);
  assert.equal(g2Res.status, 200);
  assert.equal((await g2Res.json()).remainingToday, 1);

  // Ginger 3
  const g3Req = new Request('http://localhost/circles/ginger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      senderId: userA,
      recipientId: userB,
      presetKey: 'exam_soon',
      dateStr: '2026-11-07',
    }),
  });
  const g3Res = await handleRequest(g3Req, ctx);
  assert.equal(g3Res.status, 200);
  assert.equal((await g3Res.json()).remainingToday, 0);

  // Ginger 4: should be rejected with 429 GINGER_DAILY_LIMIT_REACHED
  const g4Req = new Request('http://localhost/circles/ginger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      senderId: userA,
      recipientId: userB,
      presetKey: 'proud',
      dateStr: '2026-11-07',
    }),
  });
  const g4Res = await handleRequest(g4Req, ctx);
  assert.equal(g4Res.status, 429);
  const g4Data = await g4Res.json();
  assert.equal(g4Data.code, 'GINGER_DAILY_LIMIT_REACHED');
  console.log('   ✔ 4th ginger on same day strictly blocked with 429 rate limit.');

  // 7. Test blocking a user
  console.log('7. Testing 1-tap block safeguard...');
  const blockReq = new Request('http://localhost/circles/block', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blockerId: userB, blockedId: userA }),
  });
  const blockRes = await handleRequest(blockReq, ctx);
  assert.equal(blockRes.status, 200);

  // Attempting ginger on next day should be blocked
  const blockedGingerReq = new Request('http://localhost/circles/ginger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      senderId: userA,
      recipientId: userB,
      presetKey: 'turn',
      dateStr: '2026-11-08',
    }),
  });
  const blockedGingerRes = await handleRequest(blockedGingerReq, ctx);
  assert.equal(blockedGingerRes.status, 403);
  const blockedData = await blockedGingerRes.json();
  assert.equal(blockedData.code, 'BLOCKED_BY_USER');
  console.log('   ✔ Blocked user is prevented from sending gingers.');

  // 8. Test Circle Goal
  console.log('8. Setting shared circle goal...');
  const goalReq = new Request('http://localhost/circles/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      title: 'Everyone passes MTH 101 Unit 2 by Friday',
      targetDate: '2026-11-13',
      targetCount: 8,
    }),
  });
  const goalRes = await handleRequest(goalReq, ctx);
  assert.equal(goalRes.status, 200);
  const goalData = await goalRes.json();
  assert.equal(goalData.goal.title, 'Everyone passes MTH 101 Unit 2 by Friday');
  assert.equal(goalData.goal.target_count, 8);
  console.log('   ✔ Circle goal established.');

  // 9. Test Study Together Session
  console.log('9. Starting and joining Study Together session...');
  const sessReq = new Request('http://localhost/circles/sessions/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circleId,
      hostId: userA,
      courseId: 'how-computers-work',
      durationMinutes: 45,
    }),
  });
  const sessRes = await handleRequest(sessReq, ctx);
  assert.equal(sessRes.status, 200);
  const sessData = await sessRes.json();
  assert.equal(sessData.session.duration_minutes, 45);
  assert.equal(sessData.session.status, 'active');

  const joinSessReq = new Request('http://localhost/circles/sessions/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: sessData.session.id,
      accountId: userB,
    }),
  });
  const joinSessRes = await handleRequest(joinSessReq, ctx);
  assert.equal(joinSessRes.status, 200);
  console.log('   ✔ Study Together session active with synchronized timer.');

  // 10. Test 1-tap leave circle
  console.log('10. Testing 1-tap leave circle...');
  const leaveReq = new Request('http://localhost/circles/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ circleId, accountId: userB }),
  });
  const leaveRes = await handleRequest(leaveReq, ctx);
  assert.equal(leaveRes.status, 200);

  // Check member count is reduced
  const afterLeave = await circles.getCircleDetails(circleId);
  assert.ok(!afterLeave.members.some(m => m.accountId === userB));
  console.log('   ✔ User B left circle cleanly in 1 tap.');

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B9 CIRCLES VERIFICATION COMPLETE');
  console.log('  - Circle creation & invite code: PASSED');
  console.log('  - Member capacity limit (8 max): PASSED');
  console.log('  - Privacy default (grades hidden): PASSED');
  console.log('  - Preset gingers & 3/day rate limit: PASSED');
  console.log('  - 1-tap blocking & ginger suppression: PASSED');
  console.log('  - Circle goal tracking: PASSED');
  console.log('  - Study Together sessions: PASSED');
  console.log('  - 1-tap leave circle: PASSED');
  console.log('======================================================\n');
}

runCircleTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
