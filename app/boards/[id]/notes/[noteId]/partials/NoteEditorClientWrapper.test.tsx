import { Note } from '@prisma/client';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { updateNote } from '../../lib/actions';
import NoteEditorClientWrapper from './NoteEditorClientWrapper';

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

describe('NoteEditorClientWrapper', () => {
  const note = {
    id: 1,
    content: 'Initial content',
    createdAt: new Date(),
    updatedAt: new Date(),
    boardsId: 1,
  } as Partial<Note>;

  beforeEach(() => {
    cleanup();
    vi.useFakeTimers({ toFake: ['setTimeout'], shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Editor component', () => {
    render(<NoteEditorClientWrapper note={note as Note} />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('calls updateNoteHandler after debounce', async () => {
    render(<NoteEditorClientWrapper note={note as Note} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'Updated content' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    expect(updateNote).toHaveBeenCalledWith({
      ...note,
      content: 'Updated content',
    });
  });

  it('clears previous debounce timer', async () => {
    render(<NoteEditorClientWrapper note={note as Note} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'First update' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    fireEvent.change(editor, { target: { value: 'Second update' } });
    // skip 1s debounce time
    vi.advanceTimersByTime(1000);

    expect(updateNote).toHaveBeenCalledWith({
      ...note,
      content: 'Second update',
    });
  });
});
