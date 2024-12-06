'use server';

import { Board, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBoard(
  board: Prisma.BoardCreateInput
): Promise<number | null> {
  const record = await prisma.board.create({
    data: { ...board },
    select: { id: true },
  });

  return record.id;
}

export async function updateBoard(board: Board): Promise<Board | null> {
  const updatedBoard = await prisma.board.update({
    where: { id: board.id },
    data: {
      ...board,
    },
  });

  return updatedBoard;
}

export async function deleteBoard(board: Board): Promise<Board | null> {
  const deleted = await prisma.board.delete({
    where: { id: board.id },
  });

  return deleted;
}

export async function getBoards(): Promise<Board[] | null> {
  const boards = await prisma.board.findMany({ orderBy: { favorite: 'desc' } });
  return boards;
}

export async function getBoard(boardId: number): Promise<Board | null> {
  const board = await prisma.board.findFirst({ where: { id: boardId } });
  return board;
}

export async function saveImage(
  boardId: number,
  imageBase64: string
): Promise<string | null> {
  try {
    await prisma.board.update({
      where: { id: boardId },
      data: { imageUrl: imageBase64 },
    });

    return imageBase64;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}