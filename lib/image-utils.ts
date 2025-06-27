// Utility for image fallbacks and error handling
export const ImageUtils = {
  // Default fallback images for different contexts
  fallbackImages: {
    article: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format&q=80",
    tech: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&auto=format&q=80",
    mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&auto=format&q=80",
    laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format&q=80",
    ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=80",
    software: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format&q=80",
    gadgets: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop&auto=format&q=80",
    howto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format&q=80",
  },

  // Get fallback image by category
  getFallbackByCategory(category?: string): string {
    if (!category) return this.fallbackImages.article;
    
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('mobile') || categoryLower.includes('phone')) {
      return this.fallbackImages.mobile;
    }
    if (categoryLower.includes('laptop') || categoryLower.includes('computer')) {
      return this.fallbackImages.laptop;
    }
    if (categoryLower.includes('ai') || categoryLower.includes('artificial')) {
      return this.fallbackImages.ai;
    }
    if (categoryLower.includes('software') || categoryLower.includes('app')) {
      return this.fallbackImages.software;
    }
    if (categoryLower.includes('gadget') || categoryLower.includes('accessory')) {
      return this.fallbackImages.gadgets;
    }
    if (categoryLower.includes('how') || categoryLower.includes('guide') || categoryLower.includes('tutorial')) {
      return this.fallbackImages.howto;
    }
    
    return this.fallbackImages.tech;
  },

  // Get resized fallback image
  getResizedFallback(width: number, height: number, category?: string): string {
    const baseUrl = this.getFallbackByCategory(category);
    return baseUrl.replace(/w=\d+&h=\d+/, `w=${width}&h=${height}`);
  },

  // Check if an image URL is valid
  isValidImageUrl(url?: string): boolean {
    if (!url) return false;
    return url.startsWith('http') || url.startsWith('/');
  },

  // Generate blur data URL for placeholder
  generateBlurDataURL(): string {
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7XBHB1JVG4KN2xrJNNTddTF3JJEJSvtFP40lSIbO0/I5APy5K/Dw7eaxR5oPCNqByNNS7SZKh0vqTJlWzE7MxBYQKmjLJ1kcvWJKJJDj2kheeNnbyj7R9ooPeD1aqGv2tHnz8j8PSh+6pbj/MnKKCuCCsS/PB4Ux5iB8rFacTttlQrLNgJNQZNTtyNt6gOJCCqN8cEYxkK8k7QI9qJQ0KWsKZF2KKK3YOJLGvHlmfPlfk=';
  }
};
