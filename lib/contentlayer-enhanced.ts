// Enhanced content management system using Contentlayer
// This file provides type-safe content management with rich functionality

import { compareDesc } from 'date-fns';

// Import Contentlayer generated content - read the JSON files directly
let allPosts: any[] = [];
let allAuthors: any[] = [];
let allCategories: any[] = [];

// Types with fallback
export type Post = any;
export type Author = any;
export type Category = any;

try {
  // For development, we'll read the JSON files directly
  allPosts = require('../.contentlayer/generated/Post/_index.json');
  allAuthors = require('../.contentlayer/generated/Author/_index.json');
  allCategories = require('../.contentlayer/generated/Category/_index.json');
} catch (error) {
  console.log('Contentlayer not yet generated in enhanced module, using empty arrays');
}

// Post-related functions
export function getAllPosts(): Post[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getFeaturedPosts(limit: number = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getRecentPosts(limit: number = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug && post.published);
}

export function getPostsByCategory(categorySlug: string, limit?: number): Post[] {
  const posts = getAllPosts().filter((post) => post.categorySlug === categorySlug);
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostsByAuthor(authorSlug: string, limit?: number): Post[] {
  const posts = getAllPosts().filter((post) => {
    // Assuming author field contains the author slug or name
    return post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug;
  });
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostsByTag(tag: string, limit?: number): Post[] {
  const posts = getAllPosts().filter((post: any) =>
    post.tags && post.tags.some((postTag: string) => postTag.toLowerCase() === tag.toLowerCase())
  );
  return limit ? posts.slice(0, limit) : posts;
}

export function searchPosts(query: string): Post[] {
  const searchTerm = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.body.raw.toLowerCase().includes(searchTerm)
  );
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPostsExceptCurrent = getAllPosts().filter((post) => post.slug !== currentSlug);

  const relatedPosts = allPostsExceptCurrent
    .map((post) => {
      let relevanceScore = 0;

      // Same category gets higher score
      if (post.categorySlug === currentPost.categorySlug) {
        relevanceScore += 3;
      }

      // Shared tags get points
      const sharedTags = post.tags.filter((tag: string) => currentPost.tags.includes(tag));
      relevanceScore += sharedTags.length;

      return { post, score: relevanceScore };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);

  return relatedPosts;
}

// Author-related functions
export function getAllAuthors(): Author[] {
  return allAuthors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors.find((author) => author.slug === slug);
}

// Category-related functions
export function getAllCategories(): Category[] {
  return allCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((category) => category.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return allCategories.filter((category) => category.featured);
}

// Statistics and analytics
export function getPostStats() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const authors = getAllAuthors();
  
  return {
    totalPosts: posts.length,
    featuredPosts: posts.filter((post) => post.featured).length,
    totalCategories: categories.length,
    totalAuthors: authors.length,
    averageReadingTime: Math.round(
      posts.reduce((acc, post) => acc + post.readingTime.minutes, 0) / posts.length
    ),
    totalWords: posts.reduce((acc, post) => acc + post.wordCount, 0),
  };
}

export function getCategoryStats() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const categoryStats = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryStats.get(post.categorySlug) || 0;
    categoryStats.set(post.categorySlug, count + 1);
  });

  return Array.from(categoryStats.entries()).map(([slug, count]) => ({
    slug,
    count,
    category: categories.find((cat) => cat.slug === slug),
  }));
}

export function getTagStats() {
  const posts = getAllPosts();
  const tagStats = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      const count = tagStats.get(tag) || 0;
      tagStats.set(tag, count + 1);
    });
  });

  return Array.from(tagStats.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Utility functions
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostsGroupedByMonth() {
  const posts = getAllPosts();
  const grouped = new Map<string, Post[]>();

  posts.forEach((post) => {
    const month = new Date(post.date).toISOString().slice(0, 7); // YYYY-MM
    const monthPosts = grouped.get(month) || [];
    monthPosts.push(post);
    grouped.set(month, monthPosts);
  });

  return Array.from(grouped.entries()).map(([month, posts]) => ({
    month,
    posts,
    count: posts.length,
  }));
}

// Navigation helpers
export function getNextPost(currentSlug: string): Post | undefined {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  return currentIndex > 0 ? posts[currentIndex - 1] : undefined;
}

export function getPreviousPost(currentSlug: string): Post | undefined {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  return currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;
}

// Backwards compatibility with existing posts.ts functions
export {
  getAllPosts as getAllPostsSync,
  getFeaturedPosts as getFeaturedPostsSync,
  getRecentPosts as getRecentPostsSync,
  getPostBySlug as getPostBySlugSync,
  getPostsByCategory as getPostsByCategorySync,
  searchPosts as searchPostsSync,
  getRelatedPosts as getRelatedPostsSync,
};
