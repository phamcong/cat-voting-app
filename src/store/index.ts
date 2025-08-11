import { create } from 'zustand';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface StoreState {
  count: number;
  user: User | null;
  increment: () => void;
  decrement: () => void;
  setUser: (user: User) => void;
  reset: () => void;
}

const useStore = create<StoreState>((set) => ({
  // Example state
  count: 0,
  user: null,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user: User) => set({ user }),
  reset: () => set({ count: 0, user: null }),
}));

export default useStore;
