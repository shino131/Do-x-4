/* DO X - العمل بدون إنترنت. غيّر رقم الإصدار عند كل تحديث للملفات حتى يتجدد التخزين. */
const VERSION = 'dox-v1.0';
const FILES = ['./', './index.html', './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './manifest.webmanifest', './vendor/fa/css/all.min.css', './vendor/fa/webfonts/fa-brands-400.woff2', './vendor/fa/webfonts/fa-regular-400.woff2', './vendor/fa/webfonts/fa-solid-900.woff2', './vendor/fa/webfonts/fa-v4compatibility.woff2', './vendor/fonts/fonts.css', './vendor/fonts/tajawal-arabic-400-normal.woff2', './vendor/fonts/tajawal-arabic-500-normal.woff2', './vendor/fonts/tajawal-arabic-700-normal.woff2', './vendor/fonts/tajawal-arabic-800-normal.woff2', './vendor/fonts/tajawal-arabic-900-normal.woff2', './vendor/fonts/tajawal-latin-400-normal.woff2', './vendor/fonts/tajawal-latin-500-normal.woff2', './vendor/fonts/tajawal-latin-700-normal.woff2', './vendor/fonts/tajawal-latin-800-normal.woff2', './vendor/fonts/tajawal-latin-900-normal.woff2', './vendor/sortable/Sortable.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return res; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const c = res.clone(); caches.open(VERSION).then(x => x.put(r, c)); return res; })));
});
