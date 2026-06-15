# mal-ui Navigation Progress Reference (`mal-ui/nprogress`)

Re-exports **all of `@mantine/nprogress` (v9)** — a top-of-page progress bar
(YouTube-style) for navigation/loading.

**Peer dependency:** none.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { NavigationProgress, nprogress } from "mal-ui/nprogress";
```

---

## Setup

Render `<NavigationProgress />` **once**, inside `MALUIProvider`.

```tsx
<MALUIProvider theme={malTheme}>
  <NavigationProgress />
  {children}
</MALUIProvider>
```

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

## Example — Next.js route transitions

```tsx
"use client";
import { nprogress } from "mal-ui/nprogress";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ProgressOnNavigate() {
  const pathname = usePathname();
  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, [pathname]);
  return null;
}
```

```tsx
// Around an async action
nprogress.start();
await saveData();
nprogress.complete();
```

> For full options, search `llm.md` for `### NavigationProgress`.
