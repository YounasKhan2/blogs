import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '../../../lib/posts';
import { ArticleAd, SidebarAd } from '../../../components/AdSenseWrapper';
import { generatePostMetadata } from '../../../lib/seo';
import { StructuredDataScript } from '../../../lib/seo/components';
import PostCommentsClient from '../../../components/PostCommentsClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found | TechBlog Pro',
    };
  }
  return generatePostMetadata(post);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
    
  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedPosts(slug, 3);
  
  return (
    <>
      <StructuredDataScript schemas={[
        { type: 'organization', data: {} },
        { type: 'article', data: {
          title: post.metadata.title,
          description: post.metadata.excerpt,
          author: post.metadata.author,
          publishedTime: post.metadata.date,
          modifiedTime: new Date().toISOString(),
          image: post.metadata.image,
          tags: post.metadata.tags,
          category: post.metadata.category,
          slug: post.slug,
        } }
      ]} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Link>
          </div>
        </div>
                
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
                {/* Header */}
                <div className="p-6 sm:p-8 lg:p-10 border-b border-gray-100">
                  <div className="mb-6">
                    <Link
                      href={`/categories/${post.metadata.categorySlug}`}
                      className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {post.metadata.category}
                    </Link>
                  </div>
                                
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    {post.metadata.title}
                  </h1>
                                
                  <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl">
                    {post.metadata.excerpt}
                  </p>
                
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400 dark:text-gray-300" />
                      <span className="font-medium">By {post.metadata.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400 dark:text-gray-300" />
                      <span>{new Date(post.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400 dark:text-gray-300" />
                      <span>{post.readingTime.text}</span>
                    </div>
                    {post.metadata.difficulty && (
                      <div className="flex items-center space-x-2">
                        <Tag size={16} className="text-gray-400 dark:text-gray-300" />
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
                          {post.metadata.difficulty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Featured Image */}
                {post.metadata.image && post.metadata.image.trim() && (
                  <div className="relative">
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={1200}
                      height={600}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center"
                      priority
                    />
                  </div>
                )}
                
                {/* Article Ad */}
                <div className="p-6 bg-gray-50/50">
                  <ArticleAd />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div
                    className="prose prose-lg sm:prose-xl max-w-none
                      prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                      prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                      prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
                      prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
                      prose-h4:text-base sm:prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                      prose-p:text-black prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base sm:prose-p:text-lg
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:my-6 prose-ol:my-6 prose-ul:space-y-2 prose-ol:space-y-2
                      prose-li:text-black prose-li:leading-relaxed prose-li:text-base sm:prose-li:text-lg
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                      prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-sm
                      prose-table:w-full prose-table:border-collapse prose-table:my-8
                      prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                      prose-td:border prose-td:border-gray-300 prose-td:p-3 prose-td:text-black
                      prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                      first:prose-p:text-xl first:prose-p:font-medium first:prose-p:text-black"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                {/* Comments */}
                <PostCommentsClient />
                {/* Tags */}
                {post.metadata.tags.length > 0 && (
                  <div className="px-6 sm:px-8 lg:px-10 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Share */}
                <div className="px-6 sm:px-8 lg:px-10 pb-8">
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <article
                        key={relatedPost.slug}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 group"
                      >
                        <div className="relative">
                          <Image
                            src={relatedPost.metadata.image || "/images/posts/default-tech.jpg"}
                            alt={relatedPost.metadata.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Link
                              href={`/categories/${relatedPost.metadata.categorySlug}`}
                              className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors"
                            >
                              {relatedPost.metadata.category}
                            </Link>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors leading-tight">
                            <Link href={`/posts/${relatedPost.slug}`}>
                              {relatedPost.metadata.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                            {relatedPost.metadata.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-medium">{relatedPost.metadata.author}</span>
                            <span>{relatedPost.readingTime.text}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Sidebar Ad */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                  <SidebarAd />
                </div>
                
                {/* Table of Contents */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                  <div className="space-y-3">
                    <Link
                      href="/categories"
                      className="block text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      Browse Categories
                    </Link>
                    <Link
                      href="/tech-reviews"
                      className="block text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      All Reviews
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    Get the latest tech reviews delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
                    />
                    <button className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}