import { createTheme, type MantineThemeOverride } from '@mantine/core';
import { malColorTokens, malRadiusTokens, malSpacingTokens } from './tokens';

export { malColorTokens, malRadiusTokens, malSpacingTokens };

/**
 * Default MAL UI theme. Pass to MantineProvider:
 *
 *   import { MantineProvider } from 'mal-ui/core';
 *   import { malTheme } from 'mal-ui/theme';
 *
 *   <MantineProvider theme={malTheme}>...</MantineProvider>
 */
export const malTheme: MantineThemeOverride = createTheme({
  primaryColor: malColorTokens.primary,
  defaultRadius: 'md',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    fontWeight: '600',
  },
  radius: malRadiusTokens,
  spacing: malSpacingTokens,
});

export type MalTheme = typeof malTheme;
