const CACHE_NAME = 'boda-v1';
const urlsToCache = [
    '/',
    '/img/logo_anaSInBorde.png',
    '/img/besoRT.png',
    '/img/fondo.jpg',
    '/img/iglesia.jpg',
    '/img/conde.jpg',
    '/img/icono.ico',
    '/manifest.json',
];

self.addEventListener('install', function (event) {
    self.skipWaiting(); // Activa inmediatamente el nuevo SW
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) 
    );
});
