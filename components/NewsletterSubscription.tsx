'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeUser } from '@/lib/firebase';

interface NewsletterSubscriptionProps {
  variant?: 'inline' | 'modal' | 'footer';
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ 
  variant = 'inline',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const emailToUse = email || user?.email || '';
      const nameToUse = name || user?.displayName || '';
      
      if (!emailToUse) {
        throw new Error('Email is required');
      }

      await subscribeUser(
        emailToUse,
        nameToUse,
        user?.uid,
        {
          categories: ['all'],
          frequency: 'weekly'
        }
      );

      setStatus('success');
      setMessage('Successfully subscribed to our newsletter!');
      setEmail('');
      setName('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  const isCompact = variant === 'footer';
  const isModal = variant === 'modal';

  if (status === 'success') {
    return (
      <div className={`p-6 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <h3 className="font-semibold text-green-800">Subscription Successful!</h3>
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isModal ? 'p-6' : isCompact ? 'p-4' : 'p-6'} ${className}`}>
      <div className="text-center mb-4">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Mail className="text-blue-600" size={24} />
          </div>
        </div>
        <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-2`}>
          Stay Updated with Tech News
        </h3>
        <p className={`text-gray-600 ${isCompact ? 'text-sm' : 'text-base'}`}>
          Get the latest tech reviews, AI news, and gadget updates delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!user && (
          <>
            <div>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Subscribing as:</strong> {user.displayName || 'User'} ({user.email})
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isCompact ? 'text-sm' : 'text-base'
          }`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By subscribing, you agree to our privacy policy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
