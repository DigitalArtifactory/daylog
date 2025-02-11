'use client';

import { useActionState, useEffect, useState } from 'react';
import { loadSettings, saveSettings, SettingsType } from '../lib/script';

export default function SecurityTab() {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [state, action, pending] = useActionState(saveSettings, undefined);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await loadSettings();
      setSettings(settings);
      setIsChecked(settings?.mfa ?? false);
    };
    getSettings();
  }, []);

  useEffect(() => {
    if (state?.data) {
      setSettings(state.data);
      setIsChecked(state.data.mfa);
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
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Force users to configure 2FA Authentication
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
