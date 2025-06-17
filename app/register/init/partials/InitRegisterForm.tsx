'use client';

import { HideIcon, ViewIcon } from '@/components/icons';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { signupInit } from '../lib/actions';
import { useTranslations } from 'next-intl';

export default function InitRegisterForm() {
  const [state, action, pending] = useActionState(signupInit, undefined);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const t = useTranslations('register');

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <Image
              src="/daylog.svg"
              width="0"
              height="0"
              alt={'daylog'}
              className="navbar-brand-image"
              style={{ width: '110px', height: 'auto' }}
            />
          </a>
        </div>
        {state?.message && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h3 className="mb-1">Account not created</h3>
            <p>{state.message}</p>
            <a
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="close"
            ></a>
          </div>
        )}
        <form autoComplete="off" className="card card-md" action={action}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">{t('title')}</h2>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                {t('name')}
              </label>
              <input
                id="name"
                name="name"
                defaultValue={state?.data?.name?.toString()}
                className={`form-control ${
                  state?.errors?.name && 'is-invalid'
                }`}
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
                {t('email')}
              </label>
              <input
                id="email"
                name="email"
                defaultValue={state?.data?.email?.toString()}
                className={`form-control ${
                  state?.errors?.email && 'is-invalid'
                }`}
                placeholder={t('emailPlaceholder')}
              />
              {state?.errors?.email &&
                state?.errors?.email.map((e, i) => (
                  <div key={i} className="invalid-feedback">
                    {e}
                  </div>
                ))}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <div className="input-group input-group-flat">
                <input
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  name="password"
                  defaultValue={state?.data?.password?.toString()}
                  className={`form-control ${
                    state?.errors?.password && 'border-danger'
                  }`}
                  placeholder={t('passwordPlaceholder')}
                  autoComplete="off"
                />
                <span
                  className={`input-group-text  ${
                    state?.errors?.password && 'border-danger'
                  }`}
                >
                  <input
                    id={'showPassword'}
                    className={'d-none'}
                    data-bs-toggle="tooltip"
                    aria-label="Show password"
                    defaultChecked={isShowPassword}
                    data-bs-original-title="Show password"
                    onChange={(e) => setIsShowPassword(e.target.checked)}
                    type={'checkbox'}
                  />
                  <label htmlFor={'showPassword'}>
                    {isShowPassword ? <ViewIcon /> : <HideIcon />}
                  </label>
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
            </div>
            <div className="mb-3">
              {t.rich('disclaimer', {
                link: (chunks) => (
                  <a href="/register/terms" tabIndex={-1} className="underline">
                    {chunks}
                  </a>
                ),
              })}
            </div>
            <div className="form-footer">
              <button
                disabled={pending}
                type="submit"
                className={`btn btn-primary w-100 ${
                  pending ? 'btn-loading disabled' : null
                }`}
              >
                {t('submit')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
