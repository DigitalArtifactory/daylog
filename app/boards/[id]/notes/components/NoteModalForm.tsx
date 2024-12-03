'use client';

import { Note, Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNote, updateNote } from '../lib/actions';

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    setSubmiting(true);
    setTimeout(() => {
      mode == 'create' ? createNoteHandler(data) : updateNoteHandler(data);
      setSubmiting(false);
      closeModal();
      formRef.current?.reset();
    }, 500);
  };

  const createNoteHandler = async (data: Note) => {
    const note: Prisma.NoteCreateWithoutBoardsInput = {
      title: data.title,
      content: data.content,
    };

    await createNote(boardId, note);
    router.refresh();
  };

  const updateNoteHandler = async (data: Note) => {
    if (!note?.id) return;

    data.id = note?.id;

    await updateNote(data);
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
                <label className="form-label">Image</label>
                <input
                  defaultValue={''}
                  type="file"
                  className="form-control"
                  name="image"
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
