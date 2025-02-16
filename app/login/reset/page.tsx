'use client';

import { useActionState } from 'react';
import reset from './lib/actions';

export default function Page() {
  const [state, action, pending] = useActionState(reset, undefined);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img
              src="/logo.svg"
              width="220"
              height="64"
              alt={'daylog'}
              className="navbar-brand-image"
            />
          </a>
        </div>
        {state?.success && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <h3 className="mb-1">Account reseted</h3>
            <p>
              Your account has been reseted successfuly, check your email inbox
              and follow the instructions.
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
            <h2 className="card-title text-center mb-4">Forgot password</h2>
            <p className="text-secondary mb-4">
              Enter your email address and your password will be reset and
              emailed to you.
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
                Send me new password
              </button>
            </div>
          </div>
        </form>
        <div className="text-center text-secondary mt-3">
          Forget it, <a href="/login">send me back</a> to the sign in screen.
        </div>
      </div>
    </div>
  );
}
