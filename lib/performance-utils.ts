/**
 * Performance optimization utilities for the blog
 */

// Intersection Observer hook for lazy loading
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

// Performance timing utilities
export const performanceUtils = {
  // Mark performance timing
  mark: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
    }
  },

  // Measure performance between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof performance !== 'undefined') {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        if (process.env.NODE_ENV === 'development') {
          console.log(`Performance measure "${name}": ${measure.duration}ms`);
        }
        return measure.duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return 0;
      }
    }
    return 0;
  },

  // Clear performance marks and measures
  clear: (name?: string) => {
    if (typeof performance !== 'undefined') {
      if (name) {
        performance.clearMarks(name);
        performance.clearMeasures(name);
      } else {
        performance.clearMarks();
        performance.clearMeasures();
      }
    }
  },
};

// Image preloader utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(sources: string[]): Promise<void> {
  const promises = sources.map(src => preloadImage(src));
  await Promise.all(promises);
}

// Resource prefetch utility
export function prefetchResource(href: string, as: string = 'fetch') {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
}

// Critical CSS inline utility
export function inlineCriticalCSS(css: string) {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
}

// Service Worker registration utility
export function registerServiceWorker(swPath: string = '/sw.js') {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register(swPath);
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registered: ', registration);
        }
      } catch (registrationError) {
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registration failed: ', registrationError);
        }
      }
    });
  }
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round((memory.usedJSHeapSize / 1048576) * 100) / 100,
      total: Math.round((memory.totalJSHeapSize / 1048576) * 100) / 100,
      limit: Math.round((memory.jsHeapSizeLimit / 1048576) * 100) / 100,
    };
  }
  return null;
}

// FPS monitoring
export function startFPSMonitoring(callback?: (fps: number) => void) {
  let frames = 0;
  let lastTime = performance.now();
  
  function tick() {
    frames++;
    const now = performance.now();
    
    if (now >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (now - lastTime));
      frames = 0;
      lastTime = now;
      
      if (callback) {
        callback(fps);
      } else if (process.env.NODE_ENV === 'development') {
        console.log(`FPS: ${fps}`);
      }
    }
    
    requestAnimationFrame(tick);
  }
  
  requestAnimationFrame(tick);
}
