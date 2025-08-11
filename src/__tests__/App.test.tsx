import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the store to avoid API calls in tests
jest.mock('../store', () => ({
  __esModule: true,
  default: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
    images: [],
    userVotes: {},
    scores: {},
    isLoading: false,
    error: null,
    fetchRandomImages: jest.fn(),
    voteOnImage: jest.fn(),
    refreshImages: jest.fn(),
    clearError: jest.fn(),
  }),
}));

describe('App Component', () => {
  test('renders cat voting app title', () => {
    render(<App />);
    expect(screen.getByText('Cat Voting Platform')).toBeInTheDocument();
  });

  test('renders app description', () => {
    render(<App />);
    expect(screen.getByText('Rate and vote on cat images from around the world')).toBeInTheDocument();
  });

  test('renders theme toggle', () => {
    render(<App />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  test('renders footer text', () => {
    render(<App />);
    expect(screen.getByText('Powered by')).toBeInTheDocument();
    expect(screen.getByText('TheCatAPI')).toBeInTheDocument();
    expect(screen.getByText('Votes stored locally')).toBeInTheDocument();
  });

  test('shows no cats found state initially', () => {
    render(<App />);
    expect(screen.getByText('No Images Available')).toBeInTheDocument();
    expect(screen.getByText('Click below to load some adorable cats')).toBeInTheDocument();
    expect(screen.getByText('Load Images')).toBeInTheDocument();
  });
});
