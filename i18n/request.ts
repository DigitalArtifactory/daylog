import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = cookies();
  const cookieLocale = (await cookieStore).get('NEXT_LOCALE')?.value;

  const locale = cookieLocale === 'en' || cookieLocale === 'es' ? cookieLocale : 'es';

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});