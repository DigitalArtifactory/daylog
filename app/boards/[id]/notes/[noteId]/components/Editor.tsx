'use client';

import { Note, Picture } from '@/prisma/generated/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  savePicture,
  updateNote,
  getPictures,
  deletePicture,
  deleteImage,
} from '../../lib/actions';
import Image from 'next/image';
import { getImageUrlOrFile, resizeImage } from '@/utils/image';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useTheme } from 'next-themes';
import { IconPhotoPlus, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type NoteEditorType = {
  note: Note;
};

export default function Editor({ note }: NoteEditorType) {
  const router = useRouter();

  const [markdown, setMarkdown] = useState(note.content ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === `note-${note.id}`) {
        const storedContent = localStorage.getItem(`note-${note.id}`);
        if (storedContent !== null) {
          setMarkdown(storedContent);
        }
      }
    });

    const loadPictures = async () => {
      const pictures = await getPictures(note.id) ?? [];
      setPictures(pictures);
    };

    loadPictures();
  }, [note.id]);

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const updateNoteHandler = useCallback(async (content: string) => {
    if (!note) return;
    note.content = content;
    if (note) await updateNote(note);
  }, [note]);

  const debounceSave = useCallback(
    (content: string, callback: () => void) => {
      // Clear the previous timer
      if (debounceTimer) clearTimeout(debounceTimer);

      // Set a new timer
      const timeout = setTimeout(() => {
        updateNoteHandler(content);
        callback();
      }, 1000); // Waits for 1 second of inactivity before saving

      setDebounceTimer(timeout);
    },
    [updateNoteHandler, debounceTimer]
  );

  const saveContent = useCallback(
    (content: string) => {
      localStorage.setItem(`note-${note.id}`, content);
      setIsSaving(true);
      debounceSave(content, () => {
        setIsSaving(false);
      });
    },
    [note.id, debounceSave]
  );

  useEffect(() => {
    if (markdown !== localStorage.getItem(`note-${note.id}`)) {
      saveContent(markdown);
    }
  }, [markdown, note.id, saveContent]);

  const handlePlaceImage = (imageUrl: string) => {
    const textarea = document.getElementsByClassName(
      'w-md-editor-text-input'
    )[0] as HTMLTextAreaElement;
    const leftContent = markdown.substring(0, textarea.selectionStart);
    const rightContent = markdown.substring(textarea.selectionStart);
    const newContent =
      leftContent + '![alt text](' + imageUrl + ')' + rightContent;

    setMarkdown(newContent);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      resizeImage(file, 1920, 1080, async (resizedDataUrl) => {
        const imageUrl = await savePicture(note.id, resizedDataUrl);
        if (!imageUrl) return;
        router.prefetch(`/boards/${note.boardsId}/notes/${note.id}`);
        router.refresh();
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeletePicture = async (pictureId: number) => {
    try {
      await deletePicture(note.id, pictureId);
      router.prefetch(`/boards/${note.boardsId}/notes/${note.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error deleting picture:', error);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="card mt-2">
        <div className="card-body p-0 border-0 h-auto">
          <div className="relative" data-color-mode={theme}>
            <MDEditor
              data-testid="editor"
              height={480}
              minHeight={480}
              autoFocusEnd={true}
              value={markdown}
              onChange={(value) => setMarkdown(value ?? '')}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
            {isSaving && (
              <div
                className="bg-primary pulse"
                aria-label="Saving changes..."
                title="Saving changes..."
                style={{
                  position: 'absolute',
                  top: -5,
                  left: -5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  zIndex: 9999,
                  animation: 'pulse 2s infinite',
                  cursor: 'pointer',
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <div className="card-body">
          <h3 className="card-title">Pictures</h3>
          <div className="text-secondary">
            Click a picture to place it in the editor at the cursor position.
          </div>
          <div className="row row-cols-2 row-cols-md-6 row-cols-lg-8 pt-4">
            {note &&
              note.imageUrl &&
              PicturePreview({
                imageUrl: note.imageUrl,
                onClick: () => {
                  handlePlaceImage(getImageUrlOrFile(note.imageUrl!));
                },
                onDelete: async () => {
                  await deleteImage(note.id, note.imageUrl);
                  router.prefetch(`/boards/${note.boardsId}/notes/${note.id}`);
                  router.refresh();
                },
              })}
            {pictures.map((picture, key) => (
              <PicturePreview
                key={key}
                pictureId={picture.id}
                onDelete={() => handleDeletePicture(picture.id)}
                imageUrl={picture.imageUrl}
                onClick={() => {
                  handlePlaceImage(getImageUrlOrFile(picture.imageUrl));
                }}
              />
            ))}
          </div>

          {pictures.length === 0 && (
            <div className="d-flex gap-2 align-items-center text-muted w-full">
              <div>No pictures</div>
            </div>
          )}
        </div>
        <div className="card-body">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="d-none"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="me-1">
              <IconPhotoPlus />
            </span>
            Add picture
          </button>
        </div>
      </div>
    </div>
  );
}

const PicturePreview = ({
  pictureId,
  imageUrl,
  onClick,
  onDelete,
}: {
  pictureId?: number | null;
  imageUrl: string;
  onClick: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="col position-relative">
      <div
        className="position-absolute top-0 end-0 z-1 bg-dark rounded-circle me-3 mt-1 cursor-pointer text-light"
        onClick={onDelete}
      >
        <IconX />
      </div>
      <div
        data-testid={`picture-preview-${pictureId ?? 'default'}`}
        role="button"
        onClick={onClick}
        className="ratio ratio-1x1 rounded-4 overflow-hidden cursor-pointer"
      >
        <Image
          width={140}
          height={140}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={getImageUrlOrFile(imageUrl)}
          alt="Note image preview"
          priority={false}
          placeholder="blur"
          blurDataURL={getImageUrlOrFile(imageUrl)}
        ></Image>
      </div>
    </div>
  );
};
