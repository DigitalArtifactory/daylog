'use client';

import { IconLockPassword } from '@tabler/icons-react';
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
            <span className="me-1">
              <IconLockPassword />
            </span>
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}
