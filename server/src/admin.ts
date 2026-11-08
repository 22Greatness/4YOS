// Admin Operations service for 4YOS Server.
// Fulfills Section 17 Table G Step B11:
// Overview, Purchases, Refunds, Class Codes, Mistake Reports, School Requests, and User Device Resets
// Behind owner-only authentication.

import crypto from 'node:crypto';
import type { D1DatabaseLike } from './db.ts';
import type { PaystackService } from './paystack.ts';

export interface DashboardOverview {
  totalStudents: number;
  activeDevices: number;
  totalPurchases: number;
  successfulPurchases: number;
  grossRevenueKobo: number;
  grossRevenueNaira: number;
  totalRefunds: number;
  refundedAmountKobo: number;
  refundedAmountNaira: number;
  openMistakeReports: number;
  pendingSchoolRequests: number;
  activeCircles: number;
}

export interface PurchaseAdminView {
  id: string;
  reference: string;
  phone: string;
  itemType: string;
  itemId: string;
  amountKobo: number;
  amountNaira: number;
  status: string;
  createdAt: number;
  verifiedAt: number | null;
}

export interface ClassCodeRecord {
  code: string;
  discountPercent: number;
  school: string | null;
  maxUses: number;
  usesCount: number;
  expiresAt: number | null;
  createdAt: number;
}

export interface MistakeReportRecord {
  id: string;
  accountId: string | null;
  lessonId: string;
  courseId: string;
  issueType: string;
  description: string;
  suggestedFix: string | null;
  status: 'open' | 'resolved' | 'dismissed';
  createdAt: number;
  resolvedAt: number | null;
  notes: string | null;
}

export interface SchoolRequestRecord {
  id: string;
  accountId: string | null;
  schoolName: string;
  programmeName: string;
  contactEmail: string | null;
  contactPhone: string | null;
  status: 'pending' | 'in_progress' | 'supported';
  createdAt: number;
}

export class AdminService {
  private db: D1DatabaseLike;
  private paystackService: PaystackService;

  constructor(db: D1DatabaseLike, paystackService: PaystackService) {
    this.db = db;
    this.paystackService = paystackService;
  }

  /**
   * Verifies owner authorization token / header against the configured OWNER_KEY.
   */
  verifyOwnerAuth(authHeader: string | null | undefined, expectedKey: string): boolean {
    if (!authHeader || !expectedKey) return false;
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    if (token.length !== expectedKey.length) return false;
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedKey));
  }

  /**
   * Compiles the real-time operational dashboard overview.
   */
  async getDashboardOverview(): Promise<DashboardOverview> {
    const studentsRes = await this.db.prepare('SELECT COUNT(*) as cnt FROM accounts').first<{ cnt: number }>();
    const devicesRes = await this.db.prepare('SELECT COUNT(*) as cnt FROM devices WHERE is_active = 1').first<{ cnt: number }>();

    const purchasesRes = await this.db.prepare(
      `SELECT 
         COUNT(*) as total_cnt,
         SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_cnt,
         SUM(CASE WHEN status = 'success' THEN amount_kobo ELSE 0 END) as gross_kobo,
         SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) as refund_cnt,
         SUM(CASE WHEN status = 'refunded' THEN amount_kobo ELSE 0 END) as refund_kobo
       FROM purchases`
    ).first<{
      total_cnt: number;
      success_cnt: number;
      gross_kobo: number | null;
      refund_cnt: number;
      refund_kobo: number | null;
    }>();

    const reportsRes = await this.db.prepare("SELECT COUNT(*) as cnt FROM mistake_reports WHERE status = 'open'").first<{ cnt: number }>();
    const schoolReqRes = await this.db.prepare("SELECT COUNT(*) as cnt FROM school_requests WHERE status = 'pending'").first<{ cnt: number }>();
    const circlesRes = await this.db.prepare('SELECT COUNT(*) as cnt FROM circles').first<{ cnt: number }>();

    const grossKobo = purchasesRes?.gross_kobo || 0;
    const refundKobo = purchasesRes?.refund_kobo || 0;

    return {
      totalStudents: studentsRes?.cnt || 0,
      activeDevices: devicesRes?.cnt || 0,
      totalPurchases: purchasesRes?.total_cnt || 0,
      successfulPurchases: purchasesRes?.success_cnt || 0,
      grossRevenueKobo: grossKobo,
      grossRevenueNaira: Math.round(grossKobo / 100),
      totalRefunds: purchasesRes?.refund_cnt || 0,
      refundedAmountKobo: refundKobo,
      refundedAmountNaira: Math.round(refundKobo / 100),
      openMistakeReports: reportsRes?.cnt || 0,
      pendingSchoolRequests: schoolReqRes?.cnt || 0,
      activeCircles: circlesRes?.cnt || 0,
    };
  }

  /**
   * Lists recent purchases with user phone numbers.
   */
  async listPurchases(limit: number = 50): Promise<PurchaseAdminView[]> {
    const rows = await this.db.prepare(
      `SELECT p.id, p.reference, a.phone, p.item_type, p.item_id, p.amount_kobo, p.status, p.created_at, p.verified_at
       FROM purchases p
       LEFT JOIN accounts a ON p.account_id = a.id
       ORDER BY p.created_at DESC
       LIMIT ?`
    ).bind(limit).all<{
      id: string;
      reference: string;
      phone: string | null;
      item_type: string;
      item_id: string;
      amount_kobo: number;
      status: string;
      created_at: number;
      verified_at: number | null;
    }>();

    return (rows.results || []).map(r => ({
      id: r.id,
      reference: r.reference,
      phone: r.phone || 'Unknown',
      itemType: r.item_type,
      itemId: r.item_id,
      amountKobo: r.amount_kobo,
      amountNaira: Math.round(r.amount_kobo / 100),
      status: r.status,
      createdAt: r.created_at,
      verifiedAt: r.verified_at,
    }));
  }

  /**
   * Owner executes a refund on a purchase.
   */
  async refundPurchase(reference: string, adminId: string = 'owner', reason: string = 'Owner refund via admin'): Promise<{ ok: boolean; reference: string; error?: string }> {
    const res = await this.paystackService.processRefund(reference, reason);
    if (!res.ok) {
      return { ok: false, reference, error: res.error };
    }

    // Record in audit log
    const logId = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    await this.db.prepare(
      'INSERT INTO admin_audit_log (id, admin_id, action, target_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(logId, adminId, 'refund', reference, JSON.stringify({ reason }), now).run();

    return { ok: true, reference };
  }

  /**
   * Lists all promotional & class discount codes.
   */
  async listCodes(): Promise<ClassCodeRecord[]> {
    const rows = await this.db.prepare(
      'SELECT code, discount_percent, school, max_uses, uses_count, expires_at, created_at FROM class_codes ORDER BY created_at DESC'
    ).all<{
      code: string;
      discount_percent: number;
      school: string | null;
      max_uses: number;
      uses_count: number;
      expires_at: number | null;
      created_at: number;
    }>();

    return (rows.results || []).map(r => ({
      code: r.code,
      discountPercent: r.discount_percent,
      school: r.school,
      maxUses: r.max_uses,
      usesCount: r.uses_count,
      expiresAt: r.expires_at,
      createdAt: r.created_at,
    }));
  }

  /**
   * Creates a new class or promotional discount code.
   */
  async createCode(code: string, discountPercent: number, school?: string, maxUses: number = 100, expiresAt?: number): Promise<{ ok: boolean; code: string; error?: string }> {
    const cleanCode = code.trim().toUpperCase();
    if (!/^[A-Z0-9_-]{3,20}$/.test(cleanCode)) {
      return { ok: false, code: cleanCode, error: 'INVALID_CODE_FORMAT' };
    }
    if (discountPercent < 1 || discountPercent > 100) {
      return { ok: false, code: cleanCode, error: 'INVALID_DISCOUNT_PERCENT' };
    }

    const now = Math.floor(Date.now() / 1000);
    try {
      await this.db.prepare(
        'INSERT INTO class_codes (code, discount_percent, school, max_uses, uses_count, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(cleanCode, discountPercent, school || null, maxUses, 0, expiresAt || null, now).run();

      return { ok: true, code: cleanCode };
    } catch {
      return { ok: false, code: cleanCode, error: 'CODE_ALREADY_EXISTS' };
    }
  }

  /**
   * Lists content mistake reports submitted by students.
   */
  async listMistakeReports(statusFilter?: string): Promise<MistakeReportRecord[]> {
    let sql = 'SELECT id, account_id, lesson_id, course_id, issue_type, description, suggested_fix, status, created_at, resolved_at, notes FROM mistake_reports';
    const params: unknown[] = [];
    if (statusFilter) {
      sql += ' WHERE status = ?';
      params.push(statusFilter);
    }
    sql += ' ORDER BY created_at DESC LIMIT 100';

    const rows = await this.db.prepare(sql).bind(...params).all<{
      id: string;
      account_id: string | null;
      lesson_id: string;
      course_id: string;
      issue_type: string;
      description: string;
      suggested_fix: string | null;
      status: 'open' | 'resolved' | 'dismissed';
      created_at: number;
      resolved_at: number | null;
      notes: string | null;
    }>();

    return (rows.results || []).map(r => ({
      id: r.id,
      accountId: r.account_id,
      lessonId: r.lesson_id,
      courseId: r.course_id,
      issueType: r.issue_type,
      description: r.description,
      suggestedFix: r.suggested_fix,
      status: r.status,
      createdAt: r.created_at,
      resolvedAt: r.resolved_at,
      notes: r.notes,
    }));
  }

  /**
   * Resolves or dismisses a mistake report.
   */
  async resolveMistakeReport(id: string, status: 'resolved' | 'dismissed', notes?: string): Promise<{ ok: boolean; error?: string }> {
    const now = Math.floor(Date.now() / 1000);
    const res = await this.db.prepare(
      'UPDATE mistake_reports SET status = ?, resolved_at = ?, notes = ? WHERE id = ?'
    ).bind(status, now, notes || null, id).run();

    if (res.meta?.changes === 0) {
      return { ok: false, error: 'REPORT_NOT_FOUND' };
    }
    return { ok: true };
  }

  /**
   * Lists requests for unlisted universities or programmes.
   */
  async listSchoolRequests(statusFilter?: string): Promise<SchoolRequestRecord[]> {
    let sql = 'SELECT id, account_id, school_name, programme_name, contact_email, contact_phone, status, created_at FROM school_requests';
    const params: unknown[] = [];
    if (statusFilter) {
      sql += ' WHERE status = ?';
      params.push(statusFilter);
    }
    sql += ' ORDER BY created_at DESC LIMIT 100';

    const rows = await this.db.prepare(sql).bind(...params).all<{
      id: string;
      account_id: string | null;
      school_name: string;
      programme_name: string;
      contact_email: string | null;
      contact_phone: string | null;
      status: 'pending' | 'in_progress' | 'supported';
      created_at: number;
    }>();

    return (rows.results || []).map(r => ({
      id: r.id,
      accountId: r.account_id,
      schoolName: r.school_name,
      programmeName: r.programme_name,
      contactEmail: r.contact_email,
      contactPhone: r.contact_phone,
      status: r.status,
      createdAt: r.created_at,
    }));
  }

  /**
   * Looks up a user account by phone number, including registered devices and entitlements.
   */
  async lookupUser(phone: string): Promise<{
    account: { id: string; phone: string; createdAt: number } | null;
    devices: Array<{ id: string; name: string; isActive: boolean; registeredAt: number; lastActiveAt: number }>;
    entitlements: Array<{ courseId: string; grantedAt: number }>;
  }> {
    const account = await this.db.prepare(
      'SELECT id, phone, created_at FROM accounts WHERE phone = ?'
    ).bind(phone).first<{ id: string; phone: string; created_at: number }>();

    if (!account) {
      return { account: null, devices: [], entitlements: [] };
    }

    const devices = await this.db.prepare(
      'SELECT id, device_name, is_active, registered_at, last_active_at FROM devices WHERE account_id = ? ORDER BY registered_at DESC'
    ).bind(account.id).all<{
      id: string;
      device_name: string;
      is_active: number;
      registered_at: number;
      last_active_at: number;
    }>();

    const entitlements = await this.db.prepare(
      'SELECT course_id, granted_at FROM entitlements WHERE account_id = ?'
    ).bind(account.id).all<{ course_id: string; granted_at: number }>();

    return {
      account: { id: account.id, phone: account.phone, createdAt: account.created_at },
      devices: (devices.results || []).map(d => ({
        id: d.id,
        name: d.device_name,
        isActive: d.is_active === 1,
        registeredAt: d.registered_at,
        lastActiveAt: d.last_active_at,
      })),
      entitlements: (entitlements.results || []).map(e => ({
        courseId: e.course_id,
        grantedAt: e.granted_at,
      })),
    };
  }

  /**
   * Resets active devices for a user who lost their device or reached device limit.
   */
  async resetUserDevices(accountId: string, adminId: string = 'owner'): Promise<{ ok: boolean; resetCount: number }> {
    const res = await this.db.prepare(
      'UPDATE devices SET is_active = 0 WHERE account_id = ? AND is_active = 1'
    ).bind(accountId).run();

    const count = res.meta?.changes || 0;

    const logId = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    await this.db.prepare(
      'INSERT INTO admin_audit_log (id, admin_id, action, target_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(logId, adminId, 'reset_devices', accountId, JSON.stringify({ deactivatedCount: count }), now).run();

    return { ok: true, resetCount: count };
  }

  /**
   * Submits a student mistake report.
   */
  async submitMistakeReport(report: {
    accountId?: string | null;
    lessonId: string;
    courseId: string;
    issueType: string;
    description: string;
    suggestedFix?: string | null;
  }): Promise<{ id: string; status: 'open' }> {
    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    await this.db.prepare(
      `INSERT INTO mistake_reports (id, account_id, lesson_id, course_id, issue_type, description, suggested_fix, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?)`
    ).bind(
      id,
      report.accountId || null,
      report.lessonId,
      report.courseId,
      report.issueType,
      report.description,
      report.suggestedFix || null,
      now
    ).run();

    return { id, status: 'open' };
  }

  /**
   * Submits a student school request.
   */
  async submitSchoolRequest(request: {
    accountId?: string | null;
    schoolName: string;
    programmeName: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
  }): Promise<{ id: string; status: 'pending' }> {
    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    await this.db.prepare(
      `INSERT INTO school_requests (id, account_id, school_name, programme_name, contact_email, contact_phone, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`
    ).bind(
      id,
      request.accountId || null,
      request.schoolName,
      request.programmeName,
      request.contactEmail || null,
      request.contactPhone || null,
      now
    ).run();

    return { id, status: 'pending' };
  }
}
