import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/config';
import { css } from '@/styled-system/css';
import '@/styled-system/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minH: '100vh',
          bg: 'white',
        })}
      >
        <Header />
        <main className={css({ flex: '1' })}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
