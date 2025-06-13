'use client';

import { ExportIcon } from '@/components/icons';
import { useActionState } from 'react';
import { backupData } from '../lib/actions';
import { useTranslations } from 'next-intl';

type BackupType = {
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function Backup({ profile }: BackupType) {
  const [state, action, pending] = useActionState(backupData, undefined);

  const t = useTranslations('profilePage.backupSection');

  return (
    <form action={action}>
      <input type="hidden" name="userId" defaultValue={profile.id} />
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">{t('title')}</h3>
          <div className="text-secondary">
            {t('description')}
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
                 {t('copyButton')}
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
            <ExportIcon /> {t('downloadButton')}
          </button>
        </div>
      </div>
    </form>
  );
}
