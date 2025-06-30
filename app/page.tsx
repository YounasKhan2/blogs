import Link from 'next/link';
import Image from 'next/image';

import { ChevronRight, TrendingUp, Clock, User, Star, Smartphone, Laptop, Brain, Settings, Gamepad2, BookOpen } from 'lucide-react';
import { HeaderAd, ArticleAd } from '../components/AdSenseWrapper';
import { getFeaturedPosts, getRecentPosts, getAllCategories } from '../lib/posts';

// Homepage-specific structured data
const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TechBlog Pro",
  "alternateName": "Tech Blog Pro - Expert Technology Reviews",
  "url": "https://techblogpro.com",
  "description": "Expert tech reviews & buying guides for 2025. iPhone 15, Samsung Galaxy S24, MacBook Pro M4, AI tools, gaming laptops & more.",
  "publisher": {
    "@type": "Organization",
    "name": "TechBlog Pro",
    "url": "https://techblogpro.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://techblogpro.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default async function Home() {
  // Fetch data server-side using markdown system
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getRecentPosts(6);
  const categoriesData = getAllCategories();

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
                  {/* Replace with Next.js <Image> or your preferred image component */}
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title || 'Article image'}
                      width={600}
                      height={index === 0 ? 320 : 192}
                      className={`w-full object-cover ${index === 0 ? 'h-64 md:h-80' : 'h-48'}`}
                      priority={index < 2}
                      placeholder="empty"
                    />
                  <div className="absolute top-4 left-4">
                    <Link
                    href={`/categories/${post.metadata.categorySlug || 'uncategorized'}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {post.metadata.category || 'Uncategorized'}
                    </Link>
                  </div>
                </div>
                <div className={`p-6 ${index === 0 ? 'md:p-8' : ''}`}>
                  <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    <Link href={`/posts/${post.slug}`}>
                      {post.metadata.title || 'Untitled'}
                    </Link>
                  </h3>
                  <p className={`text-gray-600 mb-4 line-clamp-3 ${index === 0 ? 'text-lg' : ''}`}>
                    {post.metadata.excerpt || 'No excerpt available'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{post.metadata.author || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readingTime?.text || '5 min read'}</span>
                      </div>
                    </div>
                    <span>{post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : ''}</span>
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
                  {post.metadata.image && (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title || 'Article image'}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                      priority
                      placeholder="empty"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Link
                      href={`/categories/${post.metadata.categorySlug || 'uncategorized'}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {post.metadata.category || 'Uncategorized'}
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                      {post.metadata.title || 'Untitled'}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.metadata.excerpt || 'No excerpt available'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{post.metadata.author || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readingTime?.text || '5 min read'}</span>
                      </div>
                    </div>
                    <span>{post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : ''}</span>
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
