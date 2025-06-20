import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return { ref, isIntersecting, hasIntersected };
};

export const useScrollAnimation = (options = {}) => {
  const { ref, hasIntersected } = useIntersectionObserver(options);

  return {
    ref,
    className: hasIntersected ? 'animate-on-scroll in-view' : 'animate-on-scroll',
  };
};

// Hook para animaciones staggered
export const useStaggeredAnimation = (itemCount, delay = 0.1) => {
  const { ref, hasIntersected } = useIntersectionObserver();
  
  const getItemStyle = (index) => ({
    animationDelay: hasIntersected ? `${index * delay}s` : '0s',
  });

  const getItemClassName = (index) => 
    hasIntersected 
      ? 'animate-fade-in opacity-0' 
      : 'opacity-0';

  return {
    containerRef: ref,
    hasIntersected,
    getItemStyle,
    getItemClassName,
  };
}; 