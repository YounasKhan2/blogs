import Link from 'next/link';
import OptimizedImage from '../../components/OptimizedImage';
import { Clock, User, ChevronRight, Search, Filter, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Reviews - Latest Technology Reviews and Analysis',
  description: 'Comprehensive tech reviews covering smartphones, laptops, AI technology, software, and gadgets. Expert analysis and buying guides.',
  keywords: ['tech reviews', 'technology analysis', 'product reviews', 'buying guides'],
};

export default function TechReviews() {
  const allPosts = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Review: The Ultimate Smartphone Experience",
      excerpt: "Apple's latest flagship delivers incredible performance, stunning cameras, and titanium design that sets new standards for premium smartphones.",
      image: "/api/placeholder/600/400",
      category: "Mobile Reviews",
      categorySlug: "mobile-reviews",
      author: "John Smith",
      date: "2025-06-25",
      readTime: "8 min read",
      rating: 4.5,
      featured: true
    },
    {
      id: 2,
      title: "MacBook Pro M3 vs Dell XPS 15: The Ultimate Laptop Showdown",
      excerpt: "We pit Apple's latest MacBook Pro against Dell's flagship XPS 15 to see which laptop reigns supreme for professionals.",
      image: "/api/placeholder/600/400",
      category: "Laptop Reviews",
      categorySlug: "laptop-reviews",
      author: "Sarah Johnson",
      date: "2025-06-24",
      readTime: "12 min read",
      rating: 4.8
    },
    {
      id: 3,
      title: "ChatGPT-4 vs Claude 3: AI Assistants Battle for Supremacy",
      excerpt: "A comprehensive comparison of the latest AI language models and their capabilities in real-world scenarios.",
      image: "/api/placeholder/600/400",
      category: "AI",
      categorySlug: "ai",
      author: "Mike Chen",
      date: "2025-06-23",
      readTime: "10 min read",
      rating: 4.3
    },
    {
      id: 4,
      title: "Best Gaming Headsets Under $200: Our Top Picks for 2025",
      excerpt: "Discover the best gaming headsets that deliver exceptional audio quality without breaking the bank.",
      image: "/api/placeholder/400/300",
      category: "Accessories & Gadgets",
      categorySlug: "accessories-gadgets",
      author: "Alex Turner",
      date: "2025-06-22",
      readTime: "6 min read",
      rating: 4.2
    },
    {
      id: 5,
      title: "Adobe Photoshop 2025: New AI Features That Will Blow Your Mind",
      excerpt: "Explore the groundbreaking AI-powered features in Adobe's latest Photoshop update.",
      image: "/api/placeholder/400/300",
      category: "Software Reviews",
      categorySlug: "software-reviews",
      author: "Lisa Brown",
      date: "2025-06-21",
      readTime: "7 min read",
      rating: 4.6
    },
    {
      id: 6,
      title: "Samsung Galaxy Z Fold 5 Long-term Review: 6 Months Later",
      excerpt: "After using the Galaxy Z Fold 5 for six months, here's our honest long-term review.",
      image: "/api/placeholder/400/300",
      category: "Mobile Reviews",
      categorySlug: "mobile-reviews",
      author: "David Wilson",
      date: "2025-06-20",
      readTime: "9 min read",
      rating: 4.1
    },
    {
      id: 7,
      title: "NVIDIA RTX 4090 vs RTX 4080: Which GPU Should You Buy?",
      excerpt: "An in-depth comparison of NVIDIA's flagship graphics cards for gaming and content creation.",
      image: "/api/placeholder/400/300",
      category: "Hardware Reviews",
      categorySlug: "hardware-reviews",
      author: "Tom Garcia",
      date: "2025-06-19",
      readTime: "11 min read",
      rating: 4.7
    },
    {
      id: 8,
      title: "Microsoft Surface Pro 9 Review: The Best 2-in-1 Tablet?",
      excerpt: "Microsoft's latest Surface Pro promises laptop performance in a tablet form factor.",
      image: "/api/placeholder/400/300",
      category: "Laptop Reviews",
      categorySlug: "laptop-reviews",
      author: "Emma Davis",
      date: "2025-06-18",
      readTime: "8 min read",
      rating: 4.0
    }
  ];

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
        {allPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                  priority
                  category={post.category}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured Review
                  </span>
                  <Link
                    href={`/categories/${post.categorySlug}`}
                    className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {renderStars(post.rating)}
                    <span className="ml-2 text-sm text-gray-600">({post.rating}/5)</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/post/${post.id}`}
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

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.filter(post => !post.featured).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="relative">
                <OptimizedImage
                  src={post.image}
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
                  <Link href={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(post.rating)}
                    <span className="ml-2 text-sm text-gray-600">({post.rating})</span>
                  </div>
                </div>
                
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
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 mb-16">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
