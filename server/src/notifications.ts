// Notification Service for Web Push and Study Reminders
// Fulfills Section 17 Table B: Opt-in, max 1/day, quiet hours 10pm-7am, honest messaging.

import type { D1DatabaseLike } from './db.ts';

export interface NotificationPrefRecord {
  account_id: string;
  opt_in: number;
  muted: number;
  study_hour: number;
  quiet_hours_start: number;
  quiet_hours_end: number;
  last_notified_date: string | null;
  updated_at: number;
}

export const BANNED_PATTERNS = [
  /lose everything/i,
  /lost your streak/i,
  /broken your streak/i,
  /shame/i,
  /disappointed/i,
  /fall behind/i,
  /hurry before/i,
  /only \d+ spots left/i,
  /sale ends in/i,
];

export class NotificationService {
  private db: D1DatabaseLike;

  constructor(db: D1DatabaseLike) {
    this.db = db;
  }

  async getPreferences(accountId: string): Promise<NotificationPrefRecord> {
    const row = await this.db
      .prepare('SELECT * FROM notification_preferences WHERE account_id = ?')
      .bind(accountId)
      .first<NotificationPrefRecord>();

    if (row) return row;

    const now = Date.now();
    const defaults: NotificationPrefRecord = {
      account_id: accountId,
      opt_in: 0,
      muted: 0,
      study_hour: 20, // 8:00 PM
      quiet_hours_start: 22, // 10:00 PM
      quiet_hours_end: 7, // 7:00 AM
      last_notified_date: null,
      updated_at: now,
    };

    await this.db
      .prepare(
        `INSERT OR IGNORE INTO notification_preferences 
        (account_id, opt_in, muted, study_hour, quiet_hours_start, quiet_hours_end, last_notified_date, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        accountId,
        defaults.opt_in,
        defaults.muted,
        defaults.study_hour,
        defaults.quiet_hours_start,
        defaults.quiet_hours_end,
        defaults.last_notified_date,
        defaults.updated_at
      )
      .run();

    return defaults;
  }

  async updatePreferences(
    accountId: string,
    updates: {
      optIn?: boolean;
      muted?: boolean;
      studyHour?: number;
      quietHoursStart?: number;
      quietHoursEnd?: number;
    }
  ): Promise<NotificationPrefRecord> {
    const current = await this.getPreferences(accountId);
    const optIn = updates.optIn !== undefined ? (updates.optIn ? 1 : 0) : current.opt_in;
    const muted = updates.muted !== undefined ? (updates.muted ? 1 : 0) : current.muted;
    const studyHour = updates.studyHour !== undefined ? updates.studyHour : current.study_hour;
    const quietHoursStart = updates.quietHoursStart !== undefined ? updates.quietHoursStart : current.quiet_hours_start;
    const quietHoursEnd = updates.quietHoursEnd !== undefined ? updates.quietHoursEnd : current.quiet_hours_end;
    const now = Date.now();

    await this.db
      .prepare(
        `UPDATE notification_preferences 
         SET opt_in = ?, muted = ?, study_hour = ?, quiet_hours_start = ?, quiet_hours_end = ?, updated_at = ?
         WHERE account_id = ?`
      )
      .bind(optIn, muted, studyHour, quietHoursStart, quietHoursEnd, now, accountId)
      .run();

    return {
      ...current,
      opt_in: optIn,
      muted,
      study_hour: studyHour,
      quiet_hours_start: quietHoursStart,
      quiet_hours_end: quietHoursEnd,
      updated_at: now,
    };
  }

  async subscribe(
    accountId: string,
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } }
  ): Promise<{ success: boolean }> {
    const subId = crypto.randomUUID();
    const now = Date.now();

    await this.db
      .prepare(
        `INSERT OR REPLACE INTO notification_subscriptions
         (id, account_id, endpoint, keys_p256dh, keys_auth, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(subId, accountId, subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth, now)
      .run();

    // Auto opt-in on explicit subscription
    await this.updatePreferences(accountId, { optIn: true });

    return { success: true };
  }

  async sendNotification(
    accountId: string,
    payload: { type: string; title: string; body: string },
    timeOverride?: { hour: number; dateStr: string }
  ): Promise<{ sent: boolean; reason?: string }> {
    const pref = await this.getPreferences(accountId);

    // 1. Opt-in check
    if (!pref.opt_in) {
      return { sent: false, reason: 'User has not opted in' };
    }

    // 2. Muted check
    if (pref.muted) {
      return { sent: false, reason: 'Notifications are muted' };
    }

    // 3. Time calculation
    const now = new Date();
    const currentHour = timeOverride?.hour ?? now.getUTCHours();
    const currentDateStr = timeOverride?.dateStr ?? now.toISOString().slice(0, 10);

    // 4. Quiet hours check (10:00 PM – 7:00 AM)
    const isQuietHour = currentHour >= pref.quiet_hours_start || currentHour < pref.quiet_hours_end;
    if (isQuietHour) {
      return {
        sent: false,
        reason: `Quiet hours active (${pref.quiet_hours_start}:00 – ${pref.quiet_hours_end}:00)`,
      };
    }

    // 5. Strict 1 notification per day frequency cap
    if (pref.last_notified_date === currentDateStr) {
      return {
        sent: false,
        reason: 'Frequency cap reached: maximum 1 notification per calendar day',
      };
    }

    // 6. Honest persuasion policy check
    const combined = `${payload.title} ${payload.body}`;
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(combined)) {
        return {
          sent: false,
          reason: 'Notification content violates honest persuasion policy',
        };
      }
    }

    // Record notification sent date to enforce daily cap
    await this.db
      .prepare(
        `UPDATE notification_preferences
         SET last_notified_date = ?, updated_at = ?
         WHERE account_id = ?`
      )
      .bind(currentDateStr, Date.now(), accountId)
      .run();

    return { sent: true };
  }
}
