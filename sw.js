const version = "1.0";

self.addEventListener('install', function(e) {
	 e.waitUntil(
	   caches.open('video-store').then(function(cache) {
	     return cache.addAll([
	       '/boredpwa/',
	       '/boredpwa/index.html',
	       '/boredpwa/scripts/app.js',
	       '/boredpwa/styles/inline.css'
	     ]);
	   })
	 );
	});

	self.addEventListener('fetch', function(e) {
	  console.log(e.request.url);
	  e.respondWith(
	    caches.match(e.request).then(function(response) {
	      return response || fetch(e.request);
	    })
	  );
	});