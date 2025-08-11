import { JSX } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { CatGallery } from './components/CatGallery';
import { Toast } from './components/Toast';
import useStore from './store';
import { useNetworkStatus } from './hooks/useNetworkStatus';

function App(): JSX.Element {
  const { networkError, clearNetworkError } = useStore();
  
  // Monitor network status
  useNetworkStatus();
  
  return (
    <div className="min-h-screen theme-bg-primary">
      {/* Header */}
      <header className="theme-bg-card border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold theme-text-primary">
                Cat Voting Platform
              </h1>
              <p className="theme-text-secondary">
                Rate and vote on cat images from around the world
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium theme-text-secondary">Theme</div>
                <div className="text-xs theme-text-muted">Light / Dark</div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatGallery />
      </main>

      {/* Footer */}
      <footer className="theme-bg-card border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 text-sm theme-text-secondary">
              <span>Powered by</span>
              <a 
                href="https://thecatapi.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium theme-text-accent hover:opacity-80 transition-opacity"
              >
                TheCatAPI
              </a>
              <span>•</span>
              <span>Votes stored locally</span>
            </div>
            
            <div className="flex justify-center items-center gap-6 text-xs theme-text-muted">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Responsive Design</span>
              <span>•</span>
              <span>Dark Mode Support</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Network Error Toast */}
      {networkError && (
        <Toast message={networkError} onClose={clearNetworkError} />
      )}
    </div>
  );
}

export default App;
