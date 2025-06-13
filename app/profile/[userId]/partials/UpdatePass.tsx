'use client';

import { SecurityIcon } from '@/components/icons';
import { useActionState } from 'react';
import { updatePassword } from '../lib/actions';
import { useTranslations } from 'next-intl';

type UpdatePassType = {
  userId: number | null;
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function UpdatePass({ userId, profile }: UpdatePassType) {
  const [state, action, pending] = useActionState(updatePassword, undefined);

  const t = useTranslations('profilePage.passwordSection');

  return (
    <form action={action}>
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">{t('title')}</h3>
          <div className="text-secondary">
            {t('description')}
          </div>
          <div className="d-flex align-items-center pt-4 mt-auto">
            <div className="w-full row">
              <div className="col-md-4 ms-3">
                <input type="hidden" name="id" value={profile.id} />
                {profile.id === userId && (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="current">
                      {t('currentLabel')}
                    </label>
                    <input
                      id="current"
                      type="password"
                      name="current"
                      className="form-control"
                      placeholder={t('currentPlaceholder')}
                    />
                    {state?.errors?.current && (
                      <div className="invalid-feedback d-block" role="alert">
                        {state?.errors?.current}
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    {t('newLabel')}
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    defaultValue={state?.data?.password?.toString()}
                    placeholder={t('newPlaceholder')}
                  />
                  {state?.errors?.password && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.password}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="confirm">
                    {t('confirmLabel')}
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    name="confirm"
                    className="form-control"
                    placeholder={t('confirmPlaceholder')}
                  />
                  {state?.errors?.confirm && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.confirm}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="ms-auto"></div>
          </div>
          {!state?.success && state?.message && (
            <div
              className="alert alert-important alert-danger alert-dismissible"
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
          {state?.success && state?.message && (
            <div
              className="alert alert-important alert-success alert-dismissible"
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
            <SecurityIcon /> {t('saveButton')}
          </button>
        </div>
      </div>
    </form>
  );
}
