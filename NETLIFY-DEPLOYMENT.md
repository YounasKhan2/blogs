# Netlify Deployment Guide

This guide will help you deploy your Next.js blog to Netlify.

## Quick Fix for Current Issue

The build is failing because dependencies aren't being installed. Here are the solutions:

### Option 1: Updated netlify.toml (Recommended)
```toml
[build]
  command = "npm install && npm run build"
  
[build.environment]
  NODE_VERSION = "18"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 2: Netlify UI Configuration
If the toml approach doesn't work, configure in Netlify dashboard:
- **Build command**: `npm install && npm run build`
- **Publish directory**: Leave empty (plugin handles this)
- **Node version**: `18`

## Prerequisites

1. **Git Repository**: Your project should be in a Git repository (GitHub, GitLab, or Bitbucket)
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Environment Variables**: Firebase configuration values

## Deployment Steps

### 1. Prepare Your Repository

Make sure all your changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify

1. Log in to your Netlify dashboard
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18.x`

### 3. Environment Variables

In the Netlify dashboard, go to **Site settings > Environment variables** and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Copy these values from your current `.env.local` file.

### 4. Domain Configuration

1. Go to **Site settings > Domain management**
2. Add your custom domain (optional)
3. Configure DNS settings as instructed by Netlify

### 5. Build Configuration

The `netlify.toml` file in your root directory contains:
- Build settings
- Redirect rules for SPA routing
- Security headers
- Caching configuration

### 6. Deploy

1. Click "Deploy site"
2. Monitor the deploy log for any issues
3. Your site will be available at `https://your-site-name.netlify.app`

## Post-Deployment

### Performance Monitoring

Your site includes Web Vitals monitoring. Check the browser console in development mode to see performance metrics.

### Content Updates

- Push changes to your Git repository
- Netlify will automatically rebuild and deploy
- Content changes in the `content/` directory will trigger new builds

### Firebase Configuration

Make sure your Firebase project allows your Netlify domain:
1. Go to Firebase Console > Authentication > Settings
2. Add your Netlify domain to "Authorized domains"

## Troubleshooting

### Common Issues

1. **"next: not found" error**: 
   - **Cause**: Dependencies not installed before build
   - **Solution**: Ensure build command includes `npm install && npm run build`
   - **Alternative**: Set build command in Netlify UI instead of netlify.toml

2. **Build fails with dependencies**: 
   - Check that all dependencies are in `package.json`
   - Verify `package-lock.json` is committed to repository
   - Ensure Node.js version matches (use `.nvmrc` file)

3. **Images not loading**: 
   - Verify image paths and Unsplash URLs
   - Check that `OptimizedImage` component is being used
   - Ensure fallback images are working

4. **Firebase errors**: 
   - Ensure environment variables are set correctly in Netlify dashboard
   - Check Firebase console for domain authorization
   - Verify all Firebase environment variables are prefixed with `NEXT_PUBLIC_`

5. **404 errors on routes**: 
   - Check that redirects are configured in `netlify.toml`
   - Ensure Next.js routing is working correctly
   - Verify all pages exist in the `app/` directory

6. **Contentlayer build issues**:
   - Contentlayer may show warnings on build but should work fine
   - Check that `.contentlayer` directory is in `.gitignore`
   - Ensure content files are properly formatted

### Build Command Options

If the current build command fails, try these alternatives:

1. **Simple approach**:
   ```toml
   [build]
     command = "npm run build"
   ```

2. **With explicit install**:
   ```toml
   [build]
     command = "npm ci && npm run build"
   ```

3. **Static export** (if dynamic features aren't needed):
   ```toml
   [build]
     command = "npm run export"
     publish = "out"
   ```

### Debug Build Issues

1. **Check build logs** in Netlify dashboard under **Deploys**
2. **Test locally** first: `npm run build`
3. **Verify all files are committed** to Git
4. **Check environment variables** are set in Netlify dashboard
5. **Try deploying with minimal config** first

### Build Logs

Access build logs in Netlify dashboard under **Deploys** to debug issues.

### Local Testing

Test your build locally before deploying:

```bash
npm run build
npm start
```

## Features Enabled

- ✅ Next.js 15.3.4 with React 19
- ✅ Contentlayer for MDX content
- ✅ Firebase authentication and analytics
- ✅ Optimized images with fallbacks
- ✅ SEO optimization
- ✅ Performance monitoring
- ✅ Security headers
- ✅ Automatic builds on Git push

## Performance Optimizations

- Image optimization with Next.js Image component
- Bundle splitting and caching
- Web Vitals monitoring
- Security headers
- CDN delivery via Netlify

Your blog is now ready for production deployment on Netlify!
