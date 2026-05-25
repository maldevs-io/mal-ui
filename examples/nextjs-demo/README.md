# MALUI — Next.js demo

A demo of every `mal-ui` subpath inside a Next.js 15 (App Router) application.

## Run

```bash
# from repo root: build the library first so `file:../..` resolves to dist
cd /Users/manas/Documents/MALDevs/mal/mal-ui
bun run build

cd examples/nextjs-demo
bun install
bun run dev
```

Open http://localhost:3000

## What is exercised

| Route             | Subpath                 | Demoed APIs                                                      |
| ----------------- | ----------------------- | ---------------------------------------------------------------- |
| `/`               | overview                | navigation                                                       |
| `/core`           | `mal-ui/core`           | Button, Inputs, Tabs, Stepper, Timeline, Card, etc.              |
| `/hooks`          | `mal-ui/hooks`          | 20+ hooks                                                        |
| `/form`           | `mal-ui/form`           | `useForm` with validation                                        |
| `/charts`         | `mal-ui/charts`         | Line/Area/Bar/Composite/Donut/Pie/Radar/Scatter/Bubble/Sparkline |
| `/notifications`  | `mal-ui/notifications`  | show / update / clean                                            |
| `/modals`         | `mal-ui/modals`         | confirm + content modals                                         |
| `/spotlight`      | `mal-ui/spotlight`      | global ⌘K with actions                                           |
| `/code-highlight` | `mal-ui/code-highlight` | inline, block, tabbed                                            |
| `/tiptap`         | `mal-ui/tiptap`         | full toolbar editor                                              |
| `/dropzone`       | `mal-ui/dropzone`       | image / pdf / csv accept                                         |
| `/carousel`       | `mal-ui/carousel`       | loop, indicators                                                 |
| `/nprogress`      | `mal-ui/nprogress`      | imperative API                                                   |
| `/schedule`       | `mal-ui/schedule`       | day view with events                                             |
| `/theme`          | `mal-ui/theme`          | malTheme + tokens preview                                        |
