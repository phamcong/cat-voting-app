import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CatCard } from '../components/CatCard';
import { CatImage } from '../services/catApi';

// Mock the store
const mockVoteOnImage = jest.fn();
const mockUserVotes: Record<string, number> = {};
const mockScores: Record<string, number> = {};

jest.mock('../store', () => ({
  __esModule: true,
  default: () => ({
    userVotes: mockUserVotes,
    scores: mockScores,
    voteOnImage: mockVoteOnImage,
  }),
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaThumbsUp: () => <span data-testid="thumbs-up-icon">👍</span>,
  FaThumbsDown: () => <span data-testid="thumbs-down-icon">👎</span>,
}));

describe('CatCard Component', () => {
  const mockCat: CatImage = {
    id: 'test-cat-1',
    url: 'https://example.com/cat1.jpg',
    width: 800,
    height: 600,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock data
    Object.keys(mockUserVotes).forEach(key => delete mockUserVotes[key]);
    Object.keys(mockScores).forEach(key => delete mockScores[key]);
  });

  test('renders cat image with correct attributes', () => {
    render(<CatCard cat={mockCat} />);
    
    const image = screen.getByAltText(`Cat ${mockCat.id}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCat.url);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('renders upvote and downvote buttons', () => {
    render(<CatCard cat={mockCat} />);
    
    expect(screen.getByText('Upvote')).toBeInTheDocument();
    expect(screen.getByText('Downvote')).toBeInTheDocument();
    expect(screen.getByTestId('thumbs-up-icon')).toBeInTheDocument();
    expect(screen.getByTestId('thumbs-down-icon')).toBeInTheDocument();
  });

  test('buttons are enabled when user has not voted', () => {
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    const downvoteButton = screen.getByText('Downvote').closest('button');
    
    expect(upvoteButton).not.toBeDisabled();
    expect(downvoteButton).not.toBeDisabled();
  });

  test('calls voteOnImage when upvote button is clicked', async () => {
    mockVoteOnImage.mockResolvedValue(undefined);
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    fireEvent.click(upvoteButton!);
    
    await waitFor(() => {
      expect(mockVoteOnImage).toHaveBeenCalledWith(mockCat.id, 1);
    });
  });

  test('calls voteOnImage when downvote button is clicked', async () => {
    mockVoteOnImage.mockResolvedValue(undefined);
    render(<CatCard cat={mockCat} />);
    
    const downvoteButton = screen.getByText('Downvote').closest('button');
    fireEvent.click(downvoteButton!);
    
    await waitFor(() => {
      expect(mockVoteOnImage).toHaveBeenCalledWith(mockCat.id, -1);
    });
  });

  test('shows loading state while voting', async () => {
    mockVoteOnImage.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    fireEvent.click(upvoteButton!);
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    // Check for the loading overlay and spinner
    const loadingOverlay = screen.getByText('Submitting...').closest('div')?.parentElement;
    expect(loadingOverlay).toHaveClass('absolute', 'inset-0');
    
    const spinner = loadingOverlay?.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('disables buttons after user has voted', async () => {
    mockVoteOnImage.mockResolvedValue(undefined);
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    fireEvent.click(upvoteButton!);
    
    await waitFor(() => {
      expect(upvoteButton).toBeDisabled();
      expect(screen.getByText('Downvote').closest('button')).toBeDisabled();
    });
  });

  test('shows correct button styling for upvoted cat', () => {
    mockUserVotes[mockCat.id] = 1;
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    const downvoteButton = screen.getByText('Downvote').closest('button');
    
    expect(upvoteButton).toHaveClass('bg-emerald-100');
    expect(downvoteButton).toHaveClass('bg-gray-100', 'cursor-not-allowed');
  });

  test('shows correct button styling for downvoted cat', () => {
    mockUserVotes[mockCat.id] = -1;
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    const downvoteButton = screen.getByText('Downvote').closest('button');
    
    expect(downvoteButton).toHaveClass('bg-red-100');
    expect(upvoteButton).toHaveClass('bg-gray-100', 'cursor-not-allowed');
  });

  test('displays score badge when score exists', () => {
    mockScores[mockCat.id] = 5;
    render(<CatCard cat={mockCat} />);
    
    const scoreBadge = screen.getByText('+5');
    expect(scoreBadge).toBeInTheDocument();
    expect(scoreBadge.closest('div')).toHaveClass('bg-white/95');
  });

  test('displays negative score badge correctly', () => {
    mockScores[mockCat.id] = -3;
    render(<CatCard cat={mockCat} />);
    
    const scoreBadge = screen.getByText('-3');
    expect(scoreBadge).toBeInTheDocument();
    expect(scoreBadge).toHaveClass('text-red-600');
  });

  test('does not display score badge when score is 0', () => {
    mockScores[mockCat.id] = 0;
    render(<CatCard cat={mockCat} />);
    
    expect(screen.queryByText('+0')).not.toBeInTheDocument();
    expect(screen.queryByText('-0')).not.toBeInTheDocument();
  });

  test('prevents multiple votes while processing', async () => {
    mockVoteOnImage.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    const downvoteButton = screen.getByText('Downvote').closest('button');
    
    fireEvent.click(upvoteButton!);
    
    // Try to click downvote while upvote is processing
    fireEvent.click(downvoteButton!);
    
    expect(mockVoteOnImage).toHaveBeenCalledTimes(1);
    expect(mockVoteOnImage).toHaveBeenCalledWith(mockCat.id, 1);
  });

  test('applies hover effects on mouse enter/leave', () => {
    render(<CatCard cat={mockCat} />);
    
    const card = screen.getByAltText(`Cat ${mockCat.id}`).closest('div');
    const image = screen.getByAltText(`Cat ${mockCat.id}`);
    
    // Initial state
    expect(image).toHaveClass('scale-100');
    
    // Hover state
    fireEvent.mouseEnter(card!);
    expect(image).toHaveClass('scale-105');
    
    // Leave hover state
    fireEvent.mouseLeave(card!);
    expect(image).toHaveClass('scale-100');
  });

  test('renders with correct accessibility attributes', () => {
    render(<CatCard cat={mockCat} />);
    
    const upvoteButton = screen.getByText('Upvote').closest('button');
    const downvoteButton = screen.getByText('Downvote').closest('button');
    
    // Buttons should not have disabled attribute when not disabled
    expect(upvoteButton).not.toHaveAttribute('disabled');
    expect(downvoteButton).not.toHaveAttribute('disabled');
  });
});
