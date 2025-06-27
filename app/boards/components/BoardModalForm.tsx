'use client';

import {
  createBoard,
  deleteImage,
  saveImage,
  updateBoard,
} from '@/app/boards/lib/actions';
import { Board, Prisma } from '@/prisma/generated/client';
import { getImageUrlOrFile, resizeImage } from '@/utils/image';
import { IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UnsplashImagesDropdown from './UnsplashImagesDropdown';

type BoardModalFormType = {
  modalId: string;
  board?: Board | null;
  mode: 'update' | 'create';
  isUnsplashAllowed?: boolean;
};

export default function BoardModalForm({
  modalId,
  board,
  mode,
  isUnsplashAllowed = false,
}: BoardModalFormType) {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [submiting, setSubmiting] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Board>();

  const onSubmit: SubmitHandler<Board> = (data) => {
    setSubmiting(true);

    if (mode === 'create') {
      createBoardHandler(data);
    } else {
      updateBoardHandler(data);
    }

    setSubmiting(false);
    closeModal();
    formRef.current?.reset();
    setImageFile(undefined);
    setImageUrl('');
  };

  async function uploadImage(boardId: number | null) {
    if ((!imageFile && !imageUrl) || !boardId) return;
    if (imageFile) {
      resizeImage(imageFile, 1920, 1080, async (resizedDataUrl) => {
        await saveImage(boardId, resizedDataUrl, board?.imageUrl);
        router.refresh();
      });
    } else {
      await saveImage(boardId, imageUrl, board?.imageUrl);
      router.refresh();
    }
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
    <div className="modal fade" id={modalId} tabIndex={-1}>
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
                {isUnsplashAllowed && (
                  <div className="mb-2">
                    <UnsplashImagesDropdown
                      imageSelected={(imageUrl) => setImageUrl(imageUrl)}
                    />
                  </div>
                )}
                {mode === 'update' && board?.id && board.imageUrl && (
                  <div className="mb-3">
                    <div className="border border-secondary rounded w-100">
                      <Image
                        width="800"
                        height="0"
                        src={getImageUrlOrFile(board.imageUrl)}
                        alt={`Preview image of ${board.title}`}
                        style={{
                          width: 'auto',
                          height: 'auto',
                        }}
                        priority={false}
                      ></Image>
                    </div>
                    <button
                      className="btn btn-link btn-sm float-end text-danger mt-1"
                      onClick={async () => {
                        await deleteImage(board.id, board.imageUrl);
                      }}
                    >
                      <IconTrash /> Remove image
                    </button>
                  </div>
                )}
                <label htmlFor="image" className="form-label">
                  Select image from your device{' '}
                  <span className="text-secondary">(optional)</span>
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
