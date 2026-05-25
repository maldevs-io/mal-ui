#!/usr/bin/env bun
/**
 * Bundle src/styles/index.css into dist/styles.css with all @import inlined,
 * so consumers only need: `import 'mal-ui/styles.css'`.
 *
 * Bun.build supports CSS bundling out of the box.
 */
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

const ROOT = resolve(import.meta.dir, '..');
const ENTRY = resolve(ROOT, 'src/styles/index.css');
const OUT = resolve(ROOT, 'dist/styles.css');

const result = await Bun.build({
  entrypoints: [ENTRY],
  outdir: resolve(ROOT, 'dist'),
  naming: 'styles.css',
  minify: true,
});

if (!result.success) {
  console.error('[mal-ui] css bundle failed');
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

// Confirm output (Bun writes to outdir using naming above)
const output = result.outputs.find((o) => o.path.endsWith('.css'));
if (!output) {
  // Fallback: read and write manually
  const text = await Bun.file(ENTRY).text();
  await writeFile(OUT, text);
}

console.log(`[mal-ui] css bundled → dist/styles.css`);
