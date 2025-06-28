import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import { Clock, User, ChevronRight, Brain, Star, Filter, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import { getPostsByCategory } from '../../../lib/contentlayer-enhanced';

export const metadata: Metadata = {
  title: 'AI Technology Reviews 2025 - ChatGPT, Claude, Gemini, AI Tools & Machine Learning News',
  description: 'Expert AI technology reviews & comparisons 2025. ChatGPT-4, Claude 3, Google Gemini, AI image generators, video generators, coding assistants & productivity tools. Latest AI news & guides.',
  keywords: [
    'AI reviews 2025', 'artificial intelligence', 'ChatGPT review', 'Claude AI review', 'Google Gemini review',
    'AI tools', 'machine learning', 'AI image generation', 'AI video generation', 'AI productivity tools',
    'OpenAI', 'Anthropic', 'AI comparison', 'AI assistant', 'language models', 'generative AI',
    'AI for business', 'AI news', 'AI technology trends', 'AI software', 'AI applications'
  ],
  openGraph: {
    title: 'AI Technology Reviews 2025 - ChatGPT, Claude, AI Tools & Latest AI News',
    description: 'Expert AI technology reviews & comparisons. ChatGPT-4, Claude 3, Google Gemini, AI image generators & productivity tools. Stay ahead with AI trends.',
    url: 'https://techblogpro.com/categories/ai',
    type: 'website',
    images: [
      {
        url: '/images/ai-reviews-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Technology Reviews - ChatGPT, Claude, AI Tools & Machine Learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Technology Reviews 2025 - Expert AI Tools & Technology Analysis',
    description: 'ChatGPT, Claude, Gemini & AI tools reviews. Expert analysis of latest AI technology trends & applications.',
  },
  alternates: {
    canonical: 'https://techblogpro.com/categories/ai',
  },
};

export default function AIReviews() {
  const posts = getPostsByCategory('ai');
  const featuredPosts = posts.filter(post => post.featured).slice(0, 1);
  const regularPosts = posts.filter(post => !post.featured);

  const renderStars = (rating: number = 4.5) => {
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
              <p className="text-gray-600">{posts.length} AI tools and technology reviews</p>
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
            {featuredPosts.length > 0 && featuredPosts.map((post) => (
              <div key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <OptimizedImage
                      src={post.image || `/images/posts/default-ai.jpg`}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                      priority
                      category="ai"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured Review
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-green-600 transition-colors">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        {renderStars(4.5)}
                        <span className="ml-2 text-sm text-gray-600">(4.5/5)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags && post.tags.map((tag: string) => (
                        <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{post.author || 'Tech Blog Pro'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{post.readTime || '10 min read'}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/posts/${post.slug}`}
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
              {regularPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <OptimizedImage
                      src={post.image || `/images/posts/default-ai.jpg`}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                      category="ai"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(4.5)}
                        <span className="ml-2 text-sm text-gray-600">(4.5)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags && post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{post.author || 'Tech Blog Pro'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{post.readTime || '10 min read'}</span>
                        </div>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Show message if no posts */}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <Brain className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No AI reviews yet</h3>
                <p className="text-gray-500">Check back soon for the latest AI technology reviews and comparisons.</p>
              </div>
            )}
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
                {['ChatGPT-4', 'Claude 3', 'Google Gemini Pro', 'Microsoft Copilot', 'DALL-E 3'].map((tool, index) => (
                  <div key={tool} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{tool}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-2">
                          {renderStars(4.3)}
                        </div>
                        <span>({Math.floor(Math.random() * 20) + 10} reviews)</span>
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
                placeholder="younaskk120@gmail.com"
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
