'use client';

import { CodeHighlightAdapterProvider, createShikiAdapter } from 'mal-ui/code-highlight';
import { MantineProvider } from 'mal-ui/core';
import { ModalsProvider } from 'mal-ui/modals';
import { Notifications } from 'mal-ui/notifications';
import { NavigationProgress } from 'mal-ui/nprogress';
import { malTheme } from 'mal-ui/theme';
import type { ReactNode } from 'react';

const shikiAdapter = createShikiAdapter(async () => {
  const { createHighlighter } = await import('shiki');
  return createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx', 'typescript', 'javascript', 'jsx', 'bash', 'css', 'json', 'html', 'markdown'],
  });
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={malTheme} defaultColorScheme="auto">
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <ModalsProvider>
          <NavigationProgress />
          <Notifications position="top-right" />
          {children}
        </ModalsProvider>
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
