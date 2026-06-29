# mal-ui Navigation Progress Reference (`mal-ui/nprogress`)

Re-exports **all of `@mantine/nprogress` (v9)** — a top-of-page progress bar
(YouTube-style) for navigation/loading — plus mal-ui extensions that show
progress automatically on navigation (`NavigationProgressProvider`, `Link`,
`useRouter`).

**Peer dependency:** none. Works with any framework; the `useRouter` wrapper
integrates with Next.js (or any router) without making it a dependency.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import {
  NavigationProgress,
  NavigationProgressProvider,
  Link,
  useRouter,
  nprogress,
} from "mal-ui/nprogress";
```

---

## Setup

Render `<NavigationProgressProvider />` **once**, near the root (inside
`MALUIProvider`). It renders the bar **and** auto-starts/completes progress for
internal link clicks and History API navigations.

```tsx
"use client";
import { NavigationProgressProvider } from "mal-ui/nprogress";
import { useRouter } from "next/navigation"; // optional, for programmatic nav

export function Providers({ children }) {
  const router = useRouter(); // Next.js router (or omit entirely)
  return (
    <MALUIProvider theme={malTheme}>
      <NavigationProgressProvider router={router}>
        {children}
      </NavigationProgressProvider>
    </MALUIProvider>
  );
}
```

> Prefer just the bar with no auto-detection? Render `<NavigationProgress />`
> instead and drive `nprogress` manually.

### `<NavigationProgressProvider />` props

Accepts every `<NavigationProgress />` prop (below), plus:

| Prop       | Type                 | Description                                                         |
| ---------- | -------------------- | ------------------------------------------------------------------- |
| `router`   | `ProgressRouterBase` | Router for progress-aware `useRouter()` (e.g. Next.js `useRouter`). |
| `children` | `ReactNode`          | Subtree to wrap so `useRouter()` can read `router` from context.    |

### `<NavigationProgress />` props

| Prop              | Type           | Description                      |
| ----------------- | -------------- | -------------------------------- |
| `color`           | `MantineColor` | Bar color (defaults to primary). |
| `size`            | `number`       | Bar height in px.                |
| `initialProgress` | `number`       | Starting value (0–100).          |
| `stepInterval`    | `number`       | Auto-increment interval (ms).    |
| `withinPortal`    | `boolean`      | Render in portal.                |
| `zIndex`          | `number`       | Bar z-index.                     |
| `portalProps`     | `object`       | Portal options.                  |

## `nprogress` API

| Method                  | Description                        |
| ----------------------- | ---------------------------------- |
| `nprogress.start()`     | Begin and auto-increment progress. |
| `nprogress.stop()`      | Pause auto-increment.              |
| `nprogress.increment()` | Increment by one step.             |
| `nprogress.decrement()` | Decrement by one step.             |
| `nprogress.set(value)`  | Set exact value (0–100).           |
| `nprogress.reset()`     | Reset to 0.                        |
| `nprogress.complete()`  | Jump to 100 and fade out.          |

---

## `Link` — anchor that shows progress

Polymorphic link that starts progress on click. Use the `component` prop to
delegate to a framework link for client-side routing; otherwise it renders a
plain `<a>`.

```tsx
import { Link } from "mal-ui/nprogress";
import NextLink from "next/link";

// Client-side navigation in Next.js, with progress:
<Link component={NextLink} href="/dashboard">Dashboard</Link>

// Plain anchor (full navigation), with progress:
<Link href="/about">About</Link>
```

> With `<NavigationProgressProvider />` mounted, **any** internal `<a>` click
> already triggers progress — including Next.js `<Link>`. `Link` is a convenience
> for explicit control.

## `useRouter` — programmatic navigation with progress

Wraps a router so `push`/`replace`/`back`/`forward` show the bar. It reads the
`router` from `NavigationProgressProvider` (or pass one explicitly); without a
router it falls back to the History API.

```tsx
"use client";
import { useRouter } from "mal-ui/nprogress";

function NavButton() {
  const router = useRouter(); // uses the provider's `router`
  return <button onClick={() => router.push("/dashboard")}>Go</button>;
}

// Or pass a base router explicitly (no provider needed):
// const router = useRouter(useNextRouter());
```

---

## Manual / async progress

```tsx
// Around an async action
nprogress.start();
await saveData();
nprogress.complete();
```

> For full options, search `llm.md` for `### NavigationProgress`.
