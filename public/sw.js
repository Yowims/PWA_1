var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  "/PWA_1/views/index.html",
];

function testUrl(url) {
  var request = new XMLHttpRequest();

  urlsToCache.forEach(element => {
    request.open('GET', element, false);
    request.send(); // there will be a 'pause' here until the response to come.
    // the object request will be actually modified
    {
      console.log("L'URL "+element+" Ne fonctionne pas.");
      return false;
    }
  });
  console.log("Toutes les URL ont fonctionné.");
  return true;
  
}

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      if(testUrl(urlsToCache) == true)
      {
        
      }
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
			  return cache.match('/PWA_1/views/index.html');
			});
		  })
		);
	});
