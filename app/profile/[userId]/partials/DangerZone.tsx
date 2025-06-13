'use client';

import { TrashIcon, WarningIcon } from '@/components/icons';
import { useActionState } from 'react';
import { deleteAccount } from '../lib/actions';
import { useTranslations } from 'next-intl';

type BackupType = {
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function DangerZone({ profile }: BackupType) {
  const [state, action, pending] = useActionState(deleteAccount, undefined);

  const t = useTranslations();

  return (
    <form action={action}>
      <input type="hidden" name="userId" defaultValue={profile.id} />
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title text-danger">{t('profilePage.dangerZoneSection.title')}</h3>
          <div className="text-secondary">
            {t('profilePage.dangerZoneSection.description')}
          </div>
        </div>
        <div className="card-body">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
          >
            <TrashIcon /> {t('profilePage.dangerZoneSection.deleteButton')}
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
                  <WarningIcon />
                  <h3>{t('deleteModal.title')}</h3>
                  <div className="text-secondary">
                    {t('deleteModal.description')}
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
                      placeholder={t('deleteModal.passwordPlaceholder')}
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
                          {t('deleteModal.cancel')}
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
                          {t('deleteModal.confirm')}
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
