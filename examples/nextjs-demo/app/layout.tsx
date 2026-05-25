import 'mal-ui/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from 'mal-ui/core';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import { Shell } from './shell';

export const metadata: Metadata = {
  title: 'MAL UI — Next.js Demo',
  description: 'Demo of every mal-ui subpath inside a Next.js 15 App Router app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
