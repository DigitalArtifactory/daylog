'use server';

import { Board, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBoard(
  userId: number,
  board: Prisma.BoardCreateWithoutUserInput
): Promise<number | null> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      boards: {
        create: [board],
      },
    },
    include: {
      boards: true,
    },
  });

  return user.boards.length;
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