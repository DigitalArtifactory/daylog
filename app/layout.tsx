import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../public/css/tabler.1.0.0.min.css';
import './globals.css';
import MainLayout from './partials/MainLayout';

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
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={`${geistSans.className} ${geistMono.variable}`}>
        <MainLayout>{children}</MainLayout>
        <script src="/js/tabler.1.0.0.min.js" defer></script>
      </body>
    </html>
  );
}
