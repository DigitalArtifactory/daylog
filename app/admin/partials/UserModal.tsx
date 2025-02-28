'use client';

import { signup } from '@/app/register/lib/actions';
import { useActionState, useEffect } from 'react';

export default function UserModal() {
  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create new user
      </button>
      <div className="modal" id="userModal" tabIndex={-1}>
        <form autoComplete="off" action={action}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New user</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
                      <h3 className="mb-1">Account not created</h3>
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
                  Cancel
                </a>
                <button
                  type="submit"
                  className={`btn btn-primary ms-auto ${
                    pending ? 'btn-loading disabled' : null
                  }`}
                  disabled={pending}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
