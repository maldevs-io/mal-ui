#!/usr/bin/env bun
/**
 * Bump all @mantine/* dependencies to a target version, then reinstall and rebuild.
 *
 * Usage:
 *   bun run upgrade:mantine 9.3.0
 *   bun run upgrade:mantine latest
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dir, '..');
const PKG_PATH = resolve(ROOT, 'package.json');

const target = process.argv[2];
if (!target) {
  console.error('Usage: bun run upgrade:mantine <version|latest>');
  process.exit(1);
}

const pkg = await Bun.file(PKG_PATH).json();

let resolvedVersion = target;
if (target === 'latest') {
  const res = spawnSync('npm', ['view', '@mantine/core', 'version'], { encoding: 'utf8' });
  resolvedVersion = res.stdout.trim();
  console.log(`[upgrade] resolved 'latest' → ${resolvedVersion}`);
}

const updated: string[] = [];
for (const name of Object.keys(pkg.dependencies ?? {})) {
  if (name.startsWith('@mantine/')) {
    pkg.dependencies[name] = resolvedVersion;
    updated.push(name);
  }
}

if (updated.length === 0) {
  console.error('[upgrade] no @mantine/* deps found');
  process.exit(1);
}

await Bun.write(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`[upgrade] bumped ${updated.length} packages to ${resolvedVersion}:`);
for (const n of updated) console.log(`  • ${n}`);

const run = (cmd: string, args: string[]) => {
  console.log(`\n[upgrade] $ ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: ROOT });
  if (r.status !== 0) {
    console.error(`[upgrade] '${cmd}' failed (exit ${r.status})`);
    process.exit(r.status ?? 1);
  }
};

run('bun', ['install']);
run('bun', ['run', 'build']);
run('bun', ['test']);

console.log('\n[upgrade] done. Commit changes and open a PR.');
