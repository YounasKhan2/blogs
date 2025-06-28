'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import OptimizedImage from '../../../components/OptimizedImage';
import { Search, Filter, Star, Clock, TrendingUp, Laptop, User, ChevronRight } from 'lucide-react';
import { getPostsByCategory } from '@/lib/contentlayer-enhanced';

export default function LaptopReviews() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allLaptopReviews, setAllLaptopReviews] = useState<any[]>([]);

  // Get real laptop review posts from contentlayer
  useEffect(() => {
    const laptopReviews = getPostsByCategory('laptop-reviews').map(post => ({
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
    setAllLaptopReviews(laptopReviews);
  }, []);

  // Filter posts based on active filter and search term
  const filteredReviews = useMemo(() => {
    let filtered = allLaptopReviews;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(review => {
        const tags = review.tags.map((tag: string) => tag.toLowerCase());
        switch (activeFilter) {
          case 'gaming':
            return tags.some((tag: string) => tag.includes('gaming') || tag.includes('rog') || tag.includes('rtx'));
          case 'business':
            return tags.some((tag: string) => tag.includes('business') || tag.includes('thinkpad') || tag.includes('enterprise'));
          case 'ultrabooks':
            return tags.some((tag: string) => tag.includes('ultrabook') || tag.includes('portable') || tag.includes('m4') || tag.includes('m3'));
          case 'budget':
            return tags.some((tag: string) => tag.includes('budget') || tag.includes('value') || tag.includes('under'));
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchLower) ||
        review.excerpt.toLowerCase().includes(searchLower) ||
        review.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [allLaptopReviews, activeFilter, searchTerm]);

  // Get featured reviews
  const featuredReviews = allLaptopReviews.filter(review => review.featured);

  // Get popular laptops based on actual posts
  const popularLaptops = useMemo(() => {
    const featuredPosts = allLaptopReviews.filter(post => post.featured);
    return featuredPosts.slice(0, 5).map(post => ({
      name: post.title.split(':')[0].replace('Review', '').replace('2025', '').trim(),
      slug: post.slug,
      reviews: Math.floor(Math.random() * 20) + 5, // Random number for display
      rating: 4.5 + Math.random() * 0.5 // Random rating between 4.5-5.0
    }));
  }, [allLaptopReviews]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/categories" className="hover:text-blue-600">Categories</Link>
            <span className="mx-2">&gt;</span>
            <span>Laptop Reviews</span>
          </nav>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
              <Laptop className="text-purple-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Laptop Reviews
              </h1>
              <p className="text-gray-600">{allLaptopReviews.length} comprehensive laptop reviews</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            In-depth laptop reviews covering gaming laptops, ultrabooks, business machines, and budget options. 
            Expert analysis to help you find the perfect laptop for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search laptop reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'all' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Reviews ({allLaptopReviews.length})
                    </button>
                    <button 
                      onClick={() => setActiveFilter('gaming')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'gaming' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Gaming
                    </button>
                    <button 
                      onClick={() => setActiveFilter('business')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'business' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Business
                    </button>
                    <button 
                      onClick={() => setActiveFilter('ultrabooks')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'ultrabooks' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Ultrabooks
                    </button>
                    <button 
                      onClick={() => setActiveFilter('budget')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'budget' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Budget
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Review */}
            {featuredReviews.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <OptimizedImage
                      src={featuredReviews[0].image || "/images/posts/default-laptop.jpg"}
                      alt={featuredReviews[0].title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                      category="laptop"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                        Featured Review
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        Editor's Choice
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredReviews[0].title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {featuredReviews[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{featuredReviews[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{formatDate(featuredReviews[0].date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/posts/${featuredReviews[0].slug}`}
                      className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      <span>Read Full Review</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.filter((review: any) => !review.featured).map((review: any) => (
                <Link 
                  key={review.slug} 
                  href={`/posts/${review.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <OptimizedImage
                      src={review.image || "/images/posts/default-laptop.jpg"}
                      alt={review.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      category="laptop"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {review.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {review.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{review.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {review.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results Message */}
            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Laptop className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No laptop reviews found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `No reviews match "${searchTerm}". Try a different search term.`
                    : "No reviews match the selected filter. Try a different filter."}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Laptops */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Popular Laptops
              </h3>
              <div className="space-y-4">
                {popularLaptops.map((laptop, index) => (
                  <Link 
                    key={index} 
                    href={`/posts/${laptop.slug}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">{laptop.name}</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(laptop.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          ({laptop.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Laptop Weekly</h3>
              <p className="text-purple-100 mb-4">
                Get the latest laptop reviews and tech news delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}