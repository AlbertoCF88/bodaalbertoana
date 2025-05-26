const CACHE_NAME = 'boda-v4';
const urlsToCache = [
    '/index.html',
    '/img/logo_anaSInBorde.png',
    '/img/besoRT.png',
    '/img/fondo.jpg',
    '/img/iglesia.jpg',
    '/img/conde.jpg',
    '/img/icono.ico',
    '/img/ana.jfif',
    '/img/alberto.jfif',
    '/img/construccion.png',
    '/manifest.json',
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse && networkResponse.status === 200) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            } catch (error) {
                return caches.match(event.request);
            }
        })());
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
