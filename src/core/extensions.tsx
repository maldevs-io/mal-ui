'use client';

// ─── MALUI-branded aliases for Mantine identifiers ──────────────────────────
// Re-export every Mantine-branded symbol under a MALUI name so consumers can use
// either naming convention. The original Mantine names are still re-exported from index.ts.

import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import {
  NavigationProgressProvider,
  type NavigationProgressProviderProps,
  type ProgressRouterBase,
} from '../nprogress';

export {
  // ─── Provider / Context ─────────────────────────────────────────────────────
  MantineContext as MALUIContext,
  MantineThemeProvider as MALUIThemeProvider,
  HeadlessMantineProvider as HeadlessMALUIProvider,
  // ─── Theme utilities ────────────────────────────────────────────────────────
  mantineHtmlProps as MALUIHtmlProps,
  mergeMantineTheme as mergeMALUITheme,
  validateMantineTheme as validateMALUITheme,
  isMantineColorScheme as isMALUIColorScheme,
  // ─── Hooks (core-level) ─────────────────────────────────────────────────────
  useMantineTheme as useMALUITheme,
  useSafeMantineTheme as useSafeMALUITheme,
  useMantineColorScheme as useMALUIColorScheme,
  useMantineContext as useMALUIContext,
  useMantineClassNamesPrefix as useMALUIClassNamesPrefix,
  useMantineCssVariablesResolver as useMALUICssVariablesResolver,
  useMantineStyleNonce as useMALUIStyleNonce,
  useMantineStylesTransform as useMALUIStylesTransform,
  useMantineSxTransform as useMALUISxTransform,
  useMantineEnv as useMALUIEnv,
  useMantineIsHeadless as useMALUIIsHeadless,
  useMantineDeduplicateInlineStyles as useMALUIDeduplicateInlineStyles,
  useMantineWithStaticClasses as useMALUIWithStaticClasses,
} from '@mantine/core';

// ─── Type aliases ─────────────────────────────────────────────────────────────
export type {
  MantineTheme as MALUITheme,
  MantineThemeOverride as MALUIThemeOverride,
  MantineThemeColors as MALUIThemeColors,
  MantineThemeColorsOverride as MALUIThemeColorsOverride,
  MantineThemeComponent as MALUIThemeComponent,
  MantineThemeComponents as MALUIThemeComponents,
  MantineThemeOther as MALUIThemeOther,
  MantineThemeSizesOverride as MALUIThemeSizesOverride,
  MantineThemeProviderProps as MALUIThemeProviderProps,
  MantineColorScheme as MALUIColorScheme,
  MantineColorSchemeManager as MALUIColorSchemeManager,
  MantineColor as MALUIColor,
  MantineColorsTuple as MALUIColorsTuple,
  MantineColorShade as MALUIColorShade,
  MantinePrimaryShade as MALUIPrimaryShade,
  MantineGradient as MALUIGradient,
  MantineSize as MALUISize,
  MantineBreakpoint as MALUIBreakpoint,
  MantineBreakpointsValues as MALUIBreakpointsValues,
  MantineFontSize as MALUIFontSize,
  MantineFontSizesValues as MALUIFontSizesValues,
  MantineFontWeight as MALUIFontWeight,
  MantineFontWeightsValues as MALUIFontWeightsValues,
  MantineLineHeight as MALUILineHeight,
  MantineLineHeightValues as MALUILineHeightValues,
  MantineRadius as MALUIRadius,
  MantineRadiusValues as MALUIRadiusValues,
  MantineShadow as MALUIShadow,
  MantineShadowsValues as MALUIShadowsValues,
  MantineSpacing as MALUISpacing,
  MantineSpacingValues as MALUISpacingValues,
  MantineStyleProp as MALUIStyleProp,
  MantineStyleProps as MALUIStyleProps,
  MantineStylesRecord as MALUIStylesRecord,
  MantineStylesTransform as MALUIStylesTransform,
  MantineComponent as MALUIComponent,
  MantineComponentStaticProperties as MALUIComponentStaticProperties,
  MantinePolymorphicComponent as MALUIPolymorphicComponent,
  MantineLoader as MALUILoader,
  MantineLoaderComponent as MALUILoaderComponent,
  MantineLoadersRecord as MALUILoadersRecord,
  MantineTransition as MALUITransition,
  DefaultMantineColor as DefaultMALUIColor,
  DefaultMantineSize as DefaultMALUISize,
} from '@mantine/core';

// ─── MALUIProvider ──────────────────────────────────────────────────────────
// Wraps Mantine's provider and optionally mounts navigation progress. Pass
// `router` (or `navigationProgress`) to auto-render NavigationProgressProvider —
// no need to add it manually. Without either prop it behaves like MantineProvider.
export interface MALUIProviderProps extends MantineProviderProps {
  /** Router for progress-aware `useRouter()`; presence enables the bar. */
  router?: ProgressRouterBase;
  /** Enable/configure navigation progress. `true` for defaults, or bar props. */
  navigationProgress?: boolean | Omit<NavigationProgressProviderProps, 'router' | 'children'>;
}

export function MALUIProvider({
  router,
  navigationProgress,
  children,
  ...others
}: MALUIProviderProps) {
  const enableProgress =
    router != null || (navigationProgress != null && navigationProgress !== false);
  const barProps = typeof navigationProgress === 'object' ? navigationProgress : undefined;

  return (
    <MantineProvider {...others}>
      {enableProgress ? (
        <NavigationProgressProvider router={router} {...barProps}>
          {children}
        </NavigationProgressProvider>
      ) : (
        children
      )}
    </MantineProvider>
  );
}
