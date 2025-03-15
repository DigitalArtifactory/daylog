import { prismaMock } from '@/prisma/singleton';
import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { deleteSessionTokenCookie } from '../login/lib/cookies';
import { search, SearchResult, signout } from './actions';

vi.mock('../login/lib/cookies', () => ({
  deleteSessionTokenCookie: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('signout', () => {
  it('should delete session token cookie and redirect to login', async () => {
    await signout();
    expect(deleteSessionTokenCookie).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith('/login');
  });
});

describe('search', () => {
  it('should return an empty array if keywords are empty', async () => {
    const results = await search('');
    expect(results).toEqual([]);
  });

  it('should return search results for boards and notes', async () => {
    const mockBoards = [
      { id: 1, title: 'Board 1' },
      { id: 2, title: 'Board 2' },
    ];
    const mockNotes = [
      { id: 1, title: 'Note 1', boardsId: 1 },
      { id: 2, title: 'Note 2', boardsId: 2 },
    ];

    prismaMock.board.findMany.mockResolvedValue(mockBoards as any);
    prismaMock.note.findMany.mockResolvedValue(mockNotes as any);

    const results: SearchResult[] = await search('Note');

    expect(results).toEqual([
      {
        type: 'note',
        title: 'Note 1',
        matchContent: '',
        url: '/boards/1/notes/1',
      },
      {
        type: 'note',
        title: 'Note 2',
        matchContent: '',
        url: '/boards/2/notes/2',
      },
      {
        type: 'board',
        title: 'Board 1',
        matchContent: '',
        url: '/boards/1/notes',
      },
      {
        type: 'board',
        title: 'Board 2',
        matchContent: '',
        url: '/boards/2/notes',
      },
    ]);
  });
});
