import Link from 'next/link';
import { Clock, User, ChevronRight, Brain, Star, Filter, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Technology Reviews - Latest AI Tools and News',
  description: 'Comprehensive reviews of AI tools, language models, and artificial intelligence technology. Expert analysis of ChatGPT, Claude, and more.',
  keywords: ['AI reviews', 'artificial intelligence', 'ChatGPT', 'Claude', 'AI tools', 'machine learning'],
};

export default function AIReviews() {
  const aiReviews = [
    {
      id: 3,
      title: "ChatGPT-4 vs Claude 3: AI Assistants Battle for Supremacy",
      excerpt: "A comprehensive comparison of the latest AI language models and their capabilities in real-world scenarios.",
      image: "/api/placeholder/600/400",
      author: "Mike Chen",
      date: "2025-06-23",
      readTime: "10 min read",
      rating: 4.3,
      featured: true,
      tags: ["ChatGPT", "Claude", "AI Comparison", "Language Models"]
    },
    {
      id: 16,
      title: "Google Gemini Pro Review: The Most Advanced AI Yet?",
      excerpt: "Google's latest AI model promises to revolutionize how we interact with artificial intelligence.",
      image: "/api/placeholder/400/300",
      author: "Sarah Johnson",
      date: "2025-06-20",
      readTime: "8 min read",
      rating: 4.4,
      tags: ["Google", "Gemini", "AI Assistant", "Multimodal"]
    },
    {
      id: 17,
      title: "Best AI Writing Tools for Content Creators in 2025",
      excerpt: "Discover the top AI-powered writing tools that can help streamline your content creation process.",
      image: "/api/placeholder/400/300",
      author: "Lisa Brown",
      date: "2025-06-18",
      readTime: "12 min read",
      rating: 4.2,
      tags: ["AI Writing", "Content Creation", "Productivity", "Tools"]
    },
    {
      id: 18,
      title: "Microsoft Copilot vs GitHub Copilot: Which AI Assistant Wins?",
      excerpt: "Comparing Microsoft's AI assistants for different use cases and productivity scenarios.",
      image: "/api/placeholder/400/300",
      author: "Tom Garcia",
      date: "2025-06-15",
      readTime: "9 min read",
      rating: 4.1,
      tags: ["Microsoft", "Copilot", "Productivity", "Coding"]
    },
    {
      id: 19,
      title: "AI Image Generators: DALL-E 3 vs Midjourney vs Stable Diffusion",
      excerpt: "The ultimate comparison of the most popular AI image generation tools available today.",
      image: "/api/placeholder/400/300",
      author: "Alex Turner",
      date: "2025-06-12",
      readTime: "15 min read",
      rating: 4.5,
      tags: ["Image Generation", "DALL-E", "Midjourney", "Art"]
    }
  ];

  const popularAITools = [
    { name: "ChatGPT-4", rating: 4.3, reviews: 25 },
    { name: "Claude 3", rating: 4.2, reviews: 18 },
    { name: "Google Gemini Pro", rating: 4.4, reviews: 12 },
    { name: "Microsoft Copilot", rating: 4.1, reviews: 15 },
    { name: "DALL-E 3", rating: 4.5, reviews: 10 }
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
            <span>AI Technology</span>
          </nav>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <Brain className="text-green-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                AI Technology
              </h1>
              <p className="text-gray-600">76 AI tools and technology reviews</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay ahead of the AI revolution with our comprehensive reviews of the latest artificial intelligence tools, 
            language models, and emerging AI technologies that are reshaping our world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    All Reviews
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Language Models
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    AI Writing
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Image Generation
                  </button>
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    AI Assistants
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Featured Review */}
            {aiReviews.filter(review => review.featured).map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured Review
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-green-600 transition-colors">
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
                        <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
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
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
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
              {aiReviews.filter(review => !review.featured).map((review) => (
                <article
                  key={review.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
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
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular AI Tools */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="mr-2 text-green-600" size={24} />
                Popular AI Tools
              </h3>
              <div className="space-y-4">
                {popularAITools.map((tool, index) => (
                  <div key={tool.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-2">
                          {renderStars(tool.rating)}
                        </div>
                        <span>({tool.reviews} reviews)</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI News */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">AI News & Updates</h3>
              <p className="text-green-100 mb-4">
                Stay ahead of the AI curve with breaking news and analysis delivered weekly.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
              />
              <button className="w-full bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
