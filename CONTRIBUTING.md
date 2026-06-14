# Contributing to mal-ui

First off — thank you for taking the time to contribute! 🎉

`mal-ui` is a React component library built on [Mantine v9](https://mantine.dev). We
welcome contributions of all kinds: bug reports, feature requests, documentation
improvements, and code.

This document describes how to get set up, how we work, and what we expect from
contributions so your pull request can be merged as smoothly as possible.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Running the Example App](#running-the-example-app)
- [Coding Standards](#coding-standards)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Release Process](#release-process)
- [Security](#security)
- [Governance](#governance)
- [License](#license)

---

## Code of Conduct

This project and everyone participating in it is governed by our
[Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to
uphold this code. Please report unacceptable behavior to the maintainers.

---

## Ways to Contribute

- **Report a bug** — open a [bug report](https://github.com/maldevs-io/mal-ui/issues/new?template=bug_report.yml).
- **Suggest a feature** — open a [feature request](https://github.com/maldevs-io/mal-ui/issues/new?template=feature_request.yml).
- **Improve docs** — fix typos, clarify usage, add examples.
- **Submit code** — pick up an open issue or propose a change (please open an issue first for larger changes).

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3.0` (primary toolchain — install, build, test, lint)
- [Node.js](https://nodejs.org) `>= 20` (used for npm packaging checks)
- [Git](https://git-scm.com)

> This repository uses **Bun** as its package manager and task runner. Please do
> not commit a `package-lock.json` or `yarn.lock`; the lockfile is `bun.lock`.

---

## Getting Started

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/mal-ui.git
cd mal-ui

# 2. Add the upstream remote
git remote add upstream https://github.com/maldevs-io/mal-ui.git

# 3. Install dependencies
bun install --frozen-lockfile

# 4. Verify everything works
bun run lint
bun run typecheck
bun run test
bun run build
```

---

## Project Structure

```
src/
  index.ts            # Root barrel — re-exports core + hooks
  core/               # Mantine core components + MALUI branded aliases
  hooks/              # Mantine hooks + MALUI branded aliases
  form/               # Form helpers (useForm, validators)
  charts/             # Charts (recharts-based)
  notifications/      # Notification system
  modals/             # Modal manager
  spotlight/          # ⌘K spotlight search
  code-highlight/     # Syntax-highlighted code blocks
  tiptap/             # Rich-text editor
  dropzone/           # File upload dropzone
  carousel/           # Embla carousel
  nprogress/          # Top-of-page progress bar
  dates/              # Date pickers / calendars
  schedule/           # Schedule view
  theme/              # malTheme + design tokens
  styles/             # Global CSS
scripts/              # Build scripts (Bun)
examples/nextjs-demo/ # Next.js demo app showcasing every subpath
tests/                # Smoke + tree-shaking tests
```

Each feature subpath follows the same pattern:

- `index.ts` — re-exports the underlying Mantine module.
- `extensions.ts` — exposes MALUI-branded aliases for Mantine identifiers.

---

## Development Workflow

All tasks run through Bun scripts defined in [`package.json`](./package.json):

| Command | Description |
|---|---|
| `bun run build` | Clean + build JS, type declarations, and CSS into `dist/` |
| `bun run build:js` | Build JavaScript bundles only |
| `bun run build:types` | Generate `.d.ts` type declarations |
| `bun run build:css` | Build the global stylesheet |
| `bun run typecheck` | Run `tsc --noEmit` |
| `bun run test` | Run the test suite |
| `bun run lint` | Run Biome checks |
| `bun run format` | Auto-format with Biome |
| `bun run upgrade:mantine` | Upgrade all `@mantine/*` packages in lockstep |

Before opening a pull request, please make sure the following all pass:

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```

---

## Running the Example App

The `examples/nextjs-demo` app is the easiest way to develop and visually verify
changes:

```bash
cd examples/nextjs-demo
bun install
bun run dev
```

Then open <http://localhost:3000>. Each subpath has its own demo page (e.g.
`/charts`, `/form`, `/modals`).

---

## Coding Standards

- **Formatting & linting:** We use [Biome](https://biomejs.dev). Run `bun run format`
  before committing. CI runs `bun run lint` and will fail on violations.
- **TypeScript:** Code must pass `bun run typecheck` with no errors.
- **Style:** Single quotes, trailing commas, semicolons, 2-space indentation, 100-char line width (enforced by Biome).
- **Exports:** When adding a new subpath, keep the `index.ts` / `extensions.ts`
  split and register it in [`package.json`](./package.json) `exports`, the build
  `SUBPATHS` array in [`scripts/build.ts`](./scripts/build.ts), and the tests.
- **Tree-shaking:** New entry points must remain side-effect free (CSS is the only declared side effect).

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <description>

[optional body]

[optional footer(s)]
```

Common types:

| Type | Use for |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons, etc. (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | A performance improvement |
| `test` | Adding or correcting tests |
| `build` | Changes to the build system or dependencies |
| `ci` | Changes to CI configuration |
| `chore` | Other changes that don't modify src or test files |

Examples:

```
feat(charts): add HeatmapChart export
fix(form): correct isEmail validator for plus-addressing
docs(readme): clarify peer dependency installation
```

---

## Pull Request Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/my-change
   ```
2. **Make your changes** and add/adjust tests where relevant.
3. **Run the full check suite** locally (lint, typecheck, test, build).
4. **Commit** using the convention above.
5. **Push** to your fork and **open a pull request** against `maldevs-io/mal-ui:main`.
6. Fill out the PR template completely and link any related issues.
7. Ensure **all CI checks pass**. A maintainer will review your PR.
8. Address review feedback by pushing additional commits to the same branch.

Keep pull requests focused and reasonably small — it makes review faster and
merges smoother.

---

## Reporting Bugs

Before filing a bug, please:

1. Search [existing issues](https://github.com/maldevs-io/mal-ui/issues) to avoid duplicates.
2. Confirm you can reproduce it on the latest version.
3. Open a [bug report](https://github.com/maldevs-io/mal-ui/issues/new?template=bug_report.yml) with a minimal reproduction.

---

## Requesting Features

Open a [feature request](https://github.com/maldevs-io/mal-ui/issues/new?template=feature_request.yml)
describing the problem you're trying to solve, your proposed solution, and any
alternatives you've considered.

---

## Release Process

Releases are automated. Maintainers publish by pushing a semver tag (`vX.Y.Z`),
which triggers the [`Release`](./.github/workflows/release.yml) workflow to
version, build, and publish to npm. Contributors do **not** need to bump the
version in their pull requests.

For maintainer details, see the [Release Guide](./docs/RELEASE.md).

---

## Security

Please report vulnerabilities through the process in [SECURITY.md](./SECURITY.md).
Do not disclose security details in public issues.

---

## Governance

Project roles and decision-making are described in [GOVERNANCE.md](./GOVERNANCE.md).

---

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE) that covers this project.
