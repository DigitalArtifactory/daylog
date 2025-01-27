'use client';

import { useActionState } from 'react';
import { deleteAccount } from '../lib/actions';

type BackupType = {
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function DangerZone({ profile }: BackupType) {
  const [state, action, pending] = useActionState(deleteAccount, undefined);
  return (
    <form action={action}>
      <input type="hidden" name="userId" defaultValue={profile.id} />
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title text-danger">Danger Zone</h3>
          <div className="text-secondary">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>
        </div>
        <div className="card-body">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
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
            Delete Account
          </button>
          <div className="modal" id="delete-modal" tabIndex={-1}>
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
                  <div className="text-secondary">
                    Do you really want to delete your account? What you've done
                    cannot be undone.
                  </div>
                  {!state?.success && state?.message && (
                    <div
                      className="alert alert-important alert-danger alert-dismissible mt-1"
                      role="alert"
                    >
                      <div>{state.message}</div>
                      <a
                        className="btn-close btn-close-white"
                        data-bs-dismiss="alert"
                        aria-label="close"
                      ></a>
                    </div>
                  )}
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Your password is required"
                    />
                    {state?.errors?.password && (
                      <div className="invalid-feedback d-block" role="alert">
                        {state?.errors?.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="w-100">
                    <div className="row">
                      <div className="col">
                        <a
                          href="#"
                          className="btn w-100"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </a>
                      </div>
                      <div className="col">
                        <button
                          disabled={pending}
                          type="submit"
                          className={`btn btn-danger w-full ${
                            pending ? 'btn-loading disabled' : null
                          }`}
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
        </div>
      </div>
    </form>
  );
}
