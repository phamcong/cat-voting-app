import { useEffect } from 'react';
import useStore, { Theme } from '../store';

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both theme classes first
    root.classList.remove('light', 'dark');
    
    // Add current theme class for Tailwind dark mode
    root.classList.add(theme);
    
    // Update data attribute for CSS custom properties
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};
