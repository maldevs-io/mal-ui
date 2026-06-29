'use client';

import { CodeHighlightAdapterProvider, createShikiAdapter } from 'mal-ui/code-highlight';
import { MALUIProvider } from 'mal-ui/core';
import { ModalsProvider } from 'mal-ui/modals';
import { Notifications } from 'mal-ui/notifications';
import { NavigationProgressProvider } from 'mal-ui/nprogress';
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
  // Pass Next.js' router to the provider so mal-ui's `useRouter()` shows
  // progress for programmatic navigation anywhere in the tree.
  const router = useRouter();
  return (
    <MALUIProvider theme={malTheme} defaultColorScheme="auto">
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <ModalsProvider>
          <Notifications position="top-right" />
          <NavigationProgressProvider router={router}>{children}</NavigationProgressProvider>
        </ModalsProvider>
      </CodeHighlightAdapterProvider>
    </MALUIProvider>
  );
}
