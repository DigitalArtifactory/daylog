'use client';

import { User } from '@/prisma/generated/client';
import { IconDeviceFloppy } from '@tabler/icons-react';
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
          <div className="textsecondary">
            Update your account&apos;s profile information and email address.
          </div>
          <div className="d-flex align-items-center pt-4 mt-auto">
            <div className="w-full row">
              <div className="col-md-4 ms-3">
                <input type="hidden" name="id" value={profile.id ?? 0} />
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue={
                      typeof state?.data?.name === 'string'
                        ? state.data.name
                        : profile.name ?? ''
                    }
                    placeholder="Enter your nickname, name or fullname"
                  />
                  {state?.errors?.name && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.name}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    defaultValue={
                      typeof state?.data?.email === 'string'
                        ? state.data.email
                        : profile.email ?? ''
                    }
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
          {state?.success && state?.message && (
            <div
              className="alert alert-important alert-sucess alert-dismissible"
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
              <IconDeviceFloppy />
            </span>
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
