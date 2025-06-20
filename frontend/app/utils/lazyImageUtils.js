import { useState, useEffect, useRef } from 'react';

/**
 * Utilidades para lazy loading de imágenes optimizado
 */

// Hook para lazy loading de imágenes
export const useLazyImage = (src, placeholder = '/images/placeholder.avif') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { imageSrc, isLoaded, imgRef };
};

// Componente de imagen optimizada
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/placeholder.avif',
  priority = false,
  ...props 
}) => {
  const { imageSrc, isLoaded, imgRef } = useLazyImage(src, placeholder);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={priority ? src : imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
    </div>
  );
};

// Función para optimizar URLs de imágenes
export const optimizeImageUrl = (url, width = 800, quality = 80) => {
  if (!url) return '/images/placeholder.avif';
  
  // Si es una imagen local, devolverla tal como está
  if (url.startsWith('/')) return url;
  
  // Para imágenes externas, podrías implementar un servicio de optimización
  // Por ahora, devolvemos la URL original
  return url;
};

// Función para detectar el formato de imagen soportado
export const getSupportedImageFormat = () => {
  if (typeof window === 'undefined') return 'webp';
  
  const canvas = document.createElement('canvas');
  
  // Verificar soporte para AVIF
  if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
    return 'avif';
  }
  
  // Verificar soporte para WebP
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  return 'jpg';
};

// Función para precargar imágenes críticas
export const preloadCriticalImages = (imageUrls) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Función para limpiar URLs de imágenes
export const cleanImageUrl = (url) => {
  if (!url) return '/images/placeholder.avif';
  
  // Remover parámetros innecesarios
  try {
    const urlObj = new URL(url);
    // Mantener solo parámetros esenciales
    const allowedParams = ['w', 'h', 'q', 'fm', 'fit'];
    const newSearchParams = new URLSearchParams();
    
    allowedParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        newSearchParams.set(param, urlObj.searchParams.get(param));
      }
    });
    
    urlObj.search = newSearchParams.toString();
    return urlObj.toString();
  } catch {
    return url;
  }
}; 