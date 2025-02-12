'use client';

import { validateMFA } from '@/app/login/lib/actions';
import OTPInputWrapper from '@/components/OTPInputWrapper';
import { useActionState, useEffect, useState } from 'react';

export default function OTPLoginForm({ userId }: { userId: number }) {
  const [password, setPassword] = useState('');
  const [state, action, pending] = useActionState(validateMFA, undefined);

  useEffect(() => {
    // Resolves Bootstrap modal issue when redirects to login from a modal.
    const modal = document.getElementsByClassName('modal-backdrop');
    if (modal.length > 0) modal[0].remove();
  }, []);

  return (
    <>
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
          <h2 className="h2 text-center mb-4">Login using OTP</h2>
          <div className="text-secondary text-center mb-3">Your OTP is required.</div>
          <form action={action} autoComplete="off" noValidate={true}>
            <input name="id" type="hidden" value={userId} />
            <input name="password" type="hidden" value={password} />
            <OTPInputWrapper
              onChange={(value) => setPassword(value)}
            ></OTPInputWrapper>
            {state?.errors?.password && (
              <div className="invalid-feedback d-block text-center" role="alert">
                {state.errors.password}
              </div>
            )}
            <div className="form-footer">
              <button
                disabled={pending}
                type="submit"
                className={`btn btn-primary w-100 ${
                  pending ? 'btn-loading disabled' : null
                }`}
              >
                Validate OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
