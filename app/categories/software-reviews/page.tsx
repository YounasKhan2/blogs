import Link from 'next/link';
import { Search, Filter, Star, Clock, TrendingUp, Settings, Download, Shield, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Reviews - Best Apps and Tools 2025',
  description: 'Comprehensive software reviews, productivity tools, and application guides. Find the best software for your needs.',
  keywords: ['software reviews', 'productivity tools', 'applications', 'software guides', 'best apps'],
};

export default function SoftwareReviews() {
  const featuredPosts = [
    {
      id: 1,
      title: "Adobe Creative Suite 2025: Complete Review",
      excerpt: "An in-depth look at Adobe's latest creative tools and whether the subscription is worth it.",
      image: "/api/placeholder/400/250",
      category: "Design Software",
      readTime: "12 min read",
      rating: 4.5,
      date: "2025-01-10",
      featured: true
    },
    {
      id: 2,
      title: "Microsoft Office vs Google Workspace: Which is Better?",
      excerpt: "Comprehensive comparison of the two leading office suites for businesses and individuals.",
      image: "/api/placeholder/400/250",
      category: "Productivity",
      readTime: "8 min read",
      rating: 4.2,
      date: "2025-01-08",
      featured: true
    },
    {
      id: 3,
      title: "Best Video Editing Software for Beginners 2025",
      excerpt: "Top video editing tools that are perfect for newcomers to video production.",
      image: "/api/placeholder/400/250",
      category: "Video Editing",
      readTime: "10 min read",
      rating: 4.7,
      date: "2025-01-05",
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "Notion vs Obsidian: Best Note-Taking App?",
      excerpt: "Compare features, pricing, and usability of these popular note-taking applications.",
      image: "/api/placeholder/300/200",
      category: "Productivity",
      readTime: "6 min read",
      rating: 4.3,
      date: "2025-01-03"
    },
    {
      id: 5,
      title: "Figma vs Adobe XD: UI Design Tool Comparison",
      excerpt: "Which design tool is better for creating user interfaces and prototypes?",
      image: "/api/placeholder/300/200",
      category: "Design Software",
      readTime: "7 min read",
      rating: 4.6,
      date: "2025-01-01"
    },
    {
      id: 6,
      title: "Best Password Managers 2025",
      excerpt: "Keep your accounts secure with these top-rated password management tools.",
      image: "/api/placeholder/300/200",
      category: "Security",
      readTime: "9 min read",
      rating: 4.8,
      date: "2024-12-28"
    },
    {
      id: 7,
      title: "Slack vs Microsoft Teams: Communication Platform Review",
      excerpt: "Compare features and pricing of these leading team communication tools.",
      image: "/api/placeholder/300/200",
      category: "Communication",
      readTime: "8 min read",
      rating: 4.1,
      date: "2024-12-25"
    },
    {
      id: 8,
      title: "Best Antivirus Software 2025",
      excerpt: "Protect your devices with these top-rated antivirus solutions.",
      image: "/api/placeholder/300/200",
      category: "Security",
      readTime: "11 min read",
      rating: 4.4,
      date: "2024-12-22"
    },
    {
      id: 9,
      title: "Code Editors: VS Code vs Sublime Text vs Atom",
      excerpt: "Which code editor offers the best features for developers?",
      image: "/api/placeholder/300/200",
      category: "Development",
      readTime: "10 min read",
      rating: 4.5,
      date: "2024-12-20"
    }
  ];

  const categories = [
    { name: "All Software", count: 134, active: true },
    { name: "Productivity", count: 45 },
    { name: "Design Software", count: 28 },
    { name: "Security", count: 22 },
    { name: "Communication", count: 19 },
    { name: "Development", count: 20 }
  ];

  const topSoftware = [
    { name: "Microsoft Office 365", rating: 4.5, reviews: 1250, category: "Productivity", icon: Settings },
    { name: "Adobe Photoshop", rating: 4.7, reviews: 980, category: "Design", icon: Settings },
    { name: "1Password", rating: 4.8, reviews: 750, category: "Security", icon: Shield },
    { name: "Slack", rating: 4.3, reviews: 650, category: "Communication", icon: Settings },
    { name: "VS Code", rating: 4.9, reviews: 2100, category: "Development", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Settings className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Software Reviews</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover the best software and apps for productivity, creativity, and security
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search software reviews..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
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
                <h2 className="text-3xl font-bold text-gray-900">Featured Reviews</h2>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  View All →
                </Link>
              </div>
              
              <div className="grid gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-gray-600 text-sm">{post.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          <Link href="#">{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                          <span className="text-sm text-gray-500">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Recent Reviews */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Recent Reviews</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-gray-600 text-sm">{post.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link href="#" className="line-clamp-2">{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
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
                        ? 'bg-blue-100 text-blue-800' 
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
