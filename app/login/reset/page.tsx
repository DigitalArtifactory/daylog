'use client';

import { EnvelopeIcon } from '@/components/icons';
import Image from 'next/image';
import { useActionState } from 'react';
import { reset } from './lib/actions';

export default function Page() {
  const [state, action, pending] = useActionState(reset, undefined);

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
        {state?.success && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <h3 className="mb-1">Account reseted</h3>
            <p>
              Your account has been reset successfully. Please check your email
              inbox and follow the instructions.
            </p>
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
        {state?.message && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h3 className="mb-1">Could not reset</h3>
            <p>{state.message}</p>
            <a
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="close"
            ></a>
          </div>
        )}
        <form
          className="card card-md"
          action={action}
          autoComplete="off"
          noValidate={true}
        >
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Forgot password</h2>
            <p className="text-secondary mb-4">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  state?.errors?.email && 'is-invalid'
                }`}
                placeholder="Enter email"
              />
              {state?.errors?.email && (
                <div className="invalid-feedback">{state?.errors?.email}</div>
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
                <EnvelopeIcon /> Send me a new password
              </button>
            </div>
          </div>
        </form>
        <div className="text-center text-secondary mt-3">
          Never mind, <a href="/login">take me back</a> to the sign in screen.
        </div>
      </div>
    </div>
  );
}
