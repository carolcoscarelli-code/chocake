// Service worker minimalista para habilitar PWA instalável.
// Estratégia: network-first para sempre carregar a versão mais recente do site.
const CACHE_NAME = 'chocake-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  // Só intercepta GETs HTTP(S) — deixa Firebase e outros passarem direto
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
