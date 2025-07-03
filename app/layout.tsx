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

// SEO metadata will be handled by our new professional SEO system

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Professional SEO system will inject metadata here */}
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