# mal-ui Code Highlight Reference (`mal-ui/code-highlight`)

Re-exports **all of `@mantine/code-highlight` (v9)** — syntax-highlighted code
blocks powered by **Shiki**.

**Peer dependency:** `npm i shiki`.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { CodeHighlight, CodeHighlightTabs } from "mal-ui/code-highlight";
```

---

## Setup — adapter provider

Code highlighting needs a Shiki adapter mounted via
`CodeHighlightAdapterProvider` (inside `MALUIProvider`).

```tsx
import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "mal-ui/code-highlight";

async function loadShiki() {
  const { createHighlighter } = await import("shiki");
  return createHighlighter({
    langs: ["tsx", "ts", "bash", "json", "css"],
    themes: ["github-light", "github-dark"],
  });
}

const shikiAdapter = createShikiAdapter(loadShiki);

<CodeHighlightAdapterProvider adapter={shikiAdapter}>
  {children}
</CodeHighlightAdapterProvider>;
```

---

## Components

| Component                                         | Use                               |
| ------------------------------------------------- | --------------------------------- |
| `CodeHighlight`                                   | Single highlighted code block.    |
| `CodeHighlightTabs`                               | Multiple files/snippets in tabs.  |
| `InlineCodeHighlight`                             | Inline highlighted code.          |
| `CodeHighlightAdapterProvider`                    | Provides the highlighter adapter. |
| `createShikiAdapter` / `createHighlightJsAdapter` | Adapter factories.                |

## `CodeHighlight` props

| Prop                        | Type            | Description                         |
| --------------------------- | --------------- | ----------------------------------- |
| `code`                      | `string`        | **Required.** Source code.          |
| `language`                  | `string`        | Language id (`"tsx"`, `"bash"`, …). |
| `withCopyButton`            | `boolean`       | Show copy button (default true).    |
| `copyLabel` / `copiedLabel` | `string`        | Copy button labels.                 |
| `withLineNumbers`           | `boolean`       | Show line numbers.                  |
| `highlightOnClient`         | `boolean`       | Highlight on client only.           |
| `radius`                    | `MantineRadius` | Corner radius.                      |
| `background`                | `MantineColor`  | Background color.                   |
| `controls`                  | `ReactNode[]`   | Extra header controls.              |

## `CodeHighlightTabs` props

| Prop               | Type                                              | Description          |
| ------------------ | ------------------------------------------------- | -------------------- |
| `code`             | `{ fileName?; code: string; language?; icon? }[]` | **Required.** Tabs.  |
| `withCopyButton`   | `boolean`                                         | Copy button per tab. |
| `defaultActiveTab` | `number`                                          | Initial active tab.  |
| `onTabChange`      | `(index) => void`                                 | Tab change handler.  |

---

## Example

```tsx
import { CodeHighlight, CodeHighlightTabs } from "mal-ui/code-highlight";

<CodeHighlight
  code={`const x = 1;\nconsole.log(x);`}
  language="tsx"
  withLineNumbers
/>;

<CodeHighlightTabs
  code={[
    {
      fileName: "app.tsx",
      language: "tsx",
      code: "export const App = () => null;",
    },
    { fileName: "styles.css", language: "css", code: ".app { color: red; }" },
  ]}
/>;
```

> For full adapter options and theming, search `llm.md` for `### CodeHighlight`.
