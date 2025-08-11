import { JSX, useEffect, useState } from 'react';
import useStore from '../store';
import { CatCard } from './CatCard';

type TabType = 'all' | 'voted';

export function CatGallery(): JSX.Element {
  const { images, isLoading, error, fetchRandomImages, refreshImages, userVotes, action } = useStore();
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('all');

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

  // Filter images based on active tab
  const getFilteredImages = () => {
    if (activeTab === 'voted') {
      return images.filter(cat => userVotes[cat.id] !== undefined);
    }
    return images;
  };

  const filteredImages = getFilteredImages();

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

  if (error && action === 'fetchRandomImages') {
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
      {/* Header with Tabs and Refresh Button */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              All Cats ({images.length})
            </button>
            <button
              onClick={() => setActiveTab('voted')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'voted'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Voted Cats ({Object.keys(userVotes).length})
            </button>
          </nav>
        </div>

        {/* Header with Refresh Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold theme-text-primary">
              {activeTab === 'all' ? 'Cat Gallery' : 'Your Voted Cats'}
            </h2>
            <p className="text-sm theme-text-secondary">
              {activeTab === 'all' 
                ? `${images.length} images available for voting`
                : `${Object.keys(userVotes).length} cats you've voted on`
              }
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
      </div>

      {/* Gallery Grid with Staggered Animation */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((cat, index) => (
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
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto border border-gray-200 dark:border-gray-700">
              <span className="text-3xl">🗳️</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold theme-text-primary">
                {activeTab === 'voted' ? 'No Voted Cats Yet' : 'No Images Found'}
              </h3>
              <p className="text-sm theme-text-secondary">
                {activeTab === 'voted' 
                  ? 'Start voting on cats to see them here!'
                  : 'Try refreshing to load more images'
                }
              </p>
            </div>
            {activeTab === 'voted' && (
              <button
                onClick={() => setActiveTab('all')}
                className="theme-bg-button-primary hover:theme-bg-button-primary-hover text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200"
              >
                Browse All Cats
              </button>
            )}
          </div>
        </div>
      )}

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
