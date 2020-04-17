var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  "../views/index.html",
  "./images/transmutation-humaine-192.png",
  "../manifest.webmanifest"
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
	console.log('[ServiceWorker] Fetch', evt.request.url);
	if (evt.request.mode !== 'navigate') {
	  return;
	}
	evt.respondWith(
	  fetch(evt.request)
		.catch(() => {
		  return caches.open(CACHE_NAME)
			.then((cache) => {
			  return cache.match('https://yowims.github.io/PWA_1/views/index.html');
			});
		  })
		);
	});
