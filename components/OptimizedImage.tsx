'use client'
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { ImageUtils } from '../lib/image-utils';


interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  category?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  sizes,
  fill = false,
  style,
  category,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Memoize normalized src to prevent unnecessary recalculations
  const normalizedSrc = useMemo(() => {
    return src && typeof src === 'string' ? src.trim() : '';
  }, [src]);

  // Memoize fallback generation
  const fallbackSrc = useMemo(() => {
    try {
      // Use ImageUtils for fallback images
      let fallback = '';
      if (width && height) {
        fallback = ImageUtils.getResizedFallback(width, height, category);
      } else {
        fallback = ImageUtils.getFallbackByCategory(category);
      }
      
      return fallback && fallback.trim() ? fallback : ImageUtils.fallbackImages.article;
    } catch (error) {
      console.warn('OptimizedImage: Error getting fallback, using default', error);
      return ImageUtils.fallbackImages.article;
    }
  }, [width, height, category]);

  // Determine initial src
  const initialSrc = useMemo(() => {
    if (normalizedSrc && ImageUtils.isValidImageUrl(normalizedSrc)) {
      return normalizedSrc;
    }
    return fallbackSrc;
  }, [normalizedSrc, fallbackSrc]);

  // Set initial src when dependencies change
  useEffect(() => {
    if (initialSrc) {
      setCurrentSrc(initialSrc);
      setHasError(false);
      setLoading(true);
    }
  }, [initialSrc]);

  // Memoize blur data URL
  const defaultBlurDataURL = useMemo(() => {
    return ImageUtils.generateBlurDataURL();
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleError = () => {
    // Only try fallback if current src is not already the fallback
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setLoading(true);
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

  // Early return for error state
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  // Validate dimensions for non-fill images
  if (!fill && (!width || !height)) {
    console.warn('OptimizedImage: width and height are required when fill is false');
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || 400, height: height || 300, ...style }}
      >
        <span className="text-gray-500 text-sm">Invalid image dimensions</span>
      </div>
    );
  }

  // Final src validation
  const safeSrc = currentSrc || fallbackSrc;
  
  if (!safeSrc) {
    console.error('OptimizedImage: No valid image source available');
    return (
      <div
        className={`bg-red-100 border border-red-400 flex items-center justify-center ${className}`}
        style={{ width: width || 400, height: height || 300, ...style }}
      >
        <span className="text-red-500 text-sm">Image error</span>
      </div>
    );
  }

  const imageProps = {
    src: safeSrc,
    alt,
    className: `transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    } ${className}`,
    onLoad: handleLoadingComplete,
    onError: handleError,
    priority,
    quality,
    placeholder,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? defaultBlurDataURL : undefined),
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style,
    ...props,
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return <Image {...imageProps} width={width!} height={height!} />;
};

export default OptimizedImage;