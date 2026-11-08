// Database and runtime abstraction: allows core business logic to run in both
// Electron (via better-sqlite3) and Web Worker (via wa-sqlite with OPFS / Memory).

export interface PreparedStatement<T = any> {
  get(...args: any[]): T | undefined;
  all(...args: any[]): T[];
  run(...args: any[]): { changes: number; lastInsertRowid: number | bigint };
}

export interface DatabaseConnection {
  prepare<T = any>(sql: string): PreparedStatement<T>;
  exec(sql: string): void;
  transaction<T>(fn: () => T): () => T;
  pragma(sql: string, options?: { simple?: boolean }): any;
  close(): void;
}
