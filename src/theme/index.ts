import { type MantineThemeOverride, createTheme, virtualColor } from '@mantine/core';
import {
  malBreakpoints,
  malColorTokens,
  malColors,
  malFontSizes,
  malLineHeights,
  malRadiusTokens,
  malShadows,
  malSpacingTokens,
} from './tokens';

export {
  malBreakpoints,
  malColors,
  malColorTokens,
  malFontSizes,
  malLineHeights,
  malRadiusTokens,
  malShadows,
  malSpacingTokens,
};

/**
 * Default MAL UI theme. Pass to MantineProvider:
 *
 *   import { MantineProvider } from 'mal-ui/core';
 *   import { malTheme } from 'mal-ui/theme';
 *
 *   <MantineProvider theme={malTheme}>...</MantineProvider>
 */
export const malTheme: MantineThemeOverride = createTheme({
  // ─── Colors ──────────────────────────────────────────────────────────
  colors: {
    ...malColors,
    // Virtual color: adapts to color scheme automatically
    primary: virtualColor({
      name: 'primary',
      light: 'mal-brand',
      dark: 'mal-brand',
    }),
  },
  primaryColor: 'mal-brand',
  primaryShade: { light: 5, dark: 7 },
  autoContrast: true,
  luminanceThreshold: 0.3,

  // ─── Typography ──────────────────────────────────────────────────────
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  fontSizes: malFontSizes,
  lineHeights: malLineHeights,
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.125rem', lineHeight: '1.3' },
      h2: { fontSize: '1.625rem', lineHeight: '1.35' },
      h3: { fontSize: '1.375rem', lineHeight: '1.4' },
      h4: { fontSize: '1.125rem', lineHeight: '1.45' },
      h5: { fontSize: '1rem', lineHeight: '1.5' },
      h6: { fontSize: '0.875rem', lineHeight: '1.5' },
    },
  },

  // ─── Spacing & Radius ────────────────────────────────────────────────
  radius: malRadiusTokens,
  defaultRadius: 'md',
  spacing: malSpacingTokens,

  // ─── Shadows ─────────────────────────────────────────────────────────
  shadows: malShadows,

  // ─── Breakpoints ─────────────────────────────────────────────────────
  breakpoints: malBreakpoints,

  // ─── Interaction ─────────────────────────────────────────────────────
  cursorType: 'pointer',
  focusRing: 'auto',
  respectReducedMotion: true,

  // ─── Default gradient (for variant="gradient") ───────────────────────
  defaultGradient: { from: 'mal-brand', to: 'mal-secondary', deg: 135 },

  // ─── Global component defaults ───────────────────────────────────────
  components: {
    Button: { defaultProps: { radius: 'md' } },
    ActionIcon: { defaultProps: { radius: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md' } },
    Card: { defaultProps: { radius: 'md', shadow: 'sm' } },
    Paper: { defaultProps: { radius: 'md', shadow: 'xs' } },
    Modal: { defaultProps: { radius: 'lg' } },
    Notification: { defaultProps: { radius: 'md' } },
  },
});

export type MalTheme = typeof malTheme;
