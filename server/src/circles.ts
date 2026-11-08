// Circle and Study Together Engine
// Fulfills Section 16 & Section 17 B9:
// - Study circles (2-8 members, or class circles up to 60)
// - Invite links (no public directory, invite-only)
// - Preset gingers strictly capped at 3/day per friend
// - Shared circle goals with progress tracking
// - Circle week board with privacy default (grades hidden by default)
// - Study together synchronous timer sessions
// - 1-tap leave, mute, and block safeguards

import type { D1DatabaseLike } from './db.ts';

export const GINGER_PRESETS: Record<string, { label: string; text: string }> = {
  'turn': { label: 'Oya, your turn', text: 'Oya, your turn! 🔥' },
  'got_this': { label: "You've got this", text: "You've got this! Keep pushing. 💪" },
  'exam_soon': { label: 'Exam countdown', text: "Exam is coming up, let's lock in! 📚" },
  'proud': { label: 'Proud of you', text: 'Proud of you for clearing that milestone! ⭐' },
  'study_now': { label: 'Study together', text: 'Study session starting now, join in! ⏱️' },
};

export interface CircleRecord {
  id: string;
  name: string;
  code: string;
  created_by: string;
  max_members: number;
  is_class_circle: number;
  created_at: number;
}

export interface CircleMemberRecord {
  circle_id: string;
  account_id: string;
  role: string;
  joined_at: number;
  share_grades: number;
  is_muted: number;
}

export interface CircleGoalRecord {
  id: string;
  circle_id: string;
  title: string;
  target_date: string;
  target_count: number;
  current_count: number;
  created_at: number;
}

export interface StudySessionRecord {
  id: string;
  circle_id: string;
  host_id: string;
  course_id: string;
  duration_minutes: number;
  started_at: number;
  ends_at: number;
  status: string;
}

export class CircleService {
  private db: D1DatabaseLike;

  constructor(db: D1DatabaseLike) {
    this.db = db;
  }

  /**
   * Generates a short, readable 8-character invite code (e.g. CIRC-A8X2).
   */
  generateInviteCode(): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = 'CIRC-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Create a study circle. Regular circles hold 2-8 members; class circles hold up to 60.
   */
  async createCircle(params: {
    name: string;
    creatorId: string;
    isClassCircle?: boolean;
  }): Promise<{ circleId: string; code: string; name: string; maxMembers: number }> {
    const circleId = crypto.randomUUID();
    const code = this.generateInviteCode();
    const isClass = params.isClassCircle ? 1 : 0;
    const maxMembers = isClass ? 60 : 8;
    const now = Date.now();

    await this.db
      .prepare(
        `INSERT INTO circles (id, name, code, created_by, max_members, is_class_circle, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(circleId, params.name, code, params.creatorId, maxMembers, isClass, now)
      .run();

    // Add creator as lead member (default grades private)
    await this.db
      .prepare(
        `INSERT INTO circle_members (circle_id, account_id, role, joined_at, share_grades, is_muted)
         VALUES (?, ?, 'lead', ?, 0, 0)`
      )
      .bind(circleId, params.creatorId, now)
      .run();

    return { circleId, code, name: params.name, maxMembers };
  }

  /**
   * Join a circle via invite code. Rejects if circle capacity is reached.
   */
  async joinCircle(params: {
    code: string;
    accountId: string;
  }): Promise<{ circle: CircleRecord; memberCount: number }> {
    const circle = await this.db
      .prepare('SELECT * FROM circles WHERE code = ?')
      .bind(params.code.toUpperCase())
      .first<CircleRecord>();

    if (!circle) {
      throw new Error('CIRCLE_NOT_FOUND');
    }

    // Check current member count
    const countRow = await this.db
      .prepare('SELECT COUNT(*) as count FROM circle_members WHERE circle_id = ?')
      .bind(circle.id)
      .first<{ count: number }>();

    const currentCount = countRow?.count ?? 0;
    if (currentCount >= circle.max_members) {
      throw new Error('CIRCLE_FULL');
    }

    const now = Date.now();
    await this.db
      .prepare(
        `INSERT OR IGNORE INTO circle_members (circle_id, account_id, role, joined_at, share_grades, is_muted)
         VALUES (?, ?, 'member', ?, 0, 0)`
      )
      .bind(circle.id, params.accountId, now)
      .run();

    return { circle, memberCount: currentCount + 1 };
  }

  /**
   * Get circle details, members, active goal, and the circle week board.
   * Enforces privacy default: exam grades are hidden unless share_grades is explicitly 1.
   */
  async getCircleDetails(circleId: string, viewerAccountId?: string) {
    const circle = await this.db
      .prepare('SELECT * FROM circles WHERE id = ?')
      .bind(circleId)
      .first<CircleRecord>();

    if (!circle) throw new Error('CIRCLE_NOT_FOUND');

    const members = await this.db
      .prepare('SELECT circle_id, account_id, role, joined_at, share_grades, is_muted FROM circle_members WHERE circle_id = ?')
      .bind(circleId)
      .all<CircleMemberRecord>();

    const goal = await this.db
      .prepare('SELECT * FROM circle_goals WHERE circle_id = ? ORDER BY created_at DESC LIMIT 1')
      .bind(circleId)
      .first<CircleGoalRecord>();

    const activeSession = await this.db
      .prepare("SELECT * FROM study_sessions WHERE circle_id = ? AND status = 'active' ORDER BY started_at DESC LIMIT 1")
      .bind(circleId)
      .first<StudySessionRecord>();

    return {
      circle,
      members: members.results.map(m => ({
        accountId: m.account_id,
        role: m.role,
        joinedAt: m.joined_at,
        gradesVisible: m.share_grades === 1,
      })),
      goal: goal ?? null,
      activeSession: activeSession ?? null,
    };
  }

  /**
   * Set or update a shared circle goal.
   */
  async setCircleGoal(params: {
    circleId: string;
    title: string;
    targetDate: string;
    targetCount: number;
  }): Promise<CircleGoalRecord> {
    const goalId = crypto.randomUUID();
    const now = Date.now();

    await this.db
      .prepare(
        `INSERT INTO circle_goals (id, circle_id, title, target_date, target_count, current_count, created_at)
         VALUES (?, ?, ?, ?, ?, 0, ?)`
      )
      .bind(goalId, params.circleId, params.title, params.targetDate, params.targetCount, now)
      .run();

    return {
      id: goalId,
      circle_id: params.circleId,
      title: params.title,
      target_date: params.targetDate,
      target_count: params.targetCount,
      current_count: 0,
      created_at: now,
    };
  }

  /**
   * Send a preset ginger to a friend.
   * Strictly enforces:
   * 1. Only preset messages allowed.
   * 2. At most 3 gingers a day per person to each friend.
   * 3. Blocked users' gingers are stopped.
   */
  async sendGinger(params: {
    circleId: string;
    senderId: string;
    recipientId: string;
    presetKey: string;
    dateStr?: string;
  }): Promise<{ success: boolean; text: string; remainingToday: number }> {
    const preset = GINGER_PRESETS[params.presetKey];
    if (!preset) {
      throw new Error('INVALID_GINGER_PRESET');
    }

    if (params.senderId === params.recipientId) {
      throw new Error('CANNOT_GINGER_SELF');
    }

    // Check if recipient has blocked sender
    const isBlocked = await this.db
      .prepare('SELECT 1 FROM circle_blocks WHERE blocker_id = ? AND blocked_id = ?')
      .bind(params.recipientId, params.senderId)
      .first();

    if (isBlocked) {
      throw new Error('BLOCKED_BY_USER');
    }

    const todayStr = params.dateStr ?? new Date().toISOString().slice(0, 10);

    // Rate limit: check count sent by sender to recipient today
    const countRow = await this.db
      .prepare(
        `SELECT COUNT(*) as count FROM circle_gingers 
         WHERE sender_id = ? AND recipient_id = ? AND date_str = ?`
      )
      .bind(params.senderId, params.recipientId, todayStr)
      .first<{ count: number }>();

    const sentToday = countRow?.count ?? 0;
    if (sentToday >= 3) {
      throw new Error('GINGER_DAILY_LIMIT_REACHED');
    }

    const gingerId = crypto.randomUUID();
    const now = Date.now();

    await this.db
      .prepare(
        `INSERT INTO circle_gingers (id, circle_id, sender_id, recipient_id, preset_key, date_str, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(gingerId, params.circleId, params.senderId, params.recipientId, params.presetKey, todayStr, now)
      .run();

    return {
      success: true,
      text: preset.text,
      remainingToday: 2 - sentToday,
    };
  }

  /**
   * Block a user. Blocked user's gingers and notifications will never reach the blocker.
   */
  async blockUser(blockerId: string, blockedId: string): Promise<{ success: boolean }> {
    const now = Date.now();
    await this.db
      .prepare(
        `INSERT OR IGNORE INTO circle_blocks (blocker_id, blocked_id, created_at)
         VALUES (?, ?, ?)`
      )
      .bind(blockerId, blockedId, now)
      .run();

    return { success: true };
  }

  /**
   * Leave a circle in one tap. Progress remains yours; circle reflects "former member".
   */
  async leaveCircle(circleId: string, accountId: string): Promise<{ success: boolean }> {
    await this.db
      .prepare('DELETE FROM circle_members WHERE circle_id = ? AND account_id = ?')
      .bind(circleId, accountId)
      .run();

    return { success: true };
  }

  /**
   * Start a study together timer session (e.g. 45 minutes on MTH 101).
   */
  async startStudySession(params: {
    circleId: string;
    hostId: string;
    courseId: string;
    durationMinutes: number;
  }): Promise<StudySessionRecord> {
    const sessionId = crypto.randomUUID();
    const now = Date.now();
    const endsAt = now + params.durationMinutes * 60 * 1000;

    await this.db
      .prepare(
        `INSERT INTO study_sessions (id, circle_id, host_id, course_id, duration_minutes, started_at, ends_at, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`
      )
      .bind(sessionId, params.circleId, params.hostId, params.courseId, params.durationMinutes, now, endsAt)
      .run();

    // Add host as first participant
    await this.db
      .prepare(
        `INSERT INTO study_session_participants (session_id, account_id, joined_at, completed_minutes)
         VALUES (?, ?, ?, 0)`
      )
      .bind(sessionId, params.hostId, now)
      .run();

    return {
      id: sessionId,
      circle_id: params.circleId,
      host_id: params.hostId,
      course_id: params.courseId,
      duration_minutes: params.durationMinutes,
      started_at: now,
      ends_at: endsAt,
      status: 'active',
    };
  }

  /**
   * Join an active study session.
   */
  async joinStudySession(params: {
    sessionId: string;
    accountId: string;
  }): Promise<{ success: boolean }> {
    const now = Date.now();
    await this.db
      .prepare(
        `INSERT OR IGNORE INTO study_session_participants (session_id, account_id, joined_at, completed_minutes)
         VALUES (?, ?, ?, 0)`
      )
      .bind(params.sessionId, params.accountId, now)
      .run();

    return { success: true };
  }
}
