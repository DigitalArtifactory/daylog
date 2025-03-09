'use client';

import { useActionState } from 'react';
import { updatePassword } from '../lib/actions';

type UpdatePassType = {
  userId: number | null;
  profile: {
    id: number;
    name: string | null;
    email: string | null;
  };
};

export default function UpdatePass({ userId, profile }: UpdatePassType) {
  const [state, action, pending] = useActionState(updatePassword, undefined);
  return (
    <form action={action}>
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">Update Password</h3>
          <div className="text-secondary">
            Ensure your account is using a long, random password to stay secure.
          </div>
          <div className="d-flex align-items-center pt-4 mt-auto">
            <div className="w-full row">
              <div className="col-md-4 ms-3">
                <input type="hidden" name="id" value={profile.id} />
                {profile.id === userId && (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="current">
                      Current Password
                    </label>
                    <input
                      id="current"
                      type="password"
                      name="current"
                      className="form-control"
                      placeholder="Enter current password"
                    />
                    {state?.errors?.current && (
                      <div className="invalid-feedback d-block" role="alert">
                        {state?.errors?.current}
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    defaultValue={state?.data?.password?.toString()}
                    placeholder="Enter your new secure password"
                  />
                  {state?.errors?.password && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.password}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="confirm">
                    Pasword Confirmation
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    name="confirm"
                    className="form-control"
                    placeholder="Confirm your new password"
                  />
                  {state?.errors?.confirm && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.confirm}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="ms-auto"></div>
          </div>
          {!state?.success && state?.message && (
            <div
              className="alert alert-important alert-danger alert-dismissible"
              role="alert"
            >
              <div>{state.message}</div>
              <a
                className="btn-close btn-close-white"
                data-bs-dismiss="alert"
                aria-label="close"
              ></a>
            </div>
          )}
          {state?.success && state?.message && (
            <div
              className="alert alert-important alert-success alert-dismissible"
              role="alert"
            >
              <div>{state.message}</div>
              <a
                className="btn-close btn-close-white"
                data-bs-dismiss="alert"
                aria-label="close"
              ></a>
            </div>
          )}
        </div>
        <div className="card-body">
          <button
            disabled={pending}
            type="submit"
            className={`btn btn-primary ${
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
              <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12l0 2.5" />
            </svg>
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}
