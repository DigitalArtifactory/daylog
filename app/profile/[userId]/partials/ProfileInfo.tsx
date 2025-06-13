'use client';

import { SaveIcon } from '@/components/icons';
import { User } from '@/prisma/generated/client';
import { useActionState } from 'react';
import { updateProfile } from '../lib/actions';
import { useTranslations } from 'next-intl';

type ProfileInfoType = {
  profile: User;
};

export default function ProfileInfo({ profile }: ProfileInfoType) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  const t = useTranslations('profilePage.profileSection');

  return (
    <form action={action}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{t('title')}</h3>
          <div className="textsecondary">{t('description')}</div>
          <div className="d-flex align-items-center pt-4 mt-auto">
            <div className="w-full row">
              <div className="col-md-4 ms-3">
                <input type="hidden" name="id" value={profile.id ?? 0} />
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue={
                      typeof state?.data?.name === 'string'
                        ? state.data.name
                        : profile.name ?? ''
                    }
                    placeholder={t('namePlaceholder')}
                  />
                  {state?.errors?.name && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.name}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    defaultValue={
                      typeof state?.data?.email === 'string'
                        ? state.data.email
                        : profile.email ?? ''
                    }
                    placeholder={t('emailPlaceholder')}
                  />
                  {state?.errors?.email &&
                    state?.errors?.email.map((e, i) => (
                      <div key={i} className="invalid-feedback">
                        {e}
                      </div>
                    ))}
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
              className="alert alert-important alert-sucess alert-dismissible"
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
            <SaveIcon /> {t('saveButton')}
          </button>
        </div>
      </div>
    </form>
  );
}
