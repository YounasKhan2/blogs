import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import { Clock, User, ChevronRight, Brain, Star, Filter, TrendingUp } from 'lucide-react';
import { getPostsByCategory } from '@/lib/posts';

function renderStars(rating: number): React.ReactNode {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="text-yellow-400" size={16} fill="currentColor" />);
  }
  if (halfStar) {
    stars.push(<Star key="half" className="text-yellow-400" size={16} fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
  }
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<Star key={i + 'empty'} className="text-gray-300" size={16} />);
  }
  return <span className="flex">{stars}</span>;
}


export default async function AiCategoryPage() {
  // Get all posts, sort by date descending (latest first)
  const posts = getPostsByCategory('ai').sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
  const totalCount = posts.length;

  const popularAITools = [
    { name: "ChatGPT-4o", rating: 4.9, reviews: 120 },
    { name: "Claude 3.5 Sonnet", rating: 4.8, reviews: 98 },
    { name: "Midjourney v6", rating: 4.7, reviews: 85 },
    { name: "Google Gemini Advanced", rating: 4.6, reviews: 70 },
    { name: "DALL-E 3", rating: 4.5, reviews: 60 }
  ];

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
            <span>AI Tools & Reviews</span>
          </nav>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Brain className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">AI Tools & Reviews</h1>
              <p className="text-gray-600">{totalCount} AI tool review{totalCount !== 1 ? 's' : ''} & comparisons</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore the latest AI tools, platforms, and in-depth reviews. Stay ahead with expert analysis and comparisons of the best AI solutions for productivity, creativity, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* All Reviews (latest first) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <OptimizedImage
                      src={post.metadata.image || "/images/posts/default-ai.jpg"}
                      alt={post.metadata.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      category="ai"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.metadata.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.metadata.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{post.metadata.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags?.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* No Results Message */}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No AI reviews found</h3>
                <p className="text-gray-500">No AI tool reviews are available at this time.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular AI Tools */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Popular AI Tools
              </h3>
              <div className="space-y-4">
                {popularAITools.map((tool, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{tool.name}</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(tool.rating)}
                        <span className="text-sm text-gray-500 ml-2">({tool.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">AI Weekly</h3>
              <p className="text-blue-100 mb-4">Get the latest AI reviews and news delivered to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
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

