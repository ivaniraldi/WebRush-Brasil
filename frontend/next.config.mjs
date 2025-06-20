import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de exportación estática
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configuración de imágenes optimizada
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
  
  // Configuración de build optimizada
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimizaciones de rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuraciones experimentales optimizadas
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'date-fns'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Configuración de compresión y seguridad
  compress: true,
  reactStrictMode: true,
  generateEtags: false,
  poweredByHeader: false,
  
  // Webpack optimizations mejoradas
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones para producción
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 200000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 15,
            },
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    // Optimizaciones de módulos
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname),
    };

    return config;
  }
};

export default nextConfig;
