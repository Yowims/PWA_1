// var CACHE_NAME = 'my-site-cache-v1';
// var urlsToCache = [
//   'https://yowims.github.io/PWA_1/views/index.html',
//   'https://yowims.github.io/PWA_1/public/images/transmutation-humaine-192.png',
// ];

// self.addEventListener('install', function(event) {
//     // Perform install steps
//     event.waitUntil(
//       caches.open(CACHE_NAME)
//         .then(function(cache) {
//           console.log('Cache ouvert');
//           return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener('activate', function(event){
//   var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         return fetch(event.request).then(
//           function(response) {
//             // Check if we received a valid response
//             if(!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             // IMPORTANT: Clone the response. A response is a stream
//             // and because we want the browser to consume the response
//             // as well as the cache consuming the response, we need
//             // to clone it so we have two streams.
//             var responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then(function(cache) {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//     );
//   });


var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'https://yowims.github.io/PWA_1/views/index.html',
  'https://yowims.github.io/PWA_1/public/images/transmutation-humaine-192.png',
];

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