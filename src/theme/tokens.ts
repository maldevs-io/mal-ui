import type { MantineColorsTuple } from '@mantine/core';

// ─── Brand Colors ────────────────────────────────────────────────────────────

export const malBrand: MantineColorsTuple = [
  '#f5eeff',
  '#e5dbf7',
  '#c6b4e8',
  '#a68bd9',
  '#8b68cc',
  '#7a51c5',
  '#6f42c1',
  '#6138ac',
  '#56319a',
  '#4a2889',
];

export const malSecondary: MantineColorsTuple = [
  '#f9f0ff',
  '#efdbff',
  '#d3adf7',
  '#b37feb',
  '#9254de',
  '#722ed1',
  '#531dab',
  '#391085',
  '#22075e',
  '#120338',
];

export const malSuccess: MantineColorsTuple = [
  '#f6ffed',
  '#d9f7be',
  '#b7eb8f',
  '#95de64',
  '#73d13d',
  '#52c41a',
  '#389e0d',
  '#237804',
  '#135200',
  '#092b00',
];

export const malWarning: MantineColorsTuple = [
  '#fffbe6',
  '#fff1b8',
  '#ffe58f',
  '#ffd666',
  '#ffc53d',
  '#faad14',
  '#d48806',
  '#ad6800',
  '#874d00',
  '#613400',
];

export const malError: MantineColorsTuple = [
  '#fff1f0',
  '#ffccc7',
  '#ffa39e',
  '#ff7875',
  '#ff4d4f',
  '#f5222d',
  '#cf1322',
  '#a8071a',
  '#820014',
  '#5c0011',
];

export const malNeutral: MantineColorsTuple = [
  '#fafafa',
  '#f5f5f5',
  '#e8e8e8',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#434343',
  '#262626',
  '#141414',
];

// ─── Color token map (keys usable as primaryColor / color prop) ──────────────

export const malColors = {
  'mal-brand': malBrand,
  'mal-secondary': malSecondary,
  'mal-success': malSuccess,
  'mal-warning': malWarning,
  'mal-error': malError,
  'mal-neutral': malNeutral,
} as const;

export const malColorTokens = {
  primary: 'mal-brand',
  secondary: 'mal-secondary',
  success: 'mal-success',
  warning: 'mal-warning',
  error: 'mal-error',
  neutral: 'mal-neutral',
} as const;

// ─── Radius ──────────────────────────────────────────────────────────────────

export const malRadiusTokens = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const malSpacingTokens = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

// ─── Font Sizes ──────────────────────────────────────────────────────────────

export const malFontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
} as const;

// ─── Line Heights ────────────────────────────────────────────────────────────

export const malLineHeights = {
  xs: '1.4',
  sm: '1.45',
  md: '1.55',
  lg: '1.6',
  xl: '1.65',
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const malShadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
} as const;

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const malBreakpoints = {
  xs: '36em',
  sm: '48em',
  md: '62em',
  lg: '75em',
  xl: '88em',
} as const;
