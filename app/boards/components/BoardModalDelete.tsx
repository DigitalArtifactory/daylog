'use client';

import { deleteBoard } from '@/app/boards/lib/actions';
import { TrashIcon, WarningIcon } from '@/components/icons';
import { Board } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type BoardModalDeleteType = {
  board: Board;
};

export default function BoardModalDelete({ board }: BoardModalDeleteType) {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = async () => {
    setDeleting(true);
    setTimeout(async () => {
      await deleteBoard(board);
      router.refresh();
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
    <>
      <a
        href="#"
        className="icon ms-3 text-light"
        data-bs-toggle="modal"
        data-bs-target={`#delete-modal-${board.id}`}
      >
        <TrashIcon />
      </a>
      <div className="modal" id={`delete-modal-${board.id}`} tabIndex={-1}>
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
              <WarningIcon />
              <h3>Are you sure?</h3>
              <div className="text-danger fw-bold">{board.title}</div>
              <div className="text-secondary">
                Do you really want to remove this board? What you&apos;ve done
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
    </>
  );
}
