'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function sendToAnalytics(metric: any) {
  // You can send the metrics to your analytics service
  // For now, we'll just log them in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }
  
  // Example: Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    
    // Other important metrics
    if (onINP) {
      onINP(sendToAnalytics);
    }
  }, []);

  return null; // This component doesn't render anything
}
