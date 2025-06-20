/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    domains: [
      'api.webrushbrasil.com.br',
      'webrushapi.onrender.com',
      'cdn.vectorstock.com',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimizaciones de rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimización de bundles
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones solo para producción
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'async',
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },

  // Configuración de compresión
  compress: true,
  
  // Optimizaciones de desarrollo
  reactStrictMode: true,

  // Configuración de generación estática
  generateEtags: false,
  poweredByHeader: false,
};

module.exports = nextConfig; 