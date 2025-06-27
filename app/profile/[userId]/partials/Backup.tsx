'use client';

import { IconFileExport } from '@tabler/icons-react';
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
      <input type="hidden" name="userId" defaultValue={profile.id} />
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">Backup</h3>
          <div className="text-secondary">
            Save or export all your data in a JSON file, depending of your data
            it may take a while, please don&apos;t refresh in this page until
            save file dialog appears.
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
          {state?.success && state.data && (
            <>
              <textarea
                className="form-control mt-2"
                disabled={pending}
                rows={5}
                defaultValue={state.data}
              />
              <button
                type="button"
                className="btn btn-sm w-full mt-1"
                onClick={() => navigator.clipboard.writeText(state.data)}
              >
                Copy JSON
              </button>
            </>
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
            <IconFileExport /> <span className="ms-1">Download Data</span>
          </button>
        </div>
      </div>
    </form>
  );
}
