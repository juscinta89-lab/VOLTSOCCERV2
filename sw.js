/* ROBOSOCCER BY VOLT — Service Worker (network-first / auto-update)
   Letak fail ini di ROOT repo GitHub, sebelah index.html. */

const CACHE = 'robosoccer-v1';
const CORE  = ['./', './index.html', './manifest.json'];

// Pasang: cache shell asas, terus aktif (skipWaiting)
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => {}))
  );
});

// Aktif: buang cache lama, ambil alih kawalan semua tab
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Fetch: NETWORK-FIRST — sentiasa cuba versi terbaru dulu,
//        guna cache hanya bila tiada internet (offline).
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  e.respondWith((async () => {
    try {
      const fresh = await fetch(req, { cache: 'no-store' });
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());     // simpan untuk kegunaan offline
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const idx = (await caches.match('./index.html')) || (await caches.match('./'));
        if (idx) return idx;
      }
      throw err;
    }
  })());
});

// Benarkan halaman suruh SW aktif serta-merta
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
