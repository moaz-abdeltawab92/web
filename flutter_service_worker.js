'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "a8321a7d21490185a7772221643ad544",
"assets/AssetManifest.bin.json": "541b6204fb1b06165ddf7e398b7f6063",
"assets/AssetManifest.json": "c1949e1499bcba565bcdbf4de6aab467",
"assets/assets/fonts/BAUHS93.ttf": "191734283bbd6d5733e73020039923d4",
"assets/assets/fonts/Sigmar-Regular.ttf": "ebffdd8704d0138fcc4f9982d698bdc1",
"assets/assets/images/app_logo.jpg": "de403cce8b98fed40e9f8e4d0cf694dc",
"assets/assets/images/firstApp/ad3ya.jpg": "8b0b0088f71ef16b2e295395f65f1fd9",
"assets/assets/images/firstApp/azkar.jpg": "8c813e2ac139e7135e8bd8121fc46866",
"assets/assets/images/firstApp/dark.jpg": "680f34452f9dc8a641abe70fb3d3da5d",
"assets/assets/images/firstApp/hadith.jpg": "c687cb0fbb4749d2e9d7c0168fba675e",
"assets/assets/images/firstApp/home.jpg": "a5cc32e6dcd8795df0a40a9a72e450bd",
"assets/assets/images/firstApp/light.jpg": "c0b06a9246b6c3c9dea4a88d9200980d",
"assets/assets/images/firstApp/prayers.jpg": "c8d6a1d9fdc3e1e0d3782348ffa2fc82",
"assets/assets/images/firstApp/sabha.jpg": "2a76ae5d36d506753c871d7f07509666",
"assets/assets/images/firstApp/screen11.png": "bc05519e95e1e7d77550d7cac4389a1c",
"assets/assets/images/firstApp/screen22.png": "d4d1a2d776c2ab413783860e756689a7",
"assets/assets/images/firstApp/screen33.png": "8bdd1dc1fffbaf6ba6a91ba93efa991f",
"assets/assets/images/frontlogo.jpg": "41cb6c3a6847afa9351d91b10d9b2028",
"assets/assets/images/upload.png": "ac9b44410c116e49c9809862dd360e1b",
"assets/FontManifest.json": "aa2b478987c1e2e4038449771d806d92",
"assets/fonts/MaterialIcons-Regular.otf": "77d9fd53a3a93253598c30e9ed2c1896",
"assets/NOTICES": "24e9f577246f78f2c60f017cbc26ebb2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "f403608d5c1d44b2cbf91b72fe3b06eb",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2102133d32ee99df6528804f81ff081c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.ico": "eca5f1d62e06201ca3a6b6a1e0da721a",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "68a1b2ba95cf1ac142f93d50ff45ab29",
"icons/android-chrome-192x192.png": "a884bcc627feedf6d760bc6373be0010",
"icons/android-chrome-512x512.png": "2acc7e2cc868d4c0c369827f020971af",
"icons/apple-touch-icon.png": "303d753f6b05c951c479a07debaac1ab",
"icons/favicon-16x16.png": "4cfe6ac4630cd1481c889a393a7e6382",
"icons/favicon-32x32.png": "72c4e3d1a01c91d958c915c4caabb32b",
"index.html": "6216698c59b7c6560bcd87e1e3ffd895",
"/": "6216698c59b7c6560bcd87e1e3ffd895",
"main.dart.js": "6833a068f4697fd2f82e15b93a1f0fc3",
"manifest.json": "49f974ce8312bba630786557617c6570",
"version.json": "8a83505fdbc3330a8aae5319b9ecc00e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
