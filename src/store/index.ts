import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CatImage, VoteRequest } from '../services/catApi';
import { catApiService } from '../services/catApi';
import { getUserId } from '../utils/userId';

export type Theme = 'light' | 'dark';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface CatVotingState {
  // Theme
  theme: Theme;

  // Cat voting
  images: CatImage[];
  userVotes: Record<string, number>; // image_id -> vote_value
  scores: Record<string, number>; // image_id -> score
  isLoading: boolean;
  error: string | null;
  action?: string | null;

  // Toast for network errors
  networkError: string | null;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Cat voting actions
  fetchRandomImages: () => Promise<void>;
  voteOnImage: (imageId: string, value: number) => Promise<void>;
  refreshImages: () => Promise<void>;
  clearError: () => void;

  // Toast actions
  showNetworkError: (message: string) => void;
  clearNetworkError: () => void;
}

const useStore = create<CatVotingState>()(
  persist(
    (set, get) => ({
      // Theme state
      theme: 'light',

      // Cat voting state
      images: [],
      userVotes: {},
      scores: {},
      isLoading: false,
      error: null,

      // Toast state
      networkError: null,

      // Theme actions
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme: Theme) => set({ theme }),

      // Cat voting actions
      fetchRandomImages: async () => {
        set({ isLoading: true, error: null, action: 'fetchRandomImages' });
        try {
          const images = await catApiService.getRandomImages(10);
          set({ images, isLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch images';
          set({
            error: errorMessage,
            isLoading: false,
            action: 'fetchRandomImages'
          });

          get().showNetworkError(errorMessage);
        }
      },

      voteOnImage: async (imageId: string, value: number) => {
        const userId = getUserId();
        const voteData: VoteRequest = {
          image_id: imageId,
          sub_id: userId,
          value,
        };

        try {
          await catApiService.createVote(voteData);

          // Update user votes and scores
          set((state) => ({
            userVotes: {
              ...state.userVotes,
              [imageId]: value,
            },
            scores: {
              ...state.scores,
              [imageId]: (state.scores[imageId] || 0) + value,
            },
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to submit vote';
          set({
            error: errorMessage,
            action: 'voteOnImage'
          });

          get().showNetworkError(errorMessage);
        }
      },

      refreshImages: async () => {
        await get().fetchRandomImages();
      },

      clearError: () => set({ error: null }),

      // Toast actions
      showNetworkError: (message: string) => set({ networkError: message }),
      clearNetworkError: () => set({ networkError: null }),
    }),
    {
      name: 'cat-voting-storage',
      partialize: (state) => ({
        theme: state.theme,
        userVotes: state.userVotes,
        scores: state.scores,
      }),
    }
  )
);

export default useStore;
