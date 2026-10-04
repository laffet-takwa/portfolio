/**
 * Normalises every published project screenshot to one spec so the galleries
 * read as a single shoot.
 *
 * The four projects were captured at different times with different tooling, so
 * their images disagree on width, aspect ratio and encoding. This rewrites the
 * WebP files in place:
 *
 *   desktop (wider than tall)  1100x688  16:10, cropped from the top
 *   portrait / phone captures   560x1400 capped from the top
 *
 * Phone captures are the reason for the second tier. A 390x5017 full-page
 * scroll cropped to 16:10 at 1100px wide would keep the top 5% of the page, so
 * those are capped in width and height instead — the same treatment
 * optimize-screenshots.mjs documents for mobile.
 *
 * Source PNGs are left untouched: nothing in src/ references them, so they are
 * a master set rather than published assets.
 *
 * Usage: node scripts/normalize-screenshots.mjs [--quality=68] [--dry]
 */

import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const TARGET = 'C:\\Users\\takwa\\Desktop\\PORTFOLIO\\public\\projects\\';
const TEMP = join(tmpdir(), 'portfolio-screenshot-normalize');

const args = Object.fromEntries(
  process.argv.slice(2).map((item) => {
    const [key, value = 'true'] = item.replace(/^--/, '').split('=');
    return [key, value];
  }),
);

const QUALITY = Number(args.quality ?? 68);
const PHONE_QUALITY = 70;
const DRY = Boolean(args.dry);

/** Desktop card: 1100 wide, 16:10. */
const DESKTOP = { width: 1100, height: 688, quality: QUALITY };
/** Phone capture: 560 wide, capped at 1400 tall — see the file header. */
const PHONE = { width: 560, height: 1400, quality: PHONE_QUALITY };

await mkdir(TEMP, { recursive: true });

const folders = (await readdir(TARGET, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let touched = 0;
let before = 0;
let after = 0;
const skipped = [];

for (const folder of folders) {
  const dir = join(TARGET, folder);
  const files = (await readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.webp')
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  if (files.length === 0) continue;

  console.log(`\n== ${folder} (${files.length} webp)`);

  for (const name of files) {
    const input = join(dir, name);
    const original = await stat(input);
    const meta = await sharp(input).metadata();

    if (!meta.width || !meta.height) {
      skipped.push(`${folder}/${name} (unreadable metadata)`);
      continue;
    }

    const portrait = meta.height > meta.width;
    const spec = portrait ? PHONE : DESKTOP;

    const alreadyMatches =
      meta.width === spec.width &&
      meta.height === spec.height &&
      extname(name).toLowerCase() === '.webp';

    if (alreadyMatches) {
      console.log(`  ${name.padEnd(36)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} on target`);
      continue;
    }

    // sharp holds the output handle open until its promise settles, so writing to a
    // staging path and then unlinking it races into EBUSY on Windows. Encoding to
    // a buffer releases the source before the destination is opened, so the file
    // can simply be overwritten in place.
    const encoded = await sharp(input)
      .resize({
        width: spec.width,
        height: spec.height,
        fit: 'cover',
        position: 'top',
      })
      .webp({ quality: spec.quality, effort: 5 })
      .toBuffer();

    if (!DRY) await writeFile(input, encoded);

    const written = encoded.length;
    const saved = Math.round((1 - written / original.size) * 100);
    const pct = original.size ? saved : 0;

    console.log(
      `  ${name.padEnd(36)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} -> ` +
        `${String(spec.width).padStart(4)}x${String(spec.height).padEnd(5)}  ` +
        `${String(Math.round(original.size / 1024)).padStart(4)} KB -> ` +
        `${String(Math.round(written / 1024)).padStart(4)} KB  (-${pct}%)`,
    );

    touched += 1;
    before += original.size;
    after += written.size;
  }
}

console.log(
  `\n${touched} files normalised (${DRY ? 'dry run' : 'written'}): ` +
    `${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`,
);
if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);