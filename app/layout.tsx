import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../public/css/tabler.1.2.0.min.css';
import './globals.css';
import MainLayout from './partials/MainLayout';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'daylog',
  description: 'Your personal note taking and markdown editor web app.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${geistSans.className} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
        <script src="/js/tabler.1.2.0.min.js" defer></script>
      </body>
    </html>
  );
}
