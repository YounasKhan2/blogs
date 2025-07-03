import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ChevronRight, Search, Calendar } from 'lucide-react';
import { getAllPosts, getAllCategories, getPostsByCategory } from '@/lib/posts';
import { generateStaticPageMetadata } from '../../lib/seo';
import { StructuredDataScript } from '../../lib/seo/components';

export const generateMetadata = async () => {
  return generateStaticPageMetadata(
    'Tech Reviews',
    'Explore in-depth tech reviews, comparisons, and buying guides from TechBlog Pro.'
  );
};

export default function TechReviews() {
  // Fetch all categories and posts grouped by category
  const categories = getAllCategories();

  // Optionally, feature the most recent post from any category as a global featured post
  let featuredPost = null;
  let firstCategoryWithPosts = categories.find(cat => getPostsByCategory(cat.slug).length > 0);
  if (firstCategoryWithPosts) {
    const posts = getPostsByCategory(firstCategoryWithPosts.slug);
    featuredPost = posts[0];
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };




  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* SEO Structured Data */}
      <StructuredDataScript schemas={[
        { type: 'organization', data: {} },
        { type: 'website', data: {} }
      ]} />
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

        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                {featuredPost.metadata.image && (
                  <Image
                    src={featuredPost.metadata.image}
                    alt={featuredPost.metadata.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover object-center"
                    priority
                    placeholder="empty"
                  />
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured Review
                  </span>
                  <Link
                    href={`/categories/${featuredPost.metadata.categorySlug}`}
                    className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {featuredPost.metadata.category}
                  </Link>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/posts/${featuredPost.slug}`}>
                    {featuredPost.metadata.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredPost.metadata.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{featuredPost.metadata.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{formatDate(featuredPost.metadata.date)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    Read Review
                    <ChevronRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* All Categories Grid */}
        <div className="space-y-16">
          {categories.map((category) => {
            const posts = getPostsByCategory(category.slug);
            if (posts.length === 0) return null;
            return (
              <section key={category.slug}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {category.name} <span className="text-base font-normal text-gray-500">({category.count})</span>
                  </h2>
                  <Link href={`/categories/${category.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold">View All →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="relative">
                        {post.metadata.image && (
                          <Image
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover object-center"
                            priority
                            placeholder="empty"
                          />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.metadata.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link href={`/posts/${post.slug}`}>
                            {post.metadata.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.metadata.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User size={16} />
                              <span>{post.metadata.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={16} />
                              <span>{post.readingTime.text}</span>
                            </div>
                          </div>
                          <span>{formatDate(post.metadata.date)}</span>
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
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
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* No Results Message */}
        {categories.every(cat => getPostsByCategory(cat.slug).length === 0) && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tech reviews found</h3>
            <p className="text-gray-500">
              No reviews found in any category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
