// Browser client that implements the window.os4 doorway for the Web Edition (PWA).
// Dispatches all calls to the SQLite web worker via postMessage.

export interface Os4Bridge {
  call: (method: string, ...args: unknown[]) => Promise<any>;
  playerUrl?: (id: string) => Promise<string>;
  pickSaveBackup?: () => Promise<string | null>;
  pickOpenBackup?: () => Promise<string | null>;
  on?: (fn: (event: string, data: unknown) => void) => () => void;
}

export class WebCoreClient implements Os4Bridge {
  private worker: Worker | null = null;
  private workerUrl: string;
  private seq = 0;
  private pending = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
  private listeners = new Set<(event: string, data: unknown) => void>();

  constructor(workerOrUrl: Worker | string) {
    if (typeof workerOrUrl === 'string') {
      this.workerUrl = workerOrUrl;
    } else {
      this.worker = workerOrUrl;
      this.workerUrl = '';
      this.setupWorker();
    }
  }

  private ensureWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker(this.workerUrl, { type: 'module' });
      this.setupWorker();
    }
    return this.worker;
  }

  private setupWorker() {
    if (!this.worker) return;
    this.worker.onmessage = (event: MessageEvent) => {
      const { id, ok, value, error, ev, data } = event.data || {};
      if (ev) {
        for (const listener of this.listeners) {
          listener(ev, data);
        }
        return;
      }
      if (id && this.pending.has(id)) {
        const { resolve, reject } = this.pending.get(id)!;
        this.pending.delete(id);
        if (ok) {
          resolve(value);
        } else {
          const err = new Error(error || 'The core request failed.');
          if (event.data?.code) {
            (err as any).code = event.data.code;
          }
          reject(err);
        }
      }
    };
  }

  async call(method: string, ...args: unknown[]): Promise<any> {
    const worker = this.ensureWorker();
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      worker.postMessage({ id, method, args });
    });
  }

  async status(): Promise<any> {
    return this.call('status');
  }

  on(fn: (event: string, data: unknown) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  async playerUrl(id: string): Promise<string> {
    return `/content/lectures/${encodeURIComponent(id)}.mp4`;
  }
}

/**
 * Initializes the web client on window.os4 if running in a browser environment.
 */
export function initWebClient(workerUrl: string = '/src/web/worker.js'): WebCoreClient {
  const client = new WebCoreClient(workerUrl);
  if (typeof window !== 'undefined') {
    (window as any).os4 = client;
  }
  return client;
}

export { WebCoreClient as CoreWorkerClient };
