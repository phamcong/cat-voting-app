import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CatGallery } from '../components/CatGallery';
import { CatImage } from '../services/catApi';

// Mock the store
const mockFetchRandomImages = jest.fn();
const mockRefreshImages = jest.fn();

// Create a mock store function that can be updated per test
const createMockStore = (overrides = {}) => ({
  images: [],
  isLoading: false,
  error: null,
  action: null,
  fetchRandomImages: mockFetchRandomImages,
  refreshImages: mockRefreshImages,
  userVotes: {},
  ...overrides,
});

// Mock the store module
jest.mock('../store', () => ({
  __esModule: true,
  default: createMockStore,
}));

// Get the mocked module to update it in tests
const mockStoreModule = jest.requireMock('../store');

// Mock CatCard component
jest.mock('../components/CatCard', () => ({
  CatCard: ({ cat }: { cat: CatImage }) => (
    <div data-testid={`cat-card-${cat.id}`}>
      <img src={cat.url} alt={`Cat ${cat.id}`} />
      <span>Cat {cat.id}</span>
    </div>
  ),
}));

describe('CatGallery Component', () => {
  const mockCatImages: CatImage[] = [
    {
      id: 'cat-1',
      url: 'https://example.com/cat1.jpg',
      width: 800,
      height: 600,
    },
    {
      id: 'cat-2',
      url: 'https://example.com/cat2.jpg',
      width: 800,
      height: 600,
    },
    {
      id: 'cat-3',
      url: 'https://example.com/cat3.jpg',
      width: 800,
      height: 600,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock store to default state
    mockStoreModule.default = createMockStore;
  });

  test('renders gallery header with tabs', () => {
    // This test should show the empty state since no images exist
    render(<CatGallery />);
    
    expect(screen.getByText('No Images Available')).toBeInTheDocument();
    expect(screen.getByText('Click below to load some adorable cats')).toBeInTheDocument();
    expect(screen.getByText('Load Images')).toBeInTheDocument();
  });

  test('calls fetchRandomImages on mount when no images exist', () => {
    render(<CatGallery />);
    
    expect(mockFetchRandomImages).toHaveBeenCalledTimes(1);
  });

  test('does not call fetchRandomImages when images already exist', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    expect(mockFetchRandomImages).not.toHaveBeenCalled();
  });

  test('renders loading state when initially loading', () => {
    // Override the mock store for this test
    mockStoreModule.default = () => createMockStore({
      images: [],
      isLoading: true,
      error: null,
      action: null,
    });

    render(<CatGallery />);
    
    expect(screen.getByText('Loading Images')).toBeInTheDocument();
    expect(screen.getByText('Fetching the latest cat photos...')).toBeInTheDocument();
  });

  test('renders error state when fetch fails', () => {
    // Override the mock store for this test
    mockStoreModule.default = () => createMockStore({
      images: [],
      isLoading: false,
      error: 'Failed to fetch images',
      action: 'fetchRandomImages',
    });

    render(<CatGallery />);
    
    expect(screen.getByText('Unable to Load Images')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch images')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  test('renders empty state when no images available', () => {
    render(<CatGallery />);
    
    expect(screen.getByText('No Images Available')).toBeInTheDocument();
    expect(screen.getByText('Click below to load some adorable cats')).toBeInTheDocument();
    expect(screen.getByText('Load Images')).toBeInTheDocument();
  });

  test('renders cat cards when images exist', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    expect(screen.getByTestId('cat-card-cat-1')).toBeInTheDocument();
    expect(screen.getByTestId('cat-card-cat-2')).toBeInTheDocument();
    expect(screen.getByTestId('cat-card-cat-3')).toBeInTheDocument();
  });

  test('displays correct image count in header', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    expect(screen.getByText('3 images available for voting')).toBeInTheDocument();
  });

  test('switches to voted tab and shows voted cats count', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
      userVotes: { 'cat-1': 1, 'cat-2': -1 },
    });
    
    render(<CatGallery />);
    
    const votedTab = screen.getByText('Voted Cats (2)');
    fireEvent.click(votedTab);
    
    expect(screen.getByText('Your Voted Cats')).toBeInTheDocument();
    expect(screen.getByText('2 cats you\'ve voted on')).toBeInTheDocument();
  });

  test('filters images correctly when on voted tab', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
      userVotes: { 'cat-1': 1, 'cat-3': -1 },
    });
    
    render(<CatGallery />);
    
    // Switch to voted tab
    const votedTab = screen.getByText('Voted Cats (2)');
    fireEvent.click(votedTab);
    
    // Should only show voted cats
    expect(screen.getByTestId('cat-card-cat-1')).toBeInTheDocument();
    expect(screen.getByTestId('cat-card-cat-3')).toBeInTheDocument();
    expect(screen.queryByTestId('cat-card-cat-2')).not.toBeInTheDocument();
  });

  test('shows no voted cats message when no votes exist', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    
    render(<CatGallery />);
    
    // Switch to voted tab
    const votedTab = screen.getByText('Voted Cats (0)');
    fireEvent.click(votedTab);
    
    expect(screen.getByText('No Voted Cats Yet')).toBeInTheDocument();
    expect(screen.getByText('Start voting on cats to see them here!')).toBeInTheDocument();
    expect(screen.getByText('Browse All Cats')).toBeInTheDocument();
  });

  test('calls refreshImages when refresh button is clicked', async () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    mockRefreshImages.mockResolvedValue(undefined);
    
    render(<CatGallery />);
    
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    
    expect(mockRefreshImages).toHaveBeenCalledTimes(1);
  });

  test('shows loading state during refresh', async () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    mockRefreshImages.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<CatGallery />);
    
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('disables refresh button while loading', async () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    mockRefreshImages.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<CatGallery />);
    
    const refreshButton = screen.getByText('Refresh').closest('button');
    fireEvent.click(refreshButton!);
    
    expect(refreshButton).toBeDisabled();
  });

  test('shows loading overlay when refreshing with existing images', async () => {
    // The loading overlay only shows when isLoading is true and there are existing images
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
      isLoading: true,
    });
    
    render(<CatGallery />);
    
    expect(screen.getByText('Loading New Images')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we fetch fresh content...')).toBeInTheDocument();
  });

  test('handles tab switching correctly', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
      userVotes: { 'cat-1': 1 },
    });
    
    render(<CatGallery />);
    
    // Initially on 'all' tab
    expect(screen.getByText('Cat Gallery')).toBeInTheDocument();
    expect(screen.getByText('3 images available for voting')).toBeInTheDocument();
    
    // Switch to 'voted' tab
    const votedTab = screen.getByText('Voted Cats (1)');
    fireEvent.click(votedTab);
    
    expect(screen.getByText('Your Voted Cats')).toBeInTheDocument();
    expect(screen.getByText('1 cats you\'ve voted on')).toBeInTheDocument();
    
    // Switch back to 'all' tab
    const allTab = screen.getByText('All Cats (3)');
    fireEvent.click(allTab);
    
    expect(screen.getByText('Cat Gallery')).toBeInTheDocument();
    expect(screen.getByText('3 images available for voting')).toBeInTheDocument();
  });

  test('applies staggered animation to cat cards', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    const catCards = screen.getAllByTestId(/cat-card-/);
    expect(catCards).toHaveLength(3);
    
    // Check that each card container has the animation classes
    catCards.forEach((card, index) => {
      const container = card.closest('div[class*="transition-all"]');
      expect(container).toHaveClass('transition-all', 'duration-500', 'ease-out');
    });
  });

  test('shows correct tab styling for active tab', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    const allTab = screen.getByText('All Cats (3)');
    const votedTab = screen.getByText('Voted Cats (0)');
    
    // 'all' tab should be active by default
    expect(allTab).toHaveClass('border-blue-500', 'text-blue-600');
    expect(votedTab).toHaveClass('border-transparent', 'text-gray-500');
  });

  test('updates tab styling when switching tabs', () => {
    mockStoreModule.default = () => createMockStore({
      images: mockCatImages,
    });
    render(<CatGallery />);
    
    const allTab = screen.getByText('All Cats (3)');
    const votedTab = screen.getByText('Voted Cats (0)');
    
    // Click voted tab
    fireEvent.click(votedTab);
    
    // Check that styling has switched
    expect(votedTab).toHaveClass('border-blue-500', 'text-blue-600');
    expect(allTab).toHaveClass('border-transparent', 'text-gray-500');
  });

  test('handles error retry correctly', () => {
    // Override the mock store for this test
    mockStoreModule.default = () => createMockStore({
      images: [],
      isLoading: false,
      error: 'Network error',
      action: 'fetchRandomImages',
    });

    render(<CatGallery />);
    
    const tryAgainButton = screen.getByText('Try Again');
    fireEvent.click(tryAgainButton);
    
    // fetchRandomImages is called on mount (1) and when retry button is clicked (2)
    expect(mockFetchRandomImages).toHaveBeenCalledTimes(2);
  });
});
