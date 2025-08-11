import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('Development Setup Complete!')).toBeInTheDocument();
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
});
