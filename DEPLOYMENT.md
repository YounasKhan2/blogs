# TechBlog Pro - Deployment Guide

## Overview
TechBlog Pro is a fully responsive, SEO-optimized tech blog built with Next.js 15, TypeScript, and Tailwind CSS. This guide covers deployment to Vercel and other platforms.

## Features
- ✅ Fully responsive design
- ✅ SEO-optimized with metadata, Open Graph, and Twitter cards
- ✅ Google AdSense integration ready
- ✅ Category-based navigation
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Sitemap and robots.txt
- ✅ Performance optimized

## Pages Included
- Home page with hero, featured posts, categories
- Tech Reviews with filtering and search
- Categories overview page
- Individual category pages:
  - Mobile Reviews
  - Laptop Reviews
  - AI Technology
  - Software Reviews
  - Accessories & Gadgets
  - How-to Guides
- About Us
- Contact with form
- Privacy Policy
- Terms & Conditions

## Pre-Deployment Setup

### 1. Update Configuration
Before deploying, update the following files with your actual information:

#### Update AdSense Configuration
In `components/AdSense.tsx`, replace:
```tsx
data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your actual AdSense publisher ID
```

And update the ad slot IDs:
```tsx
export function HeaderAd() {
  return (
    <AdSense 
      adSlot="YOUR_HEADER_AD_SLOT_ID" // Replace with actual ID
      adFormat="banner"
      className="mb-4"
    />
  );
}
```

#### Update Layout Configuration
In `app/layout.tsx`, replace:
```tsx
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
```

#### Update Domain References
Replace `https://techblogpro.com` with your actual domain in:
- `app/layout.tsx`
- `app/sitemap.ts`

### 2. Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-publisher-id
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/techblog-pro.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Custom Domain**
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Configure DNS records as instructed

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Add `next export` to package.json scripts if using static export

2. **Deploy**
   - Connect GitHub repository
   - Configure build settings
   - Deploy

### Option 3: Self-Hosted

1. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

2. **Using PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "techblog-pro" -- start
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Setup

### 1. Google Search Console
- Add your site to Google Search Console
- Submit your sitemap: `https://yourdomain.com/sitemap.xml`
- Verify ownership

### 2. Google Analytics
Add Google Analytics tracking code to `app/layout.tsx`:
```tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
  `}
</script>
```

### 3. Google AdSense
- Apply for Google AdSense
- Get approved
- Update AdSense configuration with real IDs
- Place ads strategically throughout the site

### 4. SSL Certificate
Ensure HTTPS is enabled (automatic with Vercel/Netlify)

### 5. Performance Optimization
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Optimize images using Next.js Image component
- Enable gzip compression

## Content Management

### Adding New Posts
Currently using placeholder data. To add real content:

1. **Static Content**: Update data arrays in page components
2. **CMS Integration**: Consider adding Contentful, Sanity, or Strapi
3. **Markdown Files**: Create a `content/` directory with markdown files

### SEO Optimization
- Update meta titles and descriptions for each page
- Add structured data (JSON-LD)
- Optimize images with alt tags
- Create quality content with proper headings

## Maintenance

### Regular Updates
```bash
npm update
npm audit fix
```

### Monitoring
- Monitor site performance with Google PageSpeed Insights
- Check for broken links
- Monitor AdSense performance
- Update content regularly

## Security Considerations
- Keep dependencies updated
- Use environment variables for sensitive data
- Enable security headers
- Regular backups

## Support
For issues or questions:
1. Check Next.js documentation
2. Review Vercel deployment docs
3. Check Google AdSense policies
4. Monitor performance with web tools

## Performance Checklist
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Gzip compression
- ✅ CDN (via Vercel)
- ✅ SEO optimization
- ✅ Mobile responsiveness
- ✅ Fast loading times

Your TechBlog Pro site is now ready for production! 🚀
