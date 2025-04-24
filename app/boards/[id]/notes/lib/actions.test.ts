import { prisma } from '@/prisma/client';
import { prismaMock } from '@/prisma/singleton';
import { removeFile, saveBase64File } from '@/utils/storage';
import { Note } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createNote,
  deleteImage,
  deleteNote,
  getNote,
  getNotes,
  saveImage,
  updateNote,
} from './actions';

const mocks = vi.hoisted(() => ({
  removeFile: vi.fn(),
  saveBase64File: vi.fn(),
  getCurrentSession: vi.fn(),
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('@/utils/storage', () => ({
  removeFile: mocks.removeFile,
  saveBase64File: mocks.saveBase64File,
}));

describe('Note Actions', () => {
  let user: { id: number };

  beforeEach(() => {
    user = { id: 1 };
    vi.clearAllMocks();
    mocks.getCurrentSession.mockResolvedValue({ user });
  });

  it('should create a note', async () => {
    const data = { title: 'Test Note', content: 'Test Content' };
    const boardId = 1;
    const noteId = 1;

    prismaMock.note.create.mockResolvedValue({ id: noteId } as Note);

    const result = await createNote(data, boardId);

    expect(result).toBe(noteId);
    expect(prisma.note.create).toHaveBeenCalledWith({
      data: {
        title: data.title,
        content: data.content,
        boards: { connect: { id: boardId, userId: user.id } },
      },
    });
  });

  it('should update a note', async () => {
    const note: Partial<Note> = {
      id: 1,
      title: 'Updated Note',
      content: 'Updated Content',
    };

    prismaMock.note.update.mockResolvedValue(note as Note);

    const result = await updateNote(note as Note);

    expect(result).toEqual(note);
    expect(prisma.note.update).toHaveBeenCalledWith({
      where: { id: note.id, boards: { userId: user.id } },
      data: { ...note },
    });
  });

  it('should delete a note', async () => {
    const note: Partial<Note> = { id: 1 };

    prismaMock.note.delete.mockResolvedValue(note as Note);

    const result = await deleteNote(note as Note);

    expect(result).toEqual(note);
    expect(prisma.note.delete).toHaveBeenCalledWith({
      where: { id: note.id, boards: { userId: user.id } },
    });
  });

  it('should get notes', async () => {
    const boardId = 1;
    const notes: Partial<Note>[] = [
      { id: 1, title: 'Note 1' },
      { id: 2, title: 'Note 2' },
    ];

    prismaMock.note.findMany.mockResolvedValue(notes as Note[]);

    const result = await getNotes(boardId);

    expect(result).toEqual(notes);
    expect(prismaMock.note.findMany).toHaveBeenCalledWith({
      where: { boardsId: boardId, boards: { userId: user.id } },
      orderBy: { favorite: 'desc' },
    });
  });

  it('should get a note', async () => {
    const noteId = 1;
    const note: Partial<Note> = { id: noteId, title: 'Note 1' };

    prismaMock.note.findFirst.mockResolvedValue(note as Note);

    const result = await getNote(noteId);

    expect(result).toEqual(note);
    expect(prisma.note.findFirst).toHaveBeenCalledWith({
      where: { id: noteId, boards: { userId: user.id } },
    });
  });

  it('should save an image from file', async () => {
    const noteId = 1;
    const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
    const filepath = 'path/to/image';

    mocks.saveBase64File.mockReturnValue(filepath);
    prismaMock.note.update.mockResolvedValue({} as Note);

    const result = await saveImage(noteId, imageBase64);

    expect(result).toBe(imageBase64);
    expect(saveBase64File).toHaveBeenCalledWith(imageBase64);
    expect(prisma.note.update).toHaveBeenCalledWith({
      where: { id: noteId, boards: { userId: user.id } },
      data: { imageUrl: filepath },
    });
  });

  it('should save an image from url', async () => {
    const noteId = 1;
    const fileurl = 'http://example.com/image.jpg';

    prismaMock.note.update.mockResolvedValue({} as Note);

    const result = await saveImage(noteId, fileurl);

    expect(result).toBe(fileurl);
    expect(prisma.note.update).toHaveBeenCalledWith({
      where: { id: noteId, boards: { userId: user.id } },
      data: { imageUrl: fileurl },
    });
  });

  it('should delete an image', async () => {
    const noteId = 1;
    const filePath = 'path/to/image';

    mocks.removeFile.mockReturnValue(true);
    prismaMock.note.update.mockResolvedValue({} as Note);

    await deleteImage(noteId, filePath);

    expect(removeFile).toHaveBeenCalledWith(filePath);
    expect(prisma.note.update).toHaveBeenCalledWith({
      where: { id: noteId, boards: { userId: user.id } },
      data: { imageUrl: null },
    });
  });
});
