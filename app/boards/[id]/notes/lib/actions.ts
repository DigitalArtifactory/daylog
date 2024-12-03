'use server';

import { Note, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNote(
  boardId: number,
  note: Prisma.NoteCreateWithoutBoardsInput
): Promise<number | null> {
  const board = await prisma.board.update({
    where: { id: boardId },
    data: {
      notes: {
        create: [note],
      },
    },
    include: {
      notes: true,
    },
  });

  return board.notes.length;
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

export async function getNotes(): Promise<Note[] | null> {
  const notes = await prisma.note.findMany({ orderBy: { favorite: 'desc' } });
  return notes;
}

export async function getNote(noteId: number): Promise<Note | null> {
  const note = await prisma.note.findFirst({ where: { id: noteId } });
  return note;
}