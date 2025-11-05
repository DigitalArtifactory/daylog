import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Editor from './Editor';

const mocks = vi.hoisted(() => ({
  getNote: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('../../lib/actions', () => ({
  getNote: mocks.getNote,
}));

describe('Editor', () => {
  const noteId = 1;
  const mockNote = { content: 'Test content' };

  beforeEach(() => {
    cleanup();
  });

  it('loads and displays note content', async () => {
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor noteId={noteId} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });
  });

  it('calls onUpdate when content changes', async () => {
    const onUpdate = vi.fn((content, callback) => callback());
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor noteId={noteId} onUpdate={onUpdate} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Updated content' },
    });

    expect(onUpdate).toHaveBeenCalledWith(
      'Updated content',
      expect.any(Function)
    );
  });

  it('displays saving indicator when content is being saved', async () => {
    const onUpdate = vi.fn(() => {
      // Never calls the callback for testing loading...
    });
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor noteId={noteId} onUpdate={onUpdate} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Updated content' },
    });

    expect(screen.getByTitle('Saving changes...')).toBeInTheDocument();
  });

  it('renders markdown preview', async () => {
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor noteId={noteId} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });
    
    expect(
      screen.getByText('Test content', { selector: 'p' })
    ).toBeInTheDocument();
  });
});
