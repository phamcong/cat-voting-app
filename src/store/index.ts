import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface StoreState {
  count: number;
  user: User | null;
  theme: Theme;
  increment: () => void;
  decrement: () => void;
  setUser: (user: User) => void;
  reset: () => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Example state
      count: 0,
      user: null,
      theme: 'light',
      
      // Actions
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      setUser: (user: User) => set({ user }),
      reset: () => set({ count: 0, user: null }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme, count: state.count }),
    }
  )
);

export default useStore;
