import { useEffect } from 'react';
import useStore from '../store';

export function useNetworkStatus() {
  const { showNetworkError, clearNetworkError } = useStore();

  useEffect(() => {
    const handleOffline = () => {
      showNetworkError('No internet connection detected. Please check your network and try again.');
    };

    const handleOnline = () => {
      clearNetworkError();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [showNetworkError, clearNetworkError]);
}
