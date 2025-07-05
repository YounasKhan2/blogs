"use client";
import React from 'react';
import { Copy } from 'lucide-react';
import { generateSocialShareURLs } from '../lib/seo/seo-utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const platforms = [
  { name: 'Twitter', key: 'twitter', color: 'bg-blue-400' },
  { name: 'Facebook', key: 'facebook', color: 'bg-blue-700' },
  { name: 'LinkedIn', key: 'linkedin', color: 'bg-blue-600' },
  { name: 'Reddit', key: 'reddit', color: 'bg-orange-500' },
  { name: 'WhatsApp', key: 'whatsapp', color: 'bg-green-500' },
  { name: 'Telegram', key: 'telegram', color: 'bg-blue-500' },
  { name: 'Email', key: 'email', color: 'bg-gray-600' },
];

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  const shareUrls = generateSocialShareURLs(url, title, description);

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {platforms.map((platform) => (
        <a
          key={platform.key}
          href={shareUrls[platform.key as keyof typeof shareUrls]}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-3 py-2 text-white rounded-lg font-medium text-sm ${platform.color} hover:opacity-80 transition`}
        >
          {platform.name}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="inline-flex items-center px-3 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium text-sm hover:bg-gray-400 transition"
        title="Copy link to clipboard"
      >
        <Copy size={16} className="mr-1" /> Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
