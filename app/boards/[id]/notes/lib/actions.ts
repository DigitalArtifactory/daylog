'use server';

import { Note, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNote(
  note: Prisma.NoteCreateInput
): Promise<number | null> {
  const record = await prisma.note.create({ data: { ...note } });
  return record.id;
}

export async function updateNote(note: Note): Promise<Note | null> {
  const updatedNote = await prisma.note.update({
    where: { id: note.id },
    data: {
      ...note,
    },
  });

  return updatedNote;
}

export async function deleteNote(note: Note): Promise<Note | null> {
  const deleted = await prisma.note.delete({
    where: { id: note.id },
  });

  return deleted;
}

export async function getNotes(boardId: number): Promise<Note[] | null> {
  const notes = await prisma.note.findMany({
    where: { boardsId: boardId },
    orderBy: { favorite: 'desc' },
  });
  return notes;
}

export async function getNote(noteId: number): Promise<Note | null> {
  const note = await prisma.note.findFirst({ where: { id: noteId } });
  return note;
}

export async function saveImage(
  noteId: number,
  imageBase64: string
): Promise<string | null> {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: { imageUrl: imageBase64 },
    });

    return imageBase64;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}
