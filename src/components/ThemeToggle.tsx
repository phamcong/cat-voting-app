import { JSX } from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 theme-bg-toggle theme-shadow-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon */}
      <div 
        className="absolute left-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 theme-bg-toggle-thumb"
        style={{
          transform: theme === 'dark' ? 'translateX(0)' : 'translateX(2.5rem)',
          color: theme === 'dark' ? '#92400e' : 'var(--text-secondary)',
          boxShadow: theme === 'dark' ? 'none' : 'var(--shadow-toggle)',
        }}
      >
        {theme === 'dark' ? (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707-.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
      
      {/* Moon Icon (always visible but changes opacity) */}
      <div 
        className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full transition-opacity duration-300"
        style={{
          opacity: theme === 'dark' ? 0 : 1,
        }}
      >
        <svg className="h-5 w-5 theme-text-muted" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  );
}
