'use client';

import { useActionState, useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../lib/actions';

export default function PreferencesTab() {
  const [isMfaChecked, setIsMfaChecked] = useState(false);
  const [isAllowRegChecked, setIsAllowRegChecked] = useState(false);
  const [isUnsplashChecked, setIsUnsplashChecked] = useState(false);

  const [state, action, pending] = useActionState(saveSettings, undefined);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setIsMfaChecked(settings?.mfa ?? false);
      setIsAllowRegChecked(settings?.allowReg ?? false);
      setIsUnsplashChecked(settings?.allowUnsplash ?? false);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (state?.data) {
      setIsMfaChecked(state.data.mfa);
      setIsAllowRegChecked(state.data.allowReg);
      setIsUnsplashChecked(state.data.allowUnsplash);
    }
  }, [state]);

  return (
    <form action={action}>
      <h3 className="card-title">Security</h3>
      <div className="text-secondary">
        Customize your user accounts access and data security.
      </div>
      <div className="pt-4 mb-3">
        <div className="form-check form-switch">
          <input
            name="mfa"
            className="form-check-input"
            defaultValue={'active'}
            checked={isMfaChecked}
            onChange={(e) => setIsMfaChecked(e.target.checked)}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Force users to configure 2FA Authentication
          </label>
        </div>
      </div>
      <div className="pt-4 mb-3">
        <div className="form-check form-switch">
          <input
            name="allowRegistration"
            className="form-check-input"
            defaultValue={'active'}
            checked={isAllowRegChecked}
            onChange={(e) => setIsAllowRegChecked(e.target.checked)}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllow"
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckDefaultAllow"
          >
            Allow users to Sign Up
          </label>
        </div>
      </div>
      <h3 className="card-title">Third party</h3>
      <div className="text-secondary">
        Customize your third party integrations and data sources.
      </div>
      <div className="pt-4 mb-3">
        <div className="form-check form-switch">
          <input
            name="allowUnsplash"
            className="form-check-input"
            defaultValue={'active'}
            checked={isUnsplashChecked}
            onChange={(e) => setIsUnsplashChecked(e.target.checked)}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllowUnsplash"
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckDefaultAllowUnsplash"
          >
            Allow Unsplash as a source for images
          </label>
          <p className="text-muted text-sm mb-0">
            You need to create an Unsplash account and add your API key in the
            enviroment variables to use this feature.
          </p>
          <p className="text-muted">
            Go to{' '}
            <a href="https://unsplash.com/developers" target="_blank">
              Unsplash developer page{' '}
            </a>
            to create an account and get your API key.
          </p>
        </div>
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
