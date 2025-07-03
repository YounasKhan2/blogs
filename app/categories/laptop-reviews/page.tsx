import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Star, Clock, TrendingUp, Laptop, User, ChevronRight } from 'lucide-react';
import { getPostsByCategory } from '@/lib/posts';
import { generateCategoryMetadata } from '../../../lib/seo';
import { StructuredDataScript } from '../../../lib/seo/components';

export const generateMetadata = async () => {
  return generateCategoryMetadata('Laptop Reviews', 'In-depth laptop reviews, comparisons, and buying guides for all users.');
};

export default async function LaptopReviews() {
  // Get all posts and total count using consistent logic
  const posts = getPostsByCategory('laptop-reviews').sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
  const totalCount = posts.length;

  const popularLaptops = [
    { name: "MacBook Pro 14 (M4)", rating: 4.8, reviews: 32 },
    { name: "Dell XPS 15 2025", rating: 4.7, reviews: 27 },
    { name: "ASUS ROG Zephyrus G16", rating: 4.6, reviews: 21 },
    { name: "HP Spectre x360 16", rating: 4.5, reviews: 18 },
    { name: "Lenovo Yoga 9i", rating: 4.4, reviews: 15 }
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
      {/* SEO Structured Data */}
      <StructuredDataScript schemas={[
        { type: 'organization', data: {} }
      ]} />
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
              <p className="text-gray-600">{totalCount} comprehensive laptop review{totalCount !== 1 ? 's' : ''}</p>
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
            {/* Filters and Search */}
            {/* Filters and search removed for server component version */}

            {/* All Reviews (latest first) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/posts/${post.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {post.metadata.image && (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover object-center"
                      priority
                      placeholder="empty"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.metadata.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.metadata.excerpt}
                    </p>
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
                      {post.metadata.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results Message */}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <Laptop className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No laptop reviews found</h3>
                <p className="text-gray-500">No laptop reviews are available at this time.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Laptops */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Popular Laptops
              </h3>
              <div className="space-y-4">
                {popularLaptops.map((laptop, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{laptop.name}</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(laptop.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          ({laptop.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Laptop Weekly</h3>
              <p className="text-purple-100 mb-4">
                Get the latest laptop reviews and tech news delivered to your inbox.
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