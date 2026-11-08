// Dedicated Web Worker entry point for 4YOS Web Edition.
// Runs the SQLite database engine inside the worker thread with OPFS / IDB / Memory VFS.
// Fulfills the B1 request, error, and persistence contract.

import { createBrowserDatabase, type DatabaseConnection } from './sqlite-adapter.ts';
import { CoreEngine } from './core-engine.ts';
import wasmBinary from './wa-sqlite/dist/wa-sqlite-async.wasm';

export type CoreErrorCode =
  | 'NOT_OPEN'
  | 'UNKNOWN_METHOD'
  | 'INVALID_ARGUMENTS'
  | 'NOT_FOUND'
  | 'STORAGE_UNAVAILABLE'
  | 'NEWER_SCHEMA_UNSUPPORTED'
  | 'INTERNAL_ERROR';

const ALLOWED_METHODS = new Set([
  'init', 'status', 'open', 'close', 'schemaVersion', 'storage',
  'getSetting', 'setSetting', 'preference', 'profile', 'normalDay',
  'start', 'step', 'position', 'readingPart', 'draft', 'saveDraft', 'progress',
  'check', 'checkPaper',
  'assessments', 'attempts', 'assessmentSubmit', 'projectSubmit',
  'addCard', 'cards', 'libraryCards', 'rate',
  'note', 'notes', 'flagConfusing', 'confusingList',
  'goals', 'addGoal', 'addGoalStep', 'toggleGoalStep',
  'commitments', 'addCommitment',
  'today', 'backup', 'restore',
  'loadPack', 'listPacks', 'getPack', 'getLesson', 'studyDates', 'courseProgress', 'resultsSummary',
  'queueOutbox', 'getPendingOutbox', 'markOutboxSynced', 'markOutboxFailed', 'submitInterviewAssessment', 'submitPracticalProject',
  'submitAssignment', 'getAssignmentTask',
  'reportMistake', 'exportSovereignPassport'
]);

let engine: CoreEngine | null = null;
let db: DatabaseConnection | null = null;
let initPromise: Promise<CoreEngine> | null = null;

async function getOrInitEngine(options: {
  storage?: 'memory' | 'idb' | 'opfs';
  targetVersion?: number;
  name?: string;
} = {}): Promise<CoreEngine> {
  if (engine) return engine;
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const storage = options.storage || 'opfs';
        const name = options.name || 'records.db';
        db = await createBrowserDatabase({ storage, name, wasmBinary });
        const eng = new CoreEngine({ db });
        await eng.initSchema(options.targetVersion);
        engine = eng;
        return eng;
      } catch (err) {
        initPromise = null;
        engine = null;
        db = null;
        throw err;
      }
    })();
  }
  return initPromise;
}

async function handleMessage(event: MessageEvent): Promise<void> {
  const { id, method, args = [] } = event.data || {};
  if (id === undefined || id === null) return;

  if (!ALLOWED_METHODS.has(method)) {
    self.postMessage({
      id,
      ok: false,
      error: `Unknown core method: ${method}`,
      code: 'UNKNOWN_METHOD'
    });
    return;
  }

  if (!Array.isArray(args)) {
    self.postMessage({
      id,
      ok: false,
      error: 'Arguments must be an array',
      code: 'INVALID_ARGUMENTS'
    });
    return;
  }

  try {
    if (method === 'init') {
      const opts = (args[0] && typeof args[0] === 'object' && !Array.isArray(args[0]))
        ? args[0]
        : { storage: args[0] || 'opfs' };

      const eng = await getOrInitEngine(opts);
      const storage = eng.storage();
      const version = await eng.schemaVersion();
      self.postMessage({ id, ok: true, value: { ready: true, storage, version } });
      return;
    }

    if (method === 'status') {
      if (!engine) {
        self.postMessage({ id, ok: true, value: { ready: false, storage: null } });
      } else {
        self.postMessage({
          id,
          ok: true,
          value: { ready: true, storage: engine.storage(), version: await engine.schemaVersion() }
        });
      }
      return;
    }

    if (method === 'close') {
      if (db) {
        await db.close();
      }
      engine = null;
      db = null;
      initPromise = null;
      self.postMessage({ id, ok: true, value: { closed: true } });
      return;
    }

    const eng = await getOrInitEngine();
    const fn = (eng as any)[method];

    if (typeof fn !== 'function') {
      self.postMessage({
        id,
        ok: false,
        error: `Method not implemented: ${method}`,
        code: 'UNKNOWN_METHOD'
      });
      return;
    }

    const value = await fn.apply(eng, args);
    self.postMessage({ id, ok: true, value });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : String(error);
    const code: CoreErrorCode = message.includes('newer version')
      ? 'NEWER_SCHEMA_UNSUPPORTED'
      : message.includes('storage') || message.includes('VFS')
      ? 'STORAGE_UNAVAILABLE'
      : 'INTERNAL_ERROR';

    self.postMessage({
      id,
      ok: false,
      error: message,
      code
    });
  }
}

// Queue incoming messages sequentially so that database transactions and calls never conflict
let messageQueue: Promise<void> = Promise.resolve();

self.onmessage = (event: MessageEvent) => {
  messageQueue = messageQueue.then(async () => {
    await handleMessage(event);
  }).catch(() => {});
};
