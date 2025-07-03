/**
 * Professional Metadata Generator
 * Dynamic metadata generation for all page types
 */

import { Metadata } from 'next';
import { seoConfig, SEOTemplates, categoryConfigs } from './seo-config';

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  category?: string;
  slug?: string;
  type?: 'homepage' | 'blogPost' | 'category' | 'author' | 'tag' | 'static';
  canonical?: string;
  noindex?: boolean;
}

export class MetadataGenerator {
  
  /**
   * Generate complete metadata for any page type
   */
  static async generateMetadata(pageData: PageMetadata): Promise<Metadata> {
    const {
      title: rawTitle,
      description: rawDescription,
      keywords = [],
      image,
      author,
      publishedTime,
      modifiedTime,
      section,
      tags = [],
      category,
      slug,
      type = 'static',
      canonical,
      noindex = false
    } = pageData;

    // Generate optimized title
    const optimizedTitle = this.generateTitle(rawTitle, type, category);
    
    // Generate optimized description
    const optimizedDescription = this.generateDescription(rawDescription, type, category, rawTitle);
    
    // Generate optimized keywords
    const optimizedKeywords = this.generateKeywords(keywords, type, category, tags);
    
    // Generate canonical URL
    const canonicalUrl = canonical || this.generateCanonicalUrl(slug, type);
    
    // Generate image URL
    const imageUrl = this.generateImageUrl(image, rawTitle);

    // Base metadata
    const metadata: Metadata = {
      title: {
        default: optimizedTitle,
        template: seoConfig.defaults.titleTemplate
      },
      description: optimizedDescription,
      keywords: optimizedKeywords,
      authors: author ? [{ name: author, url: `${seoConfig.site.url}/authors/${this.slugify(author)}` }] : undefined,
      creator: author || seoConfig.company.name,
      publisher: seoConfig.site.name,
      category: section || category,
      robots: {
        index: !noindex,
        follow: !noindex,
        googleBot: {
          index: !noindex,
          follow: !noindex,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en-US': canonicalUrl,
        },
      },
      metadataBase: new URL(seoConfig.site.url),
      
      // Open Graph
      openGraph: {
        title: optimizedTitle,
        description: optimizedDescription,
        url: canonicalUrl,
        siteName: seoConfig.site.name,
        locale: seoConfig.site.locale,
        type: type === 'blogPost' ? 'article' : 'website',
        images: imageUrl ? [{
          url: imageUrl,
          width: seoConfig.defaults.imageWidth,
          height: seoConfig.defaults.imageHeight,
          alt: rawTitle || optimizedTitle,
        }] : undefined,
        ...(type === 'blogPost' && {
          publishedTime,
          modifiedTime,
          authors: author ? [author] : undefined,
          tags,
          section: section || category,
        }),
      },
      
      // Twitter
      twitter: {
        card: 'summary_large_image',
        title: optimizedTitle,
        description: optimizedDescription,
        creator: seoConfig.social.twitter,
        site: seoConfig.social.twitter,
        images: imageUrl ? [imageUrl] : undefined,
      },
      
      // Additional metadata
      other: {
        'theme-color': seoConfig.site.themeColor,
        'msapplication-TileColor': seoConfig.site.themeColor,
        'apple-mobile-web-app-title': seoConfig.site.name,
        'application-name': seoConfig.site.name,
      },
    };

    return metadata;
  }

  /**
   * Generate optimized title
   */
  private static generateTitle(title?: string, type?: string, category?: string): string {
    if (!title) {
      return seoConfig.site.title;
    }

    const template = SEOTemplates[type as keyof typeof SEOTemplates] || SEOTemplates.static;
    let optimizedTitle = title;

    // Add suffix based on type
    if (template.titleSuffix && !title.includes(template.titleSuffix)) {
      optimizedTitle += template.titleSuffix;
    }

    // Optimize length
    if (optimizedTitle.length > seoConfig.defaults.titleLength) {
      optimizedTitle = optimizedTitle.substring(0, seoConfig.defaults.titleLength - 3) + '...';
    }

    return optimizedTitle;
  }

  /**
   * Generate optimized description
   */
  private static generateDescription(description?: string, type?: string, category?: string, title?: string): string {
    if (!description) {
      return seoConfig.site.description;
    }

    const template = SEOTemplates[type as keyof typeof SEOTemplates] || SEOTemplates.static;
    let optimizedDescription = template.descriptionTemplate
      .replace('{description}', description)
      .replace('{excerpt}', description)
      .replace('{category}', category || '')
      .replace('{title}', title || '');

    // Optimize length
    if (optimizedDescription.length > seoConfig.defaults.descriptionLength) {
      optimizedDescription = optimizedDescription.substring(0, seoConfig.defaults.descriptionLength - 3) + '...';
    }

    return optimizedDescription;
  }

  /**
   * Generate optimized keywords
   */
  private static generateKeywords(keywords: string[] = [], type?: string, category?: string, tags: string[] = []): string[] {
    const template = SEOTemplates[type as keyof typeof SEOTemplates] || SEOTemplates.static;
    const categoryConfig = category ? categoryConfigs[category as keyof typeof categoryConfigs] : null;
    
    const combinedKeywords = [
      ...keywords,
      ...template.keywordBoost,
      ...seoConfig.keywords.primary.slice(0, 3),
      ...(categoryConfig?.keywords || []),
      ...tags.slice(0, 3),
    ];

    // Remove duplicates and limit to 15 keywords
    return [...new Set(combinedKeywords)].slice(0, 15);
  }

  /**
   * Generate canonical URL
   */
  private static generateCanonicalUrl(slug?: string, type?: string): string {
    if (!slug) return seoConfig.site.url;
    
    const pathMap = {
      blogPost: `/posts/${slug}`,
      category: `/categories/${slug}`,
      author: `/authors/${slug}`,
      tag: `/tags/${slug}`,
      static: `/${slug}`,
    };

    const path = pathMap[type as keyof typeof pathMap] || `/${slug}`;
    return `${seoConfig.site.url}${path}`;
  }

  /**
   * Generate optimized image URL
   */
  private static generateImageUrl(image?: string, title?: string): string | undefined {
    if (image) {
      // If relative URL, make it absolute
      if (image.startsWith('/')) {
        return `${seoConfig.site.url}${image}`;
      }
      return image;
    }
    
    // Default OG image
    return `${seoConfig.site.url}/og-image.jpg`;
  }

  /**
   * Create URL-friendly slug
   */
  private static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Generate breadcrumb data
   */
  static generateBreadcrumbs(path: string[], currentTitle: string) {
    const breadcrumbs = [
      { name: 'Home', url: seoConfig.site.url }
    ];

    let currentPath = '';
    path.forEach((segment, index) => {
      currentPath += `/${segment}`;
      if (index === path.length - 1) {
        breadcrumbs.push({ name: currentTitle, url: `${seoConfig.site.url}${currentPath}` });
      } else {
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
        breadcrumbs.push({ name, url: `${seoConfig.site.url}${currentPath}` });
      }
    });

    return breadcrumbs;
  }
}
