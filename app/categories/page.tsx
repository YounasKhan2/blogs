import Link from 'next/link';
import { Smartphone, Laptop, Brain, Settings, Gamepad2, Monitor, Headphones, Camera, Watch, Tablet, BookOpen } from 'lucide-react';
import { generateCategoryMetadata } from '../../lib/seo';
import { StructuredDataScript } from '../../lib/seo/components';

export const generateMetadata = async () => {
  return generateCategoryMetadata('Categories', 'Browse all tech review categories on TechBlog Pro.');
};

export default function Categories() {
  const mainCategories = [
    {
      name: "Mobile Reviews",
      slug: "mobile-reviews",
      icon: Smartphone,
      count: 145,
      description: "Comprehensive smartphone reviews, comparisons, and buying guides",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      recent: [
        "iPhone 15 Pro Max Review",
        "Samsung Galaxy S24 Ultra vs iPhone 15 Pro Max",
        "Google Pixel 8 Pro Camera Test"
      ]
    },
    {
      name: "Laptop Reviews",
      slug: "laptop-reviews",
      icon: Laptop,
      count: 98,
      description: "In-depth laptop reviews for gaming, work, and everyday use",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      recent: [
        "MacBook Pro M3 vs Dell XPS 15",
        "Best Gaming Laptops Under $1500",
        "Microsoft Surface Laptop Studio 2 Review"
      ]
    },
    {
      name: "AI Technology",
      slug: "ai",
      icon: Brain,
      count: 76,
      description: "Latest AI tools, language models, and artificial intelligence news",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      recent: [
        "ChatGPT-4 vs Claude 3 Comparison",
        "Best AI Writing Tools 2025",
        "Google Gemini Pro Review"
      ]
    },
    {
      name: "Software Reviews",
      slug: "software-reviews",
      icon: Settings,
      count: 134,
      description: "Software applications, productivity tools, and app reviews",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      recent: [
        "Adobe Photoshop 2025 New Features",
        "Microsoft Office vs Google Workspace",
        "Best Video Editing Software 2025"
      ]
    },
    {
      name: "Accessories & Gadgets",
      slug: "accessories-gadgets",
      icon: Gamepad2,
      count: 187,
      description: "Tech accessories, gadgets, and peripheral device reviews",
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      recent: [
        "Best Gaming Headsets Under $200",
        "Wireless Charging Pad Comparison",
        "Top Smart Home Devices 2025"
      ]
    },
    {
      name: "How-to Guides",
      slug: "how-to",
      icon: BookOpen,
      count: 89,
      description: "Step-by-step tutorials, tips, and tech troubleshooting guides",
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      recent: [
        "How to Speed Up Your Computer",
        "Setting Up a Home Network Guide",
        "Troubleshooting Common Windows Issues"
      ]
    }
  ];

  const subCategories = [
    {
      name: "Gaming Hardware",
      slug: "gaming-hardware",
      icon: Monitor,
      count: 54,
      description: "Graphics cards, gaming monitors, and PC components"
    },
    {
      name: "Audio Equipment",
      slug: "audio-equipment",
      icon: Headphones,
      count: 89,
      description: "Headphones, speakers, and audio gear reviews"
    },
    {
      name: "Photography Gear",
      slug: "photography-gear",
      icon: Camera,
      count: 43,
      description: "Cameras, lenses, and photography equipment"
    },
    {
      name: "Wearable Tech",
      slug: "wearable-tech",
      icon: Watch,
      count: 67,
      description: "Smartwatches, fitness trackers, and wearables"
    },
    {
      name: "Tablets & E-readers",
      slug: "tablets-ereaders",
      icon: Tablet,
      count: 38,
      description: "iPad, Android tablets, and e-reader reviews"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* SEO Structured Data */}
      <StructuredDataScript schemas={[
        { type: 'organization', data: {} }
      ]} />
      {/* Header */}
      <div className="mb-12">
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">&gt;</span>
          <span>Categories</span>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Browse by Category
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore our extensive collection of tech reviews organized by categories. 
          Find exactly what you're looking for, from smartphone reviews to software analysis.
        </p>
      </div>

      {/* Main Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Main Categories</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.slug}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                        <p className="text-white/90">{category.count} articles</p>
                      </div>
                    </div>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Recent Articles:</h4>
                    {category.recent.map((article, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{article}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`inline-flex items-center space-x-2 mt-6 ${category.textColor} font-medium hover:underline`}
                  >
                    <span>View all {category.name.toLowerCase()}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sub Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Specialized Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <IconComponent className="text-gray-600 group-hover:text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 mb-1">
                      {category.name}
                    </h3>
                    <span className="text-sm text-gray-500">{category.count} articles</span>
                  </div>
                </div>
                
                <p className="text-gray-600 group-hover:text-gray-700 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-medium">Explore Category</span>
                  <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Tags */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Tags</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-wrap gap-3">
            {[
              'iPhone', 'MacBook', 'Android', 'Windows', 'Gaming', 'Productivity',
              'Photography', 'Video Editing', 'AI Tools', 'Smart Home', 'Wireless',
              'Budget Tech', 'Premium', 'Comparison', 'Buying Guide', 'Tips & Tricks',
              'News', 'Rumors', 'Leaks', '5G', 'Battery Life', 'Performance',
              'Design', 'Camera', 'Display', 'Audio'
            ].map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Use our search feature to find specific reviews, or contact us with suggestions for new content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Search Reviews
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
