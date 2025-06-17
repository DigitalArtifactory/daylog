'use client';

import FormField from '@/components/FormField';
import Image from 'next/image';
import { useActionState, useEffect } from 'react';
import { signin } from '../lib/actions';
import { useTranslations } from 'next-intl';

export default function LoginForm({ allowReg }: { allowReg: boolean }) {
  const [state, action, pending] = useActionState(signin, undefined);

  useEffect(() => {
    // Resolves Bootstrap modal issue when redirects to login from a modal.
    const modal = document.getElementsByClassName('modal-backdrop');
    if (modal.length > 0) modal[0].remove();
  }, []);

  const t = useTranslations('login');

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <Image
              src="/daylog.svg"
              width="0"
              height="0"
              alt="daylog"
              priority={true}
              className="navbar-brand-image"
              style={{ width: 'auto', height: '48px' }}
            />
          </a>
        </div>
        {state?.message && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h3 className="mb-1">{t('couldntLogIn')}</h3>
            <p>{state.message}</p>
            <a
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="close"
            ></a>
          </div>
        )}
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{t('title')}</h2>
            <form action={action} autoComplete="off" noValidate={true}>
              <FormField
                label={t('emailLabel')}
                name="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                defaultValue={state?.data?.email?.toString()}
                errors={state?.errors?.email}
                autoComplete="off"
              />
              <FormField
                label={t('passwordLabel')}
                name="password"
                type="password"
                placeholder={t('passwordPlaceholder')}
                defaultValue={state?.data?.password?.toString()}
                errors={state?.errors?.password}
                autoComplete="off"
              />
              <div className="form-footer">
                <button
                  disabled={pending}
                  type="submit"
                  className={`btn btn-primary w-100 ${
                    pending ? 'btn-loading disabled' : null
                  }`}
                >
                  {t('signInButton')}
                </button>
                <div className="text-center text-muted mt-3">
                  <a href="/login/reset" tabIndex={-1}>
                    {t('forgotPassword')}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        {allowReg && (
          <div className="text-center text-secondary mt-3">
            {t.rich('noAccount', {
              link: (chunks) => (
                <a href="/register" tabIndex={-1}>
                  {chunks}
                </a>
              ),
            })}
          </div>
        )}
      </div>
    </div>
  );
}
