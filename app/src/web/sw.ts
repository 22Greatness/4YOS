// 4YOS Web Edition Service Worker
// Provides full offline study capabilities via precaching and runtime caching.

import { WEB_CACHE_NAME as CACHE_NAME } from './cache-name.ts';

declare const __ASSETS__: string[];

const PRECACHE_URLS = [
  './',
  './index.html',
  './worker.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './content/free-courses.json',
  './art/ayo-portrait-320.png',
  './art/ayo-study-320.webp',
  './art/ayo-greet-160.webp',
  './art/ayo-idle-160.webp',
  './art/ayo-celebrate-160.webp',
  ...(typeof __ASSETS__ !== 'undefined' ? __ASSETS__ : [])
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Add precache assets gracefully (don't fail install if an optional asset is missing)
      for (const url of PRECACHE_URLS) {
        try {
          const resp = await fetch(url, { cache: 'no-cache' });
          if (resp.ok) {
            await cache.put(url, resp);
          }
        } catch {
          // Ignore missing optional precache assets during install
        }
      }
    }).then(() => (self as any).skipWaiting())
  );
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => (self as any).clients.claim())
  );
});

self.addEventListener('fetch', (event: any) => {
  const request: Request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Explicit pack downloads verify the fresh response before storing it.
  if (url.pathname.includes('/packs/') && url.searchParams.has('revision')) return;

  // Handle SPA navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = await cache.match('./index.html') || await cache.match('./');
        if (cachedIndex) return cachedIndex;
        return new Response('Offline: please reload when connected.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
    );
    return;
  }

  // Cache-first strategy for static assets, scripts, images, audio, wasm
  const isStatic =
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.wasm') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.vtt') ||
    url.pathname.endsWith('.woff2');

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Background revalidate in background if online
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default network-first strategy
  event.respondWith(
    fetch(request).catch(async () => {
      const match = await caches.match(request);
      if (match) return match;
      throw new Error('Network error and no cache match');
    })
  );
});
