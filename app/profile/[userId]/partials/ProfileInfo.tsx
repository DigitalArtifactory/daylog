'use client';

import { User } from '@prisma/client';
import { useActionState } from 'react';
import { updateProfile } from '../lib/actions';

type ProfileInfoType = {
  profile: User;
};

export default function ProfileInfo({ profile }: ProfileInfoType) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  return (
    <form action={action}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Profile Information</h3>
          <div className="text-secondary">
            Update your account's profile information and email address.
          </div>
          <div className="d-flex align-items-center pt-4 mt-auto">
            <div className="w-full row">
              <div className="col-md-4 ms-3">
                <input type="hidden" name="id" value={profile.id ?? 0} />
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue={profile.name ?? ''}
                    placeholder="Enter your nickname, name or fullname"
                  />
                  {state?.errors?.name && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.name}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    defaultValue={profile.email ?? ''}
                    placeholder="Enter your email for password recovery"
                  />
                  {state?.errors?.email &&
                    state?.errors?.email.map((e, i) => (
                      <div key={i} className="invalid-feedback">
                        {e}
                      </div>
                    ))}
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
              <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M14 4l0 4l-6 0l0 -4" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
