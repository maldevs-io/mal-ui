---
name: mal-ui
description: 'Build React UIs with mal-ui, the MAL Devs component library wrapping Mantine v9. Use when writing or editing React/Next.js components, forms, charts, modals, notifications, date pickers, rich-text editors, file uploads, carousels, spotlight search, or theming for MAL projects. Use when the user mentions mal-ui, MALUIProvider, malTheme, or imports from "mal-ui/*". Ensures correct subpath imports, provider setup, peer dependencies, and brand theming instead of raw @mantine/* imports.'
argument-hint: 'Describe the component or UI you want to build (e.g. "a login form with validation")'
---

# mal-ui — MAL Devs Component Library

`mal-ui` is a thin wrapper around **Mantine v9**. Every Mantine component, hook, and
type is re-exported from a `mal-ui/*` subpath, pre-wired to the MAL brand theme.
The public API of each component is **identical to Mantine v9** — props, Styles API
selectors, and behavior are unchanged.

## Golden Rules

1. **Never import from `@mantine/*`.** Always import from a `mal-ui/*` subpath. Raw
   Mantine imports bypass the brand theme and break tree-shaking expectations.
2. **Import from the most specific subpath.** Use `mal-ui/charts`, `mal-ui/form`,
   etc. The root `mal-ui` only re-exports `core` + `hooks`.
3. **Import `mal-ui/styles.css` exactly once** at the app root.
4. **Wrap the app in `MALUIProvider` with `malTheme`** before using any component.
5. **Component props match Mantine v9.** When you need full props, Styles API, or
   examples for a specific component, consult the bundled Mantine docs (see
   [Component API reference](./references/component-api.md)).

## When to Use

- Building or editing any React/Next.js UI in a MAL project
- Forms with validation, data tables, modals, notifications, menus, tabs
- Charts, date pickers, rich-text editor, dropzone uploads, carousels, spotlight
- Theming, brand colors, spacing/radius tokens, dark mode

## Setup (once per app)

```tsx
// app/providers.tsx — Next.js App Router
'use client';

import { MALUIProvider } from 'mal-ui/core';
import { malTheme } from 'mal-ui/theme';
import 'mal-ui/styles.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MALUIProvider theme={malTheme} defaultColorScheme="auto">
      {children}
    </MALUIProvider>
  );
}
```

Subsystems that need their own provider/renderer (add only if used):

```tsx
import { ModalsProvider } from 'mal-ui/modals';        // wrap children
import { Notifications } from 'mal-ui/notifications';   // render <Notifications />
import { NavigationProgress } from 'mal-ui/nprogress';  // render <NavigationProgress />
```

## Subpath Map

| Import from | Use for | Peer deps to install |
|---|---|---|
| `mal-ui` | Common components + hooks (re-exports `core` + `hooks`) | — |
| `mal-ui/core` | All components: `Button`, `TextInput`, `Modal`, `Tabs`, `Card`, … | — |
| `mal-ui/hooks` | All hooks: `useDisclosure`, `useLocalStorage`, `useMediaQuery`, … | — |
| `mal-ui/form` | `useForm`, validators (`isEmail`, `isNotEmpty`, …) | — |
| `mal-ui/charts` | `LineChart`, `BarChart`, `DonutChart`, `AreaChart`, … | `recharts` |
| `mal-ui/notifications` | `notifications.show()`, `<Notifications />` | — |
| `mal-ui/modals` | `modals.openConfirmModal()`, `<ModalsProvider>` | — |
| `mal-ui/spotlight` | `⌘K` spotlight search | — |
| `mal-ui/code-highlight` | Syntax-highlighted code blocks (Shiki) | `shiki` |
| `mal-ui/tiptap` | Rich-text editor | `@tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link` |
| `mal-ui/dropzone` | File upload dropzone | — |
| `mal-ui/carousel` | Carousel | `embla-carousel-react` |
| `mal-ui/nprogress` | Top-of-page progress bar | — |
| `mal-ui/dates` | Date/time pickers, calendars | `dayjs` |
| `mal-ui/schedule` | Weekly/day schedule view | `dayjs` |
| `mal-ui/theme` | `malTheme` + raw tokens (`malColors`, `malSpacingTokens`, …) | — |
| `mal-ui/styles.css` | Required global CSS (import once) | — |

`react` and `react-dom` (>=18.2) are always required. Other peer deps are optional
and only needed when their subpath is imported.

## Branded Aliases

Every `Mantine*` identifier is also exported under a `MALUI*` name from `mal-ui/core`.
Both work; prefer the `MALUI*` form in MAL code for brand consistency.

| Mantine name | MALUI alias |
|---|---|
| `MantineProvider` | `MALUIProvider` |
| `useMantineTheme` | `useMALUITheme` |
| `useMantineColorScheme` | `useMALUIColorScheme` |
| `MantineThemeOverride` (type) | `MALUIThemeOverride` |

## Theme

`malTheme` is pre-configured with:

- **Brand colors** — `mal-brand` (primary, purple) and `mal-secondary`. A virtual
  `primary` color adapts to the color scheme.
- **Defaults** — `defaultRadius: 'md'`; `Button`/`TextInput`/`Select`/`Card`/`Modal`
  ship branded radii. `autoContrast` is on.
- **Tokens** — token-based `fontSizes`, `spacing`, `radius`, `shadows`, `breakpoints`.

Reference brand colors in any `color` prop, e.g. `color="mal-brand"`,
`color="mal-brand.5"`, or `color="mal-secondary"`.

```tsx
import { malColors, malSpacingTokens, malBreakpoints } from 'mal-ui/theme';
```

## Common Patterns

**Form with validation** (`mal-ui/form` + `mal-ui/core`):

```tsx
import { useForm, isEmail, isNotEmpty } from 'mal-ui/form';
import { Button, TextInput, Stack } from 'mal-ui/core';

function LoginForm() {
  const form = useForm({
    initialValues: { email: '', name: '' },
    validate: { email: isEmail('Invalid email'), name: isNotEmpty('Required') },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput label="Name" {...form.getInputProps('name')} />
        <TextInput label="Email" {...form.getInputProps('email')} />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
```

**Chart** (`mal-ui/charts`, needs `recharts`):

```tsx
import { LineChart } from 'mal-ui/charts';

<LineChart h={300} data={data} dataKey="date"
  series={[{ name: 'Revenue', color: 'mal-brand.5' }]} />
```

**Notification** (`mal-ui/notifications`):

```tsx
import { notifications } from 'mal-ui/notifications';
notifications.show({ title: 'Done!', message: 'Upload complete.' });
```

**Confirm modal** (`mal-ui/modals`):

```tsx
import { modals } from 'mal-ui/modals';
import { Text } from 'mal-ui/core';

modals.openConfirmModal({
  title: 'Delete item',
  children: <Text>Are you sure?</Text>,
  onConfirm: () => deleteItem(),
});
```

## Procedure

1. Confirm the app root imports `mal-ui/styles.css` and wraps children in
   `MALUIProvider` with `malTheme`. Add it if missing.
2. Pick the correct subpath(s) for the requested feature using the Subpath Map.
3. If a subpath has a peer dependency, ensure it is installed; tell the user the
   exact install command if not.
4. If the feature needs its own renderer/provider (`modals`, `notifications`,
   `nprogress`, `code-highlight`), confirm it is mounted in the provider tree.
5. Write the component using `mal-ui/*` imports — never `@mantine/*`.
6. For exact props, variants, or Styles API of a component, consult the
   [Component API reference](./references/component-api.md).

## Anti-patterns

- ❌ `import { Button } from '@mantine/core'` → ✅ `import { Button } from 'mal-ui/core'`
- ❌ Importing core components from root `mal-ui` and charts from `mal-ui` →
  charts/dates/etc. live only on their own subpaths.
- ❌ Forgetting `mal-ui/styles.css` (components render unstyled).
- ❌ Hardcoding hex colors instead of `mal-brand` / `mal-secondary` theme colors.
