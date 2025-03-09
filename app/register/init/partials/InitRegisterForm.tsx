'use client';

import { useActionState } from 'react';
import { signupInit } from '../lib/actions';

export default function InitRegisterForm() {
  const [state, action, pending] = useActionState(signupInit, undefined);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img
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
        <form autoComplete="off" className="card card-md" action={action}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Admin registration</h2>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
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
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
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
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-group input-group-flat">
                <input
                  id="password"
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
              By register your first Admin user you are accepting the{' '}
              <a href="register/terms" tabIndex={-1}>
                terms and policy
              </a>
              .
            </div>
            <div className="form-footer">
              <button
                disabled={pending}
                type="submit"
                className={`btn btn-primary w-100 ${
                  pending ? 'btn-loading disabled' : null
                }`}
              >
                Create admin account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
