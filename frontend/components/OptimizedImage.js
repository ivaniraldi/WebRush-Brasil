"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  fill = false,
  sizes,
  loading = 'lazy',
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imgRef = useRef(null);

  // Generar placeholder blur automático si no se proporciona
  const generateBlurDataURL = (w = 8, h = 8) => {
    const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1f2937"/>
      <rect width="100%" height="100%" fill="url(#grad)" opacity="0.5"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.2" />
        </linearGradient>
      </defs>
    </svg>`;
    
    // Usar btoa para navegadores y Buffer para Node.js
    if (typeof window !== 'undefined') {
      return `data:image/svg+xml;base64,${btoa(svg)}`;
    } else {
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }
  };

  // Intersection Observer para lazy loading mejorado
  useEffect(() => {
    if (!imgRef.current || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Pre-cargar la imagen cuando esté cerca del viewport
            const img = new window.Image();
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Comenzar a cargar 50px antes
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageFailed(true);
  };

  // Fallback component para errores
  const ErrorFallback = () => (
    <div 
      className={`bg-gray-800 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-gray-400 text-center p-4">
        <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <span className="text-xs">Imagen no disponible</span>
      </div>
    </div>
  );

  if (imageFailed) {
    return <ErrorFallback />;
  }

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    className: `transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${className}`,
    priority,
    loading: priority ? 'eager' : loading,
    placeholder: blurDataURL || placeholder === 'blur' ? 'blur' : 'empty',
    blurDataURL: blurDataURL || generateBlurDataURL(),
    sizes: sizes || (fill ? '100vw' : undefined),
    ...props
  };

  if (fill) {
    return (
      <div ref={imgRef} className="relative overflow-hidden">
        <Image fill {...imageProps} />
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative">
      <Image 
        width={width} 
        height={height} 
        {...imageProps}
      />
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 