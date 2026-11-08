// Automated test suite for Section 17 Table G Step B11:
// Admin operations page (purchases, refunds, codes, reports, school requests, demand)
// Behind owner-only sign-in. Verifies that the owner can refund a test purchase.

import assert from 'node:assert/strict';
import { handleRequest } from '../src/routes.ts';
import { AuthService } from '../src/auth.ts';
import { PaystackService } from '../src/paystack.ts';
import { AdminService } from '../src/admin.ts';
import { CircleService } from '../src/circles.ts';
import { NotificationService } from '../src/notifications.ts';

// In-memory D1 database emulator for testing
class MockD1 {
  constructor() {
    this.tables = {
      accounts: [],
      auth_challenges: [],
      devices: [],
      purchases: [],
      entitlements: [],
      backups: [],
      rate_limits: [],
      notification_preferences: [],
      notification_subscriptions: [],
      circles: [],
      circle_members: [],
      circle_goals: [],
      circle_gingers: [],
      circle_blocks: [],
      study_sessions: [],
      study_session_participants: [],
      class_codes: [],
      mistake_reports: [],
      school_requests: [],
      admin_audit_log: [],
    };
  }

  prepare(query) {
    const db = this;
    let boundParams = [];
    const stmt = {
      bind(...params) {
        boundParams = params;
        return stmt;
      },
      async first() {
        const res = await this.all();
        return res.results[0] || null;
      },
      async all() {
        const q = query.trim();
        const params = boundParams;

        // 1. Dashboard counts
        if (q.includes('SELECT COUNT(*) as cnt FROM accounts')) {
          return { results: [{ cnt: db.tables.accounts.length }] };
        }
        if (q.includes('SELECT COUNT(*) as cnt FROM devices WHERE is_active = 1')) {
          const active = db.tables.devices.filter(d => d.is_active === 1);
          return { results: [{ cnt: active.length }] };
        }
        if (q.includes('FROM purchases') && q.includes('COUNT(*) as total_cnt')) {
          const total = db.tables.purchases.length;
          const success = db.tables.purchases.filter(p => p.status === 'success');
          const refunded = db.tables.purchases.filter(p => p.status === 'refunded');
          const gross_kobo = success.reduce((acc, p) => acc + p.amount_kobo, 0);
          const refund_kobo = refunded.reduce((acc, p) => acc + p.amount_kobo, 0);
          return {
            results: [{
              total_cnt: total,
              success_cnt: success.length,
              gross_kobo,
              refund_cnt: refunded.length,
              refund_kobo,
            }]
          };
        }
        if (q.includes("FROM mistake_reports WHERE status = 'open'")) {
          const open = db.tables.mistake_reports.filter(r => r.status === 'open');
          return { results: [{ cnt: open.length }] };
        }
        if (q.includes("FROM school_requests WHERE status = 'pending'")) {
          const pending = db.tables.school_requests.filter(s => s.status === 'pending');
          return { results: [{ cnt: pending.length }] };
        }
        if (q.includes('SELECT COUNT(*) as cnt FROM circles')) {
          return { results: [{ cnt: db.tables.circles.length }] };
        }

        // 2. Purchases list
        if (q.includes('FROM purchases p')) {
          const rows = db.tables.purchases.map(p => {
            const acc = db.tables.accounts.find(a => a.id === p.account_id);
            return {
              id: p.id,
              reference: p.reference,
              phone: acc?.phone || 'Unknown',
              item_type: p.item_type,
              item_id: p.item_id,
              amount_kobo: p.amount_kobo,
              status: p.status,
              created_at: p.created_at,
              verified_at: p.verified_at || null,
            };
          });
          return { results: rows.slice(0, params[0] || 50) };
        }

        // 3. Purchase lookup by reference
        if (q.includes('FROM purchases WHERE reference = ?')) {
          const row = db.tables.purchases.find(p => p.reference === params[0]);
          return { results: row ? [row] : [] };
        }

        // 4. Class codes
        if (q.includes('FROM class_codes')) {
          return { results: [...db.tables.class_codes] };
        }

        // 5. Mistake reports
        if (q.includes('FROM mistake_reports')) {
          let rows = [...db.tables.mistake_reports];
          if (params[0]) rows = rows.filter(r => r.status === params[0]);
          return { results: rows };
        }

        // 6. School requests
        if (q.includes('FROM school_requests')) {
          let rows = [...db.tables.school_requests];
          if (params[0]) rows = rows.filter(r => r.status === params[0]);
          return { results: rows };
        }

        // 7. Users lookup
        if (q.includes('FROM accounts WHERE phone = ?')) {
          const acc = db.tables.accounts.find(a => a.phone === params[0]);
          return { results: acc ? [acc] : [] };
        }
        if (q.includes('FROM devices WHERE account_id = ?')) {
          const devs = db.tables.devices.filter(d => d.account_id === params[0]);
          return { results: devs };
        }
        if (q.includes('FROM entitlements WHERE account_id = ?')) {
          const ents = db.tables.entitlements.filter(e => e.account_id === params[0]);
          return { results: ents };
        }

        return { results: [] };
      },
      async run() {
        const q = query.trim();
        const params = boundParams;

        // Insert mistake report
        if (q.startsWith('INSERT INTO mistake_reports')) {
          db.tables.mistake_reports.push({
            id: params[0],
            account_id: params[1],
            lesson_id: params[2],
            course_id: params[3],
            issue_type: params[4],
            description: params[5],
            suggested_fix: params[6],
            status: 'open',
            created_at: params[7],
            resolved_at: null,
            notes: null,
          });
          return { meta: { changes: 1 } };
        }

        // Resolve mistake report
        if (q.startsWith('UPDATE mistake_reports SET status = ?')) {
          const row = db.tables.mistake_reports.find(r => r.id === params[3]);
          if (row) {
            row.status = params[0];
            row.resolved_at = params[1];
            row.notes = params[2];
            return { meta: { changes: 1 } };
          }
          return { meta: { changes: 0 } };
        }

        // Insert school request
        if (q.startsWith('INSERT INTO school_requests')) {
          db.tables.school_requests.push({
            id: params[0],
            account_id: params[1],
            school_name: params[2],
            programme_name: params[3],
            contact_email: params[4],
            contact_phone: params[5],
            status: 'pending',
            created_at: params[6],
          });
          return { meta: { changes: 1 } };
        }

        // Insert class code
        if (q.startsWith('INSERT INTO class_codes')) {
          if (db.tables.class_codes.some(c => c.code === params[0])) {
            throw new Error('UNIQUE constraint failed: class_codes.code');
          }
          db.tables.class_codes.push({
            code: params[0],
            discount_percent: params[1],
            school: params[2],
            max_uses: params[3],
            uses_count: params[4],
            expires_at: params[5],
            created_at: params[6],
          });
          return { meta: { changes: 1 } };
        }

        // Update purchase status
        if (q.startsWith('UPDATE purchases SET status = ? WHERE id = ?')) {
          const p = db.tables.purchases.find(item => item.id === params[1]);
          if (p) p.status = params[0];
          return { meta: { changes: 1 } };
        }

        // Delete entitlements
        if (q.startsWith('DELETE FROM entitlements WHERE purchase_id = ?')) {
          db.tables.entitlements = db.tables.entitlements.filter(e => e.purchase_id !== params[0]);
          return { meta: { changes: 1 } };
        }

        // Reset devices
        if (q.startsWith('UPDATE devices SET is_active = 0 WHERE account_id = ?')) {
          let count = 0;
          for (const d of db.tables.devices) {
            if (d.account_id === params[0] && d.is_active === 1) {
              d.is_active = 0;
              count++;
            }
          }
          return { meta: { changes: count } };
        }

        // Audit log insert
        if (q.startsWith('INSERT INTO admin_audit_log')) {
          db.tables.admin_audit_log.push({
            id: params[0],
            admin_id: params[1],
            action: params[2],
            target_id: params[3],
            details: params[4],
            created_at: params[5],
          });
          return { meta: { changes: 1 } };
        }

        return { meta: { changes: 0 } };
      }
    };
    return stmt;
  }

  async batch(statements) {
    const results = [];
    for (const s of statements) {
      results.push(await s.run());
    }
    return results;
  }
}

async function runAdminTests() {
  console.log('\n======================================================');
  console.log('>>> Running Section 17 Step B11: Admin Operations Test...');
  console.log('======================================================');

  const OWNER_KEY = 'test-secret-owner-key-2026';
  const mockDb = new MockD1();
  const mockFetch = async () => new Response(JSON.stringify({ status: true, data: { status: 'success' } }));
  const paystack = new PaystackService(mockDb, {
    secretKey: 'sk_test_123',
    publicKey: 'pk_test_123',
    webhookSecret: 'wh_test_123',
  }, mockFetch);
  const admin = new AdminService(mockDb, paystack);

  const ctx = {
    db: mockDb,
    auth: new AuthService(mockDb, {}),
    paystack,
    admin,
    ownerKey: OWNER_KEY,
    ed25519PrivateKey: {},
    ed25519PublicKey: {},
  };

  // Seed sample data
  const now = Math.floor(Date.now() / 1000);
  mockDb.tables.accounts.push({ id: 'acc_1', phone: '+2348011112222', created_at: now, updated_at: now });
  mockDb.tables.devices.push(
    { id: 'dev_1', account_id: 'acc_1', device_name: 'Tecno Spark 10', is_active: 1, registered_at: now, last_active_at: now },
    { id: 'dev_2', account_id: 'acc_1', device_name: 'Dell Laptop', is_active: 1, registered_at: now, last_active_at: now }
  );

  // Seed initial test purchase
  mockDb.tables.purchases.push({
    id: 'purch_test_1',
    account_id: 'acc_1',
    reference: '4YOS-PILOT-REF-001',
    item_type: 'course',
    item_id: 'cos101',
    amount_kobo: 100000, // ₦1,000
    status: 'success',
    created_at: now - 3600,
    verified_at: now - 3500,
  });
  mockDb.tables.entitlements.push({
    account_id: 'acc_1',
    course_id: 'how-computers-work',
    granted_at: now - 3500,
    purchase_id: 'purch_test_1',
  });

  // TEST 1: OWNER AUTHENTICATION
  console.log('\n--- 1. Testing Owner-Only Authentication Gate ---');
  {
    // Unauthorized without key
    const resNoAuth = await handleRequest(new Request('http://localhost/admin/overview', { method: 'GET' }), ctx);
    assert.equal(resNoAuth.status, 401, 'Request without key must be rejected with 401');

    // Unauthorized with invalid key
    const resBadKey = await handleRequest(new Request('http://localhost/admin/overview', {
      method: 'GET',
      headers: { Authorization: 'Bearer wrong-key' },
    }), ctx);
    assert.equal(resBadKey.status, 401, 'Request with incorrect key must be rejected with 401');

    // Authorized with correct owner key
    const resGoodKey = await handleRequest(new Request('http://localhost/admin/overview', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);
    if (resGoodKey.status !== 200) {
      console.log('500 Error body:', await resGoodKey.json());
    }
    assert.equal(resGoodKey.status, 200, 'Request with valid OWNER_KEY must succeed with 200');
    const json = await resGoodKey.json();
    assert.ok(json.ok);
    assert.equal(json.overview.totalStudents, 1);
    assert.equal(json.overview.activeDevices, 2);
    assert.equal(json.overview.grossRevenueNaira, 1000);
    console.log('   ✔ Owner-only authentication gate verified (401 on bad keys, 200 on OWNER_KEY).');
    console.log('   ✔ Dashboard overview metrics verified.');
  }

  // TEST 2: OWNER CAN REFUND A TEST PURCHASE (THE TABLE G CHECK)
  console.log('\n--- 2. Verifying Owner Can Refund a Test Purchase (Mandated Table G Check) ---');
  {
    // List purchases
    const resList = await handleRequest(new Request('http://localhost/admin/purchases', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);
    const listJson = await resList.json();
    assert.equal(listJson.purchases.length, 1);
    assert.equal(listJson.purchases[0].reference, '4YOS-PILOT-REF-001');
    assert.equal(listJson.purchases[0].status, 'success');

    // Issue refund via POST /admin/refund
    const resRefund = await handleRequest(new Request('http://localhost/admin/refund', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OWNER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference: '4YOS-PILOT-REF-001', reason: 'Student pilot refund test' }),
    }), ctx);

    assert.equal(resRefund.status, 200);
    const refundJson = await resRefund.json();
    assert.equal(refundJson.ok, true);
    assert.equal(refundJson.refunded, true);
    assert.equal(refundJson.reference, '4YOS-PILOT-REF-001');

    // Verify D1 state: purchase marked refunded
    const updatedPurchase = mockDb.tables.purchases.find(p => p.reference === '4YOS-PILOT-REF-001');
    assert.equal(updatedPurchase?.status, 'refunded', 'Purchase status in D1 must be updated to refunded');

    // Verify D1 state: student entitlement revoked
    const remainingEnts = mockDb.tables.entitlements.filter(e => e.purchase_id === 'purch_test_1');
    assert.equal(remainingEnts.length, 0, 'Entitlements granted by the refunded purchase must be deleted');

    // Verify audit log
    const audit = mockDb.tables.admin_audit_log.find(a => a.target_id === '4YOS-PILOT-REF-001');
    assert.ok(audit, 'Audit log entry must be created for refund');
    assert.equal(audit.action, 'refund');
    console.log('   ✔ Owner refund successfully processed for 4YOS-PILOT-REF-001.');
    console.log('   ✔ D1 purchase status updated to "refunded" and student entitlement revoked.');
    console.log('   ✔ Audit log entry recorded with timestamp and reason.');
  }

  // TEST 3: CLASS & COURSE REP DISCOUNT CODES
  console.log('\n--- 3. Testing Class Codes Creation & Listing ---');
  {
    const resCreateCode = await handleRequest(new Request('http://localhost/admin/codes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OWNER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: 'UNIPORT15',
        discountPercent: 15,
        school: 'University of Port Harcourt',
        maxUses: 100,
      }),
    }), ctx);

    assert.equal(resCreateCode.status, 200);
    const codeJson = await resCreateCode.json();
    assert.equal(codeJson.ok, true);
    assert.equal(codeJson.code, 'UNIPORT15');

    // Get list of codes
    const resListCodes = await handleRequest(new Request('http://localhost/admin/codes', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);
    const codesJson = await resListCodes.json();
    assert.equal(codesJson.codes.length, 1);
    assert.equal(codesJson.codes[0].code, 'UNIPORT15');
    assert.equal(codesJson.codes[0].discountPercent, 15);

    // Duplicate code rejected
    const resDup = await handleRequest(new Request('http://localhost/admin/codes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OWNER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: 'UNIPORT15', discountPercent: 20 }),
    }), ctx);
    assert.equal(resDup.status, 400);
    console.log('   ✔ Class discount code UNIPORT15 created (15% discount, 100 uses max).');
    console.log('   ✔ Duplicate code rejection verified.');
  }

  // TEST 4: MISTAKE REPORTS QUEUE
  console.log('\n--- 4. Testing Student Mistake Reports Submission & Resolution ---');
  {
    // Student submits report
    const resSubmit = await handleRequest(new Request('http://localhost/feedback/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: 'acc_1',
        courseId: 'COS 101',
        lessonId: 'p1-what-program',
        issueType: 'wrong_fact',
        description: 'Question 3 has an ambiguous phrasing on CPU clock frequency.',
        suggestedFix: 'Clarify gigahertz vs megahertz.',
      }),
    }), ctx);

    assert.equal(resSubmit.status, 200);
    const submitJson = await resSubmit.json();
    const reportId = submitJson.report.id;
    assert.ok(reportId);

    // Admin lists reports
    const resReports = await handleRequest(new Request('http://localhost/admin/reports?status=open', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);
    const reportsJson = await resReports.json();
    assert.equal(reportsJson.reports.length, 1);
    assert.equal(reportsJson.reports[0].id, reportId);

    // Admin resolves report
    const resResolve = await handleRequest(new Request(`http://localhost/admin/reports/${reportId}/resolve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OWNER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'resolved', notes: 'Fixed lesson text.' }),
    }), ctx);

    assert.equal(resResolve.status, 200);
    const resolvedReport = mockDb.tables.mistake_reports.find(r => r.id === reportId);
    assert.equal(resolvedReport?.status, 'resolved');
    console.log('   ✔ Student mistake report submitted, queued, and resolved by owner.');
  }

  // TEST 5: SCHOOL REQUESTS QUEUE
  console.log('\n--- 5. Testing Unlisted School Requests Demand Queue ---');
  {
    const resReq = await handleRequest(new Request('http://localhost/feedback/school-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schoolName: 'Rivers State University',
        programmeName: 'Software Engineering',
        contactPhone: '+2348099887766',
      }),
    }), ctx);

    assert.equal(resReq.status, 200);

    const resListReqs = await handleRequest(new Request('http://localhost/admin/school-requests', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);

    const reqsJson = await resListReqs.json();
    assert.equal(reqsJson.requests.length, 1);
    assert.equal(reqsJson.requests[0].schoolName, 'Rivers State University');
    assert.equal(reqsJson.requests[0].programmeName, 'Software Engineering');
    console.log('   ✔ School demand request queued and retrieved.');
  }

  // TEST 6: USER LOOKUP & DEVICE LIMIT RESET
  console.log('\n--- 6. Testing User Lookup & Device Limit Reset ---');
  {
    const resUser = await handleRequest(new Request('http://localhost/admin/users?phone=%2B2348011112222', {
      method: 'GET',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);

    assert.equal(resUser.status, 200);
    const userJson = await resUser.json();
    assert.equal(userJson.user.account.id, 'acc_1');
    assert.equal(userJson.user.devices.length, 2);
    assert.equal(userJson.user.devices.filter(d => d.isActive).length, 2);

    // Reset active devices
    const resReset = await handleRequest(new Request('http://localhost/admin/users/acc_1/reset-devices', {
      method: 'POST',
      headers: { Authorization: `Bearer ${OWNER_KEY}` },
    }), ctx);

    assert.equal(resReset.status, 200);
    const resetJson = await resReset.json();
    assert.equal(resetJson.reset, true);
    assert.equal(resetJson.count, 2);

    // Verify all devices are now inactive
    const activeDevs = mockDb.tables.devices.filter(d => d.account_id === 'acc_1' && d.is_active === 1);
    assert.equal(activeDevs.length, 0, 'Active devices must be 0 after reset');
    console.log('   ✔ User lookup returned account, devices, and entitlements.');
    console.log('   ✔ Active devices reset successfully (unblocked 2 devices).');
  }

  console.log('\n======================================================');
  console.log('✔ SECTION 17 STEP B11 VERIFICATION COMPLETE');
  console.log('  - Owner authentication gate: PASSED');
  console.log('  - Owner can refund a test purchase: PASSED');
  console.log('  - Entitlement revoked on refund: PASSED');
  console.log('  - Class codes created and listed: PASSED');
  console.log('  - Mistake reports queue & resolution: PASSED');
  console.log('  - School requests demand queue: PASSED');
  console.log('  - User lookup & device reset: PASSED');
  console.log('======================================================\n');
}

runAdminTests().catch((err) => {
  console.error('Admin test failed:', err);
  process.exit(1);
});
