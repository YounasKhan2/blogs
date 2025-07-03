import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '../../../lib/posts';
import { ArticleAd, SidebarAd } from '../../../components/AdSenseWrapper';
import { generatePostMetadata } from '../../../lib/seo';
import { StructuredDataScript } from '../../../lib/seo/components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Professional SEO metadata will be handled by our SEO system
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
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b">
                <div className="mb-4">
                  <Link
                    href={`/categories/${post.metadata.categorySlug}`}
                    className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {post.metadata.category}
                  </Link>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.metadata.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {post.metadata.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>By {post.metadata.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(post.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{post.readingTime.text}</span>
                  </div>
                  {post.metadata.difficulty && (
                    <div className="flex items-center space-x-2">
                      <Tag size={16} />
                      <span>{post.metadata.difficulty}</span>
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
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-96 object-cover object-center"
                    priority
                  />
                </div>
              )}

              {/* Article Ad */}
              <div className="p-6 bg-gray-50">
                <ArticleAd />
              </div>

              {/* Content */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
                    prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-4 prose-ol:my-4
                    prose-li:text-gray-700 prose-li:my-1
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                    prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4
                    prose-table:w-full prose-table:border-collapse
                    prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-2
                    prose-td:border prose-td:border-gray-300 prose-td:p-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.metadata.tags.length > 0 && (
                <div className="px-8 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="px-8 pb-8">
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.slug}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="relative">
                        {/* Replace with Next.js <Image> or your preferred image component */}
                          src={relatedPost.metadata.image || "/images/posts/default-tech.jpg"}
                          alt={relatedPost.metadata.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          category={relatedPost.metadata.category}
                       
                        <div className="absolute top-4 left-4">
                          <Link
                            href={`/categories/${relatedPost.metadata.categorySlug}`}
                            className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {relatedPost.metadata.category}
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link href={`/posts/${relatedPost.slug}`}>
                            {relatedPost.metadata.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedPost.metadata.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.metadata.author}</span>
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
            <div className="sticky top-8 space-y-8">
              {/* Sidebar Ad */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <SidebarAd />
              </div>

              {/* Table of Contents (if needed) */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <div className="space-y-2">
                  <Link
                    href="/categories"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Browse Categories
                  </Link>
                  <Link
                    href="/tech-reviews"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    All Reviews
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest tech reviews delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="younaskk120@gmail.com"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                  <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
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