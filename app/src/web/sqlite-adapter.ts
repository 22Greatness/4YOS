// In-browser SQLite adapter using wa-sqlite (MIT License).
// Provides an asynchronous, promise-based SQLite database interface for Web Workers.

import SQLiteESMFactory from './wa-sqlite/dist/wa-sqlite-async.mjs';
import * as SQLite from './wa-sqlite/src/sqlite-api.js';
import { MemoryVFS } from './wa-sqlite/src/examples/MemoryVFS.js';
import { IDBBatchAtomicVFS } from './wa-sqlite/src/examples/IDBBatchAtomicVFS.js';

export interface PreparedStatement<T = any> {
  get(...params: any[]): Promise<T | undefined>;
  all(...params: any[]): Promise<T[]>;
  run(...params: any[]): Promise<{ changes: number; lastInsertRowid: number | bigint }>;
}

export interface DatabaseConnection {
  readonly storageBackend: 'memory' | 'idb' | 'opfs';
  prepare<T = any>(sql: string): PreparedStatement<T>;
  exec(sql: string): Promise<void>;
  get<T = any>(sql: string, params?: any[]): Promise<T | undefined>;
  all<T = any>(sql: string, params?: any[]): Promise<T[]>;
  run(sql: string, params?: any[]): Promise<{ changes: number; lastInsertRowid: number | bigint }>;
  transaction<T>(fn: () => Promise<T>): Promise<T>;
  pragma(sql: string, options?: { simple?: boolean }): Promise<any>;
  close(): Promise<void>;
}

export interface CreateDatabaseOptions {
  name?: string;
  storage?: 'memory' | 'idb' | 'opfs';
  wasmBinary?: ArrayBuffer | Uint8Array;
}

function normalizeParams(args: any[]): any[] {
  if (args.length === 1 && Array.isArray(args[0])) {
    return args[0];
  }
  return args;
}

export async function createBrowserDatabase(options: CreateDatabaseOptions = {}): Promise<DatabaseConnection> {
  const { name = 'records.db', storage = 'memory', wasmBinary } = options;

  const initOpts: Record<string, unknown> = {};
  if (wasmBinary) {
    initOpts.wasmBinary = wasmBinary;
  }

  const module = await SQLiteESMFactory(initOpts);
  const sqlite3 = SQLite.Factory(module);

  // Register VFS based on storage choice
  let actualBackend: 'memory' | 'idb' | 'opfs' = 'memory';
  if (storage === 'memory') {
    const vfs = new MemoryVFS('mem');
    sqlite3.vfs_register(vfs, true);
    actualBackend = 'memory';
  } else if (storage === 'opfs') {
    try {
      const { AccessHandlePoolVFS } = await import('./wa-sqlite/src/examples/AccessHandlePoolVFS.js');
      const vfs = new AccessHandlePoolVFS('/4yos-opfs');
      await vfs.isReady;
      sqlite3.vfs_register(vfs, true);
      actualBackend = 'opfs';
    } catch (err: any) {
      console.warn('[VFS fallback: OPFS -> IDB]', err?.message || err);
      try {
        const vfs = new IDBBatchAtomicVFS('4yos-idb-records');
        sqlite3.vfs_register(vfs, true);
        actualBackend = 'idb';
      } catch (idbErr: any) {
        console.warn('[VFS fallback: IDB -> Memory]', idbErr?.message || idbErr);
        const vfs = new MemoryVFS('mem-opfs-fallback');
        sqlite3.vfs_register(vfs, true);
        actualBackend = 'memory';
      }
    }
  } else if (storage === 'idb') {
    try {
      const vfs = new IDBBatchAtomicVFS('4yos-idb-records');
      sqlite3.vfs_register(vfs, true);
      actualBackend = 'idb';
    } catch (err: any) {
      console.warn('[VFS fallback: IDB -> Memory]', err?.message || err);
      const vfs = new MemoryVFS('mem-idb-fallback');
      sqlite3.vfs_register(vfs, true);
      actualBackend = 'memory';
    }
  }

  const db = await sqlite3.open_v2(name);
  await sqlite3.exec(db, 'PRAGMA foreign_keys = ON;');

  const connection: DatabaseConnection = {
    storageBackend: actualBackend,
    prepare<T = any>(sql: string): PreparedStatement<T> {
      return {
        async get(...args: any[]): Promise<T | undefined> {
          const params = normalizeParams(args);
          return connection.get<T>(sql, params);
        },

        async all(...args: any[]): Promise<T[]> {
          const params = normalizeParams(args);
          return connection.all<T>(sql, params);
        },

        async run(...args: any[]): Promise<{ changes: number; lastInsertRowid: number | bigint }> {
          const params = normalizeParams(args);
          return connection.run(sql, params);
        }
      };
    },

    async exec(sql: string): Promise<void> {
      await sqlite3.exec(db, sql);
    },

    async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
      const res = await sqlite3.execWithParams(db, sql, params);
      if (!res.rows || res.rows.length === 0) return undefined;
      const row = res.rows[0];
      const obj: Record<string, any> = {};
      for (let i = 0; i < res.columns.length; i++) {
        obj[res.columns[i]] = row[i];
      }
      return obj as T;
    },

    async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
      const res = await sqlite3.execWithParams(db, sql, params);
      if (!res.rows) return [];
      const result: T[] = [];
      for (const row of res.rows) {
        const obj: Record<string, any> = {};
        for (let i = 0; i < res.columns.length; i++) {
          obj[res.columns[i]] = row[i];
        }
        result.push(obj as T);
      }
      return result;
    },

    async run(sql: string, params: any[] = []): Promise<{ changes: number; lastInsertRowid: number | bigint }> {
      await sqlite3.run(db, sql, params);
      const changes = sqlite3.changes(db);
      const res = await sqlite3.execWithParams(db, 'SELECT last_insert_rowid() AS id;');
      const lastInsertRowid = res.rows && res.rows.length > 0 ? (res.rows[0][0] ?? 0) : 0;
      return { changes, lastInsertRowid };
    },

    async transaction<T>(fn: () => Promise<T>): Promise<T> {
      await sqlite3.exec(db, 'BEGIN TRANSACTION;');
      try {
        const result = await fn();
        await sqlite3.exec(db, 'COMMIT;');
        return result;
      } catch (error) {
        await sqlite3.exec(db, 'ROLLBACK;');
        throw error;
      }
    },

    async pragma(sql: string, options?: { simple?: boolean }): Promise<any> {
      const res = await connection.get(`PRAGMA ${sql};`);
      if (options?.simple) {
        if (!res) return undefined;
        const keys = Object.keys(res);
        return keys.length > 0 ? (res as any)[keys[0]] : undefined;
      }
      return connection.all(`PRAGMA ${sql};`);
    },

    async close(): Promise<void> {
      await sqlite3.close(db);
    }
  };

  return connection;
}
