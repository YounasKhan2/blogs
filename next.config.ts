import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer2';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile images
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'firebase/app', 'firebase/auth', 'firebase/firestore'],
    optimizeCss: true,
    webpackBuildWorker: true,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Performance optimizations for production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
              enforce: true,
            },
            firebase: {
              test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              name: 'firebase',
              priority: 30,
              chunks: 'all',
              enforce: true,
            },
            contentlayer: {
              test: /[\\/]\.contentlayer[\\/]/,
              name: 'contentlayer',
              priority: 20,
              chunks: 'all',
              enforce: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 40,
              chunks: 'all',
              enforce: true,
            },
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide',
              priority: 25,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    
    // Bundle analyzer for monitoring
    if (process.env.ANALYZE === 'true') {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react/jsx-runtime.js': 'react/jsx-runtime',
        'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      };
    }
    
    return config;
  },
  
  // Enable static generation for Netlify (remove export for plugin compatibility)
  // output: 'export',
  trailingSlash: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },
};

export default withBundleAnalyzer(withContentlayer(nextConfig));
