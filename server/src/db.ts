// Database abstraction for Cloudflare D1 with local SQLite test capability.

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = any>(colName?: string): Promise<T | null>;
  all<T = any>(): Promise<{ results: T[]; success: boolean }>;
  run(): Promise<{ success: boolean; meta?: any }>;
}

export interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<void>;
  batch(statements: D1PreparedStatement[]): Promise<any[]>;
}

import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Memory SQLite implementation for local unit and integration tests without Cloudflare deployment
export async function createMemoryD1(schemaSql: string): Promise<D1DatabaseLike> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const require = createRequire(import.meta.url);
  const Database = require(path.resolve(__dirname, '../../app/node_modules/better-sqlite3-multiple-ciphers'));

  const rawDb = new Database(':memory:');
  rawDb.exec('PRAGMA foreign_keys = ON;');
  rawDb.exec(schemaSql);

  let batchLock: Promise<void> = Promise.resolve();

  return {
    async exec(query: string): Promise<void> {
      rawDb.exec(query);
    },

    prepare(query: string): D1PreparedStatement {
      let boundValues: any[] = [];
      const stmt = {
        bind(...values: any[]) {
          boundValues = values;
          return stmt;
        },

        async first<T = any>(colName?: string): Promise<T | null> {
          const row = rawDb.prepare(query).get(...boundValues);
          if (!row) return null;
          if (colName) return (row as any)[colName] ?? null;
          return row as T;
        },

        async all<T = any>(): Promise<{ results: T[]; success: boolean }> {
          const results = rawDb.prepare(query).all(...boundValues) as T[];
          return { results, success: true };
        },

        async run(): Promise<{ success: boolean; meta?: any }> {
          const info = rawDb.prepare(query).run(...boundValues);
          return { success: true, meta: { changes: info.changes, last_row_id: info.lastInsertRowid } };
        }
      };
      return stmt;
    },

    async batch(statements: D1PreparedStatement[]): Promise<any[]> {
      const prevLock = batchLock;
      let release: () => void = () => {};
      batchLock = new Promise<void>((resolve) => { release = resolve; });
      await prevLock;

      try {
        rawDb.exec('BEGIN;');
        const results = [];
        for (const s of statements) {
          results.push(await s.run());
        }
        rawDb.exec('COMMIT;');
        return results;
      } catch (err) {
        try { rawDb.exec('ROLLBACK;'); } catch {}
        throw err;
      } finally {
        release();
      }
    }
  };
}
