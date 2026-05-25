import { describe, expect, test } from 'bun:test';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Tree-shake / build-output sanity test.
 * Skipped unless `dist/` exists (run `bun run build` first).
 */

const DIST = resolve(import.meta.dir, '..', 'dist');
const hasDist = existsSync(DIST);

describe.skipIf(!hasDist)('dist build output', () => {
  const expectedEntries = [
    'index.js',
    'core/index.js',
    'hooks/index.js',
    'form/index.js',
    'charts/index.js',
    'notifications/index.js',
    'spotlight/index.js',
    'code-highlight/index.js',
    'tiptap/index.js',
    'dropzone/index.js',
    'carousel/index.js',
    'nprogress/index.js',
    'modals/index.js',
    'schedule/index.js',
    'theme/index.js',
  ];

  for (const entry of expectedEntries) {
    test(`emits ${entry}`, () => {
      const p = resolve(DIST, entry);
      expect(existsSync(p)).toBe(true);
      expect(statSync(p).size).toBeGreaterThan(0);
    });
    test(`emits ${entry.replace('.js', '.d.ts')}`, () => {
      const p = resolve(DIST, entry.replace('.js', '.d.ts'));
      expect(existsSync(p)).toBe(true);
    });
  }

  test('emits styles.css', () => {
    const p = resolve(DIST, 'styles.css');
    expect(existsSync(p)).toBe(true);
    expect(statSync(p).size).toBeGreaterThan(0);
  });

  test('per-subpath entry stays small (tree-shaking via splitting)', () => {
    // Core entry should be a slim re-export; heavy code lives in shared chunks.
    const p = resolve(DIST, 'hooks/index.js');
    const size = statSync(p).size;
    expect(size).toBeLessThan(500 * 1024); // < 500KB for the entry stub
  });
});
