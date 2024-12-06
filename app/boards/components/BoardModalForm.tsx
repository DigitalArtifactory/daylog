'use client';

import { createBoard, saveImage, updateBoard } from '@/app/boards/lib/actions';
import { resizeImage } from '@/utils/image';
import { Board, Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type BoardModalFormType = {
  modalId: string;
  board?: Board | null;
  mode: 'update' | 'create';
};

export default function BoardModalForm({
  modalId,
  board,
  mode,
}: BoardModalFormType) {
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
  } = useForm<Board>();

  const onSubmit: SubmitHandler<Board> = (data) => {
    setSubmiting(true);
    setTimeout(() => {
      mode == 'create' ? createBoardHandler(data) : updateBoardHandler(data);
      setSubmiting(false);
      closeModal();
      formRef.current?.reset();
    }, 500);
  };

  async function uploadImage(boardId: number | null) {
    if (!imageFile || !boardId) return;
    resizeImage(imageFile, 420, 140, async (resizedDataUrl) => {
      await saveImage(boardId, resizedDataUrl);
      router.refresh();
    });
  }

  const createBoardHandler = async (data: Board) => {
    const board: Prisma.BoardCreateInput = {
      title: data.title,
      description: data.description,
      user: { connect: { id: 1 } },
    };

    const boardId = await createBoard(board);

    await uploadImage(boardId);

    router.refresh();
  };

  const updateBoardHandler = async (data: Board) => {
    if (!board?.id) return;

    data.id = board?.id;

    await updateBoard(data);
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === 'create' ? 'Create board' : 'Update board'}
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
                  placeholder="Your board title"
                  defaultValue={board?.title}
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <div className="invalid-feedback">Title is required</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type any description"
                  defaultValue={board?.description ?? ''}
                  {...register('description')}
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
