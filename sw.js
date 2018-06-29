const version = "1.0";
var cacheName = 'boredhumans-cache';

self.addEventListener('install', function(e) {
	e.waitUntil(caches.open(cacheName).then(
			function(cache) {
				return cache.addAll([ '/boredpwa/', '/boredpwa/index.html',
						'/boredpwa/scripts/app.js',
						'/boredpwa/styles/inline.css' ]);
			}));
});

self.addEventListener('message', function(event) {
	if (event.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		if (response) {
			return response;
		}
		return fetch(event.request);
	}));
});