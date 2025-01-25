'use client';

import { useActionState } from 'react';
import { backupData } from '../lib/actions';

type BackupType = {
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function Backup({ profile }: BackupType) {
  const [state, action, pending] = useActionState(backupData, undefined);
  return (
    <form action={action}>
      <input type="hidden" name="id" value={profile.id} />
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">Backup</h3>
          <div className="text-secondary">
            Save or export all your data in a JSON file, depending of your data
            it may take a while, please don't refresh in this page until save
            file dialog appears.
          </div>
          {!state?.success && state?.message && (
            <div
              className="alert alert-important alert-danger alert-dismissible mt-2"
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
        </div>
        <div className="card-body">
          <button
            disabled={pending}
            type="submit"
            className={`btn btn-primary ${
              pending ? 'btn-loading disabled' : null
            }`}
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-file-export"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
            </svg>
            Download Data
          </button>
        </div>
      </div>
    </form>
  );
}
