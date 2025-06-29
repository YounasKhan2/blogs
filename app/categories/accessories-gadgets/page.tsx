import Link from 'next/link';
import OptimizedImage from '../../../components/OptimizedImage';
import { Search, Filter, Star, Clock, TrendingUp, Gamepad2, Headphones, Watch, Camera, Smartphone, Zap } from 'lucide-react';
import { getPostsByCategory } from '@/lib/posts';

export default function AccessoriesGadgetsPage() {
  const topAccessories = [
    { name: "AirPods Pro 3", rating: 4.7, reviews: 1850, category: "Audio", icon: Headphones },
    { name: "Apple Watch Series 10", rating: 4.6, reviews: 1240, category: "Wearables", icon: Watch },
    { name: "Logitech MX Master 4", rating: 4.8, reviews: 980, category: "Peripherals", icon: Gamepad2 },
    { name: "Sony WH-1000XM6", rating: 4.9, reviews: 1650, category: "Audio", icon: Headphones },
    { name: "iPad Pro Magic Keyboard", rating: 4.4, reviews: 750, category: "Peripherals", icon: Gamepad2 }
  ];
  // Server-side fetch

  // Get all posts and total count using consistent logic
  const allPosts = getPostsByCategory('accessories-gadgets').sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
  const totalCount = allPosts.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  // ...existing code...

  const trendingCategories = [
    { name: "Wireless Earbuds", icon: Headphones, color: "bg-blue-100 text-blue-600", count: "45 reviews" },
    { name: "Gaming Keyboards", icon: Gamepad2, color: "bg-green-100 text-green-600", count: "32 reviews" },
    { name: "Smartwatches", icon: Watch, color: "bg-purple-100 text-purple-600", count: "28 reviews" },
    { name: "Action Cameras", icon: Camera, color: "bg-red-100 text-red-600", count: "22 reviews" },
    { name: "Phone Cases", icon: Smartphone, color: "bg-yellow-100 text-yellow-600", count: "38 reviews" },
    { name: "Power Banks", icon: Zap, color: "bg-orange-100 text-orange-600", count: "25 reviews" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Gamepad2 className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Accessories & Gadgets</h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Discover the best tech accessories and gadgets to enhance your digital lifestyle
            </p>
            <p className="text-lg text-purple-200 font-semibold mb-2">{totalCount} blog{totalCount !== 1 ? 's' : ''} in this category</p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search accessories and gadgets..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trending Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingCategories.map((category) => (
              <Link 
                key={category.name}
                href="#"
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* All Reviews (latest first) */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">All Reviews</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <OptimizedImage 
                      src={post.metadata.image || "/images/posts/default-gadgets.jpg"}
                      alt={post.metadata.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                      category="gadgets"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                          {post.metadata.category}
                        </span>
                        {/* No rating in metadata, skip or use a default if needed */}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
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
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories removed (was using undefined variable) */}

            {/* Top Rated Accessories */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Top Rated Accessories
              </h3>
              <div className="space-y-4">
                {topAccessories.map((accessory, index) => (
                  <div key={accessory.name} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <accessory.icon className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {accessory.name}
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="ml-1 text-xs text-gray-600">{accessory.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{accessory.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Gadget Weekly</h3>
              <p className="text-purple-100 mb-4">
                Get the latest accessory reviews and gadget news delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors">
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

