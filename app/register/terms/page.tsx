import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('terms');
  return (
    <div className="container container-narrow my-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center my-4">{t('title')}</h2>
          <h2 className="h2">{t('introductionTitle')}</h2>
          <p>{t('introductionText')}</p>

          <h2 className="h2">{t('accountTitle')}</h2>
          <p>{t('accountText')}</p>

          <h2 className="h2">{t('usageTitle')}</h2>
          <p>{t('usageText')}</p>
          <ul>
            <li>{t('usageList.fraud')}</li>
            <li>{t('usageList.lawViolation')}</li>
            <li>{t('usageList.uploading')}</li>
          </ul>

          <h2 className="h2">{t('licenseTitle')}</h2>
          <p>
            {t.rich('licenseText', {
              link: (chunks) => (
                <a
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>

          <h2 className="h2">{t('liabilityTitle')}</h2>
          <p>{t('liabilityText')}</p>

          <h2 className="h2">{t('terminationTitle')}</h2>
          <p>{t('terminationText')}</p>

          <h2 className="h2">{t('changesTitle')}</h2>
          <p>{t('changesText')}</p>
        </div>
        <div className="card-footer text-center">
          <p className="mb-0">
            {t.rich('footer', {
              link: (chunks) => (
                <a
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
