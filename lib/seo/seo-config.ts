/**
 * Professional SEO Configuration
 * Centralized SEO settings and templates for TechBlog Pro
 */

export interface SEOConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    logo: string;
    favicon: string;
    language: string;
    locale: string;
    themeColor: string;
  };
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    instagram: string;
  };
  defaults: {
    titleTemplate: string;
    titleLength: number;
    descriptionLength: number;
    imageWidth: number;
    imageHeight: number;
  };
  keywords: {
    primary: string[];
    secondary: string[];
    brand: string[];
  };
}

export const seoConfig: SEOConfig = {
  site: {
    name: "TechBlog Pro",
    title: "TechBlog Pro - Expert Technology Reviews & News 2025",
    description: "Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops, wireless earbuds & more. Stay ahead with latest technology trends.",
    url: "https://techblogpro.com",
    logo: "https://techblogpro.com/logo.png",
    favicon: "/favicon.ico",
    language: "en",
    locale: "en_US",
    themeColor: "#0066cc",
  },
  company: {
    name: "TechBlog Pro",
    email: "contact@techblogpro.com",
    phone: "+1-555-TECH-PRO",
    address: "San Francisco, CA",
    city: "San Francisco",
    country: "USA",
  },
  social: {
    twitter: "@techblogpro",
    facebook: "https://facebook.com/techblogpro",
    linkedin: "https://linkedin.com/company/techblogpro",
    youtube: "https://youtube.com/@techblogpro",
    instagram: "https://instagram.com/techblogpro",
  },
  defaults: {
    titleTemplate: "%s | TechBlog Pro",
    titleLength: 60,
    descriptionLength: 160,
    imageWidth: 1200,
    imageHeight: 630,
  },
  keywords: {
    primary: [
      "tech reviews",
      "technology news",
      "smartphone reviews",
      "laptop reviews",
      "AI tools",
      "gadget reviews",
      "buying guides",
      "tech comparison",
      "expert analysis",
      "2025 tech"
    ],
    secondary: [
      "iPhone 15 review",
      "Samsung Galaxy S24",
      "MacBook Pro M4",
      "ChatGPT review",
      "gaming laptops",
      "wireless earbuds",
      "smart home devices",
      "productivity software",
      "mobile photography",
      "tech accessories"
    ],
    brand: [
      "TechBlog Pro",
      "expert tech reviews",
      "unbiased reviews",
      "tech journalism",
      "consumer electronics",
      "technology blog"
    ]
  }
};

// SEO Templates for different page types
export const SEOTemplates = {
  homepage: {
    titleSuffix: "",
    descriptionTemplate: "{description}",
    keywordBoost: ["tech reviews", "technology news", "expert reviews"],
  },
  blogPost: {
    titleSuffix: " - Expert Review",
    descriptionTemplate: "{excerpt} Read our comprehensive review with pros, cons, and buying advice.",
    keywordBoost: ["review", "expert analysis", "2025"],
  },
  category: {
    titleSuffix: " Reviews & Guides",
    descriptionTemplate: "Latest {category} reviews, comparisons, and buying guides. Expert analysis of the best {category} for 2025.",
    keywordBoost: ["reviews", "buying guide", "comparison"],
  },
  author: {
    titleSuffix: " - Tech Reviewer",
    descriptionTemplate: "Read expert tech reviews and analysis by {author}. Specializing in {expertise} with {experience} years of experience.",
    keywordBoost: ["expert", "reviewer", "analysis"],
  },
  tag: {
    titleSuffix: " - Latest Reviews",
    descriptionTemplate: "All articles tagged with {tag}. Expert reviews, comparisons, and buying guides.",
    keywordBoost: ["tagged", "articles", "reviews"],
  },
  static: {
    titleSuffix: "",
    descriptionTemplate: "{description}",
    keywordBoost: [],
  }
};

// Category-specific SEO configurations
export const categoryConfigs = {
  "mobile-reviews": {
    title: "Mobile Reviews",
    description: "Comprehensive smartphone and mobile device reviews",
    keywords: ["smartphone reviews", "mobile phone reviews", "iPhone review", "Android review", "phone comparison"],
    schema: "Product"
  },
  "laptop-reviews": {
    title: "Laptop Reviews", 
    description: "Expert laptop and computer reviews and comparisons",
    keywords: ["laptop reviews", "computer reviews", "MacBook review", "gaming laptop", "ultrabook"],
    schema: "Product"
  },
  "ai": {
    title: "AI Technology",
    description: "Artificial intelligence tools and technology reviews",
    keywords: ["AI tools", "artificial intelligence", "ChatGPT", "machine learning", "AI review"],
    schema: "SoftwareApplication"
  },
  "software-reviews": {
    title: "Software Reviews",
    description: "Software applications and productivity tools reviews", 
    keywords: ["software reviews", "app reviews", "productivity software", "business software"],
    schema: "SoftwareApplication"
  },
  "accessories-gadgets": {
    title: "Accessories & Gadgets",
    description: "Tech accessories and gadget reviews",
    keywords: ["tech accessories", "gadgets", "wireless earbuds", "smart home", "gaming gear"],
    schema: "Product"
  },
  "how-to": {
    title: "How-to Guides",
    description: "Step-by-step technology tutorials and guides",
    keywords: ["how to", "tutorial", "guide", "tech tips", "troubleshooting"],
    schema: "HowTo"
  }
};
