/**
 * Schuur 80 Guest Companion — Service Worker.
 * Strategy:
 *  - Precache the app shell on install (relative paths so it works under
 *    any base path, including GitHub Pages project sites).
 *  - Navigations: network-first, falling back to cached shell (SPA offline).
 *  - Static assets (JS/CSS/fonts/images): stale-while-revalidate.
 *  - All app content is bundled JSON, so pages work fully offline once
 *    the shell is cached.
 */
const VERSION = "v1.5.1";
const SHELL_CACHE = `schuur80-shell-${VERSION}`;
const RUNTIME_CACHE = `schuur80-runtime-${VERSION}`;

/* Relative to SW scope so the same file works at / and /repo-name/ */
const SHELL_ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("schuur80-") && k !== SHELL_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* SPA navigations: network first, cache fallback to shell */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html", { ignoreSearch: true }).then(
            (cached) =>
              cached ||
              new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } })
          )
        )
    );
    return;
  }

  /* Same-origin static assets + fonts + images: stale-while-revalidate */
  const isStatic =
    url.origin === self.location.origin ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com" ||
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font";

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
              const copy = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});
