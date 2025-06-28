// Utility for image fallbacks and error handling
export const ImageUtils = {
  // Default fallback images for different contexts (all local)
  fallbackImages: {
    article: "/images/posts/default-article.jpg",
    avatar: "/images/posts/default-avatar.jpg", 
    tech: "/images/posts/default-tech.jpg",
    mobile: "/images/posts/default-mobile.jpg",
    laptop: "/images/posts/default-laptop.jpg",
    ai: "/images/posts/default-ai.jpg",
    software: "/images/posts/default-software.jpg",
    gadgets: "/images/posts/default-gadgets.jpg",
    howto: "/images/posts/default-howto.jpg",
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

  // Get resized fallback image (note: since we're using local images, this returns the base URL)
  getResizedFallback(width: number, height: number, category?: string): string {
    return this.getFallbackByCategory(category);
  },

  // Check if an image URL is valid
  isValidImageUrl(url?: string): boolean {
    if (!url || typeof url !== 'string') return false;
    const trimmedUrl = url.trim();
    if (!trimmedUrl || trimmedUrl.length === 0) return false;
    // Reject placeholder-like URLs
    if (trimmedUrl.includes('placeholder') || trimmedUrl.includes('dummyimage')) return false;
    return trimmedUrl.startsWith('http') || trimmedUrl.startsWith('/');
  },

  // Generate blur data URL for placeholder
  generateBlurDataURL(): string {
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7XBHB1JVG4KN2xrJNNTddTF3JJEJSvtFP40lSIbO0/I5APy5K/Dw7eaxR5oPCNqByNNS7SZKh0vqTJlWzE7MxBYQKmjLJ1kcvWJKJJDj2kheeNnbyj7R9ooPeD1aqGv2tHnz8j8PSh+6pbj/MnKKCuCCsS/PB4Ux5iB8rFacTttlQrLNgJNQZNTtyNt6gOJCCqN8cEYxkK8k7QI9qJQ0KWsKZF2KKK3YOJLGvHlmfPlfk=';
  }
};
