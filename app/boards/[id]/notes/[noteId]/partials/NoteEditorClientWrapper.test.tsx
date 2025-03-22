import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
  } as any;

  beforeEach(() => {
    cleanup();
  });

  it('renders the Editor component', () => {
    render(<NoteEditorClientWrapper note={note} />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('calls updateNoteHandler after debounce', async () => {
    render(<NoteEditorClientWrapper note={note} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'Updated content' } });

    // Wait for debounce
    await new Promise((r) => setTimeout(r, 1100));

    expect(updateNote).toHaveBeenCalledWith({
      ...note,
      content: 'Updated content',
    });
  });

  it('clears previous debounce timer', async () => {
    render(<NoteEditorClientWrapper note={note} />);
    const editor = screen.getByTestId('editor');

    fireEvent.change(editor, { target: { value: 'First update' } });
    fireEvent.change(editor, { target: { value: 'Second update' } });

    // Wait for debounce
    await new Promise((r) => setTimeout(r, 1100));

    expect(updateNote).toHaveBeenCalledWith({
      ...note,
      content: 'Second update',
    });
  });
});
