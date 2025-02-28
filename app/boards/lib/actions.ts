'use server';

import { getCurrentSession } from '@/app/login/lib/actions';
import { Board, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  imageBase64: string
): Promise<string | null> {
  try {
    const { user } = await getCurrentSession();

    await prisma.board.update({
      where: { id: boardId, userId: user?.id },
      data: { imageUrl: imageBase64 },
    });

    return imageBase64;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}

export async function deleteImage(boardId: number): Promise<void> {
  try {
    const { user } = await getCurrentSession();

    await prisma.board.update({
      where: { id: boardId, userId: user?.id },
      data: { imageUrl: null },
    });
  } catch (e: any) {
    console.error(e);
  }
}
