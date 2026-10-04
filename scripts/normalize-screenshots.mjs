/**
 * Normalises every published project screenshot to one spec so the galleries
 * read as a single shoot.
 *
 * The four projects were captured at different times with different tooling, so
 * their images disagree on width, aspect ratio and encoding. This rewrites every
 * published WebP in place to one spec — 1100x688, 16:10, WebP at `quality`,
 * cropped from the top — so all four galleries read as one shoot.
 *
 * Tall captures are cropped rather than letterboxed. ShopSphere's phone scrolls
 * run to 5017px and Finova's dashboard to 1439px; the card already renders them
 * through `object-cover` at a fixed height, so cropping at the source loses
 * nothing the reader could see and keeps every slot on one ratio.
 *
 * Source PNGs are left untouched: nothing in src/ references them, so they are
 * the master set rather than published assets.
 *
 * Usage: node scripts/normalize-screenshots.mjs [--quality=68] [--dry]
 */

import { readdir, stat, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

// libvips keeps input file descriptors open in its own cache, so overwriting a
// file it has just read fails on Windows with UNKNOWN/EBUSY. Turning the cache
// off lets the handle close as soon as each encode settles.
sharp.cache(false);

const TARGET = 'C:\\Users\\takwa\\Desktop\\PORTFOLIO\\public\\projects\\';

const args = Object.fromEntries(
  process.argv.slice(2).map((item) => {
    const [key, value = 'true'] = item.replace(/^--/, '').split('=');
    return [key, value];
  }),
);

const QUALITY = Number(args.quality ?? 68);
const DRY = Boolean(args.dry);

/** One spec for every published screenshot: 1100 wide, 16:10. */
const SPEC = { width: 1100, height: 688, quality: QUALITY };

const folders = (await readdir(TARGET, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

/** Windows keeps a just-read handle briefly; retry the overwrite a few times. */
async function overwrite(path, data) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      await writeFile(path, data);
      return;
    } catch (error) {
      if (attempt >= 5) throw error;
      await new Promise((resolve) => setTimeout(resolve, 120 * attempt));
    }
  }
}

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

    const spec = SPEC;

    const alreadyMatches = meta.width === spec.width && meta.height === spec.height;

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

    if (!DRY) await overwrite(input, encoded);

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
    after += written;
  }
}

console.log(
  `\n${touched} files normalised (${DRY ? 'dry run' : 'written'}): ` +
    `${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`,
);
if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);