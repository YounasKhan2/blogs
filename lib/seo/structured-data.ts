/**
 * Professional Structured Data Generator
 * JSON-LD schema generation for enhanced SEO
 */

import { seoConfig } from './seo-config';
import { PageMetadata } from './metadata-generator';

export interface StructuredDataConfig {
  type: 'article' | 'blog' | 'organization' | 'website' | 'breadcrumbs' | 'faq' | 'review' | 'product';
  data: any;
}

export class StructuredDataGenerator {
  
  /**
   * Generate Organization schema
   */
  static generateOrganization() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": seoConfig.site.name,
      "url": seoConfig.site.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.site.url}${seoConfig.site.logo}`,
        "width": seoConfig.defaults.imageWidth,
        "height": seoConfig.defaults.imageHeight
      },
      "description": seoConfig.site.description,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": seoConfig.company.email,
        "contactType": "customer service"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": seoConfig.company.city,
        "addressCountry": seoConfig.company.country
      },
      "sameAs": [
        seoConfig.social.twitter,
        seoConfig.social.facebook,
        seoConfig.social.linkedin,
        seoConfig.social.youtube,
        seoConfig.social.instagram
      ].filter(Boolean)
    };
  }

  /**
   * Generate Website schema
   */
  static generateWebsite() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": seoConfig.site.name,
      "url": seoConfig.site.url,
      "description": seoConfig.site.description,
      "publisher": {
        "@type": "Organization",
        "name": seoConfig.site.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${seoConfig.site.url}${seoConfig.site.logo}`
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${seoConfig.site.url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  }

  /**
   * Generate Blog schema
   */
  static generateBlog() {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": seoConfig.site.name,
      "description": seoConfig.site.description,
      "url": seoConfig.site.url,
      "publisher": {
        "@type": "Organization",
        "name": seoConfig.site.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${seoConfig.site.url}${seoConfig.site.logo}`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": seoConfig.site.url
      }
    };
  }

  /**
   * Generate Article schema for blog posts
   */
  static generateArticle(pageData: PageMetadata) {
    const {
      title,
      description,
      author = 'Muhammad Younas',
      publishedTime,
      modifiedTime,
      image,
      tags = [],
      category,
      slug
    } = pageData;

    const articleUrl = `${seoConfig.site.url}/posts/${slug}`;
    const imageUrl = image ? `${seoConfig.site.url}${image}` : `${seoConfig.site.url}/images/default-og.jpg`;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": seoConfig.defaults.imageWidth,
        "height": seoConfig.defaults.imageHeight
      },
      "author": {
        "@type": "Person",
        "name": author,
        "url": `${seoConfig.site.url}/authors/${author.toLowerCase().replace(/\s+/g, '-')}`
      },
      "publisher": {
        "@type": "Organization",
        "name": seoConfig.site.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${seoConfig.site.url}${seoConfig.site.logo}`
        }
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "url": articleUrl,
      "keywords": tags.join(', '),
      "articleSection": category,
      "inLanguage": seoConfig.site.language,
      "copyrightHolder": {
        "@type": "Organization",
        "name": seoConfig.site.name
      },
      "copyrightYear": new Date().getFullYear().toString()
    };
  }

  /**
   * Generate BreadcrumbList schema
   */
  static generateBreadcrumbs(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }

  /**
   * Generate FAQ schema
   */
  static generateFAQ(faqs: Array<{ question: string; answer: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Generate Review schema
   */
  static generateReview(reviewData: {
    itemName: string;
    rating: number;
    maxRating?: number;
    reviewBody: string;
    author?: string;
    datePublished?: string;
  }) {
    const {
      itemName,
      rating,
      maxRating = 5,
      reviewBody,
      author = 'Muhammad Younas',
      datePublished
    } = reviewData;

    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Thing",
        "name": itemName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rating,
        "bestRating": maxRating,
        "worstRating": 1
      },
      "name": `${itemName} Review`,
      "author": {
        "@type": "Person",
        "name": author
      },
      "reviewBody": reviewBody,
      "datePublished": datePublished || new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": seoConfig.site.name
      }
    };
  }

  /**
   * Generate Product schema
   */
  static generateProduct(productData: {
    name: string;
    description: string;
    image: string;
    brand?: string;
    model?: string;
    offers?: {
      price: string;
      currency: string;
      availability: string;
      url: string;
    };
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  }) {
    const {
      name,
      description,
      image,
      brand,
      model,
      offers,
      aggregateRating
    } = productData;

    const product: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": name,
      "description": description,
      "image": `${seoConfig.site.url}${image}`
    };

    if (brand) {
      product.brand = {
        "@type": "Brand",
        "name": brand
      };
    }

    if (model) {
      product.model = model;
    }

    if (offers) {
      product.offers = {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.currency,
        "availability": `https://schema.org/${offers.availability}`,
        "url": offers.url
      };
    }

    if (aggregateRating) {
      product.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      };
    }

    return product;
  }

  /**
   * Generate multiple structured data schemas
   */
  static generateMultipleSchemas(schemas: StructuredDataConfig[]) {
    return schemas.map(schema => {
      switch (schema.type) {
        case 'organization':
          return this.generateOrganization();
        case 'website':
          return this.generateWebsite();
        case 'blog':
          return this.generateBlog();
        case 'article':
          return this.generateArticle(schema.data);
        case 'breadcrumbs':
          return this.generateBreadcrumbs(schema.data);
        case 'faq':
          return this.generateFAQ(schema.data);
        case 'review':
          return this.generateReview(schema.data);
        case 'product':
          return this.generateProduct(schema.data);
        default:
          return null;
      }
    }).filter(Boolean);
  }
}

/**
 * Generate structured data for pages
 */
export function generateStructuredData(pageData: PageMetadata, additionalSchemas: StructuredDataConfig[] = []) {
  const schemas: StructuredDataConfig[] = [];

  // Always include organization and website schemas
  schemas.push(
    { type: 'organization', data: {} },
    { type: 'website', data: {} }
  );

  // Add page-specific schemas based on type
  switch (pageData.type) {
    case 'homepage':
      schemas.push({ type: 'blog', data: {} });
      break;
    case 'blogPost':
      schemas.push({ type: 'article', data: pageData });
      break;
  }

  // Add any additional schemas
  schemas.push(...additionalSchemas);

  return StructuredDataGenerator.generateMultipleSchemas(schemas);
}
