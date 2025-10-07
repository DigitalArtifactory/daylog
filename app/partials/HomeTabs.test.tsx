import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getNotes } from '../boards/[id]/notes/lib/actions';
import HomeTabs from './HomeTabs';

const mocks = vi.hoisted(() => ({
  getBoards: vi.fn(),
  getNotes: vi.fn((boardId) =>
    mockNotes.filter((note) => note.boardsId === boardId)
  ),
  getCurrentSession: vi.fn(),
}));

vi.mock('../boards/lib/actions', () => ({
  getBoards: mocks.getBoards,
}));

vi.mock('../boards/[id]/notes/lib/actions', () => ({
  getNotes: mocks.getNotes,
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

const mockBoards = [
  { id: 1, title: 'Board 1', imageUrl: 'image1.jpg' },
  { id: 2, title: 'Board 2', imageUrl: 'image2.jpg' },
];

const currentDate = new Date();

const mockNotes = [
  {
    id: 1,
    boardsId: 1,
    title: 'Note 1',
    imageUrl: 'note1.jpg',
    updatedAt: currentDate,
  },
  {
    id: 2,
    boardsId: 1,
    title: 'Note 2',
    imageUrl: 'note2.jpg',
    updatedAt: currentDate,
  },
  {
    id: 3,
    boardsId: 2,
    title: 'Note 3',
    imageUrl: 'note3.jpg',
    updatedAt: currentDate,
  },
  {
    id: 4,
    boardsId: 2,
    title: 'Note 4',
    imageUrl: 'note4.jpg',
    updatedAt: currentDate,
  },
];

describe('HomeTabs', () => {
  beforeEach(() => {
    cleanup();
    mocks.getBoards.mockResolvedValue(mockBoards);
    mocks.getNotes.mockResolvedValue(mockNotes);
    mocks.getCurrentSession.mockResolvedValue({
      user: { sortBoardsBy: 'created_desc', sortNotesBy: 'created_desc' },
    });
  });

  it('renders loading state initially', () => {
    render(<HomeTabs />);
    expect(screen.getByText('Loading boards...')).toBeDefined();
  });

  it('renders boards after loading', async () => {
    render(<HomeTabs />);
    await waitFor(() => expect(mocks.getBoards).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText('Board 1')).toBeDefined();
      expect(screen.getByText('Board 2')).toBeDefined();
    });
  });

  it('renders recent notes', async () => {
    render(<HomeTabs />);
    await waitFor(() => expect(mocks.getBoards).toHaveBeenCalledWith('created_desc'));
    await waitFor(() =>
      expect(mocks.getNotes).toHaveBeenCalledWith('created_desc', 8)
    );
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeDefined();
      expect(screen.getByText('Note 2')).toBeDefined();
    });
  });

  it('renders only new board when no boards are available', async () => {
    mocks.getBoards.mockResolvedValue([]);
    render(<HomeTabs />);
    await waitFor(() => expect(mocks.getBoards).toHaveBeenCalled());
    expect(screen.getByText("New board")).toBeDefined();
  });

  it('renders message when no notes are available', async () => {
    mocks.getNotes.mockResolvedValue([]);
    render(<HomeTabs />);
    await waitFor(() => expect(mocks.getBoards).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.queryByText('Loading boards...')).not.toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Board 1'));
    await waitFor(() =>
      expect(mocks.getNotes).toHaveBeenCalledWith('created_desc', 8)
    );
    await waitFor(() =>
      expect(screen.getAllByText("You don't have notes yet...")).toBeDefined()
    );
  });
});
