'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Smartphone, Laptop, Brain, Settings, Gamepad2, BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, signOutUser } from '@/lib/firebase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/tech-reviews', label: 'Tech Reviews' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  const categoryItems = [
    { href: '/categories/mobile-reviews', label: 'Mobile Reviews', icon: Smartphone },
    { href: '/categories/laptop-reviews', label: 'Laptop Reviews', icon: Laptop },
    { href: '/categories/ai', label: 'AI', icon: Brain },
    { href: '/categories/software-reviews', label: 'Software Reviews', icon: Settings },
    { href: '/categories/accessories-gadgets', label: 'Accessories & Gadgets', icon: Gamepad2 },
    { href: '/categories/how-to', label: 'How-to Guides', icon: BookOpen }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechBlog Pro</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Latest Tech Reviews & News</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search, Auth and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Authentication */}
            {!loading && (
              <div className="relative">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {user.displayName || 'User'}
                      </span>
                    </button>
                    
                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center justify-center border-t border-gray-200 py-3">
          <div className="flex items-center space-x-6">
            {categoryItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <IconComponent size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-3">
                  {categoryItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <IconComponent size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for tech reviews, news, and articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
