const CACHE_NAME = 'medsim-v3';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/index.html',
];

// App-shell routes to pre-cache for offline access
const OFFLINE_ROUTES = ['/', '/exercise', '/neet-pg', '/drug-reference'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip non-same-origin requests (ICP canister calls etc.)
  if (url.origin !== location.origin) return;

  // Cache-first strategy: static assets (JS, CSS, fonts, images)
  if (url.pathname.match(/\.(js|css|woff2?|png|ico|svg|webmanifest|json)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached || new Response('', { status: 503 }));
      })
    );
    return;
  }

  // Network-first strategy: API / canister calls
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/canister/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((r) => r || new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
        }))
      )
    );
    return;
  }

  // Navigation: serve app shell from cache, fall back to network
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('/').then((r) => r || new Response('Offline', { status: 503 }))
      )
    );
    return;
  }

  // Default: network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((r) => r || new Response('', { status: 503 })))
  );
});

// Background sync: flush offline scores when connectivity restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-scores') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.postMessage({ type: 'SYNC_SCORES' }));
      })
    );
  }
});

// Push notification support (future)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'MedSim', {
      body: data.body || '',
      icon: '/assets/medsim-icon.png',
      badge: '/assets/medsim-icon.png',
    })
  );
});
