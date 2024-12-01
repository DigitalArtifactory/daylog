'use client';

import { deleteBoard, updateBoard } from '@/app/boards/lib/script';
import { Board } from '@prisma/client';
import { useRef, useState } from 'react';
import TimeAgo from 'timeago-react';
import BoardModalForm from './modals/BoardModalForm';

type BoardCardType = {
  board: Board;
  onUpdate?: (board: Board) => void;
};

export default function BoardCard({ board, onUpdate }: BoardCardType) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [deleting, setDeleting] = useState(false);

  const handleFavoriteClick = async () => {
    board.favorite = !board.favorite;
    const updatedBoard = await updateBoard(board);
    if (updatedBoard && onUpdate) onUpdate(updatedBoard);
  };

  const handleDeleteClick = async () => {
    setDeleting(true);
    setTimeout(async () => {
      const updatedBoard = await deleteBoard(board);
      if (updatedBoard && onUpdate) onUpdate(updatedBoard);
      setDeleting(false);
      closeModal();
    }, 500);
  };

  const closeModal = () => {
    if (closeButtonRef) {
      closeButtonRef.current?.click();
    } else {
      console.error('Close button is not available.');
    }
  };

  return (
    <div className="card d-flex flex-column">
      {board.favorite && (
        <div className="ribbon ribbon-top ribbon-bookmark bg-yellow">
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
            className="icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
          </svg>
        </div>
      )}
      <a className="ratio ratio-21x9" href={`/boards/${board.id}/notes`}>
        <img
          className="card-img-top"
          src="/samples/photos/search-bg.jpg"
          alt="Book on the grass"
        />
      </a>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">
          <a href={`/boards/${board.id}/notes`}>{board.title}</a>
        </h3>
        <div className="text-secondary">{board.description}</div>
        <div className="d-flex align-items-center justify-content-between pt-4 mt-auto">
          <div className="text-secondary">
            <TimeAgo datetime={board.updatedAt} />
          </div>
          <div className="d-block">
            <a
              href="#"
              className="icon ms-3 text-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#edit-board-modal-${board.id}}`}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </a>
            <BoardModalForm
              board={board}
              modalId={`edit-board-modal-${board.id}}`}
              mode="update"
              onSubmited={(b) => {
                if (onUpdate) onUpdate(b);
              }}
            ></BoardModalForm>
            <a
              href="#"
              className="icon ms-3 text-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#delete-modal-${board.id}`}
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
            </a>
            <div
              className="modal"
              id={`delete-modal-${board.id}`}
              tabIndex={-1}
            >
              <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div className="modal-status bg-danger"></div>
                  <div className="modal-body text-center py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon mb-2 text-danger icon-lg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 9v2m0 4v.01" />
                      <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                    </svg>
                    <h3>Are you sure?</h3>
                    <div className="text-danger fw-bold">{board.title}</div>
                    <div className="text-secondary">
                      Do you really want to remove this board? What you've done
                      cannot be undone.
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="w-100">
                      <div className="row">
                        <div className="col">
                          <button
                            ref={closeButtonRef}
                            className="btn w-100"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col">
                          <button
                            disabled={deleting}
                            className={`btn btn-danger w-100 ${
                              deleting ? 'btn-loading disabled' : null
                            }`}
                            onClick={() => handleDeleteClick()}
                          >
                            Yes, delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#"
              onClick={() => handleFavoriteClick()}
              className="icon ms-3 text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
