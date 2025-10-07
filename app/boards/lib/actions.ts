'use server';

import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import { Board, Prisma } from '@/prisma/generated/client';
import { saveAndGetImageFile } from '@/utils/file';
import { removeFile } from '@/utils/storage';
import { isBase64, isUrl } from '@/utils/text';

import fs from 'fs';

export async function createBoard(
  board: Prisma.BoardCreateInput
): Promise<number | null> {
  const { user } = await getCurrentSession();

  const record = await prisma.board.create({
    data: { ...board, user: { connect: { id: user?.id } } },
    select: { id: true },
  });

  return record.id;
}

export async function updateBoard(board: Board): Promise<Board | null> {
  const { user } = await getCurrentSession();
  const { id, ...updateBoard } = board;
  const updatedBoard = await prisma.board.update({
    where: { id, userId: user?.id },
    data: {
      ...updateBoard,
    },
  });

  return updatedBoard;
}

export async function deleteBoard(board: Board): Promise<Board | null> {
  const { user } = await getCurrentSession();

  const deleted = await prisma.board.delete({
    where: { id: board.id, userId: user?.id },
  });

  return deleted;
}

export async function getBoardsCount(): Promise<number> {
  const { user } = await getCurrentSession();

  const count = await prisma.board.count({
    where: { userId: user?.id },
  });

  return count;
}

export async function getBoards(sort: string, perPage: number = 10): Promise<Board[] | null> {
  const { user } = await getCurrentSession();

  const boards = await prisma.board.findMany({
    where: { userId: user?.id },
    take: perPage,
  });

  return boards.sort((a, b) => {
    switch (sort) {
      case 'created_desc':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'created_asc':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'updated_desc':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'updated_asc':
        return a.updatedAt.getTime() - b.updatedAt.getTime();
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
}

export async function setUserBoardsSort(sort: string): Promise<void> {
  const { user } = await getCurrentSession();
  await prisma.user.update({
    where: { id: user?.id },
    data: { sortBoardsBy: sort },
  });
}

export async function getBoard(boardId: number): Promise<Board | null> {
  const { user } = await getCurrentSession();

  const board = await prisma.board.findFirst({
    where: { id: boardId, userId: user?.id },
  });
  return board;
}

export async function saveImage(
  boardId: number,
  imageUrl: string,
  existentFileName?: string | null
): Promise<string | null> {
  try {
    const { user } = await getCurrentSession();

    if (!isBase64(imageUrl) && !isUrl(imageUrl)) {
      throw new Error(
        'Invalid image format. Must be a valid URL or Base64 string.'
      );
    }

    if (existentFileName && fs.existsSync(existentFileName)) {
      removeFile(existentFileName);
    }

    const urlKeyOrPath = await saveAndGetImageFile(imageUrl);

    await prisma.board.update({
      where: { id: boardId, userId: user?.id },
      data: { imageUrl: urlKeyOrPath },
    });

    return imageUrl;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteImage(
  boardId: number,
  filePath?: string | null
): Promise<void> {
  try {
    const { user } = await getCurrentSession();
    const removed = removeFile(filePath);
    if (removed) {
      await prisma.board.update({
        where: { id: boardId, userId: user?.id },
        data: { imageUrl: null },
      });
    }
  } catch (e) {
    console.error(e);
  }
}
