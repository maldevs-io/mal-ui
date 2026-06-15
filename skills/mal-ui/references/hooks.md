# mal-ui Hooks Reference (`mal-ui/hooks`)

`mal-ui/hooks` re-exports **all of `@mantine/hooks` (v9)** unchanged. Same names,
same signatures.

```tsx
import { useDisclosure, useLocalStorage, useMediaQuery } from "mal-ui/hooks";
```

> Root `mal-ui` also re-exports these hooks.

---

## State management

| Hook                | Signature                                                                    | Use                                              |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| `useDisclosure`     | `(initial?, handlers?) => [boolean, { open, close, toggle }]`                | Boolean open/close state (modals, drawers)       |
| `useToggle`         | `(options=[false,true]) => [value, toggle]`                                  | Cycle between values                             |
| `useCounter`        | `(initial?, { min, max }?) => [count, { increment, decrement, set, reset }]` | Numeric counter with bounds                      |
| `useSetState`       | `(initial) => [state, setState]`                                             | Partial object state merge                       |
| `useListState`      | `(initial?) => [list, handlers]`                                             | Array helpers (`append`, `remove`, `reorder`, …) |
| `useUncontrolled`   | `({ value, defaultValue, finalValue, onChange }) => [value, handleChange]`   | Build controllable components                    |
| `useValidatedState` | `(initial, validation) => [{ value, lastValidValue, valid }, setValue]`      | Track validity                                   |
| `usePrevious`       | `(value) => prev`                                                            | Previous render value                            |
| `useStateHistory`   | `(initial) => [value, handlers, history]`                                    | Undo/redo history                                |

## Storage

| Hook                                                                  | Use                                     |
| --------------------------------------------------------------------- | --------------------------------------- |
| `useLocalStorage<T>({ key, defaultValue, serialize?, deserialize? })` | Sync state to `localStorage`, cross-tab |
| `useSessionStorage`                                                   | Same API for `sessionStorage`           |
| `readLocalStorageValue` / `readSessionStorageValue`                   | One-off read helpers                    |

Returns `[value, setValue, removeValue]`.

## UI / DOM

| Hook                                        | Returns                                        | Use                               |
| ------------------------------------------- | ---------------------------------------------- | --------------------------------- |
| `useMediaQuery(query, initial?)`            | `boolean`                                      | Match a media query               |
| `useViewportSize()`                         | `{ width, height }`                            | Window size (debounced)           |
| `useElementSize()`                          | `{ ref, width, height }`                       | Observe element size              |
| `useResizeObserver()`                       | `[ref, rect]`                                  | Element bounding rect             |
| `useHover()`                                | `{ ref, hovered }`                             | Hover state                       |
| `useFocusWithin()`                          | `{ ref, focused }`                             | Focus within subtree              |
| `useMouse(options?)`                        | `{ ref, x, y }`                                | Mouse position                    |
| `useMove(onChange)`                         | `{ ref, active }`                              | Drag/move interactions            |
| `useScrollIntoView(options?)`               | `{ scrollIntoView, targetRef, scrollableRef }` | Smooth scroll to element          |
| `useClickOutside(handler, events?, nodes?)` | `ref`                                          | Detect outside click              |
| `useFocusTrap(active?)`                     | `ref`                                          | Trap focus                        |
| `useFocusReturn(options)`                   | –                                              | Restore focus on unmount          |
| `useColorScheme(initial?)`                  | `"light" \| "dark"`                            | OS color scheme preference        |
| `useReducedMotion(initial?)`                | `boolean`                                      | Prefers-reduced-motion            |
| `useWindowScroll()`                         | `[{ x, y }, scrollTo]`                         | Window scroll position            |
| `useWindowEvent(type, listener)`            | –                                              | Attach window event               |
| `useEventListener(type, listener)`          | `ref`                                          | Attach element event              |
| `useMutationObserver` / `useIntersection`   | observe DOM                                    | Mutation / intersection observers |
| `useHeadroom({ fixedAt })`                  | `boolean`                                      | Hide-on-scroll header             |
| `useFullscreen()`                           | `{ ref, toggle, fullscreen }`                  | Fullscreen API                    |

## Utilities

| Hook                                                               | Use                                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `useDebouncedValue(value, wait, options?)`                         | Debounced value `[debounced, cancel]`                                     |
| `useDebouncedCallback(cb, delay)`                                  | Debounced callback                                                        |
| `useDebouncedState(initial, wait)`                                 | Debounced state setter                                                    |
| `useThrottledValue` / `useThrottledState` / `useThrottledCallback` | Throttling                                                                |
| `useInterval(fn, interval, options?)`                              | `{ start, stop, toggle, active }`                                         |
| `useTimeout(fn, delay, options?)`                                  | `{ start, clear }`                                                        |
| `useIdle(timeout, options?)`                                       | `boolean` user-idle                                                       |
| `useTimeout`                                                       | timer control                                                             |
| `useClipboard({ timeout }?)`                                       | `{ copy, copied, reset, error }`                                          |
| `useHotkeys(hotkeys, tagsToIgnore?)`                               | Register keyboard shortcuts                                               |
| `useOs()`                                                          | `"undetermined" \| "macos" \| "ios" \| "windows" \| "android" \| "linux"` |
| `useId(staticId?)`                                                 | Stable unique id                                                          |
| `useShallowEffect`                                                 | `useEffect` with shallow-compared deps                                    |
| `useDidUpdate`                                                     | Effect that skips first render                                            |
| `useIsFirstRender()`                                               | `boolean`                                                                 |
| `useForceUpdate()`                                                 | `() => void`                                                              |
| `useMounted()`                                                     | `boolean`                                                                 |
| `useisomorphicEffect`                                              | SSR-safe layout effect                                                    |
| `useMergedRef(...refs)` / `mergeRefs`                              | Combine refs                                                              |
| `useFavicon(url)`                                                  | Set favicon                                                               |
| `useDocumentTitle(title)`                                          | Set document title                                                        |
| `useDocumentVisibility()`                                          | `"visible" \| "hidden"`                                                   |
| `useNetwork()`                                                     | Network status `{ online, … }`                                            |
| `usePageLeave(onLeave)`                                            | Cursor leaves page                                                        |
| `useTextSelection()`                                               | Current `Selection`                                                       |
| `useInputState(initial)`                                           | Input/value-or-event state setter                                         |
| `usePagination({ total, page, … })`                                | Headless pagination range                                                 |
| `randomId()`                                                       | Generate a random id string                                               |
| `clamp(value, min, max)`                                           | Utility number clamp                                                      |
| `lowerFirst` / `upperFirst`                                        | String helpers                                                            |

---

## Usage examples

```tsx
import {
  useDisclosure,
  useMediaQuery,
  useClipboard,
  useLocalStorage,
} from "mal-ui/hooks";
import { Button, Drawer } from "mal-ui/core";

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 48em)");
  const clipboard = useClipboard({ timeout: 1000 });
  const [token, setToken] = useLocalStorage({ key: "token", defaultValue: "" });

  return (
    <>
      <Button onClick={open}>Menu</Button>
      <Drawer opened={opened} onClose={close} size={isMobile ? "100%" : "md"}>
        <Button onClick={() => clipboard.copy(token)}>
          {clipboard.copied ? "Copied" : "Copy token"}
        </Button>
      </Drawer>
    </>
  );
}
```

> For full signatures, options, and live demos of any hook, search `llm.md` (repo
> root) for `### use<HookName>`.
