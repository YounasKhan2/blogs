'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import OptimizedImage from '../../components/OptimizedImage';
import { Clock, User, ChevronRight, Search, Filter, Calendar, Star, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/contentlayer-enhanced';

export default function TechReviews() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get all real posts from contentlayer
  useEffect(() => {
    const posts = getAllPosts().map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      tags: post.tags || [],
      image: post.image,
      featured: post.featured || false,
      category: post.category,
      categorySlug: post.categorySlug
    }));
    setAllPosts(posts);
  }, []);

  // Filter posts based on active filter and search term
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => {
        return post.categorySlug === activeFilter;
      });
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [allPosts, activeFilter, searchTerm]);

  // Get featured posts
  const featuredPosts = allPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const categories = [
    "All",
    "Mobile Reviews",
    "Laptop Reviews", 
    "AI",
    "Software Reviews",
    "Accessories & Gadgets",
    "Hardware Reviews"
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>Tech Reviews</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tech Reviews & Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            In-depth reviews, comparisons, and analysis of the latest technology products. 
            From smartphones to laptops, AI tools to software - we test everything so you don't have to.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "All" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPosts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <OptimizedImage
                  src={featuredPosts[0].image || "/images/posts/default-tech.jpg"}
                  alt={featuredPosts[0].title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                  priority
                  category={featuredPosts[0].category}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured Review
                  </span>
                  <Link
                    href={`/categories/${featuredPosts[0].categorySlug}`}
                    className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {featuredPosts[0].category}
                  </Link>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/posts/${featuredPosts[0].slug}`}>
                    {featuredPosts[0].title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredPosts[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{featuredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{formatDate(featuredPosts[0].date)}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/posts/${featuredPosts[0].slug}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    Read Review
                    <ChevronRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="relative">
                <OptimizedImage
                  src={post.image || "/images/posts/default-tech.jpg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                  category={post.category}
                />
                <div className="absolute top-4 left-4">
                  <Link
                    href={`/categories/${post.categorySlug}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <span>{formatDate(post.date)}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tech reviews found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No reviews match "${searchTerm}". Try a different search term.`
                : "No reviews match the selected filter. Try a different filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
