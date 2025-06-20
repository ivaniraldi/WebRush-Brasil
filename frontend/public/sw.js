const CACHE_NAME = 'webrush-brasil-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';
const API_CACHE = 'api-v2.0.0';

// Archivos estáticos a cachear
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/images/logo.webp',
  '/images/hero.avif',
  '/images/placeholder.avif'
];

// Patrones de rutas para diferentes estrategias de cache
const CACHE_STRATEGIES = {
  static: /\.(css|js|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)$/,
  api: /\/api\//,
  pages: /\.(html|json)$/
};

// Instalar SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activar SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) return;

  // Estrategia para archivos estáticos
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Estrategia para API
  if (CACHE_STRATEGIES.api.test(url.pathname)) {
    event.respondWith(networkFirst(request, API_CACHE, 3000));
    return;
  }

  // Estrategia para páginas
  if (CACHE_STRATEGIES.pages.test(url.pathname) || url.pathname === '/') {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  // Default: network first para todo lo demás
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First - para assets estáticos
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Network error', { status: 408 });
  }
}

// Network First - para contenido dinámico
async function networkFirst(request, cacheName, timeout = 5000) {
  try {
    const cache = await caches.open(cacheName);
    
    // Intentar network con timeout
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    
    try {
      const networkResponse = await Promise.race([networkPromise, timeoutPromise]);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (networkError) {
      // Fallback a cache si network falla
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw networkError;
    }
  } catch (error) {
    console.error('Network first failed:', error);
    return new Response('Service unavailable', { status: 503 });
  }
}

// Stale While Revalidate - para páginas
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Actualizar cache en background
    const networkPromise = fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => {});
    
    // Retornar cache inmediatamente si existe
    if (cachedResponse) {
      networkPromise; // No await - background update
      return cachedResponse;
    }
    
    // Si no hay cache, esperar network
    return await networkPromise;
  } catch (error) {
    console.error('Stale while revalidate failed:', error);
    return new Response('Service unavailable', { status: 503 });
  }
}

// Limpiar caches antiguos periódicamente
setInterval(() => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      if (cacheName.includes('v1.') || cacheName.includes('old-')) {
        caches.delete(cacheName);
      }
    });
  });
}, 24 * 60 * 60 * 1000); // Cada 24 horas 