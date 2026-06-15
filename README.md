# mal-ui

[![CI](https://github.com/maldevs-io/mal-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/maldevs-io/mal-ui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/mal-ui.svg)](https://www.npmjs.com/package/mal-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

An open-source React component library built on [Mantine v9](https://mantine.dev), providing a complete design system for MAL Devs projects — components, hooks, form utilities, charts, a rich-text editor, file uploads, and more, all pre-wired to the MAL brand theme.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Subpath Imports](#subpath-imports)
- [Peer Dependencies](#peer-dependencies)
- [Theme](#theme)
- [Available Subpaths](#available-subpaths)
- [Community](#community)
- [Development](#development)

---

## Installation

```bash
# npm
npm install mal-ui

# bun
bun add mal-ui

# yarn
yarn add mal-ui

# pnpm
pnpm add mal-ui
```

---

## AI Agent Skill

This repo ships a bundled agent skill in [`skills/mal-ui`](./skills/mal-ui) that teaches AI coding assistants (Copilot, Claude Code, Cursor, Codex, Gemini, and more) how to build UIs with `mal-ui` — correct subpath imports, provider setup, peer dependencies, and brand theming.

- `SKILL.md` — entrypoint with golden rules, setup, and common patterns
- `references/` — per-subpath API references (`core`, `form`, `charts`, `component-api`, …)
- `agents/` — per-tool manifests wiring the skill into each assistant

### Install the skill

Add it to your project with [skills.sh](https://www.skills.sh/):

```bash
npx skills add maldevs-io/mal-ui
```

This installs the `mal-ui` skill into your AI assistant so it follows the
library's conventions automatically.

---

## Quick Start

### 1 — Wrap your app with `MALUIProvider`

```tsx
// app/providers.tsx  (Next.js App Router example)
"use client";

import { MALUIProvider } from "mal-ui/core";
import { malTheme } from "mal-ui/theme";
import "mal-ui/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MALUIProvider theme={malTheme}>{children}</MALUIProvider>;
}
```

### 2 — Use components

```tsx
import { Button, TextInput, Card } from "mal-ui/core";

export function LoginCard() {
  return (
    <Card>
      <TextInput label="Email" placeholder="you@example.com" />
      <Button mt="sm" fullWidth>
        Sign in
      </Button>
    </Card>
  );
}
```

---

## Subpath Imports

Import only what you need — each subpath is independently tree-shakeable:

| Subpath                 | What it contains                                                     |
| ----------------------- | -------------------------------------------------------------------- |
| `mal-ui`                | Re-exports `core` + `hooks` (most common components and hooks)       |
| `mal-ui/core`           | All Mantine core components + MALUI branded aliases                  |
| `mal-ui/hooks`          | All Mantine hooks + MALUI branded aliases                            |
| `mal-ui/form`           | `useForm`, form fields, validation helpers                           |
| `mal-ui/charts`         | Line, Bar, Area, Donut, Pie, Radar, Scatter, Bubble, Sparkline       |
| `mal-ui/notifications`  | Notification system (`showNotification`, `updateNotification`, etc.) |
| `mal-ui/modals`         | Modal manager (`openConfirmModal`, `openModal`, etc.)                |
| `mal-ui/spotlight`      | `⌘K` / `Ctrl+K` spotlight search                                     |
| `mal-ui/code-highlight` | Syntax-highlighted code blocks (powered by Shiki)                    |
| `mal-ui/tiptap`         | Rich-text editor (Tiptap + Mantine toolbar)                          |
| `mal-ui/dropzone`       | File upload dropzone                                                 |
| `mal-ui/carousel`       | Embla-powered carousel                                               |
| `mal-ui/nprogress`      | Top-of-page progress bar                                             |
| `mal-ui/dates`          | Date pickers, calendars, time pickers                                |
| `mal-ui/schedule`       | Weekly/day schedule view                                             |
| `mal-ui/theme`          | `malTheme` object + raw design tokens                                |
| `mal-ui/styles.css`     | Required global CSS (import once at your app root)                   |

---

## Peer Dependencies

Install the peer dependencies you actually use. Only `react` and `react-dom` are always required; the rest are **optional** and only needed if you import the corresponding subpath.

```bash
# Always required
npm install react react-dom

# Required for mal-ui/charts
npm install recharts

# Required for mal-ui/dates, mal-ui/schedule
npm install dayjs

# Required for mal-ui/carousel
npm install embla-carousel-react

# Required for mal-ui/code-highlight
npm install shiki

# Required for mal-ui/tiptap
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link
```

---

## Theme

`mal-ui/theme` exports a ready-to-use Mantine theme override pre-configured with:

- **Brand colors** — `mal-brand` (purple) and `mal-secondary` palettes
- **Typography** — System font stack, tuned heading sizes and weights
- **Spacing & Radius** — Design-token-based scale
- **Shadows** — Consistent elevation scale
- **Component defaults** — Buttons, inputs, cards, and modals all default to `radius="md"`

```tsx
import { malTheme } from "mal-ui/theme";
// malTheme is a MantineThemeOverride — pass it to MantineProvider

// Raw tokens are also exported if you need them directly:
import { malColors, malSpacingTokens, malBreakpoints } from "mal-ui/theme";
```

Both Mantine names (`MantineProvider`, `useMantineTheme`) and MALUI aliases (`MALUIProvider`, `useMALUITheme`) are exported from `mal-ui/core` — use whichever you prefer.

---

## Available Subpaths

### Core + Hooks

```tsx
import { Button, TextInput, Select, Modal, Tabs } from "mal-ui/core";
import { useDisclosure, useLocalStorage, useMediaQuery } from "mal-ui/hooks";
```

### Form

```tsx
import { useForm, isEmail, isNotEmpty } from "mal-ui/form";

const form = useForm({
  initialValues: { email: "", name: "" },
  validate: {
    email: isEmail("Invalid email"),
    name: isNotEmpty("Name is required"),
  },
});
```

### Charts

```tsx
import { LineChart, BarChart, DonutChart } from "mal-ui/charts";

<LineChart
  h={300}
  data={data}
  dataKey="date"
  series={[{ name: "Revenue", color: "mal-brand.5" }]}
/>;
```

### Notifications

```tsx
import { notifications } from "mal-ui/notifications";
// In your layout, render: <Notifications />

notifications.show({ title: "Done!", message: "Upload complete." });
```

### Modals

```tsx
import { modals } from "mal-ui/modals";
// In your layout, render: <ModalsProvider>

modals.openConfirmModal({
  title: "Delete item",
  children: <Text>Are you sure?</Text>,
  onConfirm: () => deleteItem(),
});
```

---

## Community

MAL UI is open source and welcomes community help.

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md) in all project spaces.
- Report vulnerabilities through [SECURITY.md](./SECURITY.md), not public issues.
- Use [SUPPORT.md](./SUPPORT.md) to choose the right support path.
- See [GOVERNANCE.md](./GOVERNANCE.md) for maintainer roles and decision-making.
- See [ROADMAP.md](./ROADMAP.md) for current direction.

For maintainers and frequent contributors:

- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Accessibility Guide](./docs/ACCESSIBILITY.md)
- [Release Guide](./docs/RELEASE.md)

---

## Development

```bash
# Install dependencies
bun install

# Build the library
bun run build

# Type-check
bun run typecheck

# Run tests
bun test

# Lint & format
bun run lint
bun run format
```

### Running the demo app

```bash
# 1. Build the library
bun run build

# 2. Start the Next.js demo
cd examples/nextjs-demo
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) — every subpath has its own demo route.

---

> Built with [Mantine](https://mantine.dev) · Bundled with [Bun](https://bun.sh)
