'use client';

import Link from 'next/link';
import { ChevronRight, TrendingUp, Clock, User, Star, Smartphone, Laptop, Brain, Settings, Gamepad2, BookOpen } from 'lucide-react';
import { HeaderAd, ArticleAd } from '../components/AdSenseWrapper';
import { getFeaturedPosts, getRecentPosts, getCategoryStats } from '../lib/contentlayer-enhanced';
import { useEffect, useState } from 'react';

export default function Home() {
  // State for content to prevent hydration issues
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on client side to prevent hydration mismatch
  useEffect(() => {
    try {
      const featured = getFeaturedPosts(3);
      const recent = getRecentPosts(6);
      const categories = getCategoryStats();
      
      setFeaturedPosts(featured);
      setRecentPosts(recent);
      setCategoriesData(categories);
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback to empty arrays
      setFeaturedPosts([]);
      setRecentPosts([]);
      setCategoriesData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Map categories to include icons and descriptions
  const categories = [
    {
      name: "Mobile Reviews",
      slug: "mobile-reviews",
      icon: Smartphone,
      count: categoriesData.find((c: any) => c.slug === "mobile-reviews")?.count || 0,
      description: "Latest smartphone reviews and comparisons"
    },
    {
      name: "Laptop Reviews", 
      slug: "laptop-reviews",
      icon: Laptop,
      count: categoriesData.find((c: any) => c.slug === "laptop-reviews")?.count || 0,
      description: "In-depth laptop and computer reviews"
    },
    {
      name: "AI Technology",
      slug: "ai",
      icon: Brain,
      count: categoriesData.find((c: any) => c.slug === "ai")?.count || 0,
      description: "Artificial intelligence news and reviews"
    },
    {
      name: "Software Reviews",
      slug: "software-reviews", 
      icon: Settings,
      count: categoriesData.find((c: any) => c.slug === "software-reviews")?.count || 0,
      description: "Software applications and tools reviews"
    },
    {
      name: "Accessories & Gadgets",
      slug: "accessories-gadgets",
      icon: Gamepad2,
      count: categoriesData.find((c: any) => c.slug === "accessories-gadgets")?.count || 0,
      description: "Tech accessories and gadget reviews"
    },
    {
      name: "How-to Guides",
      slug: "how-to",
      icon: BookOpen,
      count: categoriesData.find((c: any) => c.slug === "how-to")?.count || 0,
      description: "Step-by-step tutorials and tech guides"
    }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Ad */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <HeaderAd />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Ultimate Tech
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Review Destination
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover the latest tech reviews, mobile comparisons, laptop guides, AI insights, 
              and gadget recommendations from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tech-reviews"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Explore Reviews
                <ChevronRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all inline-flex items-center justify-center"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Reviews</h2>
              <p className="text-gray-600">Our most popular and trending tech reviews</p>
            </div>
            <Link
              href="/tech-reviews"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              View All
              <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.length > 0 ? featuredPosts.map((post, index) => (
              <article
                key={post.slug}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={post.image || "/api/placeholder/600/400"}
                    alt={post.title || 'Article image'}
                    className={`w-full object-cover ${index === 0 ? 'h-64 md:h-80' : 'h-48'}`}
                  />
                  <div className="absolute top-4 left-4">
                    <Link
                      href={`/categories/${post.categorySlug || 'uncategorized'}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {post.category || 'Uncategorized'}
                    </Link>
                  </div>
                </div>
                <div className={`p-6 ${index === 0 ? 'md:p-8' : ''}`}>
                  <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    <Link href={`/posts/${post.slug}`}>
                      {post.title || 'Untitled'}
                    </Link>
                  </h3>
                  <p className={`text-gray-600 mb-4 line-clamp-3 ${index === 0 ? 'text-lg' : ''}`}>
                    {post.excerpt || 'No excerpt available'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{post.author || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readingTime?.text || '5 min read'}</span>
                      </div>
                    </div>
                    <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              </article>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No featured posts available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Ad */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <ArticleAd />
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive deep into specific tech categories and find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-900">
                        {category.name}
                      </h3>
                      <span className="text-sm text-gray-500">{category.count} articles</span>
                    </div>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Explore Category</span>
                    <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Reviews</h2>
              <p className="text-gray-600">Stay updated with our newest tech content</p>
            </div>
            <Link
              href="/tech-reviews"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              View All
              <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={post.image || "/api/placeholder/400/300"}
                    alt={post.title || 'Article image'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Link
                      href={`/categories/${post.categorySlug || 'uncategorized'}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {post.category || 'Uncategorized'}
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title || 'Untitled'}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || 'No excerpt available'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{post.author || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readingTime?.text || '5 min read'}</span>
                      </div>
                    </div>
                    <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              </article>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No recent posts available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss a Tech Update
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter and get the latest tech reviews, news, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              Join 50,000+ tech enthusiasts. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
