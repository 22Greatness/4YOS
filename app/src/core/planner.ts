// Schedule real candidates inside the available minutes and surface any protected work that will not fit.
export type Candidate = {
  ref: string; title: string; minutes: number; kind: 'exam_prep' | 'review' | 'session' | 'goal_step' | 'catch_up';
  area: string; reason: string; priority: number; hard?: boolean; divisible?: boolean; dueDate?: string; availableFrom?: string;
};
export type Planned = Candidate & { plannedMinutes: number };
export type PlanResult = { next: Planned | null; also: Planned[]; deferred: Candidate[]; postponed?: Candidate[]; minutes: number; usedMinutes: number; conflict: string | null; timeKnown?: boolean };
export type WeekPreview = { days: { day: string; minutes: number; usedMinutes: number; items: Planned[] }[]; unscheduled: Candidate[] };

export function daysBetween(fromISO: string, toISO: string) {
  const d = (s: string) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
  return Math.round((d(toISO) - d(fromISO)) / 86400000);
}
export function examPriority(daysLeft: number) { return daysLeft <= 1 ? 100 : daysLeft <= 3 ? 90 : daysLeft <= 7 ? 80 : daysLeft <= 14 ? 60 : 30; }

/** Fits candidates into the minutes available. Pure, so it can be tested without the app. */
export function plan(candidates: Candidate[], minutes: number, opts: { maxAlso?: number } = {}): PlanResult {
  const maxAlso = opts.maxAlso ?? 2;
  const sorted = [...candidates].sort((a, b) => (Number(!!b.hard) - Number(!!a.hard)) || (b.priority - a.priority) || (a.minutes - b.minutes) || a.ref.localeCompare(b.ref, 'en'));
  const budget = Math.max(0, minutes);
  const placed: Planned[] = []; const deferred: Candidate[] = []; let left = budget;
  for (const c of sorted) {
    if (!c.hard && placed.length >= 1 + maxAlso) { deferred.push(c); continue; }
    if (c.minutes <= left) { placed.push({ ...c, plannedMinutes: c.minutes }); left -= c.minutes; continue; }
    // Long work can be shortened, as long as enough time remains to do something real.
    if (c.divisible && left >= Math.min(15, c.minutes)) { placed.push({ ...c, plannedMinutes: left }); left = 0; continue; }
    deferred.push(c);
  }
  const hardMissed = deferred.filter(d => d.hard);
  const conflict = hardMissed.length ? `Not enough time today for: ${hardMissed.map(h => h.title).join(', ')}.` : null;
  return { next: placed[0] ?? null, also: placed.slice(1), deferred, minutes: budget, usedMinutes: budget - left, conflict };
}

export function previewWeek(candidates: Candidate[], calendar: { day: string; minutes: number }[]): WeekPreview {
  const remaining = new Map(candidates.map(candidate => [candidate.ref, candidate]));
  const days = calendar.map(({ day, minutes }) => {
    const eligible = [...remaining.values()].filter(item => (!item.dueDate || item.dueDate >= day) && (!item.availableFrom || item.availableFrom <= day));
    const result = plan(eligible.map(item => ({
      ...item,
      priority: item.dueDate ? 2000 - daysBetween(day, item.dueDate) : item.priority,
      hard: !!item.dueDate && daysBetween(day, item.dueDate) <= 1,
      divisible: false,
    })), minutes);
    const items = result.next ? [result.next, ...result.also] : [];
    for (const item of items) remaining.delete(item.ref);
    return { day, minutes, usedMinutes: result.usedMinutes, items };
  });
  return { days, unscheduled: [...remaining.values()] };
}
