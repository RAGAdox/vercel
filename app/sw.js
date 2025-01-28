import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

// Clean any old caches
cleanupOutdatedCaches();

// Precache static assets
const precacheList = self.__WB_MANIFEST;
precacheList.push( { url: "/", revision: null } );

precacheAndRoute( precacheList );

self.addEventListener( "activate", ( event ) => {
  console.log( "Service Worker Acctivated" )
  event.waitUntil( clients.claim() )

} )



self.addEventListener( "fetch", ( event ) => {
  console.log( "Fetch Event Triggered for ===>", event.request.url )
  event.respondWith(
    ( async () => {
      try {
        return await fetch( event.request );
      } catch ( error ) {
        const cache = await caches.open( "network-first-cache" );
        return await cache.match( "/" ) || Response.error();
      }
    } )()
  );
} )
