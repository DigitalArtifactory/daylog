'use client';

import { useActionState, useEffect, useState } from 'react';
import { loadSettings, saveSettings, SettingsType } from '../lib/actions';

export default function SecurityTab() {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [isMfaChecked, setIsMfaChecked] = useState(false);
  const [isAllowRegChecked, setIsAllowRegChecked] = useState(false);
  const [state, action, pending] = useActionState(saveSettings, undefined);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await loadSettings();
      setSettings(settings);
      setIsMfaChecked(settings?.mfa ?? false);
      setIsAllowRegChecked(settings?.allowReg ?? false);
    };
    getSettings();
  }, []);

  useEffect(() => {
    if (state?.data) {
      setSettings(state.data);
      setIsMfaChecked(state.data.mfa);
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
          <label className="form-check-label" htmlFor="flexSwitchCheckDefaultAllow">
            Allow users to Sign Up
          </label>
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
