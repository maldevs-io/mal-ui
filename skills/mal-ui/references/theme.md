# mal-ui Theme Reference (`mal-ui/theme`)

`mal-ui/theme` exports the pre-built brand theme and the raw design tokens. The
theme is a standard `createTheme()` object (imported from `mal-ui/core`).

## Exports

| Export             | Type                                 | Description                                          |
| ------------------ | ------------------------------------ | ---------------------------------------------------- |
| `malTheme`         | `MalTheme` (`MantineThemeOverride`)  | Ready-to-use theme. Pass to `MALUIProvider`.         |
| `MalTheme`         | type                                 | `typeof malTheme`.                                   |
| `malColors`        | `Record<string, MantineColorsTuple>` | Brand color tuples keyed by name (`mal-brand`, …).   |
| `malColorTokens`   | `Record<string,string>`              | Semantic → color-name map (`primary` → `mal-brand`). |
| `malRadiusTokens`  | `Record<MantineSize,string>`         | Radius scale.                                        |
| `malSpacingTokens` | `Record<MantineSize,string>`         | Spacing scale.                                       |
| `malFontSizes`     | `Record<MantineSize,string>`         | Font size scale.                                     |
| `malLineHeights`   | `Record<MantineSize,string>`         | Line height scale.                                   |
| `malShadows`       | `Record<MantineSize,string>`         | Box-shadow scale.                                    |
| `malBreakpoints`   | `Record<MantineSize,string>`         | Responsive breakpoints (em units).                   |

```tsx
import {
  malTheme,
  malColors,
  malSpacingTokens,
  malBreakpoints,
} from "mal-ui/theme";
```

## Brand colors

Each color is a 10-shade `MantineColorsTuple` (index `0` lightest → `9` darkest).
Use the name in any `color` prop, optionally with a shade index (`mal-brand.5`).

| Color name      | Token alias | Purpose                    | Base shade |
| --------------- | ----------- | -------------------------- | ---------- |
| `mal-brand`     | `primary`   | Primary brand (purple)     | `#6f42c1`  |
| `mal-secondary` | `secondary` | Secondary / gradient end   | `#722ed1`  |
| `mal-success`   | `success`   | Positive / success states  | `#52c41a`  |
| `mal-warning`   | `warning`   | Caution states             | `#faad14`  |
| `mal-error`     | `error`     | Destructive / error states | `#f5222d`  |
| `mal-neutral`   | `neutral`   | Greys / surfaces           | `#8c8c8c`  |

A **virtual** `primary` color is also registered; it resolves to `mal-brand`
across light and dark schemes, so `color="primary"` always tracks the brand.

```tsx
<Button color="mal-brand">Primary</Button>
<Badge color="mal-success.6">Active</Badge>
<Text c="mal-error">Failed</Text>
```

## Theme configuration baked into `malTheme`

| Setting                | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| `primaryColor`         | `mal-brand`                                            |
| `primaryShade`         | `{ light: 5, dark: 7 }`                                |
| `autoContrast`         | `true`                                                 |
| `luminanceThreshold`   | `0.3`                                                  |
| `defaultRadius`        | `md` (8px)                                             |
| `cursorType`           | `pointer`                                              |
| `focusRing`            | `auto`                                                 |
| `respectReducedMotion` | `true`                                                 |
| `defaultGradient`      | `{ from: 'mal-brand', to: 'mal-secondary', deg: 135 }` |

### Heading sizes

| Level | font-size | line-height |
| ----- | --------- | ----------- |
| h1    | 2.125rem  | 1.3         |
| h2    | 1.625rem  | 1.35        |
| h3    | 1.375rem  | 1.4         |
| h4    | 1.125rem  | 1.45        |
| h5    | 1rem      | 1.5         |
| h6    | 0.875rem  | 1.5         |

Headings use font weight `600`.

### Component default props

| Component      | Defaults                       |
| -------------- | ------------------------------ |
| `Button`       | `radius: 'md'`                 |
| `ActionIcon`   | `radius: 'md'`                 |
| `TextInput`    | `radius: 'md'`                 |
| `Select`       | `radius: 'md'`                 |
| `Card`         | `radius: 'md'`, `shadow: 'sm'` |
| `Paper`        | `radius: 'md'`, `shadow: 'xs'` |
| `Modal`        | `radius: 'lg'`                 |
| `Notification` | `radius: 'md'`                 |

## Token scales

`size` props (`xs`–`xl`) across components map to these tokens.

| Token | radius | spacing | fontSize | lineHeight | shadow  | breakpoint |
| ----- | ------ | ------- | -------- | ---------- | ------- | ---------- |
| `xs`  | 2px    | 4px     | 12px     | 1.4        | subtle  | 36em       |
| `sm`  | 4px    | 8px     | 14px     | 1.45       | small   | 48em       |
| `md`  | 8px    | 16px    | 16px     | 1.55       | medium  | 62em       |
| `lg`  | 12px   | 24px    | 18px     | 1.6        | large   | 75em       |
| `xl`  | 16px   | 32px    | 20px     | 1.65       | x-large | 88em       |

Use the tokens directly:

```tsx
<Stack gap="lg">…</Stack>            // 24px
<Paper radius="xl" shadow="md" />     // 16px radius, medium shadow
<MediaQuery smallerThan="md">…</MediaQuery>
```

## Customizing / extending the theme

Use `mergeMALUITheme` or just spread:

```tsx
import { createTheme } from "mal-ui/core";
import { malTheme } from "mal-ui/theme";

const appTheme = createTheme({
  ...malTheme,
  primaryColor: "mal-secondary",
  components: {
    ...malTheme.components,
    Button: { defaultProps: { radius: "lg" } },
  },
});
```

## Accessing theme at runtime

```tsx
import { useMALUITheme, useMALUIColorScheme } from "mal-ui/core";

function Demo() {
  const theme = useMALUITheme(); // full resolved theme
  const { colorScheme, toggleColorScheme, setColorScheme } =
    useMALUIColorScheme();
  return <div style={{ color: theme.colors["mal-brand"][5] }}>…</div>;
}
```

## CSS variables

`malTheme` generates CSS variables you can use in plain CSS:

```css
.box {
  color: var(--mantine-color-mal-brand-5);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
  box-shadow: var(--mantine-shadow-sm);
}
```
