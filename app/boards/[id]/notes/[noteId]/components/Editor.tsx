'use client';

import { useEffect, useRef, useState } from 'react';
import { getNote } from '../../lib/actions';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useTheme } from 'next-themes';

type EditorType = {
  noteId: number;
  onUpdate?: (content: string, callback: () => void) => void;
};

export default function Editor({ noteId, onUpdate }: EditorType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { theme } = useTheme();

  const handleChange = (value: string) => {
    localStorage.setItem(`note-${noteId}`, value);
    if (value === markdown) return;
    saveContent(value);
  };

  function saveContent(content: string) {
    setMarkdown(content);
    setIsSaving(true);
    if (onUpdate)
      onUpdate(content, () => {
        setIsSaving(false);
      });
  }

  useEffect(() => {
    const loadNote = async () => {
      const note = await getNote(noteId);
      if (note) {
        setMarkdown(note.content);
      }
    };
    loadNote();

    window.addEventListener('storage', (event) => {
      if (event.key === `note-${noteId}`) {
        const storedContent = localStorage.getItem(`note-${noteId}`);
        if (storedContent !== null) {
          setMarkdown(storedContent);
          if (textareaRef.current) {
            textareaRef.current.value = storedContent;
          }
        }
      }
    });
  }, [noteId]);

  return (
    <div className="relative" data-color-mode={theme}>
      <MDEditor
        height={620}
        minHeight={620}
        autoFocus={true}
        value={markdown ?? ''}
        onChange={(value) => handleChange(value ?? '')}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      {isSaving && (
        <div className='bg-primary pulse' aria-label='Saving changes...' title='Saving changes...' style={{
          position: 'absolute',
          top: -5,
          left: -5,
          width: 12,
          height: 12,
          borderRadius: '50%',
          zIndex: 9999,
          animation: 'pulse 2s infinite',
          cursor: 'pointer',
        }}></div>
      )}
    </div>
  );
}
