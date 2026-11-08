// API Route handlers for 4YOS Cloudflare Server.
// Implements /auth/code, /auth/verify, /entitlement, /pack/:course, /backup, /me.

import { AuthService } from './auth.ts';
import type { D1DatabaseLike } from './db.ts';
import { signEntitlement, verifyEntitlement, type EntitlementPayload } from './crypto.ts';
import { PaystackService } from './paystack.ts';
import { NotificationService } from './notifications.ts';
import { CircleService } from './circles.ts';
import { AdminService } from './admin.ts';

export interface ServerContext {
  db: D1DatabaseLike;
  auth: AuthService;
  paystack?: PaystackService;
  notifications?: NotificationService;
  circles?: CircleService;
  admin?: AdminService;
  ownerKey?: string;
  ed25519PrivateKey: CryptoKey;
  ed25519PublicKey: CryptoKey;
}

export const FREE_COURSES = new Set([
  'numbers-and-algebra',
  'how-to-study',
  'how-computers-work',
  'programming-1',
  'describing-data'
]);

export async function handleRequest(request: Request, ctx: ServerContext): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  const json = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  const error = (code: string, message: string, status = 400) => {
    return json({ ok: false, code, error: message }, status);
  };

  const authenticateSession = async (): Promise<{ accountId: string; deviceId: string } | null> => {
    const authHeader = request.headers.get('Authorization') || request.headers.get('x-session-token') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token || token.startsWith('sk_') || token === (ctx.ownerKey || 'test-owner-secret-key-4yos')) {
      return null;
    }
    return ctx.auth.validateSession(token);
  };

  try {
    // POST /auth/code
    if (method === 'POST' && path === '/auth/code') {
      const body = await request.json().catch(() => ({}));
      const { phone } = body; // Caller CANNOT choose verification code
      if (!phone) return error('INVALID_PHONE', 'Phone number is required');

      const res = await ctx.auth.requestVerificationCode(phone);
      if (!res.ok) {
        return error(res.error || 'RATE_LIMITED', 'Too many requests. Please try again later.', 429);
      }
      return json({ ok: true, message: 'Verification code sent.' });
    }

    // POST /auth/verify
    if (method === 'POST' && path === '/auth/verify') {
      const body = await request.json().catch(() => ({}));
      const { phone, code, deviceId, deviceName } = body;
      if (!phone || !code || !deviceId) {
        return error('MISSING_FIELDS', 'Phone, code, and deviceId are required');
      }

      const res = await ctx.auth.verifyCodeAndRegisterDevice(phone, code, deviceId, deviceName);
      if (!res.ok) {
        const status = res.code === 'DEVICE_LIMIT_REACHED' ? 403 : 400;
        return error(res.code || 'VERIFICATION_FAILED', res.message || 'Verification failed', status);
      }

      return json({
        ok: true,
        sessionToken: res.sessionToken,
        accountId: res.accountId,
        deviceId: res.deviceId,
        isNewAccount: res.isNewAccount
      });
    }

    // POST /auth/device/remove
    if (method === 'POST' && path === '/auth/device/remove') {
      const session = await authenticateSession();
      if (!session) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const body = await request.json().catch(() => ({}));
      const { deviceId } = body;
      if (!deviceId) return error('MISSING_FIELDS', 'deviceId is required');

      await ctx.auth.removeDevice(session.accountId, deviceId);
      return json({ ok: true, message: 'Device removed' });
    }

    // POST /buy
    if (method === 'POST' && path === '/buy') {
      if (!ctx.paystack) return error('PAYSTACK_UNCONFIGURED', 'Paystack service not available', 500);
      const session = await authenticateSession();
      const body = await request.json().catch(() => ({}));
      if (session) {
        body.accountId = session.accountId;
      }
      if (!body.accountId) {
        return error('UNAUTHORIZED', 'Authentication required to make purchase', 401);
      }
      const res = await ctx.paystack.initializeBuy(body);
      if (!res.ok) {
        return error(res.error || 'BUY_FAILED', 'Could not initialize purchase', 400);
      }
      return json(res);
    }

    // POST /paystack/hook
    if (method === 'POST' && path === '/paystack/hook') {
      if (!ctx.paystack) return error('PAYSTACK_UNCONFIGURED', 'Paystack service not available', 500);
      const signature = request.headers.get('x-paystack-signature') || '';
      const rawBody = await request.text();

      const validSig = ctx.paystack.verifyWebhookSignature(rawBody, signature);
      if (!validSig) {
        return error('INVALID_SIGNATURE', 'Webhook signature verification failed', 400);
      }

      const event = JSON.parse(rawBody);
      if (event.event === 'charge.success') {
        const data = event.data;
        const reference = data.reference;
        const courses = data.metadata?.courses || [];
        const amount = data.amount;

        const settleRes = await ctx.paystack.settlePurchase(reference, courses, amount);
        return json({ ok: true, settled: true, alreadySettled: settleRes.alreadySettled });
      }

      return json({ ok: true, ignored: true });
    }

    // GET /purchase/:ref
    if (method === 'GET' && path.startsWith('/purchase/')) {
      if (!ctx.paystack) return error('PAYSTACK_UNCONFIGURED', 'Paystack service not available', 500);
      const reference = path.replace('/purchase/', '').trim();
      const status = await ctx.paystack.reconcilePendingPurchase(reference);
      return json({ ok: true, reference, ...status });
    }

    // GET /entitlement
    if (method === 'GET' && path === '/entitlement') {
      const session = await authenticateSession();
      if (!session) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const accountId = session.accountId;
      const deviceId = session.deviceId;

      // Verify device is active
      const dev = await ctx.db.prepare(
        'SELECT is_active FROM devices WHERE id = ? AND account_id = ?'
      ).bind(deviceId, accountId).first<{ is_active: number }>();

      if (!dev || dev.is_active !== 1) {
        return error('DEVICE_NOT_ACTIVE', 'This device is not an active registered device', 403);
      }

      // Query purchased courses
      const purchases = await ctx.db.prepare(
        'SELECT course_id FROM entitlements WHERE account_id = ?'
      ).bind(accountId).all<{ course_id: string }>();

      const purchasedCourseIds = (purchases.results || []).map(r => r.course_id);
      const allAllowedCourses = Array.from(new Set([...FREE_COURSES, ...purchasedCourseIds]));

      const now = Math.floor(Date.now() / 1000);
      const expiresAt = now + (60 * 86400); // 60 days out per Settled Decisions A

      const payload: EntitlementPayload = {
        accountId,
        deviceId,
        courses: allAllowedCourses,
        issuedAt: now,
        expiresAt,
        serverTime: now
      };

      const token = await signEntitlement(payload, ctx.ed25519PrivateKey);

      return json({
        ok: true,
        token,
        expiresAt,
        serverTime: now,
        coursesCount: allAllowedCourses.length
      });
    }

    // GET /pack/:course
    if (method === 'GET' && path.startsWith('/pack/')) {
      const courseId = path.replace('/pack/', '').trim();
      const authHeader = request.headers.get('Authorization') || '';
      const token = authHeader.replace(/^Bearer\s+/i, '');

      // Check if course is free
      if (FREE_COURSES.has(courseId)) {
        return json({
          ok: true,
          course: courseId,
          tier: 'free',
          downloadUrl: `https://packs.4yos.internal/${encodeURIComponent(courseId)}.json`
        });
      }

      // If paid, must have valid signed entitlement token
      if (!token) {
        return error('UNAUTHORIZED', 'Entitlement token required for this course', 401);
      }

      const verified = await verifyEntitlement(token, ctx.ed25519PublicKey);
      if (!verified.valid || !verified.payload) {
        return error(verified.reason || 'INVALID_TOKEN', 'Invalid or expired entitlement token', 403);
      }

      // Clock rollback check: serverTime vs current time
      const now = Math.floor(Date.now() / 1000);
      if (verified.payload.issuedAt > now + 600) {
        return error('CLOCK_ROLLBACK_DETECTED', 'Device clock anomaly detected', 403);
      }

      if (!verified.payload.courses.includes(courseId)) {
        return error('COURSE_NOT_PURCHASED', 'You do not hold an entitlement for this course', 403);
      }

      return json({
        ok: true,
        course: courseId,
        tier: 'entitled',
        downloadUrl: `https://packs.4yos.internal/${encodeURIComponent(courseId)}.json`
      });
    }

    // PUT /backup
    if (method === 'PUT' && path === '/backup') {
      const session = await authenticateSession();
      if (!session) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const body = await request.json().catch(() => ({}));
      const { ciphertext, baseRevision } = body;
      if (!ciphertext) return error('MISSING_FIELDS', 'ciphertext required');

      const accountId = session.accountId;
      const now = Math.floor(Date.now() / 1000);
      const existing = await ctx.db.prepare(
        'SELECT revision FROM backups WHERE account_id = ?'
      ).bind(accountId).first<{ revision: number }>();

      const currentRev = existing?.revision ?? 0;
      if (baseRevision !== undefined && baseRevision !== currentRev) {
        return error('REVISION_CONFLICT', `Base revision mismatch. Server is at revision ${currentRev}`, 409);
      }

      const nextRev = currentRev + 1;
      await ctx.db.prepare(
        'INSERT OR REPLACE INTO backups (account_id, revision, ciphertext, updated_at) VALUES (?, ?, ?, ?)'
      ).bind(accountId, nextRev, ciphertext, now).run();

      return json({ ok: true, revision: nextRev, updatedAt: now });
    }

    // GET /backup
    if (method === 'GET' && path === '/backup') {
      const session = await authenticateSession();
      if (!session) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const accountId = session.accountId;
      const backup = await ctx.db.prepare(
        'SELECT revision, ciphertext, updated_at FROM backups WHERE account_id = ?'
      ).bind(accountId).first();

      if (!backup) {
        return error('NO_BACKUP_FOUND', 'No backup exists for this account', 404);
      }

      return json({ ok: true, ...backup });
    }

    // GET /notifications/preferences
    if (method === 'GET' && path === '/notifications/preferences') {
      const session = await authenticateSession();
      const paramAccountId = url.searchParams.get('accountId');
      if (session && paramAccountId && paramAccountId !== session.accountId) {
        return error('FORBIDDEN', 'Cannot access another account notifications', 403);
      }
      const accountId = session ? session.accountId : paramAccountId;
      if (!accountId) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const service = ctx.notifications ?? new NotificationService(ctx.db);
      const pref = await service.getPreferences(accountId);
      return json({ ok: true, preferences: pref });
    }

    // POST /notifications/preferences
    if (method === 'POST' && path === '/notifications/preferences') {
      const session = await authenticateSession();
      const body = await request.json().catch(() => ({}));
      if (session && body.accountId && body.accountId !== session.accountId) {
        return error('FORBIDDEN', 'Cannot update another account preferences', 403);
      }
      const accountId = session ? session.accountId : body.accountId;
      if (!accountId) return error('UNAUTHORIZED', 'Authentication session required', 401);

      const { optIn, muted, studyHour, quietHoursStart, quietHoursEnd } = body;
      const service = ctx.notifications ?? new NotificationService(ctx.db);
      const updated = await service.updatePreferences(accountId, {
        optIn,
        muted,
        studyHour,
        quietHoursStart,
        quietHoursEnd,
      });
      return json({ ok: true, preferences: updated });
    }

    // POST /notifications/subscribe
    if (method === 'POST' && path === '/notifications/subscribe') {
      const session = await authenticateSession();
      const body = await request.json().catch(() => ({}));
      if (session && body.accountId && body.accountId !== session.accountId) {
        return error('FORBIDDEN', 'Cannot subscribe for another account', 403);
      }
      const accountId = session ? session.accountId : body.accountId;
      const { subscription } = body;
      if (!accountId || !subscription?.endpoint) return error('MISSING_FIELDS', 'accountId and subscription required');

      const service = ctx.notifications ?? new NotificationService(ctx.db);
      await service.subscribe(accountId, subscription);
      return json({ ok: true, subscribed: true });
    }

    // POST /notifications/send
    if (method === 'POST' && path === '/notifications/send') {
      const body = await request.json().catch(() => ({}));
      const { accountId, payload, timeOverride } = body;
      if (!accountId || !payload) return error('MISSING_FIELDS', 'accountId and payload required');
      const service = ctx.notifications ?? new NotificationService(ctx.db);
      const result = await service.sendNotification(accountId, payload, timeOverride);
      if (!result.sent) {
        return json({ ok: false, sent: false, reason: result.reason }, 403);
      }
      return json({ ok: true, sent: true });
    }

    // POST /circles/create
    if (method === 'POST' && path === '/circles/create') {
      const session = await authenticateSession();
      const body = await request.json().catch(() => ({}));
      const creatorId = session ? session.accountId : body.creatorId;
      const { name, isClassCircle } = body;
      if (!name || !creatorId) return error('MISSING_FIELDS', 'name and creatorId required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      const result = await service.createCircle({ name, creatorId, isClassCircle });
      return json({ ok: true, ...result });
    }

    // POST /circles/join
    if (method === 'POST' && path === '/circles/join') {
      const body = await request.json().catch(() => ({}));
      const { code, accountId } = body;
      if (!code || !accountId) return error('MISSING_FIELDS', 'code and accountId required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      try {
        const result = await service.joinCircle({ code, accountId });
        return json({ ok: true, ...result });
      } catch (err: any) {
        if (err.message === 'CIRCLE_NOT_FOUND') return error('CIRCLE_NOT_FOUND', 'Circle not found', 404);
        if (err.message === 'CIRCLE_FULL') return error('CIRCLE_FULL', 'Circle has reached maximum capacity', 403);
        throw err;
      }
    }

    // GET /circles/:id
    if (method === 'GET' && path.startsWith('/circles/') && !path.includes('/sessions/')) {
      const circleId = path.slice('/circles/'.length);
      const service = ctx.circles ?? new CircleService(ctx.db);
      try {
        const details = await service.getCircleDetails(circleId);
        return json({ ok: true, ...details });
      } catch (err: any) {
        if (err.message === 'CIRCLE_NOT_FOUND') return error('CIRCLE_NOT_FOUND', 'Circle not found', 404);
        throw err;
      }
    }

    // POST /circles/ginger
    if (method === 'POST' && path === '/circles/ginger') {
      const body = await request.json().catch(() => ({}));
      const { circleId, senderId, recipientId, presetKey, dateStr } = body;
      if (!circleId || !senderId || !recipientId || !presetKey) return error('MISSING_FIELDS', 'Missing ginger fields');
      const service = ctx.circles ?? new CircleService(ctx.db);
      try {
        const result = await service.sendGinger({ circleId, senderId, recipientId, presetKey, dateStr });
        return json({ ok: true, ...result });
      } catch (err: any) {
        if (err.message === 'GINGER_DAILY_LIMIT_REACHED') return error('GINGER_DAILY_LIMIT_REACHED', 'At most 3 gingers a day per person to each friend', 429);
        if (err.message === 'BLOCKED_BY_USER') return error('BLOCKED_BY_USER', 'Unable to send ginger: user has blocked you', 403);
        if (err.message === 'INVALID_GINGER_PRESET') return error('INVALID_GINGER_PRESET', 'Invalid ginger preset', 400);
        if (err.message === 'CANNOT_GINGER_SELF') return error('CANNOT_GINGER_SELF', 'Cannot ginger yourself', 400);
        throw err;
      }
    }

    // POST /circles/block
    if (method === 'POST' && path === '/circles/block') {
      const body = await request.json().catch(() => ({}));
      const { blockerId, blockedId } = body;
      if (!blockerId || !blockedId) return error('MISSING_FIELDS', 'blockerId and blockedId required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      await service.blockUser(blockerId, blockedId);
      return json({ ok: true, blocked: true });
    }

    // POST /circles/leave
    if (method === 'POST' && path === '/circles/leave') {
      const body = await request.json().catch(() => ({}));
      const { circleId, accountId } = body;
      if (!circleId || !accountId) return error('MISSING_FIELDS', 'circleId and accountId required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      await service.leaveCircle(circleId, accountId);
      return json({ ok: true, left: true });
    }

    // POST /circles/goals
    if (method === 'POST' && path === '/circles/goals') {
      const body = await request.json().catch(() => ({}));
      const { circleId, title, targetDate, targetCount } = body;
      if (!circleId || !title || !targetDate || !targetCount) return error('MISSING_FIELDS', 'Goal fields required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      const goal = await service.setCircleGoal({ circleId, title, targetDate, targetCount });
      return json({ ok: true, goal });
    }

    // POST /circles/sessions/start
    if (method === 'POST' && path === '/circles/sessions/start') {
      const body = await request.json().catch(() => ({}));
      const { circleId, hostId, courseId, durationMinutes } = body;
      if (!circleId || !hostId || !courseId || !durationMinutes) return error('MISSING_FIELDS', 'Session fields required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      const session = await service.startStudySession({ circleId, hostId, courseId, durationMinutes });
      return json({ ok: true, session });
    }

    // POST /circles/sessions/join
    if (method === 'POST' && path === '/circles/sessions/join') {
      const body = await request.json().catch(() => ({}));
      const { sessionId, accountId } = body;
      if (!sessionId || !accountId) return error('MISSING_FIELDS', 'sessionId and accountId required');
      const service = ctx.circles ?? new CircleService(ctx.db);
      await service.joinStudySession({ sessionId, accountId });
      return json({ ok: true, joined: true });
    }

    // ==========================================================
    // STUDENT FEEDBACK ROUTES (PUBLIC / AUTHENTICATED)
    // ==========================================================

    // POST /feedback/report (Content mistake reports)
    if (method === 'POST' && path === '/feedback/report') {
      const body = await request.json().catch(() => ({}));
      const { lessonId, courseId, issueType, description, suggestedFix, accountId } = body;
      if (!lessonId || !courseId || !issueType || !description) {
        return error('MISSING_FIELDS', 'lessonId, courseId, issueType, and description required');
      }
      const adminService = ctx.admin ?? new AdminService(
        ctx.db,
        ctx.paystack ?? new PaystackService(ctx.db, { secretKey: 'sk_test', publicKey: 'pk_test', webhookSecret: 'wh_test' })
      );
      const res = await adminService.submitMistakeReport({
        accountId,
        lessonId,
        courseId,
        issueType,
        description,
        suggestedFix,
      });
      return json({ ok: true, report: res });
    }

    // POST /feedback/school-request (Demand queue)
    if (method === 'POST' && path === '/feedback/school-request') {
      const body = await request.json().catch(() => ({}));
      const { schoolName, programmeName, contactEmail, contactPhone, accountId } = body;
      if (!schoolName || !programmeName) {
        return error('MISSING_FIELDS', 'schoolName and programmeName required');
      }
      const adminService = ctx.admin ?? new AdminService(
        ctx.db,
        ctx.paystack ?? new PaystackService(ctx.db, { secretKey: 'sk_test', publicKey: 'pk_test', webhookSecret: 'wh_test' })
      );
      const res = await adminService.submitSchoolRequest({
        accountId,
        schoolName,
        programmeName,
        contactEmail,
        contactPhone,
      });
      return json({ ok: true, request: res });
    }

    // ==========================================================
    // OWNER-ONLY ADMIN ROUTES (SECTION 17 STEP B11)
    // ==========================================================
    if (path.startsWith('/admin')) {
      const authHeader = request.headers.get('Authorization');
      const expectedKey = ctx.ownerKey || 'test-owner-secret-key-4yos';
      const adminService = ctx.admin ?? new AdminService(
        ctx.db,
        ctx.paystack ?? new PaystackService(ctx.db, { secretKey: 'sk_test', publicKey: 'pk_test', webhookSecret: 'wh_test' })
      );

      if (!adminService.verifyOwnerAuth(authHeader, expectedKey)) {
        return error('UNAUTHORIZED', 'Owner authentication required', 401);
      }

      // GET /admin/overview
      if (method === 'GET' && path === '/admin/overview') {
        const overview = await adminService.getDashboardOverview();
        return json({ ok: true, overview });
      }

      // GET /admin/purchases
      if (method === 'GET' && path === '/admin/purchases') {
        const limit = Number(url.searchParams.get('limit') || '50');
        const purchases = await adminService.listPurchases(limit);
        return json({ ok: true, purchases });
      }

      // POST /admin/refund
      if (method === 'POST' && path === '/admin/refund') {
        const body = await request.json().catch(() => ({}));
        const { reference, reason } = body;
        if (!reference) return error('MISSING_FIELDS', 'reference required');
        const res = await adminService.refundPurchase(reference, 'owner', reason);
        if (!res.ok) return error('REFUND_FAILED', res.error || 'Failed to process refund');
        return json({ ok: true, refunded: true, reference });
      }

      // POST /admin/reconcile-pending
      if (method === 'POST' && path === '/admin/reconcile-pending') {
        if (!ctx.paystack) return error('PAYSTACK_UNCONFIGURED', 'Paystack service unavailable', 500);
        const body = await request.json().catch(() => ({}));
        const staleMinutes = Number(body.staleMinutes || 15);
        const result = await ctx.paystack.reconcileAllStalePending(staleMinutes);
        return json({ ok: true, ...result });
      }

      // GET /admin/codes
      if (method === 'GET' && path === '/admin/codes') {
        const codes = await adminService.listCodes();
        return json({ ok: true, codes });
      }

      // POST /admin/codes
      if (method === 'POST' && path === '/admin/codes') {
        const body = await request.json().catch(() => ({}));
        const { code, discountPercent, school, maxUses, expiresAt } = body;
        if (!code || typeof discountPercent !== 'number') {
          return error('MISSING_FIELDS', 'code and discountPercent required');
        }
        const res = await adminService.createCode(code, discountPercent, school, maxUses, expiresAt);
        if (!res.ok) return error('CODE_CREATION_FAILED', res.error || 'Failed to create code');
        return json({ ok: true, code: res.code });
      }

      // GET /admin/reports
      if (method === 'GET' && path === '/admin/reports') {
        const status = url.searchParams.get('status') || undefined;
        const reports = await adminService.listMistakeReports(status);
        return json({ ok: true, reports });
      }

      // POST /admin/reports/:id/resolve
      const resolveReportMatch = path.match(/^\/admin\/reports\/([^/]+)\/resolve$/);
      if (method === 'POST' && resolveReportMatch) {
        const reportId = resolveReportMatch[1];
        const body = await request.json().catch(() => ({}));
        const { status, notes } = body;
        if (status !== 'resolved' && status !== 'dismissed') {
          return error('INVALID_STATUS', "Status must be 'resolved' or 'dismissed'");
        }
        const res = await adminService.resolveMistakeReport(reportId, status, notes);
        if (!res.ok) return error('UPDATE_FAILED', res.error || 'Failed to update report');
        return json({ ok: true, resolved: true, id: reportId });
      }

      // GET /admin/school-requests
      if (method === 'GET' && path === '/admin/school-requests') {
        const status = url.searchParams.get('status') || undefined;
        const requests = await adminService.listSchoolRequests(status);
        return json({ ok: true, requests });
      }

      // GET /admin/users
      if (method === 'GET' && path === '/admin/users') {
        const phone = url.searchParams.get('phone');
        if (!phone) return error('MISSING_FIELDS', 'phone query parameter required');
        const user = await adminService.lookupUser(phone);
        return json({ ok: true, user });
      }

      // POST /admin/users/:accountId/reset-devices
      const resetDevicesMatch = path.match(/^\/admin\/users\/([^/]+)\/reset-devices$/);
      if (method === 'POST' && resetDevicesMatch) {
        const accountId = resetDevicesMatch[1];
        const res = await adminService.resetUserDevices(accountId, 'owner');
        return json({ ok: true, reset: true, count: res.resetCount });
      }
    }

    // DELETE /me
    if (method === 'DELETE' && path === '/me') {
      const session = await authenticateSession();
      if (!session) return error('UNAUTHORIZED', 'Authentication session required', 401);

      await ctx.db.prepare('DELETE FROM accounts WHERE id = ?').bind(session.accountId).run();
      return json({ ok: true, message: 'Account and all associated records deleted (NDPA compliant)' });
    }

    return error('NOT_FOUND', 'Endpoint not found', 404);
  } catch (err: any) {
    return error('INTERNAL_ERROR', err?.message || 'Server error', 500);
  }
}
