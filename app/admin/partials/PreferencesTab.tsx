'use client';

import { useActionState } from 'react';
import { saveSettings, SettingsType } from '../lib/actions';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('adminPage');

  return (
    <form action={action}>
      <h3 className="card-title">{t('preferencesSection.safetyTitle')}</h3>
      <div className="text-secondary">
        {t('preferencesSection.safetyDescription')}
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'mfa'}
            defaultChecked={state?.data.mfa || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <span className="form-check-label">
            {t('preferencesSection.fields.require2fa')}
          </span>
        </label>
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'allowReg'}
            defaultChecked={state?.data.allowReg || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllow"
          />
          <span className="form-check-label">{t('preferencesSection.fields.allowSignup')}</span>
        </label>
      </div>
      <h3 className="card-title">{t('preferencesSection.thirdPartyTitle')}</h3>
      <div className="text-secondary">
        {t('preferencesSection.thirdPartyDescription')}
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'allowUnsplash'}
            defaultChecked={state?.data.allowUnsplash || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultAllowUnsplash"
          />
          <span className="form-check-label">
            {t('preferencesSection.fields.unsplash')}
          </span>
          <p className="text-muted text-sm mb-0">
            {t('preferencesSection.unsplashNote')}
          </p>
          <p className="text-muted">
            {t.rich('preferencesSection.unsplashLinkText', {
              link: (chunks) => (
                <a
                  href="https://unsplash.com/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </label>
      </div>
      <h3 className="card-title">{t('preferencesSection.storageTitle')}</h3>
      <div className="text-secondary">
        {t('preferencesSection.storageDescription')}
      </div>
      <div className="pt-4 mb-3">
        <label className="form-check form-switch">
          <input
            name="settings"
            className="form-check-input"
            value={'enableS3'}
            defaultChecked={state?.data.enableS3 || false}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefaultEnableS3"
          />
          <span className="form-check-label">{t('preferencesSection.fields.storage')}</span>
          <p className="text-muted text-sm mb-0">
            {t('preferencesSection.storageNote')}
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
        {t('preferencesSection.saveButton')}
      </button>
    </form>
  );
}
