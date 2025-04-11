'use client';

import Image from 'next/image';
import { useActionState, useState } from 'react';
import { signupInit } from '../lib/actions';

export default function InitRegisterForm() {
  const [state, action, pending] = useActionState(signupInit, undefined);
  const [isShowPassword, setIsShowPassword] = useState(false);

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
                  type={isShowPassword?'text':'password'}
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
                  <input
                    id={"showPassword"}
                    className={"d-none"}
                    data-bs-toggle="tooltip"
                    aria-label="Show password"
                    defaultChecked={isShowPassword}
                    data-bs-original-title="Show password"
                    onChange={(e)=>setIsShowPassword(e.target.checked)}
                    type={'checkbox'}/>
                  <label htmlFor={"showPassword"}>
                    {
                      isShowPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="16"
                             height="16"
                             fill="currentColor"
                             viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="16"
                             height="16"
                             fill="currentColor"
                             viewBox="0 0 16 16">
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                        </svg>
                    }
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
              By register your first Admin user you are accepting the{' '}
              <a href="/register/terms" tabIndex={-1}>
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
