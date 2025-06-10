import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavSearch from './NavSearch';

// Mock icons
vi.mock('./icons', () => ({
  ChalkboardIcon: () => <span data-testid="chalkboard-icon" />,
  NoteIcon: () => <span data-testid="note-icon" />,
  PuzzledIcon: () => <span data-testid="puzzled-icon" />,
  SearchIcon: () => <span data-testid="search-icon" />,
}));

// Mock search action
vi.mock('@/app/lib/actions', () => ({
  search: vi.fn(async (query: string) => {
    if (!query) return [];
    return [
      { type: 'note', title: 'Test Note', url: '/note/1' },
      { type: 'board', title: 'Test Board', url: '/board/1' },
    ];
  }),
}));

describe('NavSearch', () => {
  beforeEach(() => {
    // Clear document body between tests
    document.body.innerHTML = '';
    cleanup();
  });

  it('renders search button and modal', () => {
    render(<NavSearch />);
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toHaveAttribute('data-bs-toggle', 'modal');
    expect(screen.getByRole('button', { name: /Search/i })).toHaveAttribute('data-bs-target', '#searchModal');
    expect(screen.getByPlaceholderText(/Press \[Backspace\] to return to search input/i)).toBeInTheDocument();
  });

  it('shows empty results message when no results', async () => {
    render(<NavSearch />);
    // Open modal by simulating click
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    // Input is empty, so should show empty results
    expect(await screen.findByText(/Empty results/i)).toBeInTheDocument();
  });

  it('shows search results when input is typed', async () => {
    render(<NavSearch />);
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    const input = screen.getByPlaceholderText(/Press \[Backspace\] to return to search input/i);
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
      expect(screen.getByText('Test Board')).toBeInTheDocument();
    });

    expect(screen.getByTestId('note-icon')).toBeInTheDocument();
    expect(screen.getByTestId('chalkboard-icon')).toBeInTheDocument();
  });

  it('shows navigation instructions in modal footer', () => {
    render(<NavSearch />);
    expect(screen.getByText(/to navigate results/i)).toBeInTheDocument();
    expect(screen.getByText(/Arrow Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Arrow Down/i)).toBeInTheDocument();
  });

  it('navigates results with keyboard', async () => {
    render(<NavSearch />);
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    const input = screen.getByPlaceholderText(/Press \[Backspace\] to return to search input/i);
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
      expect(screen.getByText('Test Board')).toBeInTheDocument();
    });

    // Simulate arrow down key
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // After ArrowDown, the first result should be focused
    const firstResult = screen.getByText('Test Note');
    expect(document.activeElement).toBe(firstResult.closest('a'));

    // Simulate Enter key on focused result
    fireEvent.keyDown(document.activeElement as Element, { key: 'Enter' });
    // Since we can't actually navigate, just ensure focus remains
    expect(document.activeElement).toBe(firstResult.closest('a'));

    // Simulate Backspace to return focus to input
    fireEvent.keyDown(document.activeElement as Element, { key: 'Backspace' });
    expect(document.activeElement).toBe(input);

    // Simulate ArrowDown twice to cycle to the second result
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    const secondResult = screen.getByText('Test Board');
    expect(document.activeElement).toBe(secondResult.closest('a'));
  })
});