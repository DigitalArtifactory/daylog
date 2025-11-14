import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Note } from '@/prisma/generated/client';
import Editor from './Editor';
import { updateNote } from '../../lib/actions';

const mocks = vi.hoisted(() => ({
  getNote: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
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

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../components/Editor', () => ({
  __esModule: true,
  default: vi.fn(({ onUpdate }) => (
    <div>
      <textarea
        data-testid="editor"
        onChange={(e) => onUpdate(e.target.value, () => {})}
      />
    </div>
  )),
}));

vi.mock('../../lib/actions', () => ({
  updateNote: vi.fn(),
}));

describe('Editor', () => {
  const noteId = 1;
  const mockNote = {
    id: 1,
    content: 'Initial content',
    createdAt: new Date(),
    updatedAt: new Date(),
    boardsId: 1,
  } as Note;

  beforeEach(() => {
    cleanup();
  });

  beforeEach(() => {
    cleanup();
    vi.useFakeTimers({ toFake: ['setTimeout'], shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads and displays note content', async () => {
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor note={mockNote} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });
  });

  it('calls onUpdate when content changes', async () => {
    const onUpdate = vi.fn((content, callback) => callback());
    mocks.getNote.mockResolvedValueOnce(mockNote);
    render(<Editor note={mockNote} />);

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
    render(<Editor note={mockNote} />);

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
    render(<Editor note={mockNote} />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(mockNote.content);
    });

    expect(
      screen.getByText('Test content', { selector: 'p' })
    ).toBeInTheDocument();
  });

  it('renders the Editor component', () => {
    render(<Editor note={mockNote} />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('calls updateNoteHandler after debounce', async () => {
    render(<Editor note={mockNote} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'Updated content' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    expect(updateNote).toHaveBeenCalledWith({
      ...mockNote,
      content: 'Updated content',
    });
  });

  it('clears previous debounce timer', async () => {
    render(<Editor note={mockNote} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'First update' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    fireEvent.change(editor, { target: { value: 'Second update' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    expect(updateNote).toHaveBeenCalledWith({
      ...mockNote,
      content: 'Second update',
    });
  });
});
