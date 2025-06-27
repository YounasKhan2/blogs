'use client';

import dynamic from 'next/dynamic';

// Dynamically import AdSense components with no SSR
const AdSense = dynamic(() => import('./AdSense'), {
  ssr: false,
  loading: () => <div className="adsense-placeholder bg-gray-100 rounded" style={{ minHeight: '90px' }} />
});

const HeaderAdComponent = dynamic(() => import('./AdSense').then(mod => ({ default: mod.HeaderAd })), {
  ssr: false,
  loading: () => <div className="adsense-placeholder bg-gray-100 rounded mb-4" style={{ minHeight: '90px' }} />
});

const SidebarAdComponent = dynamic(() => import('./AdSense').then(mod => ({ default: mod.SidebarAd })), {
  ssr: false,
  loading: () => <div className="adsense-placeholder bg-gray-100 rounded mb-6" style={{ minHeight: '250px' }} />
});

const ArticleAdComponent = dynamic(() => import('./AdSense').then(mod => ({ default: mod.ArticleAd })), {
  ssr: false,
  loading: () => <div className="adsense-placeholder bg-gray-100 rounded my-6" style={{ minHeight: '90px' }} />
});

const FooterAdComponent = dynamic(() => import('./AdSense').then(mod => ({ default: mod.FooterAd })), {
  ssr: false,
  loading: () => <div className="adsense-placeholder bg-gray-100 rounded mt-4" style={{ minHeight: '90px' }} />
});

export { HeaderAdComponent as HeaderAd, SidebarAdComponent as SidebarAd, ArticleAdComponent as ArticleAd, FooterAdComponent as FooterAd };
export default AdSense;
