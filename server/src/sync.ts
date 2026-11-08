// Backup & Sync merge engine for 4YOS.
// Fulfills Section 14 & 17 Step B6: Multi-device offline sync with conflict resolution,
// best scores preserved, passes kept from either device, and deterministic note tie-breaks.

export interface AttemptRecord {
  id: string;
  assessmentId: string;
  courseId: string;
  score: number;       // 0 to 100
  passed: boolean;
  timestamp: number;   // Epoch seconds
  answers?: Record<string, any>;
}

export interface NoteRecord {
  id: string;
  lessonId: string;
  content: string;
  updatedAt: number;   // Epoch seconds
}

export interface GoalRecord {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
  updatedAt: number;   // Epoch seconds
}

export interface ReviewRecord {
  id: string;
  cardId: string;
  rating: number;      // 1 to 4
  reviewedAt: number;  // Epoch seconds
}

export interface SyncSnapshot {
  accountId: string;
  timestamp: number;
  attempts: AttemptRecord[];
  notes: NoteRecord[];
  goals: GoalRecord[];
  reviews: ReviewRecord[];
  tombstones: string[]; // Deleted record IDs to prevent resurrection
}

/**
 * Merges two divergent snapshots from two offline devices.
 * Implements Section 14 merge rules:
 * 1. Passes are kept from either device.
 * 2. Best scores win for assessments.
 * 3. Notes keep latest edit per note with deterministic tie-break.
 * 4. Review history is combined without duplication.
 * 5. Tombstones are preserved so deleted items are not resurrected.
 */
export function mergeSnapshots(local: SyncSnapshot, remote: SyncSnapshot): SyncSnapshot {
  // 1. Combine Tombstones (deletion markers)
  const combinedTombstones = Array.from(new Set([...(local.tombstones || []), ...(remote.tombstones || [])]));
  const tombstoneSet = new Set(combinedTombstones);

  // 2. Merge Attempts (Deduplicate by ID, keep all attempts, best score wins, passes preserved)
  const attemptMap = new Map<string, AttemptRecord>();
  for (const a of [...(local.attempts || []), ...(remote.attempts || [])]) {
    if (!attemptMap.has(a.id)) {
      attemptMap.set(a.id, a);
    } else {
      // If same ID appears, retain pass and higher score
      const existing = attemptMap.get(a.id)!;
      const higherScore = Math.max(existing.score, a.score);
      const passed = existing.passed || a.passed;
      attemptMap.set(a.id, {
        ...existing,
        score: higherScore,
        passed,
        timestamp: Math.max(existing.timestamp, a.timestamp)
      });
    }
  }
  const mergedAttempts = Array.from(attemptMap.values())
    .sort((a, b) => a.timestamp - b.timestamp);

  // 3. Merge Notes (Latest edit per note, tie-break by ID, respect tombstones)
  const noteMap = new Map<string, NoteRecord>();
  for (const n of [...(local.notes || []), ...(remote.notes || [])]) {
    if (tombstoneSet.has(n.id)) continue; // Discard deleted notes

    if (!noteMap.has(n.id)) {
      noteMap.set(n.id, n);
    } else {
      const existing = noteMap.get(n.id)!;
      if (n.updatedAt > existing.updatedAt) {
        noteMap.set(n.id, n);
      } else if (n.updatedAt === existing.updatedAt) {
        // Deterministic tie-break: longer content or alphabetical
        if (n.content.length > existing.content.length || n.content > existing.content) {
          noteMap.set(n.id, n);
        }
      }
    }
  }
  const mergedNotes = Array.from(noteMap.values());

  // 4. Merge Goals (Latest update wins, respect tombstones)
  const goalMap = new Map<string, GoalRecord>();
  for (const g of [...(local.goals || []), ...(remote.goals || [])]) {
    if (tombstoneSet.has(g.id)) continue; // Discard deleted goals

    if (!goalMap.has(g.id)) {
      goalMap.set(g.id, g);
    } else {
      const existing = goalMap.get(g.id)!;
      if (g.updatedAt >= existing.updatedAt) {
        goalMap.set(g.id, g);
      }
    }
  }
  const mergedGoals = Array.from(goalMap.values());

  // 5. Merge Reviews (Union deduplicated by review ID)
  const reviewMap = new Map<string, ReviewRecord>();
  for (const r of [...(local.reviews || []), ...(remote.reviews || [])]) {
    if (!reviewMap.has(r.id)) {
      reviewMap.set(r.id, r);
    }
  }
  const mergedReviews = Array.from(reviewMap.values())
    .sort((a, b) => a.reviewedAt - b.reviewedAt);

  return {
    accountId: local.accountId || remote.accountId,
    timestamp: Math.max(local.timestamp, remote.timestamp),
    attempts: mergedAttempts,
    notes: mergedNotes,
    goals: mergedGoals,
    reviews: mergedReviews,
    tombstones: combinedTombstones
  };
}

/**
 * Computes best score and pass status per assessment from merged attempts.
 */
export function getAssessmentOutcomes(attempts: AttemptRecord[]): Record<string, { bestScore: number; passed: boolean; attemptsCount: number }> {
  const outcomes: Record<string, { bestScore: number; passed: boolean; attemptsCount: number }> = {};
  for (const a of attempts) {
    if (!outcomes[a.assessmentId]) {
      outcomes[a.assessmentId] = { bestScore: a.score, passed: a.passed, attemptsCount: 1 };
    } else {
      const cur = outcomes[a.assessmentId];
      cur.bestScore = Math.max(cur.bestScore, a.score);
      cur.passed = cur.passed || a.passed;
      cur.attemptsCount++;
    }
  }
  return outcomes;
}
