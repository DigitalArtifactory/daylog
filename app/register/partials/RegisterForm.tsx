'use client';

import FormField from '@/components/FormField';
import Image from 'next/image';
import { useActionState } from 'react';
import { signup } from '../lib/actions';

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <Image
              src="/daylog.svg"
              width="110"
              height="32"
              alt={'daylog'}
              className="navbar-brand-image"
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
        {state?.success && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <h3 className="mb-1">Account created</h3>
            <p>Your account has been created successfuly</p>
            <div className="btn-list">
              <a href="/login" className="btn btn-success">
                Go to login
              </a>
            </div>
            <a
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="close"
            ></a>
          </div>
        )}
        <form autoComplete="off" className="card card-md" action={action}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Account registration
            </h2>
            <FormField
              label="Name"
              name="name"
              placeholder="Enter name"
              defaultValue={state?.data?.name?.toString()}
              errors={state?.errors?.name}
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter email"
              defaultValue={state?.data?.email?.toString()}
              errors={state?.errors?.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              defaultValue={state?.data?.password?.toString()}
              errors={state?.errors?.password}
            />
            <div className="mb-3">
              <label className="form-check">
                <input
                  name="terms"
                  type="checkbox"
                  defaultChecked={state?.data?.terms?.toString() === 'on'}
                  className="form-check-input"
                />
                <span className="form-check-label">
                  Agree the{' '}
                  <a href="/register/terms" tabIndex={-1}>
                    terms and policy
                  </a>
                  .
                </span>
              </label>
              {state?.errors?.terms && (
                <div className="invalid-feedback d-block" role="alert">
                  {state?.errors?.terms}
                </div>
              )}
            </div>
            <div className="form-footer">
              <button
                disabled={pending}
                type="submit"
                className={`btn btn-primary w-100 ${
                  pending ? 'btn-loading disabled' : null
                }`}
              >
                Create new account
              </button>
            </div>
          </div>
        </form>
        <div className="text-center text-secondary mt-3">
          Already have account?{' '}
          <a href="./login" tabIndex={-1}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
