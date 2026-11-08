// app/src/web/client.ts
var WebCoreClient = class {
  worker = null;
  workerUrl;
  seq = 0;
  pending = /* @__PURE__ */ new Map();
  listeners = /* @__PURE__ */ new Set();
  constructor(workerOrUrl) {
    if (typeof workerOrUrl === "string") {
      this.workerUrl = workerOrUrl;
    } else {
      this.worker = workerOrUrl;
      this.workerUrl = "";
      this.setupWorker();
    }
  }
  ensureWorker() {
    if (!this.worker) {
      this.worker = new Worker(this.workerUrl, { type: "module" });
      this.setupWorker();
    }
    return this.worker;
  }
  setupWorker() {
    if (!this.worker) return;
    this.worker.onmessage = (event) => {
      const { id, ok, value, error, ev, data } = event.data || {};
      if (ev) {
        for (const listener of this.listeners) {
          listener(ev, data);
        }
        return;
      }
      if (id && this.pending.has(id)) {
        const { resolve, reject } = this.pending.get(id);
        this.pending.delete(id);
        if (ok) {
          resolve(value);
        } else {
          const err = new Error(error || "The core request failed.");
          if (event.data?.code) {
            err.code = event.data.code;
          }
          reject(err);
        }
      }
    };
  }
  async call(method, ...args) {
    const worker = this.ensureWorker();
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      worker.postMessage({ id, method, args });
    });
  }
  async status() {
    return this.call("status");
  }
  on(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  async playerUrl(id) {
    return `/content/lectures/${encodeURIComponent(id)}.mp4`;
  }
};
function initWebClient(workerUrl = "/src/web/worker.js") {
  const client = new WebCoreClient(workerUrl);
  if (typeof window !== "undefined") {
    window.os4 = client;
  }
  return client;
}
export {
  WebCoreClient as CoreWorkerClient,
  WebCoreClient,
  initWebClient
};
