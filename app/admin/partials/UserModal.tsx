'use client';

import { signup } from '@/app/register/lib/actions';
import { AddIcon, ViewIcon } from '@/components/icons';
import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function UserModal() {
  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);

  const t = useTranslations('adminPage');

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
      >
        <AddIcon />
        {t('usersSection.actions.create')}
      </button>
      <div className="modal fade" id="userModal" tabIndex={-1}>
        <form autoComplete="off" action={action}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('usersSection.modalCreate.title')}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">{t('usersSection.modalCreate.nameLabel')}</label>
                  <input
                    name="name"
                    defaultValue={state?.data?.name?.toString()}
                    className={`form-control ${
                      state?.errors?.name && 'is-invalid'
                    }`}
                    placeholder={t('usersSection.modalCreate.namePlaceholder')}
                  />
                  {state?.errors?.name && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.name}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">{t('usersSection.modalCreate.emailLabel')}</label>
                  <input
                    name="email"
                    defaultValue={state?.data?.email?.toString()}
                    className={`form-control ${
                      state?.errors?.email && 'is-invalid'
                    }`}
                    placeholder={t('usersSection.modalCreate.emailPlaceholder')}
                  />
                  {state?.errors?.email &&
                    state?.errors?.email.map((e, i) => (
                      <div key={i} className="invalid-feedback">
                        {e}
                      </div>
                    ))}
                </div>
                <div className="mb-3">
                  <label className="form-label">{t('usersSection.modalCreate.passwordLabel')}</label>
                  <div className="input-group input-group-flat">
                    <input
                      type="password"
                      name="password"
                      defaultValue={state?.data?.password?.toString()}
                      className={`form-control ${
                        state?.errors?.password && 'border-danger'
                      }`}
                      placeholder={t('usersSection.modalCreate.passwordPlaceholder')}
                      autoComplete="off"
                    />
                    <span
                      className={`input-group-text  ${
                        state?.errors?.password && 'border-danger'
                      }`}
                    >
                      <a
                        href="#"
                        className="link-secondary"
                        data-bs-toggle="tooltip"
                        aria-label="Show password"
                        data-bs-original-title="Show password"
                      >
                        <ViewIcon />
                      </a>
                    </span>
                  </div>

                  {state?.errors?.password &&
                    state.errors.password.map((e, i) => (
                      <div
                        key={i}
                        className="invalid-feedback d-block"
                        role="alert"
                      >
                        {e}
                      </div>
                    ))}

                  {state?.message && (
                    <div
                      className="alert alert-danger alert-important alert-dismissible mt-3"
                      role="alert"
                    >
                      <h3 className="mb-1">{t('usersSection.modalCreate.accountNotCreated')}</h3>
                      <p>{state.message}</p>
                      <a
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="close"
                      ></a>
                    </div>
                  )}
                </div>
                <input name="terms" type="hidden" value="accept"></input>
              </div>
              <div className="modal-footer">
                <a
                  href="#"
                  className="btn btn-link link-secondary"
                  data-bs-dismiss="modal"
                >
                  {t('usersSection.actions.cancelModal')}
                </a>
                <button
                  type="submit"
                  className={`btn btn-primary ms-auto ${
                    pending ? 'btn-loading disabled' : null
                  }`}
                  disabled={pending}
                >
                  {t('usersSection.actions.createModal')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
