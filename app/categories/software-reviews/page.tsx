import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import { Search, Filter, Star, Clock, TrendingUp, Settings, Download, Shield, Zap } from 'lucide-react';
import { getPostsByCategory } from '@/lib/posts';

export default function SoftwareReviews() {
  // Server-side fetch
  // Get all posts, sort by date descending (latest first)
  const allPosts = getPostsByCategory('software-reviews').sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
  const totalCount = allPosts.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Top software for sidebar
  const topSoftware = [
    { name: "Adobe Photoshop 2025", rating: 4.7, reviews: 1250, category: "Design", icon: Settings },
    { name: "Visual Studio Code", rating: 4.9, reviews: 2100, category: "Development", icon: Settings },
    { name: "1Password", rating: 4.8, reviews: 750, category: "Security", icon: Shield },
    { name: "Notion", rating: 4.6, reviews: 980, category: "Productivity", icon: Settings },
    { name: "Slack", rating: 4.3, reviews: 650, category: "Communication", icon: Settings },
    { name: "DaVinci Resolve", rating: 4.7, reviews: 840, category: "Video Editing", icon: Settings },
    { name: "Figma", rating: 4.8, reviews: 1120, category: "Design", icon: Settings },
    { name: "Microsoft Office 365", rating: 4.4, reviews: 1580, category: "Productivity", icon: Settings }
  ];

  // Compute categories and counts server-side
  const counts: { [key: string]: number } = {};
  allPosts.forEach(post => {
    let category = post.metadata.category;
    if (category === 'Software Reviews') {
      const title = post.metadata.title.toLowerCase();
      const tags = (post.metadata.tags || []) as string[];
      if (title.includes('photoshop') || title.includes('design') || tags.some((tag: string) => ['design', 'photoshop', 'figma', 'sketch', 'adobe xd'].includes(tag.toLowerCase()))) {
        category = 'Design Software';
      } else if (title.includes('notion') || title.includes('productivity') || tags.some((tag: string) => ['productivity', 'notion', 'obsidian', 'office'].includes(tag.toLowerCase()))) {
        category = 'Productivity';
      } else if (title.includes('video') || title.includes('editing') || tags.some((tag: string) => ['video editing', 'davinci resolve', 'premiere pro'].includes(tag.toLowerCase()))) {
        category = 'Video Editing';
      } else {
        category = 'Software Reviews';
      }
    }
    counts[category] = (counts[category] || 0) + 1;
  });
  const availableCategories = ['All Software', ...Object.keys(counts).filter(c => c !== 'All Software')];
  const categoryCounts = { 'All Software': allPosts.length, ...counts };

  // By default, show all posts (no client-side filtering)
  const filteredPosts = allPosts;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Settings className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Software Reviews</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Comprehensive reviews of the best software for productivity, design, security, and more.
            </p>
            <p className="text-lg text-blue-200 font-semibold mb-2">{totalCount} blog{totalCount !== 1 ? 's' : ''} in this category</p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                {/* Search removed for server component version */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Reviews */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Reviews
                </h2>
                {filteredPosts.length > 6 && (
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    View All →
                  </Link>
                )}
              </div>
              
                {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-600 mb-4">
                    No reviews found for the selected categories.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {filteredPosts.slice(0, 3).map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <OptimizedImage 
                            src={post.metadata.image || "/images/posts/default-software.jpg"}
                            alt={post.metadata.title}
                            width={400}
                            height={300}
                            className="w-full h-48 md:h-full object-cover"
                            category="software"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              {post.metadata.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                            <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.metadata.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readingTime.text}
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(post.metadata.date)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* More Reviews */}
            {filteredPosts.length > 3 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">More Reviews</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.slice(3).map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <OptimizedImage 
                        src={post.metadata.image || "/images/posts/default-software.jpg"}
                        alt={post.metadata.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                        category="software"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                            {post.metadata.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          <Link href={`/posts/${post.slug}`} className="line-clamp-2">{post.metadata.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.metadata.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readingTime.text}
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(post.metadata.date)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories List (no filtering) */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Categories
              </h3>
              <div className="space-y-3">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center justify-between p-2 rounded-lg">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {(categoryCounts as any)[category] || 0}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredPosts.length}</span> of <span className="font-semibold">{allPosts.length}</span> reviews
                </p>
              </div>
            </div>

            {/* Top Rated Software */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Top Rated Software
              </h3>
              <div className="space-y-4">
                {topSoftware.map((software, index) => (
                  <div key={software.name} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <software.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {software.name}
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="ml-1 text-xs text-gray-600">{software.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{software.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Software Weekly</h3>
              <p className="text-blue-100 mb-4">
                Get the latest software reviews and tech news delivered to your inbox.
              </p>
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
