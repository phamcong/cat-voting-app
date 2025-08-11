import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock the theme hook to avoid localStorage issues in tests
jest.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
    isDark: false,
    isLight: true,
  }),
}));

describe('App Component', () => {
  test('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('Development Setup Complete!')).toBeInTheDocument();
  });

  test('renders theme toggle', () => {
    render(<App />);
    // Check for the theme toggle button by looking for the button element
    const themeToggle = screen.getByRole('button', { name: /switch to/i });
    expect(themeToggle).toBeInTheDocument();
  });

  test('counter increments when + button is clicked', () => {
    render(<App />);
    const incrementButton = screen.getByText('+');
    const counter = screen.getByText(/Zustand Counter:/);
    
    expect(counter).toHaveTextContent('0');
    
    fireEvent.click(incrementButton);
    expect(counter).toHaveTextContent('1');
  });

  test('opens dialog when button is clicked', () => {
    render(<App />);
    const openDialogButton = screen.getByText('Open Dialog');
    
    fireEvent.click(openDialogButton);
    expect(screen.getByText('Deactivate account')).toBeInTheDocument();
  });

  test('shows theme system in installed list', () => {
    render(<App />);
    expect(screen.getByText('Theme System (dark/light mode)')).toBeInTheDocument();
  });
});
