'use server';

import prisma from '@/app/lib/prisma';
import { getCurrentSession } from '@/app/login/lib/actions';
import { removeFile, saveBase64File } from '@/utils/storage';
import { Note, Prisma } from '@prisma/client';

export async function createNote(
  data: Prisma.NoteCreateInput,
  boardId: number
): Promise<number | null> {
  const { user } = await getCurrentSession();
  const note: Prisma.NoteCreateInput = {
    title: data.title,
    content: data.content,
    boards: { connect: { id: boardId, userId: user?.id } },
  };

  const record = await prisma.note.create({ data: { ...note } });
  return record.id;
}

export async function updateNote(note: Note): Promise<Note | null> {
  const { user } = await getCurrentSession();
  const updatedNote = await prisma.note.update({
    where: { id: note.id, boards: { userId: user?.id } },
    data: {
      ...note,
    },
  });

  return updatedNote;
}

export async function deleteNote(note: Note): Promise<Note | null> {
  const { user } = await getCurrentSession();
  const deleted = await prisma.note.delete({
    where: { id: note.id, boards: { userId: user?.id } },
  });

  return deleted;
}

export async function getNotes(boardId: number): Promise<Note[] | null> {
  const { user } = await getCurrentSession();
  const notes = await prisma.note.findMany({
    where: { boardsId: boardId, boards: { userId: user?.id } },
    orderBy: { favorite: 'desc' },
  });
  return notes;
}

export async function getNote(noteId: number): Promise<Note | null> {
  const { user } = await getCurrentSession();
  const note = await prisma.note.findFirst({
    where: { id: noteId, boards: { userId: user?.id } },
  });
  return note;
}

export async function saveImage(
  noteId: number,
  imageBase64: string,
  existentFileName?: string | null
): Promise<string | null> {
  try {
    const { user } = await getCurrentSession();
    const filepath = saveBase64File(imageBase64, existentFileName);
    await prisma.note.update({
      where: { id: noteId, boards: { userId: user?.id } },
      data: { imageUrl: filepath },
    });

    return imageBase64;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}

export async function deleteImage(
  noteId: number,
  filePath?: string | null
): Promise<void> {
  try {
    const { user } = await getCurrentSession();
    const removed = removeFile(filePath);
    if (removed) {
      await prisma.note.update({
        where: { id: noteId, boards: { userId: user?.id } },
        data: { imageUrl: null },
      });
    }
  } catch (e: any) {
    console.error(e);
  }
}
