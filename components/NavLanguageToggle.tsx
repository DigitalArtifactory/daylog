'use client';

import { useEffect, useState } from 'react';
import { FlagUS, FlagMX } from './icons';
import { useTranslations } from 'next-intl';

const NavLanguageToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<'es' | 'en'>('es');
  const t = useTranslations('language');

  useEffect(() => {
    setMounted(true);
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] as 'es' | 'en' | undefined;
    setLocale(cookieLocale === 'en' ? 'en' : 'es');
  }, []);

  if (!mounted) return null;

  const changeLocale = (newLocale: 'es' | 'en') => {
    if (locale === newLocale) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    setLocale(newLocale);

    window.location.reload();
  };

  return (
    <div className="dropdown list-inline-item">
      <a
        href="#"
        className="dropdown-toggle link-secondary"
        data-bs-toggle="dropdown"
        role="button"
        aria-expanded="false"
      >
        {locale === 'en' ? <FlagUS /> : <FlagMX />}{""}
        <span className="ms-2">{t(locale)}</span>
      </a>
      <div className="dropdown-menu">
        <button
          className="dropdown-item d-flex align-items-center"
          onClick={() => changeLocale('es')}
        >
          <FlagMX />
          {t('es')}
        </button>
        <button
          className="dropdown-item d-flex align-items-center"
          onClick={() => changeLocale('en')}
        >
          <FlagUS />
          {t('en')}
        </button>
      </div>
    </div>
  );
};

export default NavLanguageToggle;
