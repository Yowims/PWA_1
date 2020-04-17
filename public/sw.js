var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'https://yowims.github.io/PWA_1/views/index.html',
  'https://yowims.github.io/PWA_1/public/images/transmutation-humaine-192.png',
];

const CACHE_NAME = "offline";

async function respondTo(request) {
	let f = fetch(request);
	const cached = await caches.match(request);

	if (cached) { // try updating the cache first
		try {
			let response = await f;
			let cache = await caches.open(CACHE_NAME);
			cache.put(request, response.clone());
			return response;
		} catch (e) { // offline
			return cached;
		}
	} else { // not cached, forward to network
		return f;
	}

};

async function onFetch(e) {
	e.respondWith(respondTo(e.request));
}

async function precache() {
	const cache = await caches.open(CACHE_NAME);
	return cache.addAll(urlsToCache);
};

async function onInstall(e) {
	self.skipWaiting();
	e.waitUntil(precache());
}

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);