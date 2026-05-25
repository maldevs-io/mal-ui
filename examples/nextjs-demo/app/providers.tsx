'use client';

import { MantineProvider } from 'mal-ui/core';
import { ModalsProvider } from 'mal-ui/modals';
import { Notifications } from 'mal-ui/notifications';
import { NavigationProgress } from 'mal-ui/nprogress';
import { malTheme } from 'mal-ui/theme';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={malTheme} defaultColorScheme="light">
      <ModalsProvider>
        <NavigationProgress />
        <Notifications position="top-right" />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
