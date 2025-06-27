'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Star, Clock, TrendingUp, Settings, Download, Shield, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';
import { getAllPosts, getPostsByCategory } from '@/lib/contentlayer';

export default function SoftwareReviews() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Software']);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all software review posts from Contentlayer
  const softwareReviewPosts = useMemo(() => {
    return getPostsByCategory('software-reviews').map(post => ({
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category === 'Software Reviews' ? 'Software Reviews' : post.category,
      readTime: post.readingTime?.text || '5 min read',
      rating: post.rating || 4.0,
      date: new Date(post.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      featured: post.featured || false,
      slug: post.slug,
      tags: post.tags || []
    }));
  }, []);

  // Combine real posts with static demo posts for categories that might not have enough content
  const staticDemoPosts = [
    {
      id: 'demo-office-365',
      title: "Microsoft Office 365 vs Google Workspace 2025: Complete Business Suite Comparison",
      excerpt: "Which office suite offers better value for businesses and individual professionals in 2025?",
      image: "/api/placeholder/300/200",
      category: "Productivity",
      readTime: "9 min read",
      rating: 4.3,
      date: "2025-01-03",
      featured: false,
      slug: 'microsoft-office-365-vs-google-workspace-2025',
      tags: ['Microsoft', 'Google', 'Productivity']
    },
    {
      id: 'demo-figma-design',
      title: "Figma vs Adobe XD vs Sketch: UI/UX Design Tool Battle 2025",
      excerpt: "Which design tool is better for creating user interfaces, prototypes, and design systems?",
      image: "/api/placeholder/300/200",
      category: "Design Software",
      readTime: "7 min read",
      rating: 4.6,
      date: "2025-01-01",
      featured: false,
      slug: 'figma-vs-adobe-xd-vs-sketch-2025',
      tags: ['Figma', 'Adobe XD', 'Sketch', 'Design']
    },
    {
      id: 'demo-password-managers',
      title: "Best Password Managers 2025: 1Password vs Bitwarden vs Dashlane",
      excerpt: "Keep your accounts secure with these top-rated password management solutions and their latest features.",
      image: "/api/placeholder/300/200",
      category: "Security",
      readTime: "9 min read",
      rating: 4.8,
      date: "2024-12-28",
      featured: false,
      slug: 'best-password-managers-2025',
      tags: ['1Password', 'Bitwarden', 'Dashlane', 'Security']
    },
    {
      id: 'demo-communication',
      title: "Slack vs Microsoft Teams vs Discord: Team Communication Platform Review",
      excerpt: "Compare features, pricing, and usability of the leading team communication and collaboration tools.",
      image: "/api/placeholder/300/200",
      category: "Communication",
      readTime: "8 min read",
      rating: 4.1,
      date: "2024-12-25",
      featured: false,
      slug: 'slack-vs-teams-vs-discord-2025',
      tags: ['Slack', 'Teams', 'Discord', 'Communication']
    },
    {
      id: 'demo-antivirus',
      title: "Bitdefender vs Norton vs Kaspersky: Best Antivirus Software 2025",
      excerpt: "Protect your devices with comprehensive reviews of the top-rated antivirus and internet security solutions.",
      image: "/api/placeholder/300/200",
      category: "Security",
      readTime: "11 min read",
      rating: 4.4,
      date: "2024-12-22",
      featured: false,
      slug: 'best-antivirus-software-2025',
      tags: ['Bitdefender', 'Norton', 'Kaspersky', 'Security']
    },
    {
      id: 'demo-code-editors',
      title: "Visual Studio Code vs JetBrains vs Sublime Text: Code Editor Comparison",
      excerpt: "Which code editor and IDE offers the best features, performance, and value for developers in 2025?",
      image: "/api/placeholder/300/200",
      category: "Development",
      readTime: "10 min read",
      rating: 4.5,
      date: "2024-12-20",
      featured: false,
      slug: 'best-code-editors-2025',
      tags: ['VS Code', 'JetBrains', 'Sublime', 'Development']
    }
  ];

  // Filter out static posts that might conflict with real posts
  const filteredStaticPosts = staticDemoPosts.filter(staticPost => 
    !softwareReviewPosts.some(realPost => 
      realPost.slug === staticPost.slug || 
      realPost.title.toLowerCase().includes(staticPost.title.toLowerCase().substring(0, 20))
    )
  );
  // Combine all posts for filtering
  const allPosts = useMemo(() => {
    return [...softwareReviewPosts, ...filteredStaticPosts].sort((a, b) => {
      // Sort by featured first, then by date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [softwareReviewPosts, filteredStaticPosts]);

  // Extract featured posts (real + demo)
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 3);

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

  // Calculate dynamic category counts and improve categorization
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    
    allPosts.forEach(post => {
      // Standardize category names for better organization
      let category = post.category;
      
      // Map broader categories for software reviews
      if (category === 'Software Reviews') {
        // Try to subcategorize based on tags or title
        const title = post.title.toLowerCase();
        const tags = (post.tags || []) as string[];
        
        if (title.includes('photoshop') || title.includes('design') || tags.some((tag: string) => 
          ['design', 'photoshop', 'figma', 'sketch', 'adobe xd'].includes(tag.toLowerCase()))) {
          category = 'Design Software';
        } else if (title.includes('notion') || title.includes('productivity') || tags.some((tag: string) => 
          ['productivity', 'notion', 'obsidian', 'office'].includes(tag.toLowerCase()))) {
          category = 'Productivity';
        } else if (title.includes('video') || title.includes('editing') || tags.some((tag: string) => 
          ['video editing', 'davinci resolve', 'premiere pro'].includes(tag.toLowerCase()))) {
          category = 'Video Editing';
        } else {
          category = 'Software Reviews'; // Keep as general if can't categorize
        }
      }
      
      counts[category] = (counts[category] || 0) + 1;
    });
    
    const result: { [key: string]: number } = {
      'All Software': allPosts.length,
      ...counts
    };
    
    return result;
  }, [allPosts]);

  // Available categories based on actual posts, organized logically
  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(allPosts.map(post => {
      let category = post.category;
      
      // Apply same categorization logic as above
      if (category === 'Software Reviews') {
        const title = post.title.toLowerCase();
        const tags = (post.tags || []) as string[];
        
        if (title.includes('photoshop') || title.includes('design') || tags.some((tag: string) => 
          ['design', 'photoshop', 'figma', 'sketch', 'adobe xd'].includes(tag.toLowerCase()))) {
          category = 'Design Software';
        } else if (title.includes('notion') || title.includes('productivity') || tags.some((tag: string) => 
          ['productivity', 'notion', 'obsidian', 'office'].includes(tag.toLowerCase()))) {
          category = 'Productivity';
        } else if (title.includes('video') || title.includes('editing') || tags.some((tag: string) => 
          ['video editing', 'davinci resolve', 'premiere pro'].includes(tag.toLowerCase()))) {
          category = 'Video Editing';
        }
      }
      
      return category;
    }))).sort();
    
    return ['All Software', ...categories];
  }, [allPosts]);

  // Filter posts based on selected categories and search
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;
    
    // Filter by categories
    if (!selectedCategories.includes('All Software')) {
      filtered = filtered.filter(post => {
        let category = post.category;
        
        // Apply same categorization logic for filtering
        if (category === 'Software Reviews') {
          const title = post.title.toLowerCase();
          const tags = (post.tags || []) as string[];
          
          if (title.includes('photoshop') || title.includes('design') || tags.some((tag: string) => 
            ['design', 'photoshop', 'figma', 'sketch', 'adobe xd'].includes(tag.toLowerCase()))) {
            category = 'Design Software';
          } else if (title.includes('notion') || title.includes('productivity') || tags.some((tag: string) => 
            ['productivity', 'notion', 'obsidian', 'office'].includes(tag.toLowerCase()))) {
            category = 'Productivity';
          } else if (title.includes('video') || title.includes('editing') || tags.some((tag: string) => 
            ['video editing', 'davinci resolve', 'premiere pro'].includes(tag.toLowerCase()))) {
            category = 'Video Editing';
          }
        }
        
        return selectedCategories.includes(category);
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags || []).some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [allPosts, selectedCategories, searchQuery]);

  // Handle category checkbox changes
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (categoryName === 'All Software') {
        return ['All Software'];
      }
      
      const newCategories = prev.filter(cat => cat !== 'All Software');
      
      if (prev.includes(categoryName)) {
        const updated = newCategories.filter(cat => cat !== categoryName);
        return updated.length === 0 ? ['All Software'] : updated;
      } else {
        return [...newCategories, categoryName];
      }
    });
  };

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedCategories.includes('All Software') ? 'Featured Reviews' : `${selectedCategories.join(', ')} Reviews`}
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
                    {searchQuery ? `No reviews found for "${searchQuery}"` : 'No reviews found for the selected categories.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories(['All Software']);
                      setSearchQuery('');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-8">
                  {filteredPosts.slice(0, 3).map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Image 
                            src={post.image} 
                            alt={post.title}
                            width={400}
                            height={300}
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
                            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
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
                    <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        width={400}
                        height={200}
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
                          <Link href={`/posts/${post.slug}`} className="line-clamp-2">{post.title}</Link>
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
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories with Checkboxes */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Filter by Category
              </h3>
              <div className="space-y-3">
                {availableCategories.map((category) => (
                  <label 
                    key={category}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="font-medium text-gray-700">{category}</span>
                    </div>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {categoryCounts[category] || 0}
                    </span>
                  </label>
                ))}
              </div>
              
              {/* Show active filters */}
              {!selectedCategories.includes('All Software') && selectedCategories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Active filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <span 
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className="ml-1 h-3 w-3 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Results count */}
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
