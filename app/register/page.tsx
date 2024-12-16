'use client';

import { useActionState } from 'react';
import { signup } from './lib/actions';

export default function Home() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img
              src="/logo.svg"
              width="110"
              height="32"
              alt="daylog"
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
            <h2 className="card-title text-center mb-4">Create new account</h2>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                defaultValue={state?.data?.name?.toString()}
                className={`form-control ${
                  state?.errors?.name && 'is-invalid'
                }`}
                placeholder="Enter name"
              />
              {state?.errors?.name && (
                <div className="invalid-feedback d-block" role="alert">
                  {state?.errors?.name}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                name="email"
                defaultValue={state?.data?.email?.toString()}
                className={`form-control ${
                  state?.errors?.email && 'is-invalid'
                }`}
                placeholder="Enter email"
              />
              {state?.errors?.email &&
                state?.errors?.email.map((e, i) => (
                  <div key={i} className="invalid-feedback">
                    {e}
                  </div>
                ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group input-group-flat">
                <input
                  type="password"
                  name="password"
                  defaultValue={state?.data?.password?.toString()}
                  className={`form-control ${
                    state?.errors?.password && 'border-danger'
                  }`}
                  placeholder="Password"
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
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                    </svg>
                  </a>
                </span>
              </div>

              {state?.errors?.password &&
                state.errors.password.map((e, i) => (
                  <div key={i} className="invalid-feedback d-block" role="alert">
                    {e}
                  </div>
                ))}
            </div>
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
                  <a href="register/terms" tabIndex={-1}>
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
