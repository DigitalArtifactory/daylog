import { prismaMock } from '@/prisma/singleton';
import { removeFile } from '@/utils/storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createBoard,
  deleteBoard,
  deleteImage,
  getBoard,
  getBoards,
  saveImage,
  updateBoard,
} from './actions';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  removeFile: vi.fn(),
  saveBase64File: vi.fn(),
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('@/utils/storage', () => ({
  removeFile: mocks.removeFile,
  saveBase64File: mocks.saveBase64File,
}));

describe('Board Actions', () => {
  const user = { id: 1 };
  const board = { id: 1, title: 'Test Board', userId: user.id } as any;

  beforeEach(() => {
    mocks.getCurrentSession.mockResolvedValue({ user });
  });

  it('should create a board', async () => {
    prismaMock.board.create.mockResolvedValue({ id: 1 } as any);
    const result = await createBoard({ title: 'Test Board' } as any);
    expect(result).toBe(1);
    expect(prismaMock.board.create).toHaveBeenCalledWith({
      data: { title: 'Test Board', user: { connect: { id: user.id } } },
      select: { id: true },
    });
  });

  it('should update a board', async () => {
    prismaMock.board.update.mockResolvedValue(board);
    const result = await updateBoard(board);
    expect(result).toEqual(board);
    expect(prismaMock.board.update).toHaveBeenCalledWith({
      where: { id: board.id, userId: user.id },
      data: { ...board },
    });
  });

  it('should delete a board', async () => {
    prismaMock.board.delete.mockResolvedValue(board);
    const result = await deleteBoard(board);
    expect(result).toEqual(board);
    expect(prismaMock.board.delete).toHaveBeenCalledWith({
      where: { id: board.id, userId: user.id },
    });
  });

  it('should get all boards', async () => {
    prismaMock.board.findMany.mockResolvedValue([board]);
    const result = await getBoards();
    expect(result).toEqual([board]);
    expect(prismaMock.board.findMany).toHaveBeenCalledWith({
      where: { userId: user.id },
      orderBy: { favorite: 'desc' },
    });
  });

  it('should get a board by id', async () => {
    prismaMock.board.findFirst.mockResolvedValue(board);
    const result = await getBoard(board.id);
    expect(result).toEqual(board);
    expect(prismaMock.board.findFirst).toHaveBeenCalledWith({
      where: { id: board.id, userId: user.id },
    });
  });

  it('should save an image', async () => {
    const imageBase64 = 'base64string';
    const filepath = 'path/to/image';
    mocks.saveBase64File.mockReturnValue(filepath);
    prismaMock.board.update.mockResolvedValue(board);

    const result = await saveImage(board.id, imageBase64);
    expect(result).toBe(imageBase64);
    expect(mocks.saveBase64File).toHaveBeenCalledWith(imageBase64, undefined);
    expect(prismaMock.board.update).toHaveBeenCalledWith({
      where: { id: board.id, userId: user.id },
      data: { imageUrl: filepath },
    });
  });

  it('should delete an image', async () => {
    const filePath = 'path/to/image';
    mocks.removeFile.mockReturnValue(true);
    prismaMock.board.update.mockResolvedValue(board);

    await deleteImage(board.id, filePath);
    expect(removeFile).toHaveBeenCalledWith(filePath);
    expect(prismaMock.board.update).toHaveBeenCalledWith({
      where: { id: board.id, userId: user.id },
      data: { imageUrl: null },
    });
  });
});
