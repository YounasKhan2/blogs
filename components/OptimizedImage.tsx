import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  category?: string; // For intelligent fallback selection
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

  // Generate appropriate fallback image
  const getFallbackSrc = () => {
    if (width && height) {
      return ImageUtils.getResizedFallback(width, height, category);
    }
    return ImageUtils.getFallbackByCategory(category);
  };

  // Determine the initial src to use
  const getInitialSrc = () => {
    if (src && ImageUtils.isValidImageUrl(src)) {
      return src;
    }
    return getFallbackSrc();
  };

  // Set initial src when component mounts or src changes
  useEffect(() => {
    const newSrc = getInitialSrc();
    setCurrentSrc(newSrc);
    setHasError(false);
    setLoading(true);
  }, [src, width, height, category]);

  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL = ImageUtils.generateBlurDataURL();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleError = () => {
    // If the current src fails and it's not already a fallback, try the fallback
    if (currentSrc !== getFallbackSrc()) {
      const fallbackSrc = getFallbackSrc();
      setCurrentSrc(fallbackSrc);
      setHasError(false); // Reset error state
      setLoading(true);   // Show loading again
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

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

  const imageProps = {
    src: currentSrc, // Use the computed currentSrc instead of original src
    alt,
    className: `transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    } ${className}`,
    onLoad: handleLoadingComplete,
    onError: handleError,
    priority,
    quality,
    placeholder: placeholder as any,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? defaultBlurDataURL : undefined),
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style,
    ...props,
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return <Image {...imageProps} width={width} height={height} />;
};

export default OptimizedImage;
