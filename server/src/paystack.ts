// Paystack payments engine for 4YOS Server.
// Fulfills Section 17 D & Step B5: Pricing, Initialize, HMAC-SHA512 Webhook, Re-verification,
// Idempotent settlement, Missed-webhook recovery, Class codes, and Refunds.

import crypto from 'node:crypto';
import type { D1DatabaseLike, D1PreparedStatement } from './db.ts';

export const STANDARD_PRICES_KOBO = {
  course: 100000,    // ₦1,000 in kobo
  level: 750000,     // ₦7,500 in kobo
  programme: 2000000 // ₦20,000 in kobo
};

export interface PaystackConfig {
  secretKey: string;
  publicKey: string;
  webhookSecret: string;
}

export interface BuyRequest {
  accountId: string;
  email: string;
  itemType: 'course' | 'level' | 'programme';
  itemId: string; // e.g. 'csc203', '100L', 'cs'
  courseIds: string[]; // List of courses included in this purchase
  classCode?: string;
  parentPay?: boolean;
}

export interface PurchaseRecord {
  id: string;
  accountId: string;
  reference: string;
  itemType: string;
  itemId: string;
  amountKobo: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  createdAt: number;
}

export class PaystackService {
  private db: D1DatabaseLike;
  private config: PaystackConfig;
  private fetcher: typeof fetch;

  constructor(db: D1DatabaseLike, config: PaystackConfig, fetcher: typeof fetch = fetch) {
    this.db = db;
    this.config = config;
    this.fetcher = fetcher;
  }

  /**
   * Generates a unique reference: 4YOS-xxxxxxxx
   */
  generateReference(): string {
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `4YOS-${Date.now().toString(36).toUpperCase()}-${randomHex}`;
  }

  /**
   * Calculates the exact price on the server, subtracting courses the learner already owns.
   */
  async calculatePrice(accountId: string, itemType: 'course' | 'level' | 'programme', courseIds: string[]): Promise<{ amountKobo: number; alreadyOwned: string[]; newlyAcquired: string[] }> {
    const owned = await this.db.prepare(
      'SELECT course_id FROM entitlements WHERE account_id = ?'
    ).bind(accountId).all<{ course_id: string }>();

    const ownedSet = new Set((owned.results || []).map(r => r.course_id));
    const alreadyOwned = courseIds.filter(c => ownedSet.has(c));
    const newlyAcquired = courseIds.filter(c => !ownedSet.has(c));

    if (newlyAcquired.length === 0) {
      return { amountKobo: 0, alreadyOwned, newlyAcquired };
    }

    let basePrice = STANDARD_PRICES_KOBO[itemType] || STANDARD_PRICES_KOBO.course;

    // If purchasing a level or bundle, discount proportion of already owned courses
    if (itemType !== 'course' && alreadyOwned.length > 0) {
      const deduction = Math.min(basePrice, alreadyOwned.length * STANDARD_PRICES_KOBO.course);
      basePrice = Math.max(STANDARD_PRICES_KOBO.course, basePrice - deduction);
    }

    return { amountKobo: basePrice, alreadyOwned, newlyAcquired };
  }

  /**
   * Initializes a transaction with Paystack and records a pending purchase in D1.
   */
  async initializeBuy(req: BuyRequest): Promise<{ ok: boolean; authorizationUrl?: string; reference: string; amountKobo: number; error?: string }> {
    const { amountKobo, newlyAcquired } = await this.calculatePrice(req.accountId, req.itemType, req.courseIds);
    if (amountKobo <= 0) {
      return { ok: false, reference: '', amountKobo: 0, error: 'ALL_COURSES_ALREADY_OWNED' };
    }

    // Apply optional class code discount
    let finalAmountKobo = amountKobo;
    if (req.classCode && req.classCode.toUpperCase() === 'UNIPORT15') {
      finalAmountKobo = Math.round(amountKobo * 0.85); // 15% discount for class code
    }

    const reference = this.generateReference();
    const purchaseId = `pur_${crypto.randomUUID()}`;
    const now = Math.floor(Date.now() / 1000);

    // Save pending purchase record
    await this.db.prepare(
      'INSERT INTO purchases (id, account_id, reference, item_type, item_id, amount_kobo, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(purchaseId, req.accountId, reference, req.itemType, req.itemId, finalAmountKobo, 'pending', now).run();

    // In production, calls Paystack API: https://api.paystack.co/transaction/initialize
    const paystackRes = await this.fetcher('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: req.email,
        amount: finalAmountKobo,
        reference,
        metadata: {
          accountId: req.accountId,
          courses: newlyAcquired,
          parentPay: !!req.parentPay
        }
      })
    }).catch(() => null);

    let authorizationUrl = `https://checkout.paystack.com/${reference}`;
    if (paystackRes && paystackRes.ok) {
      const data = await paystackRes.json() as any;
      if (data?.data?.authorization_url) {
        authorizationUrl = data.data.authorization_url;
      }
    }

    return {
      ok: true,
      reference,
      amountKobo: finalAmountKobo,
      authorizationUrl
    };
  }

  /**
   * Verifies the HMAC-SHA512 signature on incoming Paystack webhooks.
   */
  verifyWebhookSignature(payloadRaw: string, signature: string): boolean {
    if (!signature) return false;
    const expectedSig = crypto
      .createHmac('sha512', this.config.webhookSecret || this.config.secretKey)
      .update(payloadRaw)
      .digest('hex');

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuf, expectedBuf);
  }

  /**
   * Verifies a transaction directly with Paystack API.
   * Returns transaction status, amount in kobo, currency, and metadata.
   */
  async verifyTransaction(reference: string): Promise<{
    verified: boolean;
    status: string;
    amountKobo: number;
    currency: string;
    accountId?: string;
    courses?: string[];
  }> {
    const res = await this.fetcher(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${this.config.secretKey}` }
    }).catch(() => null);

    if (!res || !res.ok) {
      return { verified: false, status: 'UNVERIFIED', amountKobo: 0, currency: 'NGN' };
    }

    const json = await res.json() as any;
    const tx = json?.data;
    if (!tx) {
      return { verified: false, status: 'INVALID_RESPONSE', amountKobo: 0, currency: 'NGN' };
    }

    return {
      verified: true,
      status: tx.status,
      amountKobo: tx.amount,
      currency: tx.currency || 'NGN',
      accountId: tx.metadata?.accountId,
      courses: tx.metadata?.courses || []
    };
  }

  /**
   * Idempotently settles a purchase and issues entitlements upon payment confirmation.
   * Strictly validates expected account, reference, amount, currency, and prevents duplicate/concurrent settlement.
   */
  async settlePurchase(
    reference: string,
    coursesToGrant: string[],
    verifiedAmountKobo: number,
    verifiedCurrency: string = 'NGN',
    expectedAccountId?: string
  ): Promise<{ success: boolean; alreadySettled: boolean }> {
    const purchase = await this.db.prepare(
      'SELECT id, account_id, status, amount_kobo, currency FROM purchases WHERE reference = ?'
    ).bind(reference).first<{ id: string; account_id: string; status: string; amount_kobo: number; currency: string }>();

    if (!purchase) {
      throw new Error(`Purchase record not found for reference: ${reference}`);
    }

    // Idempotency: if already marked success, return cleanly without duplicating grants
    if (purchase.status === 'success') {
      return { success: true, alreadySettled: true };
    }

    // Account validation: if expectedAccountId provided, verify it matches purchase.account_id
    if (expectedAccountId && purchase.account_id !== expectedAccountId) {
      throw new Error(`Account mismatch for reference ${reference}: expected ${purchase.account_id}, got ${expectedAccountId}`);
    }

    // Currency check: ensure currency matches expected NGN
    if (verifiedCurrency.toUpperCase() !== (purchase.currency || 'NGN').toUpperCase()) {
      throw new Error(`Currency mismatch for reference ${reference}: expected ${purchase.currency}, got ${verifiedCurrency}`);
    }

    // Amount check: ensure paid amount matches or exceeds expected amount
    if (verifiedAmountKobo < purchase.amount_kobo) {
      await this.db.prepare('UPDATE purchases SET status = ? WHERE id = ?').bind('failed', purchase.id).run();
      throw new Error(`Paid amount (${verifiedAmountKobo}) less than expected amount (${purchase.amount_kobo})`);
    }

    const now = Math.floor(Date.now() / 1000);

    // Atomically update purchase status, grant all course entitlements, and queue outbox SMS
    // Executed via db.batch to guarantee full transactional atomicity (PAY-01).
    // If any grant or outbox insert fails, D1 rolls back the entire batch, keeping purchase 'pending' for retry.
    const statements: D1PreparedStatement[] = [
      this.db.prepare(
        'UPDATE purchases SET status = ?, verified_at = ? WHERE id = ? AND status = ?'
      ).bind('success', now, purchase.id, 'pending')
    ];

    for (const c of coursesToGrant) {
      statements.push(
        this.db.prepare(
          'INSERT OR REPLACE INTO entitlements (account_id, course_id, granted_at, purchase_id) VALUES (?, ?, ?, ?)'
        ).bind(purchase.account_id, c, now, purchase.id)
      );
    }

    const outboxId = `out_${crypto.randomUUID()}`;
    statements.push(
      this.db.prepare(
        'INSERT INTO outbox (id, type, recipient, payload, purchase_id, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        outboxId,
        'receipt_sms',
        purchase.account_id,
        JSON.stringify({
          reference,
          amountKobo: purchase.amount_kobo,
          courses: coursesToGrant,
          grantedAt: now
        }),
        purchase.id,
        now
      )
    );

    const batchRes = await this.db.batch(statements);
    const updateMeta = batchRes[0]?.meta;

    if (updateMeta && updateMeta.changes === 0) {
      // Concurrently settled by another worker
      return { success: true, alreadySettled: true };
    }

    return { success: true, alreadySettled: false };
  }

  /**
   * Reconciles a pending purchase by verifying directly with Paystack API (handles missed webhooks).
   */
  async reconcilePendingPurchase(reference: string): Promise<{ status: string; settled: boolean }> {
    const purchase = await this.db.prepare(
      'SELECT id, account_id, status FROM purchases WHERE reference = ?'
    ).bind(reference).first<{ id: string; account_id: string; status: string }>();

    if (!purchase) return { status: 'NOT_FOUND', settled: false };
    if (purchase.status === 'success') return { status: 'success', settled: true };

    // Query Paystack Verify API
    const tx = await this.verifyTransaction(reference);

    if (tx.verified && tx.status === 'success') {
      await this.settlePurchase(
        reference,
        tx.courses || [],
        tx.amountKobo,
        tx.currency,
        tx.accountId
      );
      return { status: 'success', settled: true };
    }

    return { status: tx.status || 'pending', settled: false };
  }

  /**
   * Processes a refund via Paystack Refund API and revokes entitlements (within 7 days).
   */
  async processRefund(reference: string, reason: string = 'Requested within 7 days'): Promise<{ ok: boolean; error?: string }> {
    const purchase = await this.db.prepare(
      'SELECT id, account_id, status, created_at, amount_kobo FROM purchases WHERE reference = ?'
    ).bind(reference).first<{ id: string; account_id: string; status: string; created_at: number; amount_kobo: number }>();

    if (!purchase) return { ok: false, error: 'PURCHASE_NOT_FOUND' };
    if (purchase.status !== 'success') return { ok: false, error: 'PURCHASE_NOT_ELIGIBLE' };

    const now = Math.floor(Date.now() / 1000);
    const ageDays = (now - purchase.created_at) / 86400;
    if (ageDays > 7) {
      return { ok: false, error: 'REFUND_WINDOW_EXPIRED' }; // Past 7 days
    }

    // Call Paystack Refund API and strictly validate provider acceptance (PAY-02)
    let refundRes: Response;
    try {
      refundRes = await this.fetcher('https://api.paystack.co/refund', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transaction: reference, merchant_note: reason })
      });
    } catch (err: any) {
      return { ok: false, error: 'REFUND_NETWORK_ERROR' };
    }

    if (!refundRes || !refundRes.ok) {
      return { ok: false, error: 'REFUND_PROVIDER_ERROR' };
    }

    const refundJson = await refundRes.json().catch(() => null) as any;
    if (!refundJson || refundJson.status === false) {
      return { ok: false, error: 'REFUND_REJECTED' };
    }

    // Provider accepted refund. Atomically transition purchase and revoke entitlements in a batch
    await this.db.batch([
      this.db.prepare('UPDATE purchases SET status = ? WHERE id = ?').bind('refunded', purchase.id),
      this.db.prepare('DELETE FROM entitlements WHERE purchase_id = ?').bind(purchase.id)
    ]);

    return { ok: true };
  }

  /**
   * Reconciles all pending purchases older than staleMinutes (e.g. 15 min).
   * Scheduled cron or manual owner trigger to catch any lost webhooks.
   */
  async reconcileAllStalePending(staleMinutes: number = 15): Promise<{ checked: number; settled: number; failed: number }> {
    const cutoff = Math.floor(Date.now() / 1000) - (staleMinutes * 60);
    const pendingList = await this.db.prepare(
      'SELECT reference FROM purchases WHERE status = ? AND created_at <= ?'
    ).bind('pending', cutoff).all<{ reference: string }>();

    let checked = 0;
    let settled = 0;
    let failed = 0;

    for (const row of pendingList.results || []) {
      checked++;
      try {
        const res = await this.reconcilePendingPurchase(row.reference);
        if (res.settled) settled++;
      } catch {
        failed++;
      }
    }

    return { checked, settled, failed };
  }
}
