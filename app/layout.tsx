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
    default: "TechBlog Pro - Latest Tech Reviews & News",
    template: "%s | TechBlog Pro"
  },
  description: "Your ultimate destination for tech reviews, mobile reviews, laptop reviews, AI news, software reviews, and gadget accessories. Stay updated with the latest technology trends.",
  keywords: ["tech reviews", "mobile reviews", "laptop reviews", "AI technology", "software reviews", "gadgets", "technology news"],
  authors: [{ name: "TechBlog Pro Team" }],
  creator: "TechBlog Pro",
  publisher: "TechBlog Pro",
  metadataBase: new URL('https://techblogpro.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techblogpro.com',
    siteName: 'TechBlog Pro',
    title: 'TechBlog Pro - Latest Tech Reviews & News',
    description: 'Your ultimate destination for tech reviews and technology news.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechBlog Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBlog Pro - Latest Tech Reviews & News',
    description: 'Your ultimate destination for tech reviews and technology news.',
    images: ['/og-image.jpg'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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