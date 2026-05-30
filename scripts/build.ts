#!/usr/bin/env bun
/**
 * Bun multi-entry build for mal-ui.
 *
 * Strategy:
 *  - Bundle all `@mantine/*` packages INSIDE dist (not external) so they are
 *    invisible in the consumer's node_modules / package.json.
 *  - Keep React, recharts, tiptap, embla-carousel and dayjs external (peer deps).
 *  - ESM-only with code splitting → shared chunks for true tree-shaking.
 */
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dir, '..');
const SRC = resolve(ROOT, 'src');
const OUT = resolve(ROOT, 'dist');

const SUBPATHS = [
  'core',
  'hooks',
  'form',
  'charts',
  'notifications',
  'spotlight',
  'code-highlight',
  'tiptap',
  'dropzone',
  'carousel',
  'nprogress',
  'modals',
  'schedule',
  'dates',
] as const;

const EXTRA_ENTRIES = ['index', 'theme/index'] as const;

const EXTERNAL = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'recharts',
  'dayjs',
  'dayjs/*',
  'embla-carousel-react',
  'embla-carousel',
  '@tiptap/*',
  'prosemirror-*',
];

async function main() {
  console.log('[mal-ui] cleaning dist…');
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const entrypoints = [
    ...SUBPATHS.map((p) => resolve(SRC, p, 'index.ts')),
    ...EXTRA_ENTRIES.map((p) => resolve(SRC, `${p}.ts`)),
  ];

  console.log(`[mal-ui] building ${entrypoints.length} entries…`);
  const result = await Bun.build({
    entrypoints,
    outdir: OUT,
    target: 'browser',
    format: 'esm',
    splitting: true,
    sourcemap: 'external',
    minify: false,
    external: EXTERNAL,
    root: SRC,
    naming: {
      entry: '[dir]/[name].js',
      chunk: 'chunks/[name]-[hash].js',
      asset: 'assets/[name]-[hash].[ext]',
    },
  });

  if (!result.success) {
    console.error('[mal-ui] build failed');
    for (const log of result.logs) console.error(log);
    process.exit(1);
  }

  console.log(`[mal-ui] built ${result.outputs.length} files → dist/`);
  for (const o of result.outputs) {
    const rel = o.path.replace(`${ROOT}/`, '');
    console.log(`  ${rel}  (${(o.size / 1024).toFixed(1)} KB)`);
  }

  // Post-process: hoist all stray "use client" directives.
  // Bundled Mantine modules contain individual "use client" markers; after
  // bundling these end up mid-file which Next.js and React Server Components
  // reject. We strip every occurrence and prepend a single one at the top of
  // any file that contained at least one — that keeps the file client-only,
  // which is the correct semantics for a UI library.
  const { readFile, writeFile } = await import('node:fs/promises');
  let hoisted = 0;
  for (const o of result.outputs) {
    if (!o.path.endsWith('.js')) continue;
    const src = await readFile(o.path, 'utf8');
    // Match both "use client" and 'use client' with optional semicolon
    const directiveRe = /^\s*["']use client["'];?\s*$/gm;
    if (!directiveRe.test(src)) continue;
    const stripped = src.replace(/^\s*["']use client["'];?\s*$/gm, '');
    await writeFile(o.path, `"use client";\n${stripped}`);
    hoisted++;
  }
  console.log(`[mal-ui] hoisted "use client" in ${hoisted} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
