// Automated test suite for Section 17 Step B6: Backup and Offline Merge Sync.
// Verifies Section 14 merge rules:
// - Two devices offline, then both sync: zero data loss
// - Passes kept from either device
// - Best scores win
// - Notes keep latest edit per note
// - Reviews combined without duplication
// - Deletion tombstones respected (no resurrecting deleted items)
// - Server revision conflict detection (409) and resolution

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createMemoryD1 } from '../src/db.ts';
import { AuthService } from '../src/auth.ts';
import { handleRequest } from '../src/routes.ts';
import { generateEd25519KeyPair } from '../src/crypto.ts';
import { mergeSnapshots, getAssessmentOutcomes } from '../src/sync.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schemaSql = fs.readFileSync(path.resolve(root, 'server/src/schema.sql'), 'utf8');

async function runSyncTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B6: Backup & Sync Tests...');
  console.log('======================================================');

  // 1. Initialize server and database
  console.log('1. Setting up D1 database and server context...');
  const db = await createMemoryD1(schemaSql);
  const auth = new AuthService(db);
  const keyPair = await generateEd25519KeyPair();

  const ctx = {
    db,
    auth,
    ed25519PrivateKey: keyPair.privateKey,
    ed25519PublicKey: keyPair.publicKey
  };

  const phone = '08055551234';
  await auth.requestVerificationCode(phone);
  const code = auth.getLatestChallengeCode(phone);
  const authRes = await auth.verifyCodeAndRegisterDevice(phone, code, 'dev_sync_1', 'Test Device');
  const accountId = authRes.accountId;
  const sessionToken = authRes.sessionToken;

  const dispatch = async (method, path, body = null) => {
    const init = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      }
    };
    if (body) init.body = JSON.stringify(body);
    const req = new Request(`https://api.4yos.internal${path}`, init);
    const res = await handleRequest(req, ctx);
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  };

  const now = Math.floor(Date.now() / 1000);

  // 2. Initial Base State (Revision 1 on Server)
  console.log('2. Creating base snapshot (Revision 1 on server)...');
  const baseSnapshot = {
    accountId,
    timestamp: now,
    attempts: [
      { id: 'att_1', assessmentId: 'mth101_unit1', courseId: 'MTH101', score: 60, passed: false, timestamp: now - 3600 }
    ],
    notes: [
      { id: 'note_1', lessonId: 'na-place-value', content: 'Notes from lecture', updatedAt: now - 3600 }
    ],
    goals: [
      { id: 'goal_1', title: 'Study 30m everyday', targetDate: '2026-11-15', completed: false, updatedAt: now - 3600 },
      { id: 'goal_2', title: 'Pass MTH 101 exam', targetDate: '2026-12-01', completed: false, updatedAt: now - 3600 }
    ],
    reviews: [
      { id: 'rev_1', cardId: 'card_1', rating: 3, reviewedAt: now - 3600 },
      { id: 'rev_2', cardId: 'card_2', rating: 4, reviewedAt: now - 3600 }
    ],
    tombstones: []
  };

  const initialUpload = await dispatch('PUT', '/backup', {
    accountId,
    ciphertext: JSON.stringify(baseSnapshot),
    baseRevision: 0
  });
  assert.equal(initialUpload.status, 200);
  assert.equal(initialUpload.data.revision, 1);
  console.log('   ✔ Base revision 1 uploaded to server.');

  // 3. Simulate Two Devices Going Offline
  console.log('3. Simulating Device 1 (phone) and Device 2 (laptop) studying offline...');

  // Device 1 (Phone) offline modifications
  const device1Snapshot = JSON.parse(JSON.stringify(baseSnapshot));
  device1Snapshot.timestamp = now + 100;
  // Device 1 retakes MTH 101 Unit 1: passes with 82%
  device1Snapshot.attempts.push({
    id: 'att_2',
    assessmentId: 'mth101_unit1',
    courseId: 'MTH101',
    score: 82,
    passed: true,
    timestamp: now + 50
  });
  // Device 1 adds a new note
  device1Snapshot.notes.push({
    id: 'note_2',
    lessonId: 'na-fractions',
    content: 'Fractions rule: common denominator',
    updatedAt: now + 60
  });
  // Device 1 marks goal_1 completed
  device1Snapshot.goals[0].completed = true;
  device1Snapshot.goals[0].updatedAt = now + 70;
  // Device 1 reviews card 3
  device1Snapshot.reviews.push({ id: 'rev_3', cardId: 'card_3', rating: 3, reviewedAt: now + 80 });

  // Device 2 (Laptop) offline modifications
  const device2Snapshot = JSON.parse(JSON.stringify(baseSnapshot));
  device2Snapshot.timestamp = now + 200;
  // Device 2 retakes MTH 101 Unit 1 independently: scores 90% (higher score!)
  device2Snapshot.attempts.push({
    id: 'att_3',
    assessmentId: 'mth101_unit1',
    courseId: 'MTH101',
    score: 90,
    passed: true,
    timestamp: now + 120
  });
  // Device 2 edits note_1 with newer edit
  device2Snapshot.notes[0].content = 'Notes from lecture + surds formula added';
  device2Snapshot.notes[0].updatedAt = now + 150; // Newer than base
  // Device 2 deletes goal_2
  device2Snapshot.goals = device2Snapshot.goals.filter(g => g.id !== 'goal_2');
  device2Snapshot.tombstones.push('goal_2');
  // Device 2 reviews card 4
  device2Snapshot.reviews.push({ id: 'rev_4', cardId: 'card_4', rating: 4, reviewedAt: now + 160 });

  console.log('   ✔ Offline work recorded on both devices independently.');

  // 4. Device 1 Syncs First
  console.log('4. Device 1 comes online first and syncs...');
  const d1Sync = await dispatch('PUT', '/backup', {
    accountId,
    ciphertext: JSON.stringify(device1Snapshot),
    baseRevision: 1
  });
  assert.equal(d1Sync.status, 200);
  assert.equal(d1Sync.data.revision, 2);
  console.log('   ✔ Device 1 uploaded cleanly; server advanced to Revision 2.');

  // 5. Device 2 Syncs Later -> Detects Conflict (409)
  console.log('5. Device 2 comes online and attempts sync based on Revision 1...');
  const d2Conflict = await dispatch('PUT', '/backup', {
    accountId,
    ciphertext: JSON.stringify(device2Snapshot),
    baseRevision: 1 // Device 2 thought base was 1, but server is now at 2!
  });
  assert.equal(d2Conflict.status, 409);
  assert.equal(d2Conflict.data.code, 'REVISION_CONFLICT');
  console.log('   ✔ Server rejected upload with 409 REVISION_CONFLICT.');

  // 6. Device 2 Resolves Conflict by Fetching Remote & Merging
  console.log('6. Device 2 fetches Revision 2 and executes merge algorithm...');
  const remoteRes = await dispatch('GET', `/backup?accountId=${accountId}`);
  assert.equal(remoteRes.status, 200);
  assert.equal(remoteRes.data.revision, 2);

  const remoteSnapshot = JSON.parse(remoteRes.data.ciphertext);

  // Run deterministic merge algorithm
  const merged = mergeSnapshots(device2Snapshot, remoteSnapshot);

  // 7. Assertions on Merged State
  console.log('7. Verifying Section 14 merge rules on the combined snapshot...');

  // Rule 1 & 2: Passes kept from either device, best scores win
  const outcomes = getAssessmentOutcomes(merged.attempts);
  const unit1Outcome = outcomes['mth101_unit1'];
  assert.ok(unit1Outcome, 'Outcome for mth101_unit1 must exist');
  assert.equal(unit1Outcome.passed, true, 'Pass must be preserved');
  assert.equal(unit1Outcome.bestScore, 90, 'Best score (90%) from Device 2 must win over 82%');
  assert.equal(unit1Outcome.attemptsCount, 3, 'All 3 attempts must be preserved in history');
  console.log(`   ✔ Best score: ${unit1Outcome.bestScore}%, Passed: ${unit1Outcome.passed}, Attempts: ${unit1Outcome.attemptsCount}.`);

  // Rule 3: Notes keep latest edit per note
  const note1 = merged.notes.find(n => n.id === 'note_1');
  assert.ok(note1);
  assert.equal(note1.content, 'Notes from lecture + surds formula added', 'Newer note edit from Device 2 must win');
  const note2 = merged.notes.find(n => n.id === 'note_2');
  assert.ok(note2, 'Note 2 created by Device 1 must be preserved');
  console.log('   ✔ Notes merged: latest edit per note kept; newly added notes preserved.');

  // Rule 4: Tombstones respected (deleted goal not resurrected)
  const goal2 = merged.goals.find(g => g.id === 'goal_2');
  assert.equal(goal2, undefined, 'Deleted goal_2 must not be resurrected');
  const goal1 = merged.goals.find(g => g.id === 'goal_1');
  assert.ok(goal1);
  assert.equal(goal1.completed, true, 'Goal 1 completed status from Device 1 must be preserved');
  console.log('   ✔ Tombstones respected: deleted goal not resurrected; completed status preserved.');

  // Rule 5: Reviews union combined without duplication
  assert.equal(merged.reviews.length, 4, 'Reviews must contain all 4 distinct reviews (rev_1, rev_2, rev_3, rev_4)');
  console.log(`   ✔ Reviews merged: ${merged.reviews.length} total card reviews combined.`);

  // 8. Device 2 Uploads Merged Snapshot
  console.log('8. Device 2 uploads merged snapshot against Revision 2...');
  const d2UploadMerged = await dispatch('PUT', '/backup', {
    accountId,
    ciphertext: JSON.stringify(merged),
    baseRevision: 2
  });
  assert.equal(d2UploadMerged.status, 200);
  assert.equal(d2UploadMerged.data.revision, 3);
  console.log('   ✔ Merged snapshot uploaded successfully; server advanced to Revision 3.');

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B6 VERIFICATION COMPLETE');
  console.log('  - Two devices offline, then both sync: PASSED');
  console.log('  - Best scores win: PASSED (90% kept)');
  console.log('  - Passes preserved from either device: PASSED');
  console.log('  - Notes keep latest edit: PASSED');
  console.log('  - Deletion markers (tombstones) respected: PASSED');
  console.log('  - Review history combined without duplication: PASSED');
  console.log('  - Revision conflict detection & resolution: PASSED');
  console.log('======================================================\n');
}

runSyncTests().catch((err) => {
  console.error('✖ Sync test suite failed:', err);
  process.exit(1);
});
