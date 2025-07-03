/**
 * SEO Helper Utilities
 * Common utilities for SEO optimization
 */

import { seoConfig } from './seo-config';

/**
 * Generate SEO-optimized title
 */
export function generateSEOTitle(title: string, template?: string): string {
  if (!title) return seoConfig.site.title;
  
  const titleTemplate = template || seoConfig.defaults.titleTemplate;
  const maxLength = seoConfig.defaults.titleLength;
  
  // Replace template variables
  let seoTitle = titleTemplate
    .replace('%s', title)
    .replace('%site%', seoConfig.site.name);
  
  // Truncate if too long
  if (seoTitle.length > maxLength) {
    seoTitle = seoTitle.substring(0, maxLength - 3) + '...';
  }
  
  return seoTitle;
}

/**
 * Generate SEO-optimized description
 */
export function generateSEODescription(description: string, fallback?: string): string {
  if (!description && !fallback) return seoConfig.site.description;
  
  const content = description || fallback || seoConfig.site.description;
  const maxLength = seoConfig.defaults.descriptionLength;
  
  if (content.length > maxLength) {
    return content.substring(0, maxLength - 3) + '...';
  }
  
  return content;
}

/**
 * Generate SEO-optimized keywords
 */
export function generateSEOKeywords(keywords: string[] = [], category?: string): string[] {
  const allKeywords = [
    ...keywords,
    ...seoConfig.keywords.primary,
    ...seoConfig.keywords.brand
  ];
  
  // Add category-specific keywords if available
  if (category && seoConfig.keywords.secondary.length > 0) {
    allKeywords.push(...seoConfig.keywords.secondary);
  }
  
  // Remove duplicates and return unique keywords
  return [...new Set(allKeywords)];
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove trailing slash for consistency
  const normalizedPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
  
  return `${seoConfig.site.url}${normalizedPath ? `/${normalizedPath}` : ''}`;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageURL(imagePath?: string): string {
  if (imagePath) {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path, prepend site URL
    return `${seoConfig.site.url}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  }
  
  // Return default OG image
  return `${seoConfig.site.url}/images/default-og.jpg`;
}

/**
 * Extract excerpt from content
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  if (!content) return '';
  
  // Remove markdown formatting
  const cleanContent = content
    .replace(/[#*_`]/g, '') // Remove basic markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.7) {
    return cleanContent.substring(0, lastSentence + 1);
  }
  
  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    return cleanContent.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date for SEO (ISO 8601)
 */
export function formatSEODate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate breadcrumb data
 */
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const breadcrumbs = [
    { name: 'Home', url: seoConfig.site.url }
  ];
  
  if (path === '/' || path === '') {
    return breadcrumbs;
  }
  
  const pathSegments = path.split('/').filter(Boolean);
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable name
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbs.push({
      name,
      url: `${seoConfig.site.url}${currentPath}`
    });
  });
  
  return breadcrumbs;
}

/**
 * Check if URL is external
 */
export function isExternalURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const siteUrlObj = new URL(seoConfig.site.url);
    return urlObj.hostname !== siteUrlObj.hostname;
  } catch {
    return false;
  }
}

/**
 * Generate robots meta content
 */
export function generateRobotsContent(
  index: boolean = true,
  follow: boolean = true,
  additionalDirectives: string[] = []
): string {
  const directives = [];
  
  directives.push(index ? 'index' : 'noindex');
  directives.push(follow ? 'follow' : 'nofollow');
  
  additionalDirectives.forEach(directive => {
    directives.push(directive);
  });
  
  return directives.join(', ');
}

/**
 * Clean and normalize URL
 */
export function normalizeURL(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove trailing slash except for root
    if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }
    
    // Sort query parameters for consistency
    const params = new URLSearchParams(urlObj.search);
    const sortedParams = new URLSearchParams();
    
    [...params.keys()].sort().forEach(key => {
      sortedParams.append(key, params.get(key) || '');
    });
    
    urlObj.search = sortedParams.toString();
    
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Generate social media URLs
 */
export function generateSocialShareURLs(
  url: string,
  title: string,
  description?: string
) {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    reddit: `https://reddit.com/submit?url=${encodedURL}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedURL}`,
    telegram: `https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedURL}`
  };
}

/**
 * Validate and clean HTML for meta descriptions
 */
export function cleanHTMLForMeta(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[a-zA-Z0-9#]+;/g, ' ') // Remove HTML entities
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Generate hreflang attributes for international SEO
 */
export function generateHreflangAlternates(
  currentPath: string,
  supportedLocales: string[] = ['en']
): Array<{ hreflang: string; href: string }> {
  return supportedLocales.map(locale => ({
    hreflang: locale,
    href: `${seoConfig.site.url}${locale === 'en' ? '' : `/${locale}`}${currentPath}`
  }));
}
