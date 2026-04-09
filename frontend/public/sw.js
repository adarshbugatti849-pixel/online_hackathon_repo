self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass through fetch requests natively for our simple Hackathon PWA
  event.respondWith(fetch(event.request).catch(() => new Response('Offline')));
});
