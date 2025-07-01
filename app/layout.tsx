import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WebVitals from "../components/WebVitals";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "TechBlog Pro - Latest Tech Reviews, Mobile Reviews & Technology News 2025",
    template: "%s | TechBlog Pro"
  },
  description: "Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops, wireless earbuds, smart home devices & software reviews. Stay ahead with latest technology trends.",
  keywords: [
    // High-Traffic Tech Keywords
    "tech reviews 2025", "technology reviews", "latest tech news", "tech buying guides", "technology trends", "best tech products", "tech comparison", "consumer electronics", "tech innovations", "digital trends",
    
    // Mobile & Smartphones - High Search Volume
    "iPhone 15 review", "iPhone 15 Pro Max review", "Samsung Galaxy S24 review", "Samsung Galaxy S24 Ultra review", "Google Pixel 8 review", "Google Pixel 8 Pro review", "smartphone reviews", "mobile phone reviews", 
    "best phones 2025", "budget smartphones", "flagship smartphones", "mobile photography", "phone comparison", "Android vs iPhone", "OnePlus 12 review", "Xiaomi 14 review", "smartphone camera test",
    "best smartphone under $1000", "best smartphone under $500", "phone buying guide", "smartphone performance", "mobile gaming", "5G smartphones", "unlocked smartphones",
    
    // Laptops & Computers - High Search Volume
    "MacBook Pro M4 review", "MacBook Air M3 review", "gaming laptops", "ultrabook reviews", "laptop buying guide", "best laptops 2025", "laptop comparison", "business laptops", "student laptops",
    "Framework laptop", "ThinkPad reviews", "ASUS ROG reviews", "Dell XPS reviews", "HP Spectre reviews", "laptop performance", "creative laptops", "video editing laptops", "programming laptops",
    "best laptop under $1000", "best gaming laptop", "portable laptops", "laptop battery life", "Windows vs Mac", "Intel vs AMD laptops", "laptop for college students",
    
    // AI & Technology - Trending Keywords
    "ChatGPT review", "ChatGPT-4 review", "Claude AI review", "Google Gemini review", "AI tools 2025", "artificial intelligence", "machine learning", "AI comparison", "best AI assistant",
    "AI image generation", "AI video generators", "AI productivity tools", "DALL-E 3 review", "Midjourney review", "AI writing tools", "AI for business", "AI news", "generative AI",
    "OpenAI review", "Anthropic Claude", "Google Bard", "Microsoft Copilot", "AI chatbot", "language models", "AI applications", "AI trends 2025",
    
    // Software & Apps - Popular Searches
    "software reviews", "app reviews", "productivity software", "creative software", "developer tools", "business software", "photo editing software", "video editing software",
    "Photoshop 2025", "Adobe Creative Suite", "Microsoft Office", "Google Workspace", "design tools", "Figma vs Sketch", "coding tools", "project management software",
    "antivirus software", "VPN reviews", "cloud storage", "backup software", "password managers", "web browsers", "media players", "graphic design software",
    
    // Accessories & Gadgets - High Commercial Intent
    "wireless earbuds", "wireless earbuds review", "AirPods Pro review", "Sony WH-1000XM5", "gaming headsets", "smart home devices", "tech accessories", "gadget reviews",
    "best mouse 2025", "mechanical keyboards", "monitor reviews", "camera gear", "IoT devices", "fitness trackers", "smartwatch reviews", "tablet reviews",
    "gaming accessories", "smartphone accessories", "laptop accessories", "home office setup", "tech gifts", "portable chargers", "wireless charging",
    
    // High Commercial Intent Keywords
    "tech deals", "technology shopping", "product comparisons", "expert recommendations", "best tech 2025", "tech investment", "upgrade guide", "black friday tech deals",
    "value for money", "premium tech", "budget tech", "tech for students", "tech for professionals", "tech for gamers", "tech for creators", "tech startup tools",
    
    // SEO & Location Keywords
    "technology blog", "tech reviewer", "expert tech reviews", "unbiased reviews", "tech journalism", "technology news", "tech tutorials", "how to guides",
    "tech specs", "benchmark tests", "hands-on review", "real-world testing", "in-depth analysis", "buying recommendations", "tech advice", "consumer reports",
    
    // Long-tail High-Value Keywords
    "best smartphone for photography 2025", "best laptop for video editing 2025", "best AI tool for content creation", "most secure password manager 2025",
    "fastest gaming laptop 2025", "best budget phone with good camera", "best smartwatch for fitness tracking", "most accurate fitness tracker 2025"
  ],
  authors: [{ name: "TechBlog Pro Team" }, { name: "Muhammad Younas" }],
  creator: "TechBlog Pro",
  publisher: "TechBlog Pro",
  category: "Technology",
  classification: "Technology Reviews and News",
  metadataBase: new URL('https://techblogpro.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techblogpro.com',
    siteName: 'TechBlog Pro - Expert Tech Reviews',
    title: 'TechBlog Pro - Latest Tech Reviews, Mobile Reviews & Technology News 2025',
    description: 'Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops & more. Stay ahead with latest technology trends.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechBlog Pro - Expert Technology Reviews and News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBlog Pro - Latest Tech Reviews, Mobile Reviews & Technology News 2025',
    description: 'Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops & more.',
    images: ['/og-image.jpg'],
    creator: '@techblogpro',
    site: '@techblogpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://techblogpro.com',
    languages: {
      'en-US': 'https://techblogpro.com',
    },
  },
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'p:domain_verify': 'your-pinterest-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''} />
        <meta name="theme-color" content="#0066cc" />
        <meta name="msapplication-TileColor" content="#0066cc" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TechBlog Pro" />
        <meta name="application-name" content="TechBlog Pro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="en-us" />
        <meta name="content-language" content="en-us" />
        <meta name="expires" content="never" />
        <meta name="abstract" content="Expert technology reviews, buying guides, and latest tech news for 2025. Smartphone reviews, laptop reviews, AI tools, and consumer electronics." />
        <meta name="topic" content="Technology Reviews and News" />
        <meta name="summary" content="TechBlog Pro provides expert technology reviews, buying guides, and latest tech news. Covering smartphones, laptops, AI tools, software, and consumer electronics." />
        <meta name="Classification" content="Technology, Electronics, Reviews, News" />
        <meta name="designer" content="TechBlog Pro Team" />
        <meta name="reply-to" content="contact@techblogpro.com" />
        <meta name="owner" content="TechBlog Pro" />
        <meta name="url" content="https://techblogpro.com" />
        <meta name="identifier-URL" content="https://techblogpro.com" />
        <meta name="directory" content="submission" />
        <meta name="pagename" content="TechBlog Pro - Expert Technology Reviews" />
        <meta name="category" content="Technology, Reviews, News, Buying Guides" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="og:email" content="contact@techblogpro.com" />
        <meta name="og:phone_number" content="+1-555-TECH-PRO" />
        <meta name="og:latitude" content="37.7749" />
        <meta name="og:longitude" content="-122.4194" />
        <meta name="og:street-address" content="San Francisco, CA" />
        <meta name="og:locality" content="San Francisco" />
        <meta name="og:region" content="CA" />
        <meta name="og:postal-code" content="94102" />
        <meta name="og:country-name" content="USA" />
        <link rel="canonical" href="https://techblogpro.com" />
        <link rel="alternate" type="application/rss+xml" title="TechBlog Pro RSS Feed" href="https://techblogpro.com/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="TechBlog Pro Atom Feed" href="https://techblogpro.com/atom.xml" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TechBlog Pro",
              "alternateName": ["Tech Blog Pro", "TechBlogPro", "Expert Technology Reviews"],
              "url": "https://techblogpro.com",
              "description": "Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops & more. Stay ahead with latest technology trends.",
              "keywords": "tech reviews, technology news, smartphone reviews, laptop reviews, AI tools, gadget reviews, buying guides",
              "inLanguage": "en-US",
              "copyrightYear": "2025",
              "copyrightHolder": {
                "@type": "Organization",
                "name": "TechBlog Pro"
              },
              "publisher": {
                "@type": "Organization",
                "name": "TechBlog Pro",
                "url": "https://techblogpro.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://techblogpro.com/logo.png",
                  "width": 200,
                  "height": 60,
                  "caption": "TechBlog Pro Logo"
                },
                "sameAs": [
                  "https://twitter.com/techblogpro",
                  "https://facebook.com/techblogpro",
                  "https://youtube.com/@techblogpro",
                  "https://instagram.com/techblogpro",
                  "https://linkedin.com/company/techblogpro"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "https://techblogpro.com/contact",
                  "availableLanguage": "English"
                }
              },
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": "https://techblogpro.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                },
                {
                  "@type": "ReadAction",
                  "target": "https://techblogpro.com"
                }
              ],
              "mainEntity": {
                "@type": "ItemList",
                "name": "Tech Review Categories",
                "numberOfItems": 6,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Mobile Reviews",
                    "description": "Comprehensive smartphone and mobile device reviews",
                    "url": "https://techblogpro.com/categories/mobile-reviews"
                  },
                  {
                    "@type": "ListItem", 
                    "position": 2,
                    "name": "Laptop Reviews",
                    "description": "Expert laptop and computer reviews and comparisons",
                    "url": "https://techblogpro.com/categories/laptop-reviews"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "AI Technology",
                    "description": "Artificial intelligence tools and technology reviews",
                    "url": "https://techblogpro.com/categories/ai"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Software Reviews", 
                    "description": "Software applications and productivity tools reviews",
                    "url": "https://techblogpro.com/categories/software-reviews"
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Accessories & Gadgets",
                    "description": "Tech accessories and gadget reviews",
                    "url": "https://techblogpro.com/categories/accessories-gadgets"
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "name": "How-to Guides",
                    "description": "Step-by-step technology tutorials and guides",
                    "url": "https://techblogpro.com/categories/how-to"
                  }
                ]
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "technology enthusiasts, consumers, professionals"
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Technology Reviews"
                },
                {
                  "@type": "Thing", 
                  "name": "Consumer Electronics"
                },
                {
                  "@type": "Thing",
                  "name": "Mobile Devices"
                },
                {
                  "@type": "Thing",
                  "name": "Computing"
                },
                {
                  "@type": "Thing",
                  "name": "Artificial Intelligence"
                }
              ],
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://techblogpro.com"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body 
        className="antialiased min-h-screen flex flex-col scroll-smooth"
        suppressHydrationWarning
      >
        <div className={`${geistSans.variable} ${geistMono.variable}`}>
          <AuthProvider>
            <WebVitals />
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
         
        </div>
      </body>
    </html>
  );
}