'use client';

import { useActionState } from 'react';
import { saveSettings, SettingsType } from '../lib/actions';

export default function PreferencesTab({initialSettings: initialSettings}: {initialSettings?: SettingsType | null}) {
  const [state, action, pending] = useActionState(
    saveSettings,
    {
      success: false,
      data: initialSettings ?? {
        mfa: false,
        allowReg: false,
        allowUnsplash: false,
        enableS3: false,
      },
      message: '',
    }
  );

  return (
    <form action={action}>
      <h3 className="card-title">Security</h3>
      <div className="text-secondary">
        Customize your user accounts access and data security.
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'mfa'}
            defaultChecked={state?.data?.mfa || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <span className="form-check-label">
            Force users to configure 2FA Authentication
          </span>
        </label>
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'allowReg'}
            defaultChecked={state?.data?.allowReg || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllow"
          />
          <span className="form-check-label">Allow users to Sign Up</span>
        </label>
      </div>
      <h3 className="card-title">Third party</h3>
      <div className="text-secondary">
        Customize your third party integrations and data sources.
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'allowUnsplash'}
            defaultChecked={state?.data?.allowUnsplash || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllowUnsplash"
          />
          <span className="form-check-label">
            Allow Unsplash as a source for images
          </span>
          <p className="text-muted text-sm mb-0">
            You need to create an Unsplash account and add your API key in the
            enviroment variables to use this feature.
          </p>
          <p className="text-muted">
            Go to{' '}
            <a href="https://unsplash.com/developers" target="_blank">
              Unsplash developer page
            </a>{' '}
            to create an account and get your API key.
          </p>
        </label>
      </div>
      <h3 className="card-title">Storage</h3>
      <div className="text-secondary">
        Customize your storage options for images and files.
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'enableS3'}
            defaultChecked={state?.data?.enableS3 || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultEnableS3"
          />
          <span className="form-check-label">Enable S3 Storage</span>
          <p className="text-muted text-sm mb-0">
            You need to create an S3 bucket and add your credentials in the
            enviroment variables to use this feature.
          </p>
        </label>
      </div>
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
      <button
        type="submit"
        disabled={pending}
        className={`btn btn-primary ${pending ? 'btn-loading disabled' : null}`}
      >
        Save Settings
      </button>
    </form>
  );
}
