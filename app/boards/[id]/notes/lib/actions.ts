'use server';

import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import { Note, Prisma } from '@/prisma/generated/client';
import { removeFile, saveBase64File } from '@/utils/storage';
import { isBase64, isUrl } from '@/utils/text';

import fs from 'fs';

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
  const {id, ...updateNote } = note;
  const updatedNote = await prisma.note.update({
    where: { id, boards: { userId: user?.id } },
    data: {
      ...updateNote,
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

    await prisma.note.update({
      where: { id: noteId, boards: { userId: user?.id } },
      data: { imageUrl: urlOrFilepath },
    });

    return imageUrl;
  } catch (e) {
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
  } catch (e) {
    console.error(e);
  }
}
