#!/usr/bin/env bun
/**
 * Emit .d.ts files for all subpaths using TypeScript compiler.
 * Uses tsconfig.build.json which enables declaration + emitDeclarationOnly.
 */
import { spawn } from 'bun';

const proc = spawn({
  cmd: ['bun', 'x', 'tsc', '-p', 'tsconfig.build.json'],
  stdout: 'inherit',
  stderr: 'inherit',
});

const code = await proc.exited;
if (code !== 0) {
  console.error('[mal-ui] type generation failed');
  process.exit(code);
}
console.log('[mal-ui] .d.ts files generated');
