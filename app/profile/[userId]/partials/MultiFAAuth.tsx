'use client';

import { generateTOTPSecret, generateTOTPUrl } from '@/utils/totp';
import { User } from '@prisma/client';
import { OTPInput, SlotProps } from 'input-otp';
import { QRCodeSVG } from 'qrcode.react';
import { useActionState, useEffect, useState } from 'react';
import { updateMFA } from '../lib/actions';

type ProfileInfoType = {
  profile: User;
};

export default function MultiFAAuth({ profile }: ProfileInfoType) {
  const [url, setUrl] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [state, action, pending] = useActionState(updateMFA, undefined);

  useEffect(() => {
    if (url === '') {
      const secret = generateTOTPSecret();
      const url = generateTOTPUrl(
        secret,
        profile.email,
        process.env.NEXT_PUBLIC_APP_NAME ?? 'SET_NEXT_PUBLIC_APP_NAME_IN_ENV'
      );
      setUrl(url);
      setSecret(secret);
    }
  }, [url]);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h3 className="card-title">2FA Authentication</h3>
        <div className="text-secondary">
          Configure your Account 2FA Authentication
        </div>
      </div>
      <div className="card-body">
        <button
          disabled={pending}
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#totpModal"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-password-mobile-phone"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17v4" />
            <path d="M10 20l4 -2" />
            <path d="M10 18l4 2" />
            <path d="M5 17v4" />
            <path d="M3 20l4 -2" />
            <path d="M3 18l4 2" />
            <path d="M19 17v4" />
            <path d="M17 20l4 -2" />
            <path d="M17 18l4 2" />
            <path d="M7 14v-8a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v8" />
            <path d="M11 5h2" />
            <path d="M12 17v.01" />
          </svg>
          Configure a TOTP
        </button>
        <form action={action}>
          <input type="hidden" name="id" value={profile.id}></input>
          <div className="modal" id="totpModal" tabIndex={-1}>
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="modal-status bg-info"></div>
                <div className="modal-body text-center py-4">
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
                    className="icon icon-lg text-info icon-tabler icons-tabler-outline icon-tabler-password-mobile-phone"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17v4" />
                    <path d="M10 20l4 -2" />
                    <path d="M10 18l4 2" />
                    <path d="M5 17v4" />
                    <path d="M3 20l4 -2" />
                    <path d="M3 18l4 2" />
                    <path d="M19 17v4" />
                    <path d="M17 20l4 -2" />
                    <path d="M17 18l4 2" />
                    <path d="M7 14v-8a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v8" />
                    <path d="M11 5h2" />
                    <path d="M12 17v.01" />
                  </svg>
                  <h3>Configure TOTP</h3>
                  <div className="text-secondary">
                    Here you can cofigure your Time-based one-time passwords
                    (TOTP).
                  </div>
                  <div className="py-3">
                    {url !== '' ? (
                      <QRCodeSVG value={url}></QRCodeSVG>
                    ) : (
                      <div className="ratio ratio-1x1 placeholder">
                        <div className="placeholder-image"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-secondary">
                    Scan the QR code using your authenticator app.
                  </div>
                  <div className="text-secondary">
                    And type the password of your authenticator app.
                  </div>
                  <div className="m-3">
                    <div className="input-group gap-3">
                      <input name="secret" type="hidden" value={secret} />
                      <input name="password" type="hidden" />
                      <OTPInput
                        maxLength={6}
                        containerClassName="w-full"
                        onChange={(value) => setOtp(value)}
                        render={({ slots }) => (
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            {slots.slice(0, 3).map((s, idx) => (
                              <Slot key={idx} {...s}></Slot>
                            ))}
                            <div>-</div>
                            {slots.slice(3).map((s, idx) => (
                              <Slot key={idx} {...s}></Slot>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {state?.errors?.password && (
                    <div className="invalid-feedback d-block" role="alert">
                      {state?.errors?.password[0]}
                    </div>
                  )}
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
                <div className="modal-footer">
                  <div className="w-100">
                    <div className="row">
                      <div className="col">
                        <a
                          href="#"
                          className="btn w-100"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </a>
                      </div>
                      <div className="col">
                        <button className="btn btn-primary w-100">
                          Save device
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const Slot = (props: SlotProps) => {
  return (
    <div className="d-flex h-3 border py-3 w-4 justify-content-center align-items-center rounded">
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
};
