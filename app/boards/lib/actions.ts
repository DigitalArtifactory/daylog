'use server';

import prisma from '@/app/lib/prisma';
import { getCurrentSession } from '@/app/login/lib/actions';
import { removeFile, saveBase64File } from '@/utils/storage';
import { Board, Prisma } from '@prisma/client';

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

  const updatedBoard = await prisma.board.update({
    where: { id: board.id, userId: user?.id },
    data: {
      ...board,
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
  imageBase64: string,
  existentFileName?: string | null
): Promise<string | null> {
  try {
    const { user } = await getCurrentSession();
    const filepath = saveBase64File(imageBase64, existentFileName);
    await prisma.board.update({
      where: { id: boardId, userId: user?.id },
      data: { imageUrl: filepath },
    });

    return imageBase64;
  } catch (e: any) {
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
  } catch (e: any) {
    console.error(e);
  }
}
