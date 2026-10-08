self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Rawaj is a live CMS-backed application. Never keep an application-shell
    // cache that can resurrect an older logo, slider, or admin build.
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  // Network-only: Supabase and the current Netlify build remain authoritative.
  // Keeping the service worker registered preserves PWA installability without
  // caching old application assets.
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});
