# MAL UI

Internal React components library for MAL Devs.

> **Internal use only.** Do not distribute outside the org.

## Install

```bash
# Authenticate to GitHub Packages first (one-time per machine):
#   echo "//npm.pkg.github.com/:_authToken=YOUR_GH_TOKEN" >> ~/.npmrc

bun add mal-ui
# or
npm i mal-ui
```

## Usage

Import from the subpath you need — tree-shakeable:

```tsx
import { Button, MantineProvider, TextInput } from "mal-ui/core";
import { useDisclosure, useDebouncedValue } from "mal-ui/hooks";
import { useForm } from "mal-ui/form";
import { notifications, Notifications } from "mal-ui/notifications";
import { modals, ModalsProvider } from "mal-ui/modals";
import { LineChart } from "mal-ui/charts";
import { CodeHighlight } from "mal-ui/code-highlight";
import { RichTextEditor } from "mal-ui/tiptap";
import { Dropzone } from "mal-ui/dropzone";
import { Carousel } from "mal-ui/carousel";
import { Spotlight } from "mal-ui/spotlight";
import { NavigationProgress, nprogress } from "mal-ui/nprogress";
import { Schedule } from "mal-ui/schedule";
import { malTheme } from "mal-ui/theme";
```

Load styles once at the app entry:

```tsx
import "mal-ui/styles.css";
```

App setup:

```tsx
import { MantineProvider } from "mal-ui/core";
import { malTheme } from "mal-ui/theme";
import "mal-ui/styles.css";

export function App() {
  return <MantineProvider theme={malTheme}>{/* your app */}</MantineProvider>;
}
```

## Available Subpaths

| Subpath                 | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `mal-ui`                | Root barrel (re-exports `core` + `hooks`)       |
| `mal-ui/core`           | Core UI components — 100+                       |
| `mal-ui/hooks`          | 80+ React hooks                                 |
| `mal-ui/form`           | Form management                                 |
| `mal-ui/charts`         | Charts (requires `recharts` peer)               |
| `mal-ui/notifications`  | Notification system                             |
| `mal-ui/modals`         | Modal manager                                   |
| `mal-ui/spotlight`      | Ctrl+K command center                           |
| `mal-ui/code-highlight` | Syntax highlighting                             |
| `mal-ui/tiptap`         | Rich text editor (requires `@tiptap/*` peers)   |
| `mal-ui/dropzone`       | File drag & drop                                |
| `mal-ui/carousel`       | Carousel (requires `embla-carousel-react` peer) |
| `mal-ui/nprogress`      | Navigation progress bar                         |
| `mal-ui/schedule`       | Schedule / calendar events                      |
| `mal-ui/theme`          | MAL brand defaults & tokens                     |

## Development

```bash
bun install
bun run typecheck
bun run build
bun test
```

## Adding Custom Components

Each subpath has an `extensions.ts` file. Add custom MAL components there:

```ts
// src/core/extensions.ts
export { MalDataTable } from "./components/MalDataTable";
```

They become available alongside the standard exports:

```tsx
import { Button, MalDataTable } from "mal-ui/core";
```

## Upgrading the Underlying Library

```bash
bun run upgrade:mantine 9.3.0
# or
bun run upgrade:mantine latest
```

This bumps versions, reinstalls, rebuilds, and runs tests. Then commit and open a PR.

## Release

Tag a version and push:

```bash
git tag v0.1.0
git push --tags
```

GitHub Actions will publish to GitHub Packages automatically.
