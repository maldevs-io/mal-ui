# mal-ui Spotlight Reference (`mal-ui/spotlight`)

Re-exports **all of `@mantine/spotlight` (v9)** — a ⌘K command palette / search.

**Peer dependency:** none.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { Spotlight, spotlight } from "mal-ui/spotlight";
```

---

## Components & API

| Export                                                                                 | Use                                                              |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `Spotlight`                                                                            | High-level component fed an `actions` array.                     |
| `Spotlight.Root` / `.Search` / `.ActionsList` / `.Action` / `.ActionsGroup` / `.Empty` | Compound parts for custom UIs.                                   |
| `spotlight`                                                                            | Imperative control: `spotlight.open()`, `.close()`, `.toggle()`. |
| `createSpotlight()`                                                                    | Create an isolated store + control for multiple spotlights.      |

---

## `Spotlight` props

| Prop                   | Type                                                  | Description                                                |
| ---------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| `actions`              | `SpotlightActionData[] \| SpotlightActionGroupData[]` | **Required.** Searchable actions.                          |
| `shortcut`             | `string \| string[]`                                  | Hotkey(s) to open, e.g. `"mod + K"`.                       |
| `nothingFound`         | `ReactNode`                                           | Empty-state content.                                       |
| `highlightQuery`       | `boolean`                                             | Highlight matched text.                                    |
| `limit`                | `number`                                              | Max results shown.                                         |
| `searchProps`          | `object`                                              | Props for the search input (`placeholder`, `leftSection`). |
| `filter`               | `(query, actions) => actions`                         | Custom filtering.                                          |
| `scrollable`           | `boolean`                                             | Scrollable results.                                        |
| `maxHeight`            | `number`                                              | Results max height when scrollable.                        |
| `clearQueryOnClose`    | `boolean`                                             | Reset query on close.                                      |
| `closeOnActionTrigger` | `boolean`                                             | Close after action runs.                                   |

### `SpotlightActionData`

| Field                          | Type                 | Description                |
| ------------------------------ | -------------------- | -------------------------- |
| `id`                           | `string`             | Unique id.                 |
| `label`                        | `string`             | Display label (searched).  |
| `description`                  | `string`             | Secondary text (searched). |
| `onClick`                      | `() => void`         | Action handler.            |
| `leftSection` / `rightSection` | `ReactNode`          | Icons/badges.              |
| `keywords`                     | `string \| string[]` | Extra search terms.        |

`SpotlightActionGroupData`: `{ group: string; actions: SpotlightActionData[] }`.

---

## Example

```tsx
import { Spotlight, spotlight } from "mal-ui/spotlight";
import { Button } from "mal-ui/core";
import {
  MagnifyingGlassIcon,
  HouseIcon,
  GearIcon,
} from "@phosphor-icons/react";

const actions = [
  {
    id: "home",
    label: "Home",
    description: "Go to dashboard",
    onClick: () => router.push("/"),
    leftSection: <HouseIcon />,
  },
  {
    id: "settings",
    label: "Settings",
    description: "App settings",
    onClick: () => router.push("/settings"),
    leftSection: <GearIcon />,
  },
];

function App() {
  return (
    <>
      <Button onClick={spotlight.open}>Search</Button>
      <Spotlight
        actions={actions}
        shortcut="mod + K"
        nothingFound="Nothing found…"
        highlightQuery
        searchProps={{
          leftSection: <MagnifyingGlassIcon />,
          placeholder: "Search…",
        }}
      />
    </>
  );
}
```

> For grouped actions and compound-component customization, search `llm.md` for
> `### Spotlight`.
