// Authentication, rate limiting, and 2-device registration logic for 4YOS Server.

import type { D1DatabaseLike } from './db.ts';
import { hashCode } from './crypto.ts';

export interface VerifyResult {
  ok: boolean;
  code?: string;
  message?: string;
  sessionToken?: string;
  accountId?: string;
  deviceId?: string;
  isNewAccount?: boolean;
}

export class AuthService {
  private db: D1DatabaseLike;
  private latestCodes = new Map<string, string>();

  constructor(db: D1DatabaseLike) {
    this.db = db;
  }

  /**
   * Test harness hook: reads the latest code generated for this phone without exposing it over HTTP.
   */
  getLatestChallengeCode(phone: string): string | undefined {
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    return this.latestCodes.get(cleanPhone);
  }

  /**
   * Enforces rate limiting on key (e.g. `sms:08012345678`).
   */
  async checkRateLimit(key: string, maxAllowed: number, windowSeconds: number): Promise<boolean> {
    const now = Math.floor(Date.now() / 1000);
    const existing = await this.db.prepare(
      'SELECT count, reset_at FROM rate_limits WHERE key = ?'
    ).bind(key).first<{ count: number; reset_at: number }>();

    if (!existing || now >= existing.reset_at) {
      await this.db.prepare(
        'INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?)'
      ).bind(key, now + windowSeconds).run();
      return true;
    }

    if (existing.count >= maxAllowed) {
      return false;
    }

    await this.db.prepare(
      'UPDATE rate_limits SET count = count + 1 WHERE key = ?'
    ).bind(key).run();
    return true;
  }

  /**
   * Issues a cryptographically random 6-digit SMS verification code with rate limit and expiration.
   * Callers cannot pick their own verification code.
   */
  async requestVerificationCode(phone: string): Promise<{ ok: boolean; code?: string; error?: string }> {
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      return { ok: false, error: 'INVALID_PHONE_NUMBER' };
    }

    // Rate limit: max 3 requests per 3600 seconds (1 hour)
    const allowed = await this.checkRateLimit(`otp_req:${cleanPhone}`, 3, 3600);
    if (!allowed) {
      return { ok: false, error: 'RATE_LIMITED' };
    }

    const buf = new Uint8Array(4);
    crypto.getRandomValues(buf);
    const num = (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];
    const code = (Math.abs(num) % 900000 + 100000).toString();
    this.latestCodes.set(cleanPhone, code);

    const hash = await hashCode(cleanPhone, code);
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 600; // 10 minutes

    await this.db.prepare(
      'INSERT OR REPLACE INTO auth_challenges (phone, code_hash, expires_at, attempts, created_at) VALUES (?, ?, ?, 0, ?)'
    ).bind(cleanPhone, hash, expiresAt, now).run();

    return { ok: true, code };
  }

  /**
   * Verifies an SMS OTP and registers device with strict 2-device limit.
   */
  async verifyCodeAndRegisterDevice(
    phone: string,
    code: string,
    deviceId: string,
    deviceName: string = 'Browser'
  ): Promise<VerifyResult> {
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    const now = Math.floor(Date.now() / 1000);

    const challenge = await this.db.prepare(
      'SELECT code_hash, expires_at, attempts FROM auth_challenges WHERE phone = ?'
    ).bind(cleanPhone).first<{ code_hash: string; expires_at: number; attempts: number }>();

    if (!challenge) {
      return { ok: false, code: 'NO_ACTIVE_CHALLENGE', message: 'No verification requested or code expired.' };
    }

    if (now > challenge.expires_at) {
      await this.db.prepare('DELETE FROM auth_challenges WHERE phone = ?').bind(cleanPhone).run();
      return { ok: false, code: 'CODE_EXPIRED', message: 'The verification code has expired.' };
    }

    if (challenge.attempts >= 3) {
      await this.db.prepare('DELETE FROM auth_challenges WHERE phone = ?').bind(cleanPhone).run();
      return { ok: false, code: 'TOO_MANY_ATTEMPTS', message: 'Too many incorrect attempts. Please request a new code.' };
    }

    const expectedHash = await hashCode(cleanPhone, code.trim());
    if (challenge.code_hash !== expectedHash) {
      const nextAttempts = challenge.attempts + 1;
      if (nextAttempts >= 3) {
        await this.db.prepare('DELETE FROM auth_challenges WHERE phone = ?').bind(cleanPhone).run();
        return { ok: false, code: 'TOO_MANY_ATTEMPTS', message: 'Too many incorrect attempts. Please request a new code.' };
      }
      await this.db.prepare(
        'UPDATE auth_challenges SET attempts = attempts + 1 WHERE phone = ?'
      ).bind(cleanPhone).run();
      return { ok: false, code: 'INVALID_CODE', message: 'Incorrect verification code.' };
    }

    // Find or create account
    let account = await this.db.prepare(
      'SELECT id FROM accounts WHERE phone = ?'
    ).bind(cleanPhone).first<{ id: string }>();

    let isNewAccount = false;
    let accountId = account?.id;

    if (!accountId) {
      accountId = `acc_${Math.random().toString(36).substring(2, 12)}`;
      await this.db.prepare(
        'INSERT INTO accounts (id, phone, created_at, updated_at) VALUES (?, ?, ?, ?)'
      ).bind(accountId, cleanPhone, now, now).run();
      isNewAccount = true;
    }

    // Check device registration & enforce 2-device limit
    const existingDevice = await this.db.prepare(
      'SELECT id, is_active FROM devices WHERE id = ? AND account_id = ?'
    ).bind(deviceId, accountId).first<{ id: string; is_active: number }>();

    if (existingDevice) {
      // Re-activate if needed and touch last_active_at
      await this.db.prepare(
        'UPDATE devices SET last_active_at = ?, is_active = 1 WHERE id = ?'
      ).bind(now, deviceId).run();
    } else {
      // Count active devices for this account
      const activeDevices = await this.db.prepare(
        'SELECT count(*) as count FROM devices WHERE account_id = ? AND is_active = 1'
      ).bind(accountId).first<{ count: number }>();

      const activeCount = activeDevices?.count ?? 0;
      if (activeCount >= 2) {
        return {
          ok: false,
          code: 'DEVICE_LIMIT_REACHED',
          message: 'Maximum limit of 2 active devices reached. Please remove an existing device before signing in.'
        };
      }

      // Register new device
      await this.db.prepare(
        'INSERT INTO devices (id, account_id, device_name, registered_at, last_active_at, is_active) VALUES (?, ?, ?, ?, ?, 1)'
      ).bind(deviceId, accountId, deviceName, now, now).run();
    }

    // Code is correct and device successfully registered: consume challenge
    await this.db.prepare('DELETE FROM auth_challenges WHERE phone = ?').bind(cleanPhone).run();

    // Issue cryptographically secure random session token tied to account & device
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const sessionToken = 'sess_' + Buffer.from(tokenBytes).toString('base64url');
    const tokenHash = await hashCode('session', sessionToken);
    const sessionExpiresAt = now + (60 * 86400); // 60 days

    await this.db.prepare(
      'INSERT INTO sessions (token_hash, account_id, device_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(tokenHash, accountId, deviceId, now, sessionExpiresAt).run();

    return {
      ok: true,
      sessionToken,
      accountId,
      deviceId,
      isNewAccount
    };
  }

  /**
   * Validates a session token and returns the authenticated account and device.
   * Rejects expired sessions and sessions for revoked devices.
   */
  async validateSession(sessionToken: string): Promise<{ accountId: string; deviceId: string } | null> {
    if (!sessionToken || typeof sessionToken !== 'string') return null;
    const tokenHash = await hashCode('session', sessionToken);
    const now = Math.floor(Date.now() / 1000);

    const session = await this.db.prepare(
      'SELECT account_id, device_id, expires_at FROM sessions WHERE token_hash = ?'
    ).bind(tokenHash).first<{ account_id: string; device_id: string; expires_at: number }>();

    if (!session) return null;

    if (now > session.expires_at) {
      await this.db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
      return null;
    }

    // Verify the associated device is still active
    const dev = await this.db.prepare(
      'SELECT is_active FROM devices WHERE id = ? AND account_id = ?'
    ).bind(session.device_id, session.account_id).first<{ is_active: number }>();

    if (!dev || dev.is_active !== 1) {
      return null;
    }

    return { accountId: session.account_id, deviceId: session.device_id };
  }

  /**
   * Revokes a session token.
   */
  async revokeSession(sessionToken: string): Promise<boolean> {
    const tokenHash = await hashCode('session', sessionToken);
    const res = await this.db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
    return res.success;
  }

  /**
   * Deactivates a device and destroys all sessions for that device.
   */
  async removeDevice(accountId: string, deviceId: string): Promise<boolean> {
    const res = await this.db.prepare(
      'UPDATE devices SET is_active = 0 WHERE id = ? AND account_id = ?'
    ).bind(deviceId, accountId).run();

    // Revoke all active sessions on this device
    await this.db.prepare('DELETE FROM sessions WHERE device_id = ? AND account_id = ?').bind(deviceId, accountId).run();
    return res.success;
  }
}
