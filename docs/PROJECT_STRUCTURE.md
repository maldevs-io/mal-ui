# Project Structure

MAL UI is a TypeScript React package built around Mantine subpath exports.

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/       GitHub issue forms
│   ├── workflows/            CI and release automation
│   └── pull_request_template.md
├── docs/                     Project guides for contributors and maintainers
├── examples/nextjs-demo/     Next.js demo app for manual verification
├── scripts/                  Bun build and maintenance scripts
├── src/                      Library source code
├── tests/                    Bun test suite
├── README.md                 User-facing package documentation
├── CONTRIBUTING.md           Contributor guide
├── CODE_OF_CONDUCT.md        Community behavior expectations
├── SECURITY.md               Vulnerability reporting policy
├── SUPPORT.md                Support expectations
├── GOVERNANCE.md             Maintainer and decision-making model
└── CHANGELOG.md              Release history
```

## Source Layout

Each package subpath lives in `src/<subpath>/` and usually contains:

- `index.ts`: public re-exports.
- `extensions.ts`: MAL UI additions or aliases for that subpath.

Example:

```text
src/core/
├── index.ts        Re-exports @mantine/core and local extensions
└── extensions.ts   MALUI aliases for Mantine provider/theme APIs
```

The root `src/index.ts` intentionally re-exports only the most common subpaths:

- `core`
- `hooks`

Consumers should import heavier optional areas directly:

```ts
import { Button } from 'mal-ui/core';
import { LineChart } from 'mal-ui/charts';
import { DatePicker } from 'mal-ui/dates';
```

## Build Output

The `dist/` folder is generated and ignored by Git. It contains:

- ESM JavaScript entry points.
- TypeScript declaration files.
- Shared chunks for tree-shaking.
- `styles.css` with Mantine CSS imports bundled.

Run:

```bash
bun run build
```

## Adding a New Subpath

1. Create `src/<name>/index.ts`.
2. Create `src/<name>/extensions.ts`.
3. Add the subpath to `package.json` `exports`.
4. Add the subpath to `SUBPATHS` in `scripts/build.ts`.
5. Add smoke tests in `tests/smoke.test.ts`.
6. Add build-output expectations in `tests/tree-shake.test.ts`.
7. Document usage in `README.md` and the demo app if relevant.
