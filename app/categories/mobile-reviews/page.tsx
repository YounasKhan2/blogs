'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ChevronRight, Smartphone, Star, Filter, TrendingUp } from 'lucide-react';

export default function MobileReviews() {
  const mobileReviews = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Review: The Ultimate Smartphone Experience",
      excerpt: "Apple's latest flagship delivers incredible performance, stunning cameras, and titanium design that sets new standards for premium smartphones.",
      image: "/api/placeholder/600/400",
      author: "John Smith",
      date: "2025-06-25",
      readTime: "8 min read",
      rating: 4.5,
      featured: true,
      tags: ["iPhone", "Apple", "Premium", "Camera"]
    },
    {
      id: 6,
      title: "Samsung Galaxy Z Fold 5 Long-term Review: 6 Months Later",
      excerpt: "After using the Galaxy Z Fold 5 for six months, here's our honest long-term review of Samsung's flagship foldable.",
      image: "/api/placeholder/400/300",
      author: "David Wilson",
      date: "2025-06-20",
      readTime: "9 min read",
      rating: 4.1,
      tags: ["Samsung", "Foldable", "Android", "Long-term"]
    },
    {
      id: 9,
      title: "Google Pixel 8 Pro vs iPhone 15 Pro: Camera Showdown",
      excerpt: "We compare the camera capabilities of Google's AI-powered Pixel 8 Pro against Apple's iPhone 15 Pro.",
      image: "/api/placeholder/400/300",
      author: "Sarah Johnson",
      date: "2025-06-18",
      readTime: "12 min read",
      rating: 4.3,
      tags: ["Google", "iPhone", "Camera", "Comparison"]
    },
    {
      id: 10,
      title: "OnePlus 12 Review: Flagship Performance at a Great Price",
      excerpt: "OnePlus returns to form with the OnePlus 12, offering flagship features without the premium price tag.",
      image: "/api/placeholder/400/300",
      author: "Mike Chen",
      date: "2025-06-15",
      readTime: "7 min read",
      rating: 4.2,
      tags: ["OnePlus", "Value", "Performance", "Android"]
    },
    {
      id: 11,
      title: "Best Budget Smartphones Under $400 in 2025",
      excerpt: "Discover the best budget smartphones that offer excellent value without compromising on essential features.",
      image: "/api/placeholder/400/300",
      author: "Alex Turner",
      date: "2025-06-12",
      readTime: "10 min read",
      rating: 4.0,
      tags: ["Budget", "Value", "Buying Guide", "Comparison"]
    },
    {
      id: 12,
      title: "Xiaomi 14 Ultra Review: Photography Powerhouse",
      excerpt: "Xiaomi's latest flagship focuses on photography with Leica partnership and impressive camera hardware.",
      image: "/api/placeholder/400/300",
      author: "Lisa Brown",
      date: "2025-06-10",
      readTime: "11 min read",
      rating: 4.4,
      tags: ["Xiaomi", "Camera", "Leica", "Photography"]
    }
  ];

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
              <p className="text-gray-600">145 smartphone reviews and counting</p>
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
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    All Reviews
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    iPhone
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Samsung
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Google Pixel
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Budget Phones
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Featured Review */}
            {mobileReviews.filter(review => review.featured).map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image
                      src={review.image}
                      alt={review.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured Review
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                      <Link href={`/post/${review.id}`}>
                        {review.title}
                      </Link>
                    </h2>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {review.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {review.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{review.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{review.readTime}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/post/${review.id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        Read Review
                        <ChevronRight className="ml-2" size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileReviews.filter(review => !review.featured).map((review) => (
                <article
                  key={review.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={review.image}
                      alt={review.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/post/${review.id}`}>
                        {review.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {review.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {review.tags.slice(0, 3).map((tag) => (
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
                          <span>{review.readTime}</span>
                        </div>
                      </div>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Reviews
              </button>
            </div>
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
