import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  categorySlug: string;
  tags: string[];
  image: string;
  featured: boolean;
  published: boolean;
  difficulty?: string;
  estimatedTime?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface PostSummary {
  slug: string;
  metadata: PostMetadata;
  readingTime: {
    text: string;
    minutes: number;
  };
}

// Get all post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

// Get post data by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    
    const contentHtml = processedContent.toString();
    
    // Calculate reading time
    const stats = readingTime(content);
    
    return {
      slug,
      metadata: data as PostMetadata,
      content: contentHtml,
      readingTime: stats,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts with metadata only (for listings)
export function getAllPosts(): PostSummary[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map(slug => {
      try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Calculate reading time
        const stats = readingTime(content);
        
        return {
          slug,
          metadata: data as PostMetadata,
          readingTime: {
            text: stats.text,
            minutes: stats.minutes,
          },
        };
      } catch (error) {
        console.error(`Error reading post metadata for ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is PostSummary => post !== null && post.metadata.published)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
  
  return posts;
}

// Get featured posts
export function getFeaturedPosts(limit: number = 3): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => post.metadata.featured)
    .slice(0, limit);
}

// Get recent posts
export function getRecentPosts(limit: number = 6): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

// Get posts by category
export function getPostsByCategory(categorySlug: string, limit?: number): PostSummary[] {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter(post => post.metadata.categorySlug === categorySlug);
  
  if (limit) {
    return categoryPosts.slice(0, limit);
  }
  
  return categoryPosts;
}

// Get posts by tag
export function getPostsByTag(tag: string, limit?: number): PostSummary[] {
  const allPosts = getAllPosts();
  const tagPosts = allPosts.filter(post => 
    post.metadata.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
  
  if (limit) {
    return tagPosts.slice(0, limit);
  }
  
  return tagPosts;
}

// Search posts
export function searchPosts(query: string): PostSummary[] {
  const allPosts = getAllPosts();
  const searchTerm = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.metadata.title.toLowerCase().includes(searchTerm) ||
    post.metadata.excerpt.toLowerCase().includes(searchTerm) ||
    post.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.metadata.category.toLowerCase().includes(searchTerm)
  );
}

// Get all categories with post counts
export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const allPosts = getAllPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();
  
  allPosts.forEach(post => {
    const { category, categorySlug } = post.metadata;
    const existing = categoryMap.get(categorySlug);
    
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(categorySlug, { name: category, count: 1 });
    }
  });
  
  return Array.from(categoryMap.entries()).map(([slug, data]) => ({
    name: data.name,
    slug,
    count: data.count,
  }));
}

// Get all tags with post counts
export function getAllTags(): { name: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagMap = new Map<string, number>();
  
  allPosts.forEach(post => {
    post.metadata.tags.forEach(tag => {
      const existing = tagMap.get(tag);
      tagMap.set(tag, (existing || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Get related posts (by category and tags)
export function getRelatedPosts(currentSlug: string, limit: number = 3): PostSummary[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return [];
  }
  
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let relevanceScore = 0;
      
      // Same category gets higher score
      if (post.metadata.categorySlug === currentPost.metadata.categorySlug) {
        relevanceScore += 3;
      }
      
      // Shared tags get points
      const sharedTags = post.metadata.tags.filter(tag =>
        currentPost.metadata.tags.includes(tag)
      );
      relevanceScore += sharedTags.length;
      
      return { post, score: relevanceScore };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
  
  return relatedPosts;
}
