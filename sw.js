const CACHE = 'journal-v1';
const FILES = [
  './index.html',
  './', 
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
  // 若未内嵌字体/图片，可把它们也加入列表
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});