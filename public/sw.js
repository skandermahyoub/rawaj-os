self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));

    await self.registration.unregister();

    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });

    for (const client of windows) {
      try {
        await client.navigate(client.url);
      } catch {
        // A client may disappear while the cleanup worker is activating.
      }
    }
  })());
});

self.addEventListener('fetch', () => {
  // Intentionally no caching. Network is the only source of the application shell.
});
