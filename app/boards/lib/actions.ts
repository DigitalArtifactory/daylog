'use server';

import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import { Board, Prisma } from '@/prisma/generated/client';
import { removeFile, saveBase64File } from '@/utils/storage';
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
  const {id, ...updateBoard} = board;
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

export async function getBoards(): Promise<Board[] | null> {
  const { user } = await getCurrentSession();

  const boards = await prisma.board.findMany({
    where: { userId: user?.id },
    orderBy: { favorite: 'desc' },
  });
  return boards;
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

    let urlOrFilepath = isUrl(imageUrl) ? imageUrl : null;
    if (isBase64(imageUrl)) urlOrFilepath = saveBase64File(imageUrl);

    await prisma.board.update({
      where: { id: boardId, userId: user?.id },
      data: { imageUrl: urlOrFilepath },
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
