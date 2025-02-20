'use client';

import { useActionState, useEffect } from 'react';
import { signin } from '../lib/actions';

export default function LoginForm({ allowReg }: { allowReg: boolean }) {
  const [state, action, pending] = useActionState(signin, undefined);

  useEffect(() => {
    // Resolves Bootstrap modal issue when redirects to login from a modal.
    const modal = document.getElementsByClassName('modal-backdrop');
    if (modal.length > 0) modal[0].remove();
  }, []);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img
              src="/logo.svg"
              width="220"
              height="64"
              alt={process.env.NEXT_PUBLIC_APP_NAME}
              className="navbar-brand-image"
            />
          </a>
        </div>
        {state?.message && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h3 className="mb-1">Could not login</h3>
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
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <form action={action} autoComplete="off" noValidate={true}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={state?.data?.email?.toString()}
                  className={`form-control ${
                    state?.errors?.email && 'is-invalid'
                  }`}
                  placeholder="your@email.com"
                  autoComplete="off"
                />
                {state?.errors?.email &&
                  state.errors.email.map((e, i) => (
                    <div key={i} className="invalid-feedback">
                      {e}
                    </div>
                  ))}
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <a tabIndex={-1} href="./login/reset">
                      I forgot password
                    </a>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      state?.errors?.password && 'border-danger'
                    }`}
                    placeholder="Your password"
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
                      tabIndex={-1}
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
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                {state?.errors?.password && (
                  <div className="invalid-feedback d-block" role="alert">
                    {state.errors.password}
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
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        {allowReg && (
          <div className="text-center text-secondary mt-3">
            Don't have account yet?{' '}
            <a href="./register" tabIndex={-1}>
              Sign up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
