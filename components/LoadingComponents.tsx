import { Suspense } from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'image' | 'list';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ 
  type = 'card', 
  count = 1, 
  className = '' 
}: LoadingSkeletonProps) {
  const skeletons = [];

  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'card':
        skeletons.push(
          <div key={i} className={`${baseClasses} ${className}`}>
            <div className="h-48 bg-gray-300 rounded-t mb-4"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        );
        break;
      case 'text':
        skeletons.push(
          <div key={i} className={`space-y-2 ${className}`}>
            <div className={`${baseClasses} h-4 w-full`}></div>
            <div className={`${baseClasses} h-4 w-3/4`}></div>
            <div className={`${baseClasses} h-4 w-1/2`}></div>
          </div>
        );
        break;
      case 'image':
        skeletons.push(
          <div key={i} className={`${baseClasses} h-48 w-full ${className}`}></div>
        );
        break;
      case 'list':
        skeletons.push(
          <div key={i} className={`flex space-x-4 ${className}`}>
            <div className={`${baseClasses} h-12 w-12 rounded-full`}></div>
            <div className="flex-1 space-y-2">
              <div className={`${baseClasses} h-4 w-3/4`}></div>
              <div className={`${baseClasses} h-3 w-1/2`}></div>
            </div>
          </div>
        );
        break;
    }
  }

  return <>{skeletons}</>;
}

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyComponent({ 
  children, 
  fallback = <LoadingSkeleton />, 
  className = '' 
}: LazyComponentProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
}
