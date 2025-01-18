'use client';

import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateNote } from '../../lib/actions';
import Editor from '../components/Editor';

type NoteEditorWrapperType = {
  note: Note;
};

export default function NoteEditorClientWrapper({
  note,
}: NoteEditorWrapperType) {
  const router = useRouter();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const debounceSave = (content: string, callback: () => void) => {
    // Clear the previous timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set a new timer
    var timeout = setTimeout(() => {
      updateNoteHandler(content);
      callback();
    }, 1000); // Waits for 1 second of inactivity before saving

    setDebounceTimer(timeout);
  };

  const updateNoteHandler = async (content: string) => {
    if (!note) return;
    note.content = content;
    if (note) await updateNote(note);
    router.push('?notify=saved');
  };

  return (
    <Editor
      noteId={note.id}
      onUpdate={(content, callback) => {
        debounceSave(content, callback);
      }}
    />
  );
}
