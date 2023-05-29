/* global self, caches, fetch */
const cacheName = 'pbl-planner-v0'
const filesToCache = []

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        return caches.delete(key)
      }
      return null
    })))
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  )
})
