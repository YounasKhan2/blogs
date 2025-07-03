/**
 * Professional SEO Library
 * Unified exports for TechBlog Pro SEO system
 */

// Configuration
export { seoConfig, categoryConfigs, type SEOConfig } from './seo-config';

// Metadata Generation
export { 
  MetadataGenerator, 
  type PageMetadata 
} from './metadata-generator';

// Import for helper functions
import { MetadataGenerator } from './metadata-generator';

// Helper functions for common metadata generation
export const generatePostMetadata = async (post: any) => {
  return MetadataGenerator.generateMetadata({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    keywords: post.metadata.tags,
    image: post.metadata.image,
    author: post.metadata.author,
    publishedTime: post.metadata.date,
    modifiedTime: new Date().toISOString(),
    section: post.metadata.category,
    tags: post.metadata.tags,
    category: post.metadata.category,
    slug: post.slug,
    type: 'blogPost'
  });
};

export const generateHomepageMetadata = async () => {
  return MetadataGenerator.generateMetadata({
    type: 'homepage'
  });
};

export const generateCategoryMetadata = async (category: string, description?: string) => {
  return MetadataGenerator.generateMetadata({
    title: category,
    description,
    category,
    type: 'category'
  });
};

export const generateStaticPageMetadata = async (title: string, description: string, slug?: string) => {
  return MetadataGenerator.generateMetadata({
    title,
    description,
    slug,
    type: 'static'
  });
};

// Structured Data
export { 
  StructuredDataGenerator, 
  generateStructuredData,
  type StructuredDataConfig 
} from './structured-data';

// Utilities
export {
  generateSEOTitle,
  generateSEODescription,
  generateSEOKeywords,
  generateCanonicalURL,
  generateOGImageURL,
  extractExcerpt,
  generateSlug,
  isValidEmail,
  formatSEODate,
  calculateReadingTime,
  generateBreadcrumbs,
  isExternalURL,
  generateRobotsContent,
  normalizeURL,
  generateSocialShareURLs,
  cleanHTMLForMeta,
  generateHreflangAlternates
} from './seo-utils';

// Re-export Next.js types for convenience
export type { Metadata } from 'next';
