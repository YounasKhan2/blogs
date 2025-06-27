import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ChevronRight, Laptop, Star, Filter, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laptop Reviews - Best Laptop Reviews and Comparisons',
  description: 'Comprehensive laptop reviews including MacBooks, gaming laptops, ultrabooks, and budget options. Expert analysis and buying guides.',
  keywords: ['laptop reviews', 'MacBook reviews', 'gaming laptops', 'ultrabook reviews', 'laptop comparisons'],
};

export default function LaptopReviews() {
  const laptopReviews = [
    {
      id: 2,
      title: "MacBook Pro M3 vs Dell XPS 15: The Ultimate Laptop Showdown",
      excerpt: "We pit Apple's latest MacBook Pro against Dell's flagship XPS 15 to see which laptop reigns supreme for professionals.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format&q=80",
      author: "Sarah Johnson",
      date: "2025-06-24",
      readTime: "12 min read",
      rating: 4.8,
      featured: true,
      tags: ["MacBook", "Dell", "Professional", "Comparison"]
    },
    {
      id: 8,
      title: "Microsoft Surface Pro 9 Review: The Best 2-in-1 Tablet?",
      excerpt: "Microsoft's latest Surface Pro promises laptop performance in a tablet form factor.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format&q=80",
      author: "Emma Davis",
      date: "2025-06-18",
      readTime: "8 min read",
      rating: 4.0,
      tags: ["Microsoft", "Surface", "2-in-1", "Tablet"]
    },
    {
      id: 13,
      title: "Best Gaming Laptops Under $1500: Performance on a Budget",
      excerpt: "Discover the best gaming laptops that deliver excellent performance without breaking the bank.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format&q=80",
      author: "Tom Garcia",
      date: "2025-06-16",
      readTime: "10 min read",
      rating: 4.3,
      tags: ["Gaming", "Budget", "Performance", "Value"]
    },
    {
      id: 14,
      title: "Lenovo ThinkPad X1 Carbon Gen 11: Business Laptop Excellence",
      excerpt: "The latest ThinkPad continues the legacy of exceptional business laptops with modern features.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format&q=80",
      author: "Sarah Johnson",
      date: "2025-06-14",
      readTime: "9 min read",
      rating: 4.5,
      tags: ["Lenovo", "ThinkPad", "Business", "Professional"]
    },
    {
      id: 15,
      title: "ASUS ROG Zephyrus G16: The Ultimate Gaming Ultrabook",
      excerpt: "ASUS combines gaming performance with ultrabook portability in this impressive machine.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format&q=80",
      author: "Mike Chen",
      date: "2025-06-12",
      readTime: "11 min read",
      rating: 4.6,
      tags: ["ASUS", "Gaming", "Ultrabook", "Performance"]
    }
  ];

  const popularLaptops = [
    { name: "MacBook Pro M3", rating: 4.8, reviews: 15 },
    { name: "Dell XPS 15", rating: 4.6, reviews: 12 },
    { name: "ASUS ROG Zephyrus G16", rating: 4.6, reviews: 8 },
    { name: "Lenovo ThinkPad X1 Carbon", rating: 4.5, reviews: 10 },
    { name: "HP Spectre x360", rating: 4.4, reviews: 7 }
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
              <p className="text-gray-600">98 comprehensive laptop reviews</p>
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
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    All Reviews
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Gaming
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Business
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Ultrabooks
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Budget
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Featured Review */}
            {laptopReviews.filter(review => review.featured).map((review) => (
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
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-purple-600 transition-colors">
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
                        <span key={tag} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
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
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center"
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
              {laptopReviews.filter(review => !review.featured).map((review) => (
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
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
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Laptops */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="mr-2 text-purple-600" size={24} />
                Popular Laptops
              </h3>
              <div className="space-y-4">
                {popularLaptops.map((laptop, index) => (
                  <div key={laptop.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{laptop.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-2">
                          {renderStars(laptop.rating)}
                        </div>
                        <span>({laptop.reviews} reviews)</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Laptop Updates</h3>
              <p className="text-purple-100 mb-4">
                Get the latest laptop reviews and computing news delivered weekly.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
              />
              <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
