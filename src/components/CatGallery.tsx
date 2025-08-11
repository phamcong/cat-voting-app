import React, { JSX, useState, useEffect } from 'react';
import { CatCard } from './CatCard';
import useStore from '../store';

export function CatGallery(): JSX.Element {
  const { images, isLoading, error, fetchRandomImages, refreshImages } = useStore();
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load images on component mount
  useEffect(() => {
    if (images.length === 0) {
      fetchRandomImages();
    }
  }, [fetchRandomImages, images.length]);

  // Staggered animation for images
  useEffect(() => {
    if (images.length > 0) {
      const timer = setTimeout(() => {
        setVisibleImages(images.map((_, index) => index));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [images.length]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshImages();
    setIsRefreshing(false);
  };

  if (isLoading && images.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-80">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-gray-200 dark:border-gray-700 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold theme-text-primary">Loading Images</h3>
            <p className="text-sm theme-text-secondary">Fetching the latest cat photos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto border border-red-200 dark:border-red-800">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold theme-text-primary">Unable to Load Images</h3>
            <p className="text-sm theme-text-secondary">{error}</p>
          </div>
          <button
            onClick={fetchRandomImages}
            className="theme-bg-button-primary hover:theme-bg-button-primary-hover text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto border border-gray-200 dark:border-gray-700">
            <span className="text-3xl">🐱</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold theme-text-primary">No Images Available</h3>
            <p className="text-sm theme-text-secondary">Click below to load some adorable cats</p>
          </div>
          <button
            onClick={fetchRandomImages}
            className="theme-bg-button-primary hover:theme-bg-button-primary-hover text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200"
          >
            Load Images
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Refresh Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold theme-text-primary">
            Cat Gallery
          </h2>
          <p className="text-sm theme-text-secondary">
            {images.length} images available for voting
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          className="inline-flex items-center gap-2 theme-bg-button-primary hover:theme-bg-button-primary-hover text-white font-medium py-2.5 px-4 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading || isRefreshing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>

      {/* Gallery Grid with Staggered Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((cat, index) => (
          <div
            key={cat.id}
            className={`transition-all duration-500 ease-out ${
              visibleImages.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 75}ms` }}
          >
            <CatCard cat={cat} />
          </div>
        ))}
      </div>

      {/* Loading Overlay for Refresh */}
      {isLoading && images.length > 0 && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="theme-bg-card rounded-xl p-6 text-center shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 border-3 border-gray-200 dark:border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold theme-text-primary mb-2">Loading New Images</h3>
            <p className="text-sm theme-text-secondary">Please wait while we fetch fresh content...</p>
          </div>
        </div>
      )}
    </div>
  );
}
