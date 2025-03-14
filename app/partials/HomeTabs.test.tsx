import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getNotes } from '../boards/[id]/notes/lib/actions';
import { getBoards } from '../boards/lib/actions';
import HomeTabs from './HomeTabs';

const mocks = vi.hoisted(() => ({
  getBoards: vi.fn(),
  getNotes: vi.fn((boardId) =>
    mockNotes.filter((note) => note.boardsId === boardId)
  ),
  getFileToBase64: vi.fn(),
}));

vi.mock('../boards/lib/actions', () => ({
  getBoards: mocks.getBoards,
}));
vi.mock('../boards/[id]/notes/lib/actions', () => ({
  getNotes: mocks.getNotes,
}));
vi.mock('@/utils/base64', () => ({
  getFileToBase64: mocks.getFileToBase64,
}));

const mockBoards = [
  { id: 1, title: 'Board 1', imageUrl: 'image1.jpg' },
  { id: 2, title: 'Board 2', imageUrl: 'image2.jpg' },
];

const mockNotes = [
  { id: 1, title: 'Note 1', imageUrl: 'note1.jpg', boardsId: 1 },
  { id: 2, title: 'Note 2', imageUrl: 'note2.jpg', boardsId: 1 },
  { id: 3, title: 'Note 1', imageUrl: 'note1.jpg', boardsId: 2 },
  { id: 4, title: 'Note 2', imageUrl: 'note2.jpg', boardsId: 2 },
];

describe('HomeTabs', () => {
  beforeEach(() => {
    cleanup();
    mocks.getBoards.mockResolvedValue(mockBoards);
    mocks.getFileToBase64.mockResolvedValue('');
  });

  it('renders loading state initially', () => {
    render(<HomeTabs />);
    expect(screen.getByText('Loading boards...')).toBeDefined();
  });

  it('renders boards after loading', async () => {
    render(<HomeTabs />);
    await waitFor(() => expect(getBoards).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText('Board 1')).toBeDefined();
      expect(screen.getByText('Board 2')).toBeDefined();
    });
  });

  it('renders notes of the first board at start', async () => {
    render(<HomeTabs />);
    await waitFor(() => expect(getBoards).toHaveBeenCalled());
    await waitFor(() => expect(getNotes).toHaveBeenCalledWith(1));
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeDefined();
      expect(screen.getByText('Note 2')).toBeDefined();
    });
  });

  it('renders notes when a board is selected', async () => {
    render(<HomeTabs />);
    await waitFor(() => expect(getBoards).toHaveBeenCalled());
    fireEvent.click(screen.getByText('Board 1'));
    await waitFor(() => expect(getNotes).toHaveBeenCalledWith(1));
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

  it('renders message when no boards are available', async () => {
    mocks.getBoards.mockResolvedValue([]);
    render(<HomeTabs />);
    await waitFor(() => expect(getBoards).toHaveBeenCalled());
    expect(screen.getByText("You don't have boards yet...")).toBeDefined();
  });

  it('renders message when no notes are available', async () => {
    mocks.getNotes.mockResolvedValue([]);
    render(<HomeTabs />);
    await waitFor(() => expect(getBoards).toHaveBeenCalled());
    fireEvent.click(screen.getByText('Board 1'));
    await waitFor(() => expect(getNotes).toHaveBeenCalledWith(1));
    await waitFor(() =>
      expect(screen.getAllByText("You don't have notes yet...").length).toBe(
        mockBoards.length
      )
    );
  });
});
