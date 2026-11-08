import { createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, statSync, statfsSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { Lesson } from '../shared';
import { net } from 'electron';

type Remote = { length: number; etag: string };
const limit = 10 * 1024 ** 3;

export function downloads(directory: string, lessons: Lesson[], allow: () => boolean, audit: (action: string, destination: string, outcome: string) => void) {
  const media = join(directory, 'media');
  mkdirSync(media, { recursive: true });
  const active = new Map<string, AbortController>();
  const metadata = new Map<string, Remote>();
  function source(id: unknown) {
    const lesson = lessons.find(item => item.id === id);
    if (!lesson?.video || !/^[a-z0-9-]+$/.test(lesson.id)) throw Error('This lesson has no downloadable video.');
    const url = new URL(lesson.video);
    if (url.origin !== 'https://cdn.cs50.net') throw Error('This source does not allow downloads in 4YOS.');
    return { id: lesson.id, url: url.href, path: join(media, lesson.id + '.mp4') };
  }
  function status(id: unknown) {
    const item = source(id);
    const complete = existsSync(item.path);
    const file = complete ? item.path : item.path + '.part';
    return { complete, active: active.has(item.id), bytes: existsSync(file) ? statSync(file).size : 0, total: metadata.get(item.id)?.length ?? null };
  }
  async function request(url: string, init: RequestInit) {
    if (!allow()) throw Error('Allow online video first.');
    return net.fetch(url, { ...init, credentials: 'omit', redirect: 'error', signal: init.signal ?? AbortSignal.timeout(15000) });
  }
  return {
    mediaStatus: status,
    mediaSize: async (id: unknown) => {
      const { id: key, url } = source(id);
      if (!allow()) throw Error('Allow online video first.');
      audit('Check video size', url, 'requested');
      const response = await request(url, { method: 'HEAD' });
      const length = Number(response.headers.get('content-length'));
      const etag = response.headers.get('etag');
      if (!response.ok || !Number.isSafeInteger(length) || length <= 0 || !etag || etag.startsWith('W/')) throw Error('The source did not provide a verifiable file size.');
      metadata.set(key, { length, etag });
      return { ...status(id), total: length };
    },
    mediaDownload: async (id: unknown, approvedBytes: unknown) => {
      const item = source(id);
      if (!allow()) throw Error('Allow online video first.');
      const remote = metadata.get(item.id);
      if (!remote || remote.length !== approvedBytes) throw Error('Check the current file size before downloading.');
      if (active.has(item.id) || existsSync(item.path)) return status(id);
      const used = lessons.filter(lesson => lesson.video).reduce((total, lesson) => total + status(lesson.id).bytes, 0);
      const partial = item.path + '.part';
      const tag = partial + '.etag';
      let offset = status(id).bytes;
      if (offset && (!existsSync(tag) || readFileSync(tag, 'utf8') !== remote.etag || offset >= remote.length)) {
        unlinkSync(partial); offset = 0;
      }
      const remaining = remote.length - offset;
      const disk = statfsSync(media);
      if (used + remaining > limit || disk.bavail * disk.bsize < remaining + 512 * 1024 ** 2) throw Error('There is not enough space for this video.');
      const controller = new AbortController();
      active.set(item.id, controller);
      try {
        audit('Download video', item.url, 'requested');
        const headers: Record<string, string> = { 'If-Match': remote.etag, 'Accept-Encoding': 'identity' };
        if (offset) headers.Range = 'bytes=' + offset + '-';
        const response = await request(item.url, { headers, signal: AbortSignal.any([controller.signal, AbortSignal.timeout(30 * 60 * 1000)]) });
        const expected = 'bytes ' + offset + '-' + (remote.length - 1) + '/' + remote.length;
        if (!response.body || response.headers.get('etag') !== remote.etag || (offset ? response.status !== 206 || response.headers.get('content-range') !== expected : response.status !== 200) || Number(response.headers.get('content-length')) !== remaining) {
          await response.body?.cancel();
          throw Error('The video changed or the source refused the resume request. Check the size again.');
        }
        writeFileSync(tag, remote.etag);
        await pipeline(Readable.from(response.body), createWriteStream(partial, { flags: offset ? 'a' : 'w' }), { signal: controller.signal });
        if (statSync(partial).size !== remote.length) throw Error('The download is incomplete.');
        renameSync(partial, item.path);
        unlinkSync(tag);
        audit('Download video', item.url, 'complete');
      } catch (error) {
        audit('Download video', item.url, controller.signal.aborted ? 'paused' : 'failed');
        if (!controller.signal.aborted) throw error;
      } finally { active.delete(item.id); }
      return status(id);
    },
    mediaPause: (id: unknown) => { active.get(source(id).id)?.abort(); },
    mediaPauseAll: () => { for (const controller of active.values()) controller.abort(); },
  };
}

