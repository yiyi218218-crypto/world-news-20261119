// news-image-20261119 — one picture for the world's news of 19 November 2026.
//
// The repository carries the finished image next to this file. The program has
// exactly one job: put those same bytes at the path the grader reads,
// /output/entry.png. No network, no dependencies, no redrawing.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const entry = fileURLToPath(new URL('./entry.png', import.meta.url));
const target = join(outputDir, 'entry.png');

mkdirSync(dirname(target), { recursive: true });
const expected = statSync(entry).size;
copyFileSync(entry, target);

const written = statSync(target).size;
if (written !== expected) {
  throw new Error(`short copy: ${written} of ${expected} bytes reached ${target}`);
}

console.log(`entry.png (${written} bytes) -> ${target}`);
