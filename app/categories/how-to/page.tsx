import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import { Search, Filter, Clock, TrendingUp, BookOpen, Play, Users, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import type { Metadata } from 'next';
import { getPostsByCategory } from '../../../lib/contentlayer-enhanced';

export const metadata: Metadata = {
  title: 'How-to Guides - Tech Tutorials and Tips',
  description: 'Step-by-step tutorials, troubleshooting guides, and tech tips to help you master technology.',
  keywords: ['how-to guides', 'tech tutorials', 'troubleshooting', 'tech tips', 'step-by-step guides'],
};

export default function HowToGuides() {
  const posts = getPostsByCategory('how-to');
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  const categories = [
    { name: "All Guides", count: posts.length, active: true },
    { name: "Computer Maintenance", count: posts.filter(p => p.category?.includes('Computer')).length },
    { name: "Troubleshooting", count: posts.filter(p => p.category?.includes('Troubleshooting')).length },
    { name: "Security", count: posts.filter(p => p.category?.includes('Security')).length },
    { name: "Setup Guides", count: posts.filter(p => p.category?.includes('Setup')).length },
    { name: "Networking", count: posts.filter(p => p.category?.includes('Network')).length },
    { name: "Data Recovery", count: posts.filter(p => p.category?.includes('Data')).length }
  ];

  const difficultyLevels = [
    { level: "Beginner", count: Math.floor(posts.length * 0.5), color: "bg-green-100 text-green-800" },
    { level: "Intermediate", count: Math.floor(posts.length * 0.35), color: "bg-yellow-100 text-yellow-800" },
    { level: "Advanced", count: Math.floor(posts.length * 0.15), color: "bg-red-100 text-red-800" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">How-to Guides</h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Step-by-step tutorials and guides to master technology
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tutorials and guides..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{posts.length}</h3>
              <p className="text-gray-600">Total Guides</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">2.5M+</h3>
              <p className="text-gray-600">People Helped</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Guides */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Featured Guides</h2>
                  <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                    View All →
                  </Link>
                </div>
                
                <div className="grid gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3 relative">
                          <OptimizedImage 
                            src={post.image || "/images/posts/default-howto.jpg"} 
                            alt={post.title}
                            width={400}
                            height={300}
                            className="w-full h-48 md:h-full object-cover"
                            category="howto"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                            <Play className="h-4 w-4 text-indigo-600 mr-2" />
                            <span className="text-sm font-medium">Guide</span>
                          </div>
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor('Beginner')}`}>
                              Beginner
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
                            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.readTime || '10 min read'}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {Math.floor(Math.random() * 100) + 50}K
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Guides */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Recent Guides</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              {recentPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <OptimizedImage 
                          src={post.image || "/images/posts/default-howto.jpg"} 
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          category="how-to"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                          <span className="text-sm font-medium">Guide</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor('Beginner')}`}>
                            Beginner
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                          <Link href={`/posts/${post.slug}`} className="line-clamp-2">{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime || '10 min read'}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {Math.floor(Math.random() * 100) + 50}K
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No how-to guides yet</h3>
                  <p className="text-gray-500">Check back soon for step-by-step tutorials and guides.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    href="#" 
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      category.active 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Difficulty Levels */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Difficulty Levels</h3>
              <div className="space-y-3">
                {difficultyLevels.map((level) => (
                  <div key={level.level} className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color}`}>
                      {level.level}
                    </span>
                    <span className="text-sm text-gray-600">{level.count} guides</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Guides */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Popular Guides
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post, index) => (
                  <div key={post.slug} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {post.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 50}K views</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor('Beginner')}`}>
                          Beginner
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Tech Tips Weekly</h3>
              <p className="text-indigo-100 mb-4">
                Get the latest how-to guides and tech tips delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button className="w-full bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
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
