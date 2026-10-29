const CACHE_NAME = 'jmt-math-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시된 파일을, 없으면 네트워크에서 가져옵니다.
        return response || fetch(event.request);
      })
  );
});