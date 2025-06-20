"use client";

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular progreso de carga
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Detectar cuando el contenido está listo
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-purple-600/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-white gradient-text">
            WebRush Brasil
          </h1>
        </div>

        {/* Barra de progreso */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Texto de carga */}
        <p className="text-gray-400 text-sm">
          {progress < 50 ? 'Cargando recursos...' : 
           progress < 90 ? 'Preparando contenido...' : 
           'Casi listo...'}
        </p>
      </div>
    </div>
  );
} 