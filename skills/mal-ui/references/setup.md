# mal-ui Setup Reference

`mal-ui` is the MAL Devs component library. All imports come from `mal-ui/*`
subpaths and you use the pre-built `malTheme`.

## Install

```bash
# core packages are bundled inside mal-ui, you only add peer deps you use
npm install mal-ui react react-dom
```

Optional peer dependencies (install only when you import the matching subpath):

| Subpath                 | Peer dependency install command                                             |
| ----------------------- | --------------------------------------------------------------------------- |
| `mal-ui/charts`         | `npm i recharts`                                                            |
| `mal-ui/dates`          | `npm i dayjs`                                                               |
| `mal-ui/schedule`       | `npm i dayjs`                                                               |
| `mal-ui/carousel`       | `npm i embla-carousel-react`                                                |
| `mal-ui/code-highlight` | `npm i shiki`                                                               |
| `mal-ui/tiptap`         | `npm i @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link` |

`react` and `react-dom` must be `>=18.2`.

## Required global CSS

Import the bundled stylesheet **exactly once** at the app root. It contains the
base style layers plus any styles for subsystems (notifications, dates, etc.).

```tsx
import "mal-ui/styles.css";
```

> If components render unstyled, this import is missing.

## Provider (required)

Wrap the whole app in `MALUIProvider` and pass `malTheme`.

```tsx
import { MALUIProvider } from "mal-ui/core";
import { malTheme } from "mal-ui/theme";
import "mal-ui/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MALUIProvider theme={malTheme} defaultColorScheme="auto">
      {children}
    </MALUIProvider>
  );
}
```

### `MALUIProvider` props

| Prop                   | Type                          | Default              | Description                                                      |
| ---------------------- | ----------------------------- | -------------------- | ---------------------------------------------------------------- |
| `theme`                | `MALUIThemeOverride`          | `malTheme`           | Theme override object. Always pass `malTheme`.                   |
| `defaultColorScheme`   | `"light" \| "dark" \| "auto"` | `"light"`            | Color scheme used before user choice. Use `"auto"` to follow OS. |
| `forceColorScheme`     | `"light" \| "dark"`           | –                    | Locks color scheme, ignores user/OS preference.                  |
| `colorSchemeManager`   | `MALUIColorSchemeManager`     | localStorage manager | Controls how the chosen scheme is persisted.                     |
| `withCssVariables`     | `boolean`                     | `true`               | Generate CSS variables from theme. Keep `true`.                  |
| `cssVariablesSelector` | `string`                      | `":root"`            | Selector CSS variables are attached to.                          |
| `getRootElement`       | `() => HTMLElement`           | –                    | Returns root element for `data-mantine-color-scheme` attribute.  |
| `classNamesPrefix`     | `string`                      | `"mantine"`          | Prefix for static class names.                                   |
| `stylesTransform`      | `MALUIStylesTransform`        | –                    | Adapter for css-in-js libraries.                                 |
| `env`                  | `"default" \| "test"`         | `"default"`          | Disables transitions/portals in test mode.                       |

## Next.js App Router

Color scheme must be applied before paint to avoid a flash. Add
`MALUIHtmlProps` (alias of `mantineHtmlProps`) and `ColorSchemeScript` to the
root layout.

```tsx
// app/layout.tsx
import { ColorSchemeScript } from "mal-ui/core";
import { MALUIHtmlProps } from "mal-ui/core";
import { Providers } from "./providers";
import "mal-ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...MALUIHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

`providers.tsx` must start with `'use client'` because the provider uses context.

## Nested subsystem providers / renderers

Some subpaths need their own provider or a rendered outlet **inside**
`MALUIProvider`. Add only the ones you use:

```tsx
import { ModalsProvider } from "mal-ui/modals";
import { Notifications } from "mal-ui/notifications";
import { NavigationProgress } from "mal-ui/nprogress";
import { DatesProvider } from "mal-ui/dates";

<MALUIProvider theme={malTheme} defaultColorScheme="auto">
  <DatesProvider settings={{ locale: "en", firstDayOfWeek: 1 }}>
    <ModalsProvider>
      <Notifications position="top-right" />
      <NavigationProgress />
      {children}
    </ModalsProvider>
  </DatesProvider>
</MALUIProvider>;
```

| Subsystem               | Required mount                                                |
| ----------------------- | ------------------------------------------------------------- |
| `mal-ui/notifications`  | Render `<Notifications />` once                               |
| `mal-ui/modals`         | Wrap children in `<ModalsProvider>`                           |
| `mal-ui/nprogress`      | Render `<NavigationProgress />` once                          |
| `mal-ui/dates`          | Optional `<DatesProvider>` for locale defaults                |
| `mal-ui/code-highlight` | Wrap in `<CodeHighlightAdapterProvider>` with a Shiki adapter |
| `mal-ui/spotlight`      | Render `<Spotlight />` with actions                           |

## Verification checklist

1. `mal-ui/styles.css` imported once at the root.
2. App wrapped in `MALUIProvider` with `malTheme`.
3. `'use client'` on the provider file (Next.js).
4. `ColorSchemeScript` + `MALUIHtmlProps` in the root layout (Next.js).
5. Peer deps installed for every subpath used.
6. Subsystem outlets mounted for `modals` / `notifications` / `nprogress`.
7. No `@mantine/*` imports anywhere — only `mal-ui/*`.
