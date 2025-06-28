'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import AdSense, { SidebarAd, ArticleAd } from '../../../components/AdSense';
import { Clock, User, ChevronRight, Smartphone, Star, Filter, TrendingUp, Search } from 'lucide-react';
// Note: SEO metadata for this client component is handled in the parent layout

export default function MobileReviews() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allMobileReviews, setAllMobileReviews] = useState<any[]>([]);

  // Mock data for mobile reviews - replace with actual data fetching
  useEffect(() => {
    const mockReviews = [
      {
        slug: 'iphone-15-pro-max-review',
        title: 'iPhone 15 Pro Max Review: The Ultimate Smartphone Experience',
        excerpt: 'Apple\'s latest flagship delivers incredible performance, stunning cameras, and titanium design that sets new standards for premium smartphones.',
        author: 'Muhammad Younas',
        date: '2025-06-25',
        tags: ['iPhone', 'Apple', 'Smartphone', 'Review', 'Mobile', 'iOS'],
        image: '/images/posts/iphone-15-pro-max.jpg',
        featured: true,
        category: 'Mobile Reviews',
        categorySlug: 'mobile-reviews'
      },
      {
        slug: 'samsung-galaxy-s24-ultra-review-2025',
        title: 'Samsung Galaxy S24 Ultra Review 2025: The Ultimate Android Flagship with AI Power',
        excerpt: 'Complete Samsung Galaxy S24 Ultra review 2025 covering AI features, S Pen performance, 200MP camera system, battery life, and whether it\'s worth upgrading.',
        author: 'Muhammad Younas',
        date: '2025-01-15',
        tags: ['Samsung Galaxy S24 Ultra', 'Android flagship', 'smartphone review', 'S Pen', 'AI features'],
        image: '/images/posts/samsung-galaxy-s24-ultra-review.jpg',
        featured: false,
        category: 'Mobile Reviews',
        categorySlug: 'mobile-reviews'
      },
      {
        slug: 'oneplus-12-review-flagship-killer',
        title: 'OnePlus 12 Review: The Flagship Killer Returns with Premium Features',
        excerpt: 'OnePlus 12 combines flagship performance with competitive pricing. Our comprehensive review covers camera quality, performance benchmarks, and whether it lives up to the flagship killer reputation.',
        author: 'Muhammad Younas',
        date: '2025-06-25',
        tags: ['OnePlus 12', 'Flagship Killer', 'Android', 'Smartphone Review', 'Budget Flagship'],
        image: '/images/posts/oneplus-12-review.jpg',
        featured: false,
        category: 'Mobile Reviews',
        categorySlug: 'mobile-reviews'
      },
      {
        slug: 'google-pixel-8-pro-vs-iphone-15-pro',
        title: 'Google Pixel 8 Pro vs iPhone 15 Pro: Ultimate Camera Comparison 2025',
        excerpt: 'In-depth comparison of Google Pixel 8 Pro and iPhone 15 Pro focusing on camera quality, performance, and value.',
        author: 'Muhammad Younas',
        date: '2025-06-26',
        tags: ['Google Pixel 8 Pro', 'iPhone 15 Pro', 'Camera Comparison', 'Smartphone Photography'],
        image: '/images/posts/google-pixel-8-pro-vs-iphone-15-pro.jpg',
        featured: false,
        category: 'Mobile Reviews',
        categorySlug: 'mobile-reviews'
      },
      {
        slug: 'best-budget-smartphones-under-400-2025',
        title: 'Best Budget Smartphones Under $400 in 2025: Exceptional Value Android & iOS Options',
        excerpt: 'Discover the best budget smartphones that deliver flagship-level features without breaking the bank.',
        author: 'Muhammad Younas',
        date: '2025-06-29',
        tags: ['Budget Smartphones', 'Best Phone Under 400', 'Affordable Android', 'Value Smartphones'],
        image: '/images/posts/best-budget-smartphones-under-400-2025.jpg',
        featured: true,
        category: 'Mobile Reviews',
        categorySlug: 'mobile-reviews'
      }
    ];
    setAllMobileReviews(mockReviews);
  }, []);

  // Filter posts based on active filter and search term
  const filteredReviews = useMemo(() => {
    let filtered = allMobileReviews;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(review => {
        const tags = review.tags.map((tag: string) => tag.toLowerCase());
        switch (activeFilter) {
          case 'iphone':
            return tags.some((tag: string) => tag.includes('iphone') || tag.includes('apple'));
          case 'samsung':
            return tags.some((tag: string) => tag.includes('samsung') || tag.includes('galaxy'));
          case 'google':
            return tags.some((tag: string) => tag.includes('google') || tag.includes('pixel'));
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
  }, [allMobileReviews, activeFilter, searchTerm]);

  // Get featured reviews
  const featuredReviews = allMobileReviews.filter(review => review.featured);

  const popularPhones = [
    { name: "iPhone 15 Pro Max", rating: 4.5, reviews: 23 },
    { name: "Samsung Galaxy S24 Ultra", rating: 4.4, reviews: 18 },
    { name: "Google Pixel 8 Pro", rating: 4.3, reviews: 15 },
    { name: "OnePlus 12", rating: 4.2, reviews: 12 },
    { name: "Xiaomi 14 Ultra", rating: 4.4, reviews: 8 }
  ];

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
            <span>Mobile Reviews</span>
          </nav>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Mobile Reviews
              </h1>
              <p className="text-gray-600">{allMobileReviews.length} smartphone reviews and counting</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            Comprehensive smartphone reviews, detailed comparisons, and expert buying guides. 
            From flagship iPhones to budget Android devices, we test every phone thoroughly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search mobile reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Filter buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Reviews
                    </button>
                    <button 
                      onClick={() => setActiveFilter('iphone')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'iphone' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      iPhone
                    </button>
                    <button 
                      onClick={() => setActiveFilter('samsung')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'samsung' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Samsung
                    </button>
                    <button 
                      onClick={() => setActiveFilter('google')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'google' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Google Pixel
                    </button>
                    <button 
                      onClick={() => setActiveFilter('budget')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === 'budget' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Budget Phones
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} found
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
                      src={featuredReviews[0].image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&auto=format&q=80"}
                      alt={featuredReviews[0].title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                      priority
                      category="mobile"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured Review
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                      <Link href={`/posts/${featuredReviews[0].slug}`}>
                        {featuredReviews[0].title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredReviews[0].excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredReviews[0].tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{featuredReviews[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>5 min read</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/posts/${featuredReviews[0].slug}`}
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

            {/* AdSense - Article Ad */}
            <ArticleAd />

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.filter(review => !review.featured).map((review) => (
                <article
                  key={review.slug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <OptimizedImage
                      src={review.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format&q=80"}
                      alt={review.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                      category="mobile"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/posts/${review.slug}`}>
                        {review.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {review.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {review.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{review.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Link
                        href={`/posts/${review.slug}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        Read More
                        <ChevronRight className="ml-1" size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Show message if no reviews found */}
            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Smartphone className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No reviews found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}

            {/* Load More - Show only if there are more than 6 non-featured reviews */}
            {filteredReviews.filter((review: any) => !review.featured).length > 6 && (
              <div className="text-center mt-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Phones */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="mr-2 text-blue-600" size={24} />
                Popular Phones
              </h3>
              <div className="space-y-4">
                {popularPhones.map((phone, index) => (
                  <div key={phone.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{phone.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-2">
                          {renderStars(phone.rating)}
                        </div>
                        <span>({phone.reviews} reviews)</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AdSense - Sidebar Ad */}
            <SidebarAd />

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Mobile Updates</h3>
              <p className="text-blue-100 mb-4">
                Get the latest smartphone reviews and mobile tech news delivered weekly.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
              />
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
