/**
 * Normalises every published project screenshot to one spec so the galleries
 * read as a single shoot.
 *
 * The projects were captured at different times with different tooling, so their
 * images disagree on width, aspect ratio and encoding. This rewrites every
 * published asset in place to one spec — 1100x688, 16:10, WebP at `quality`,
 * cropped from the top — so all galleries read alike.
 *
 * Every image in the folder is published as WebP at one spec — 1100x688, 16:10,
 * cropped from the top — so all galleries read as a single shoot. A capture
 * that arrives as a PNG gets a WebP alongside it rather than replacing it, since
 * the galleries only ever resolve WebP and the PNGs remain the master set.
 *
 * Tall captures are cropped rather than letterboxed. Phone scrolls run past
 * 5000px and dashboard shots to 1439px; the card already renders them through
 * `object-cover` at a fixed height, so cropping at the source loses nothing the
 * reader could see and keeps every slot on one ratio.
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
  const entries = await readdir(dir, { withFileTypes: true });

  const webps = entries
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === '.webp')
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  const pngs = entries
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === '.png')
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  if (webps.length === 0 && pngs.length === 0) continue;

  console.log(`\n== ${folder} (${webps.length} webp, ${pngs.length} png)`);

  // The published asset is always the WebP. A PNG that already has a WebP twin
  // is the master behind it and is left alone; a PNG without one is a shot the
  // gallery cannot currently serve, so it is encoded here.
  const stems = new Set(webps.map((name) => name.replace(/\.[^.]+$/, '')));
  const targets = [
    ...webps.map((name) => ({ name, path: join(dir, name) })),
    ...pngs
      .filter((name) => !stems.has(name.replace(/\.[^.]+$/, '')))
      .map((name) => ({ name, path: join(dir, name) })),
  ];

  for (const { name, path: input } of targets) {
    const original = await stat(input);
    const meta = await sharp(input).metadata();

    if (!meta.width || !meta.height) {
      skipped.push(`${folder}/${name} (unreadable metadata)`);
      continue;
    }

    const output = join(dir, `${name.replace(/\.[^.]+$/, '')}.webp`);

    if (meta.width === SPEC.width && meta.height === SPEC.height && extname(input) === '.webp') {
      console.log(
        `  ${name.padEnd(36)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} on target`,
      );
      continue;
    }

    // sharp holds the output handle open until its promise settles, so writing to
    // a staging path and then unlinking it races into EBUSY on Windows. Encoding
    // to a buffer releases the source before the destination is opened.
    const encoded = await sharp(input)
      .resize({
        width: SPEC.width,
        height: SPEC.height,
        fit: 'cover',
        position: 'top',
      })
      .webp({ quality: SPEC.quality, effort: 5 })
      .toBuffer();

    if (!DRY) await overwrite(output, encoded);

    const saved = Math.round((1 - encoded.length / original.size) * 100);
    const pct = original.size ? saved : 0;

    console.log(
      `  ${name.padEnd(36)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} -> ` +
        `${String(SPEC.width).padStart(4)}x${String(SPEC.height).padEnd(5)}  ` +
        `${String(Math.round(original.size / 1024)).padStart(4)} KB -> ` +
        `${String(Math.round(encoded.length / 1024)).padStart(4)} KB  (-${pct}%)`,
    );

    touched += 1;
    before += original.size;
    after += encoded.length;
  }
}

console.log(
  `\n${touched} files normalised (${DRY ? 'dry run' : 'written'}): ` +
    `${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB published`,
);
if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);