'use client';

import { useEffect, useState } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

// Global flag to track if AdSense script is loaded
let adSenseLoaded = false;

const loadAdSenseScript = () => {
  if (adSenseLoaded || typeof window === 'undefined') return Promise.resolve();
  
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9113733158673282';
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      adSenseLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load AdSense script'));
    };
    
    document.head.appendChild(script);
  });
};

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = ''
}: AdSenseProps) {
  const [mounted, setMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load AdSense script
    loadAdSenseScript()
      .then(() => {
        setScriptLoaded(true);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('AdSense script loading error:', error);
        }
      });
  }, []);

  useEffect(() => {
    if (!mounted || !scriptLoaded) return;
    
    try {
      // Push ads after script is loaded
      setTimeout(() => {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AdSense push error:', err);
      }
    }
  }, [mounted, scriptLoaded]);

  if (!mounted) {
    // Return a placeholder div to prevent layout shift
    return <div className={`adsense-container ${className}`} style={{ minHeight: '90px' }} />;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9113733158673282"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Pre-configured AdSense components for common ad placements
export function HeaderAd() {
  return (
    <AdSense 
      adSlot="1234567890" // TODO: Replace with your actual header ad slot ID from Google AdSense
      adFormat="banner"
      className="mb-4"
    />
  );
}

export function SidebarAd() {
  return (
    <AdSense 
      adSlot="2345678901" // TODO: Replace with your actual sidebar ad slot ID from Google AdSense
      adFormat="rectangle"
      className="mb-6"
    />
  );
}

export function ArticleAd() {
  return (
    <AdSense 
      adSlot="3456789012" // TODO: Replace with your actual article ad slot ID from Google AdSense
      adFormat="auto"
      className="my-6"
    />
  );
}

export function FooterAd() {
  return (
    <AdSense 
      adSlot="4567890123" // TODO: Replace with your actual footer ad slot ID from Google AdSense
      adFormat="banner"
      className="mt-4"
    />
  );
}
