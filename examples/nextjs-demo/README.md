# mal-ui — Next.js Demo

A full-coverage demo of every `mal-ui` subpath running inside a **Next.js 16 (App Router)** application. Each subpath has its own route so you can explore components in isolation.

---

## Running Locally

> **Prerequisite:** Build the library first so the `file:../..` workspace link resolves to the `dist/` output.

```bash
# 1. From the mal-ui root, build the library
bun run build

# 2. Install demo dependencies and start the dev server
cd examples/nextjs-demo
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Routes

| Route | Subpath | What is demoed |
|---|---|---|
| `/` | — | Overview & navigation |
| `/core` | `mal-ui/core` | Button, TextInput, Select, Tabs, Stepper, Timeline, Card, Badge, … |
| `/hooks` | `mal-ui/hooks` | 20+ hooks: `useDisclosure`, `useLocalStorage`, `useMediaQuery`, … |
| `/form` | `mal-ui/form` | `useForm` with field validation and error display |
| `/charts` | `mal-ui/charts` | Line, Area, Bar, Composite, Donut, Pie, Radar, Scatter, Bubble, Sparkline |
| `/notifications` | `mal-ui/notifications` | show / update / hide / clean |
| `/modals` | `mal-ui/modals` | Confirm modal + content modal |
| `/spotlight` | `mal-ui/spotlight` | Global `⌘K` command palette |
| `/code-highlight` | `mal-ui/code-highlight` | Inline, block, and tabbed code highlighting |
| `/tiptap` | `mal-ui/tiptap` | Full rich-text editor with toolbar |
| `/dropzone` | `mal-ui/dropzone` | Image / PDF / CSV file upload |
| `/carousel` | `mal-ui/carousel` | Loop carousel with indicators |
| `/nprogress` | `mal-ui/nprogress` | Imperative top-of-page progress bar |
| `/dates` | `mal-ui/dates` | Date pickers, calendars, time pickers |
| `/schedule` | `mal-ui/schedule` | Day view with events |
| `/theme` | `mal-ui/theme` | `malTheme` preview + raw design tokens |

---

## Tech Stack

| Tool | Version |
|---|---|
| Next.js | 16 (App Router) |
| React | 19 |
| mal-ui | workspace (`file:../..`) |
| Bun | latest |
| TypeScript | 5.x |
