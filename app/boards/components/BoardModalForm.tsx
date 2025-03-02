'use client';

import {
  createBoard,
  deleteImage,
  saveImage,
  updateBoard,
} from '@/app/boards/lib/actions';
import { getFileToBase64 } from '@/utils/base64';
import { resizeImage } from '@/utils/image';
import { Board, Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

  const [image, setImage] = useState<string | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [removeImage, setRemoveImage] = useState(false);

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
    resizeImage(imageFile, 1920, 1080, async (resizedDataUrl) => {
      await saveImage(boardId, resizedDataUrl, board?.imageUrl);
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
    if (!removeImage) await uploadImage(data.id);
    else await deleteImage(data.id, data.imageUrl);

    router.refresh();
  };

  const closeModal = () => {
    if (closeButtonRef) {
      closeButtonRef.current?.click();
    } else {
      console.error('Close button is not available.');
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById(modalId);
    const loadImage = async () => {
      if (board?.imageUrl) {
        const image = await getFileToBase64(board?.imageUrl);
        setImage(image);
      }
    };

    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        setImage(null);
        setRemoveImage(false);
      });

      modalElement.addEventListener('show.bs.modal', () => {
        loadImage();
      });
    }

    loadImage();
  }, []);

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
              {mode === 'update' && board?.id && image && !removeImage && (
                <div className="mb-3">
                  <div className="rounded overflow-hidden border border-secondary">
                    <img
                      className="w-100 img-fluid"
                      alt={board?.title}
                      src={image}
                    ></img>
                  </div>
                  <button
                    className="btn btn-sm btn-link text-danger float-end mt-1"
                    onClick={() => {
                      setRemoveImage(true);
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
