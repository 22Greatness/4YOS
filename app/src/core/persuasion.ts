// Honest persuasion features and notification policies.
// Fulfills Section 17 Table B: Next card, streak with weekly freeze, gentle review nudges,
// session summary (peak-end), and opt-in notifications (capped at 1/day, quiet hours 10pm-7am).

export interface StreakInfo {
  currentStreak: number;
  highestStreak: number;
  studiedToday: boolean;
  freezeUsedThisWeek: boolean;
  lastFreezeDate?: string;
  status: 'active' | 'freeze_used' | 'broken' | 'new';
  message: string;
  weeklyFreezeAvailable: boolean;
}

export interface NextAction {
  title: string;
  subtitle: string;
  courseCode: string;
  courseTitle: string;
  estMinutes: number;
  targetId: string;
  gradientTag?: string; // e.g. "2 lessons to unit test"
  type: 'lesson' | 'unit_test' | 'exam' | 'retake';
}

export interface CourseProgressState {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  unitTestsTotal: number;
  unitTestsPassed: number;
  examPassed: boolean;
  nextLessonId?: string;
  nextLessonTitle?: string;
  isCarryOver?: boolean;
}

export interface ReviewNudge {
  message: string;
  estMinutes: number;
  show: boolean;
}

export interface SessionSummaryInput {
  minutesActive: number;
  checksAnswered: number;
  checksCorrect: number;
  skillsLearned: string[];
  currentStreak: number;
}

export interface SessionSummary {
  headline: string;
  summaryPraise: string;
  minutesActive: number;
  checksCorrect: number;
  accuracyPercent: number;
  skillsLearned: string[];
  streakDayCount: number;
  ayoReaction: 'celebrate' | 'smile' | 'thumbs_up';
}

export interface NotificationPref {
  accountId: string;
  optIn: boolean;
  muted: boolean;
  studyHour: number; // default 20 (8pm)
  quietHoursStart: number; // 22 (10pm)
  quietHoursEnd: number; // 7 (7am)
  lastNotifiedDate?: string; // 'YYYY-MM-DD'
}

export type NotificationType =
  | 'study_time'
  | 'circle_ginger'
  | 'cards_due'
  | 'exam_countdown';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
}

// Banned manipulative / guilt-trip phrases (strict Table B rule)
export const BANNED_PERSUASION_PATTERNS = [
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

/**
 * Returns ISO week string (e.g. '2026-W45') for weekly freeze tracking.
 */
export function getIsoWeek(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Adds or subtracts days from a 'YYYY-MM-DD' date string.
 */
export function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Calculate study streak with 1 weekly freeze and welcoming, honest messaging.
 */
export function calculateStreak(
  studyDates: string[],
  todayStr: string,
  lastFreezeDate?: string
): StreakInfo {
  const dateSet = new Set(studyDates);
  const currentWeek = getIsoWeek(todayStr);
  const lastFreezeWeek = lastFreezeDate ? getIsoWeek(lastFreezeDate) : null;
  const freezeUsedThisWeek = lastFreezeWeek === currentWeek;

  const studiedToday = dateSet.has(todayStr);
  const yesterdayStr = shiftDate(todayStr, -1);
  const studiedYesterday = dateSet.has(yesterdayStr);

  if (dateSet.size === 0) {
    return {
      currentStreak: 0,
      highestStreak: 0,
      studiedToday: false,
      freezeUsedThisWeek: false,
      status: 'new',
      message: "Ready to start your study habit today? Ayo is ready when you are.",
      weeklyFreezeAvailable: true,
    };
  }

  // Count backwards from today (or yesterday if today isn't done yet)
  let checkDate = studiedToday ? todayStr : yesterdayStr;
  let streak = 0;
  let freezeAppliedDate: string | undefined = undefined;
  let freezeUsedInStreak = freezeUsedThisWeek;

  while (true) {
    if (dateSet.has(checkDate)) {
      streak++;
      checkDate = shiftDate(checkDate, -1);
    } else if (!freezeUsedInStreak && checkDate !== todayStr && dateSet.has(shiftDate(checkDate, -1))) {
      // 1 free weekly freeze bridges one missed day if the preceding day was studied
      freezeUsedInStreak = true;
      freezeAppliedDate = checkDate;
      checkDate = shiftDate(checkDate, -1);
    } else {
      break;
    }
  }

  // If yesterday was missed and freeze wasn't used/applicable
  if (!studiedToday && !studiedYesterday && !freezeAppliedDate) {
    return {
      currentStreak: 0,
      highestStreak: Math.max(streak, dateSet.size),
      studiedToday: false,
      freezeUsedThisWeek,
      lastFreezeDate,
      status: 'broken',
      message: "Welcome back! Ready for today's session? Every minute counts.",
      weeklyFreezeAvailable: !freezeUsedThisWeek,
    };
  }

  if (freezeAppliedDate) {
    return {
      currentStreak: streak,
      highestStreak: Math.max(streak, dateSet.size),
      studiedToday,
      freezeUsedThisWeek: true,
      lastFreezeDate: freezeAppliedDate,
      status: 'freeze_used',
      message: `❄️ Weekly freeze protected your ${streak}-day streak. One freeze granted per week.`,
      weeklyFreezeAvailable: false,
    };
  }

  return {
    currentStreak: streak,
    highestStreak: Math.max(streak, dateSet.size),
    studiedToday,
    freezeUsedThisWeek,
    lastFreezeDate,
    status: 'active',
    message: studiedToday
      ? `🔥 ${streak}-day streak! You studied today. Keep the momentum going.`
      : `🔥 ${streak}-day streak! Complete one lesson today to keep it active.`,
    weeklyFreezeAvailable: !freezeUsedThisWeek,
  };
}

/**
 * Resolves the single clear next primary action (One Clear Next Step & Goal Gradient).
 */
export function resolveNextAction(
  courses: CourseProgressState[],
  reviewsDue: number = 0
): NextAction {
  // 1. First priority: Carry-over courses
  const carryOver = courses.find(c => c.isCarryOver && !c.examPassed);
  if (carryOver) {
    return {
      title: `Clear ${carryOver.courseCode} Carry-Over`,
      subtitle: `Targeted review and practice to clear ${carryOver.courseTitle}`,
      courseCode: carryOver.courseCode,
      courseTitle: carryOver.courseTitle,
      estMinutes: 20,
      targetId: carryOver.nextLessonId ?? `exam:${carryOver.courseId}`,
      gradientTag: 'Carry-over priority',
      type: carryOver.nextLessonId ? 'lesson' : 'retake',
    };
  }

  // 2. Second priority: Course ready for unit test or final exam
  for (const c of courses) {
    if (c.examPassed) continue;
    const remainingToExam = c.unitTestsTotal - c.unitTestsPassed;
    if (remainingToExam === 0 && !c.examPassed) {
      return {
        title: `Sit ${c.courseCode} Practice Exam`,
        subtitle: `All unit tests passed! Test your mastery on the full course exam.`,
        courseCode: c.code ?? c.courseCode,
        courseTitle: c.courseTitle,
        estMinutes: 30,
        targetId: `exam:${c.courseId}`,
        gradientTag: 'Ready for Exam',
        type: 'exam',
      };
    }
  }

  // 3. Third priority: Continue in-progress course with goal gradient
  const inProgress = courses.find(c => c.completedLessons > 0 && !c.examPassed) ?? courses[0];
  if (inProgress) {
    const lessonsInUnit = 5;
    const lessonsRemainingInUnit = lessonsInUnit - (inProgress.completedLessons % lessonsInUnit);
    const gradient = lessonsRemainingInUnit === 1
      ? '1 lesson to unit test'
      : `${lessonsRemainingInUnit} lessons to unit test`;

    return {
      title: inProgress.nextLessonTitle
        ? `Continue: ${inProgress.nextLessonTitle}`
        : `Start ${inProgress.courseCode}`,
      subtitle: `${inProgress.courseCode} · ${inProgress.courseTitle}`,
      courseCode: inProgress.courseCode,
      courseTitle: inProgress.courseTitle,
      estMinutes: 15,
      targetId: inProgress.nextLessonId ?? inProgress.courseId,
      gradientTag: gradient,
      type: 'lesson',
    };
  }

  // Default fallback
  return {
    title: 'Begin Your Degree Path',
    subtitle: 'Start with How Computers Work or Numbers and Algebra',
    courseCode: 'COS 101',
    courseTitle: 'Introduction to Computing Sciences',
    estMinutes: 15,
    targetId: 'hcw-parts',
    gradientTag: 'First step',
    type: 'lesson',
  };
}

/**
 * Gentle review nudge (honest loss aversion: explains review cards without shame).
 */
export function getReviewNudge(dueCount: number): ReviewNudge {
  if (dueCount <= 0) {
    return {
      message: 'All review cards are current. You are fully up to date.',
      estMinutes: 0,
      show: false,
    };
  }

  // 30 seconds per card estimated
  const estMinutes = Math.max(1, Math.round((dueCount * 30) / 60));
  return {
    message: `Your review cards are due: ${estMinutes} min keeps them fresh in memory.`,
    estMinutes,
    show: true,
  };
}

/**
 * Peak-end rule session summary: every study session ends on a win.
 */
export function generateSessionSummary(input: SessionSummaryInput): SessionSummary {
  const accuracy = input.checksAnswered > 0
    ? Math.round((input.checksCorrect / input.checksAnswered) * 100)
    : 100;

  let headline = 'Great study session!';
  let ayoReaction: 'celebrate' | 'smile' | 'thumbs_up' = 'thumbs_up';

  if (accuracy >= 80 && input.checksAnswered >= 3) {
    headline = 'Superb precision today!';
    ayoReaction = 'celebrate';
  } else if (input.minutesActive >= 20) {
    headline = 'Solid, focused study time!';
    ayoReaction = 'smile';
  }

  const praise = input.skillsLearned.length > 0
    ? `You advanced in ${input.skillsLearned.slice(0, 2).join(' and ')}. Keep building on this tomorrow.`
    : `You put in ${Math.round(input.minutesActive)} minutes of honest practice. Steady effort compounds.`;

  return {
    headline,
    summaryPraise: praise,
    minutesActive: Math.round(input.minutesActive * 10) / 10,
    checksCorrect: input.checksCorrect,
    accuracyPercent: accuracy,
    skillsLearned: input.skillsLearned,
    streakDayCount: input.currentStreak,
    ayoReaction,
  };
}

/**
 * Validates that notification text conforms to Section 17 B honest persuasion rules.
 */
export function validateNotificationContent(title: string, body: string): boolean {
  const combined = `${title} ${body}`;
  for (const pattern of BANNED_PERSUASION_PATTERNS) {
    if (pattern.test(combined)) return false;
  }
  return true;
}

export interface NotificationGateResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Enforces notification frequency capping (max 1/day), quiet hours (10pm-7am), and opt-in.
 */
export function evaluateNotificationGate(
  pref: NotificationPref,
  now: { hour: number; dateStr: string },
  payload: NotificationPayload
): NotificationGateResult {
  // 1. Opt-in check
  if (!pref.optIn) {
    return { allowed: false, reason: 'User has not opted into notifications' };
  }

  // 2. Muted check
  if (pref.muted) {
    return { allowed: false, reason: 'Notifications are currently muted' };
  }

  // 3. Quiet hours check (10:00 PM – 7:00 AM)
  const isQuietHour = now.hour >= pref.quietHoursStart || now.hour < pref.quietHoursEnd;
  if (isQuietHour) {
    return {
      allowed: false,
      reason: `Quiet hours active (${pref.quietHoursStart}:00 – ${pref.quietHoursEnd}:00)`,
    };
  }

  // 4. Strict frequency cap: at most 1 notification per day
  if (pref.lastNotifiedDate === now.dateStr) {
    return {
      allowed: false,
      reason: 'Frequency cap reached (maximum 1 notification per day)',
    };
  }

  // 5. Honest content check (no manipulation or guilt trips)
  if (!validateNotificationContent(payload.title, payload.body)) {
    return {
      allowed: false,
      reason: 'Notification content violates honest persuasion policy',
    };
  }

  return { allowed: true };
}
