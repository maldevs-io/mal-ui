'use client';

import { CodeHighlightAdapterProvider, createShikiAdapter } from 'mal-ui/code-highlight';
import { MALUIProvider } from 'mal-ui/core';
import { ModalsProvider } from 'mal-ui/modals';
import { Notifications } from 'mal-ui/notifications';
import { malTheme } from 'mal-ui/theme';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const shikiAdapter = createShikiAdapter(async () => {
  const { createHighlighter } = await import('shiki');
  return createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx', 'typescript', 'javascript', 'jsx', 'bash', 'css', 'json', 'html', 'markdown'],
  });
});

export function Providers({ children }: { children: ReactNode }) {
  // Passing `router` enables navigation progress automatically — no separate
  // NavigationProgressProvider needed. mal-ui's `useRouter()` then shows the
  // bar for programmatic navigation anywhere in the tree.
  const router = useRouter();
  return (
    <MALUIProvider theme={malTheme} defaultColorScheme="auto" router={router}>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <ModalsProvider>
          <Notifications position="top-right" />
          {children}
        </ModalsProvider>
      </CodeHighlightAdapterProvider>
    </MALUIProvider>
  );
}
