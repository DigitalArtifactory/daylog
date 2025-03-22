'use client';

import { resizeImage } from '@/utils/image';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNote, deleteImage, saveImage, updateNote } from '../lib/actions';

type NoteModalFormType = {
  modalId: string;
  boardId: number | null;
  note?: Note | null;
  mode: 'update' | 'create';
};

export default function NoteModalForm({
  modalId,
  boardId,
  note,
  mode,
}: NoteModalFormType) {
  if (!boardId) {
    return <></>;
  }

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [submiting, setSubmiting] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    setSubmiting(true);
    setTimeout(() => {
      mode == 'create'
        ? createNoteHandler(data, boardId)
        : updateNoteHandler(data);
      setSubmiting(false);
      closeModal();
      formRef.current?.reset();
    }, 500);
  };

  async function uploadImage(noteId: number | null) {
    if (!imageFile || !noteId) return;
    resizeImage(imageFile, 1920, 1080, async (resizedDataUrl) => {
      await saveImage(noteId, resizedDataUrl, note?.imageUrl);
      router.refresh();
    });
  }

  const createNoteHandler = async (data: Note, boardId: number) => {
    const noteId = await createNote(data, boardId);
    await uploadImage(noteId);

    router.refresh();
  };

  const updateNoteHandler = async (data: Note) => {
    await updateNote(data);
    await uploadImage(data.id);

    router.refresh();
  };

  const closeModal = () => {
    if (closeButtonRef) {
      closeButtonRef.current?.click();
    } else {
      console.error('Close button is not available.');
    }
  };

  return (
    <div className="modal" id={modalId} tabIndex={-1}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {mode === 'update' && (
          <input
            type="hidden"
            defaultValue={note?.id}
            {...register('id', { required: true, valueAsNumber: true })}
          ></input>
        )}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === 'create' ? 'Create note' : 'Update note'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                {mode === 'update' && note?.id && note.imageUrl && (
                  <div className="mb-3">
                    <div className="rounded overflow-hidden border border-secondary">
                      <img
                        className="w-100 img-fluid"
                        alt={note?.title}
                        src={`/api/v1/images?filePath=${note.imageUrl}`}
                      ></img>
                    </div>
                    <button
                      className="btn btn-sm btn-link text-danger float-end mt-1"
                      onClick={async () => {
                        await deleteImage(note.id, note.imageUrl);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                      Remove image
                    </button>
                  </div>
                )}
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0])}
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title && 'is-invalid'}`}
                  placeholder="Your note title"
                  defaultValue={note?.title}
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <div className="invalid-feedback">Title is required</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  rows={5}
                  className="form-control"
                  placeholder="Type any simple content"
                  defaultValue={note?.content ?? ''}
                  {...register('content')}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={closeButtonRef}
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={submiting}
                type="submit"
                className={`btn btn-primary ${
                  submiting ? 'btn-loading disabled' : null
                }`}
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
