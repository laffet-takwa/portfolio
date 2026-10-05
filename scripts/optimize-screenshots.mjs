/**
 * Prepares project screenshots for publication.
 *
 * Repository screenshots are captured at 2x (2880px wide, sometimes 5000px
 * tall) and total several megabytes per project, while the portfolio only ever
 * renders them as ~300-600px card previews. This script copies them into a
 * project folder at a card-appropriate size and leaves the encode to
 * `normalize-screenshots.mjs`, which is the single place that decides what the
 * published asset looks like. PNG masters are kept alongside.
 *
 * Usage:
 *   node scripts/optimize-screenshots.mjs --in=<source dir> --out=<target dir>
 *                                          [--width=1100] [--height=] [--quality=78]
 *
 * Example:
 *   node scripts/optimize-screenshots.mjs \
 *     --in=../Finova/docs/screenshots --out=public/projects/finova
 */

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join, parse } from 'node:path';
import sharp from 'sharp';

const args = Object.fromEntries(
  process.argv.slice(2).map((item) => {
    const [key, value = 'true'] = item.replace(/^--/, '').split('=');
    return [key, value];
  }),
);

const sourceDir = args.in;
const targetDir = args.out;
const maxWidth = Number(args.width ?? 1100);
/** Optional cap for very tall mobile captures (e.g. 780x9118). */
const maxHeight = args.height ? Number(args.height) : null;

if (!sourceDir || !targetDir) {
  console.error('Missing --in=<source dir> or --out=<target dir>.');
  process.exit(1);
}

const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

await mkdir(targetDir, { recursive: true });

const files = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && EXTENSIONS.has(extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

let before = 0;
let after = 0;

for (const name of files) {
  const input = join(sourceDir, name);
  // Masters are kept as PNG so the published JPG can always be re-derived at a
  // different size or quality without going back to the original repository.
  const output = join(targetDir, `${parse(name).name}.png`);

  const source = await stat(input);
  before += source.size;

  await sharp(input)
    .resize(
      maxHeight
        ? // Keep the width, crop the excess height from the bottom: a 780x9118
          // phone capture is rendered as a short card, so the tail is never seen.
          { width: maxWidth, height: maxHeight, fit: 'cover', position: 'top' }
        : { width: maxWidth, withoutEnlargement: true },
    )
    .png({ compressionLevel: 9 })
    .toFile(output);

  const written = await stat(output);
  after += written.size;

  const meta = await sharp(output).metadata();
  const saved = Math.round((1 - written.size / source.size) * 100);
  console.log(
    `${basename(name).padEnd(34)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} ` +
      `${String(Math.round(source.size / 1024)).padStart(5)} KB -> ${String(
        Math.round(written.size / 1024),
      ).padStart(4)} KB  (-${saved}%)`,
  );
}

console.log(
  `\n${files.length} masters: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`,
);
console.log('run `node scripts/normalize-screenshots.mjs` to publish the JPGs');