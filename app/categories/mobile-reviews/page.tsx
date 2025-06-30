
import Link from 'next/link';
import Image from 'next/image';
import AdSense, { SidebarAd, ArticleAd } from '../../../components/AdSense';
import { Clock, User, ChevronRight, Smartphone, Star, Filter, TrendingUp, Search } from 'lucide-react';
import { getPostsByCategory } from '@/lib/posts';

// Server component: fetch posts at the top level
export default async function MobileReviews() {
  // Get all posts and total count using consistent logic
  const posts = getPostsByCategory('mobile-reviews').sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
  const totalCount = posts.length;

  const popularPhones = [
    { name: "iPhone 15 Pro Max", rating: 4.5, reviews: 23 },
    { name: "Samsung Galaxy S24 Ultra", rating: 4.4, reviews: 18 },
    { name: "Google Pixel 8 Pro", rating: 4.3, reviews: 15 },
    { name: "OnePlus 12", rating: 4.2, reviews: 12 },
    { name: "Xiaomi 14 Ultra", rating: 4.4, reviews: 8 }
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
            <span>Mobile Reviews</span>
          </nav>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Mobile Reviews
              </h1>
              <p className="text-gray-600">{totalCount} smartphone review{totalCount !== 1 ? 's' : ''} and counting</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            Comprehensive smartphone reviews, detailed comparisons, and expert buying guides. 
            From flagship iPhones to budget Android devices, we test every phone thoroughly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            {/* Filters and search removed for server component version */}

            {/* All Reviews Grid (latest first) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {post.metadata.image && (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                      priority
                      placeholder="empty"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.metadata.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.metadata.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{post.metadata.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        Read More
                        <ChevronRight className="ml-1" size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* AdSense - Article Ad */}
            <ArticleAd />

            {/* Show message if no reviews found */}
            {posts.length === 0 && (
              <div className="text-center py-12">
                <Smartphone className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No reviews found</h3>
                <p className="text-gray-500">No mobile reviews are available at this time.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Phones */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="mr-2 text-blue-600" size={24} />
                Popular Phones
              </h3>
              <div className="space-y-4">
                {popularPhones.map((phone, index) => (
                  <div key={phone.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{phone.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-2">
                          {renderStars(phone.rating)}
                        </div>
                        <span>({phone.reviews} reviews)</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AdSense - Sidebar Ad */}
            <SidebarAd />

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Mobile Updates</h3>
              <p className="text-blue-100 mb-4">
                Get the latest smartphone reviews and mobile tech news delivered weekly.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
              />
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
