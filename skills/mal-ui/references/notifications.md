# mal-ui Notifications Reference (`mal-ui/notifications`)

Re-exports **all of `@mantine/notifications` (v9)**: the imperative `notifications`
manager and the `<Notifications />` outlet.

**Peer dependency:** none.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { notifications, Notifications } from "mal-ui/notifications";
```

---

## Setup

Render `<Notifications />` **once**, inside `MALUIProvider`.

```tsx
<MALUIProvider theme={malTheme}>
  <Notifications position="top-right" limit={5} />
  {children}
</MALUIProvider>
```

### `<Notifications />` props

| Prop                    | Type                                                                                              | Default          | Description                       |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------- |
| `position`              | `"top-left" \| "top-right" \| "top-center" \| "bottom-left" \| "bottom-right" \| "bottom-center"` | `"bottom-right"` | Stack position.                   |
| `limit`                 | `number`                                                                                          | `5`              | Max visible at once (rest queue). |
| `autoClose`             | `number \| false`                                                                                 | `4000`           | Default auto-close ms.            |
| `transitionDuration`    | `number`                                                                                          | `250`            | Mount/unmount animation.          |
| `containerWidth`        | `number \| string`                                                                                | `440`            | Notification width.               |
| `notificationMaxHeight` | `number \| string`                                                                                | –                | Max height per item.              |
| `zIndex`                | `number`                                                                                          | –                | Stack z-index.                    |
| `withinPortal`          | `boolean`                                                                                         | `true`           | Render in portal.                 |

---

## `notifications` API

| Method                          | Signature             | Description                          |
| ------------------------------- | --------------------- | ------------------------------------ |
| `notifications.show(props)`     | `=> id: string`       | Show a notification; returns its id. |
| `notifications.update(props)`   | `props` includes `id` | Update an existing notification.     |
| `notifications.hide(id)`        | –                     | Remove one notification.             |
| `notifications.clean()`         | –                     | Remove all (visible + queued).       |
| `notifications.cleanQueue()`    | –                     | Remove only queued.                  |
| `notifications.updateState(fn)` | –                     | Low-level state update.              |

### Notification props (`show` / `update`)

| Prop                    | Type              | Description                                       |
| ----------------------- | ----------------- | ------------------------------------------------- |
| `id`                    | `string`          | Custom id (needed for `update`).                  |
| `title`                 | `ReactNode`       | Bold title.                                       |
| `message`               | `ReactNode`       | **Required.** Body content.                       |
| `color`                 | `MantineColor`    | Accent color (`"mal-success"`, `"mal-error"`, …). |
| `icon`                  | `ReactNode`       | Leading icon.                                     |
| `loading`               | `boolean`         | Show loader, disable auto-close.                  |
| `autoClose`             | `number \| false` | Override auto-close.                              |
| `withCloseButton`       | `boolean`         | Show close X.                                     |
| `withBorder`            | `boolean`         | Bordered style.                                   |
| `radius`                | `MantineRadius`   | Corner radius.                                    |
| `onClose` / `onOpen`    | `(props) => void` | Lifecycle callbacks.                              |
| `position`              | position string   | Per-notification position override.               |
| `classNames` / `styles` | Styles API        | Custom styling.                                   |

---

## Examples

```tsx
import { notifications } from "mal-ui/notifications";
import { CheckIcon, XIcon } from "@phosphor-icons/react";

// Basic
notifications.show({ title: "Saved", message: "Your changes were saved." });

// Success / error with brand colors
notifications.show({
  color: "mal-success",
  title: "Upload complete",
  message: "File uploaded successfully.",
  icon: <CheckIcon />,
});

notifications.show({
  color: "mal-error",
  title: "Failed",
  message: "Something went wrong.",
  icon: <XIcon />,
});

// Loading → update pattern
const id = notifications.show({
  loading: true,
  title: "Uploading…",
  message: "Please wait",
  autoClose: false,
  withCloseButton: false,
});

await upload();

notifications.update({
  id,
  loading: false,
  color: "mal-success",
  title: "Done",
  message: "Upload finished",
  autoClose: 3000,
  withCloseButton: true,
});
```

> For the full API and styling options, search `llm.md` for `### Notifications`.
