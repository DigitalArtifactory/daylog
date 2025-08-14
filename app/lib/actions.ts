'use server';

import { redirect } from 'next/navigation';
import { prisma } from '../../prisma/client';
import { deleteSessionTokenCookie } from '../login/lib/cookies';

export async function signout() {
  await deleteSessionTokenCookie();
  redirect('/login');
}

export type SearchResult = {
  type: 'note' | 'board';
  title: string;
  matchContent: string;
  url: string;
};

export async function search(keywords: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  if (keywords.length <= 0) return [];

  const boards = await prisma.board.findMany({
    select: { id: true, title: true },
    where: { title: { contains: keywords, mode: 'insensitive' } },
  });

  const notes = await prisma.note.findMany({
    select: { id: true, title: true, boardsId: true },
    where: { title: { contains: keywords, mode: 'insensitive' } },
  });

  notes.forEach((n) =>
    results.push({
      type: 'note',
      title: n.title,
      matchContent: '',
      url: `/boards/${n.boardsId}/notes/${n.id}`,
    })
  );

  boards.forEach((b) => {
    results.push({
      type: 'board',
      title: b.title,
      matchContent: '',
      url: `/boards/${b.id}/notes`,
    });
  });

  return results;
}

export async function getBoardsCount() {
  const count = await prisma.board.count();
  return count;
}
