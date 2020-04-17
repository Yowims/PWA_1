if (navigator.serviceWorker) {
    navigator.serviceWorker.register('https://yowims.github.io/PWA_1/public/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope:',  registration.scope);
    }).catch(function(error) {
        console.log('ServiceWorker registration failed:', error);
    });
}
