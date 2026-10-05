/**
 * Normalises every published project screenshot to one spec so the galleries
 * read as a single shoot.
 *
 * The projects were captured at different times with different tooling, so their
 * images disagree on width, aspect ratio and encoding. This rewrites every
 * published asset to one spec — 1100x688, 16:10, JPEG at `quality`, cropped
 * from the top — so all galleries read alike.
 *
 * Every gallery resolves JPEG, so a JPEG is what gets written here. A capture
 * that arrives as a PNG keeps its PNG on disk as the master behind the JPEG and
 * is re-encoded from it, since the master is the better source; a capture with no
 * PNG master is encoded from its existing WebP, which is already lossy and so
 * gives up a little more on the way through.
 *
 * Tall captures are cropped rather than letterboxed. Phone scrolls run past
 * 5000px and dashboard shots to 1439px; the card already renders them through
 * `object-cover` at a fixed height, so cropping at the source loses nothing the
 * reader could see and keeps every slot on one ratio.
 *
 * Usage: node scripts/normalize-screenshots.mjs [--quality=78] [--dry]
 */

import { readdir, rm, stat, writeFile } from 'node:fs/promises';
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

const QUALITY = Number(args.quality ?? 78);
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
let retired = 0;
const skipped = [];

for (const folder of folders) {
  const dir = join(TARGET, folder);
  const entries = await readdir(dir, { withFileTypes: true });

  const byExt = (ext) =>
    entries
      .filter((e) => e.isFile() && extname(e.name).toLowerCase() === ext)
      .map((e) => e.name);

  const jpgs = byExt('.jpg');
  const webps = byExt('.webp');
  const pngs = byExt('.png');

  if (jpgs.length === 0 && webps.length === 0 && pngs.length === 0) continue;

  console.log(`\n== ${folder} (${jpgs.length} jpg, ${webps.length} webp, ${pngs.length} png)`);

  // Every capture in the folder is published as a JPEG at the one spec. A PNG
  // master behind an existing JPEG is left alone; a capture with no JPEG yet is
  // encoded from its PNG master when it has one, else from its WebP.
  const stems = new Set(
    [...jpgs, ...webps, ...pngs].map((name) => name.replace(/\.[^.]+$/, '')),
  );

  for (const stem of [...stems].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
    const jpgPath = join(dir, `${stem}.jpg`);
    const master = pngs.includes(`${stem}.png`)
      ? join(dir, `${stem}.png`)
      : webps.includes(`${stem}.webp`)
        ? join(dir, `${stem}.webp`)
        : null;

    // A JPEG already on spec is the finished asset; nothing left to do but drop
    // the WebP that used to be served in its place.
    if (jpgs.includes(`${stem}.jpg`)) {
      const meta = await sharp(jpgPath).metadata();
      if (meta.width === SPEC.width && meta.height === SPEC.height) {
        if (webps.includes(`${stem}.webp`) && !DRY) await rm(join(dir, `${stem}.webp`), { force: true });
        if (webps.includes(`${stem}.webp`)) {
          retired += 1;
          console.log(`  ${`${stem}.webp`.padEnd(36)} retired, ${stem}.jpg already on spec`);
        } else {
          console.log(
            `  ${`${stem}.jpg`.padEnd(36)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} on target`,
          );
        }
        continue;
      }
    }

    if (!master) {
      skipped.push(`${folder}/${stem} (no PNG or WebP source)`);
      continue;
    }

    const original = await stat(master);

    // sharp holds the output handle open until its promise settles, so writing to
    // a staging path and then unlinking it races into EBUSY on Windows. Encoding
    // to a buffer releases the source before the destination is opened.
    const encoded = await sharp(master)
      .resize({
        width: SPEC.width,
        height: SPEC.height,
        fit: 'cover',
        position: 'top',
      })
      // Flatten first: JPEG has no alpha channel, and an unflattened source would
      // come out of libvips with the transparent areas filled in black.
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: SPEC.quality, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toBuffer();

    if (!DRY) {
      await overwrite(jpgPath, encoded);
      if (webps.includes(`${stem}.webp`)) {
        await rm(join(dir, `${stem}.webp`), { force: true });
        retired += 1;
      }
    }

    const pct = original.size ? Math.round((1 - encoded.length / original.size) * 100) : 0;
    const sourceExt = extname(master);

    console.log(
      `  ${`${stem}${sourceExt}`.padEnd(36)} ${String(SPEC.width).padStart(4)}x${String(SPEC.height).padEnd(5)} -> ` +
        `${String(Math.round(encoded.length / 1024)).padStart(4)} KB jpg  ` +
        `(from ${String(Math.round(original.size / 1024)).padStart(4)} KB ${sourceExt.slice(1)}, -${pct}%)`,
    );

    touched += 1;
    before += original.size;
    after += encoded.length;
  }
}

console.log(
  `\n${touched} files normalised (${DRY ? 'dry run' : 'written'}): ` +
    `${(before / 1024 / 1024).toFixed(2)} MB source -> ${(after / 1024 / 1024).toFixed(2)} MB published jpg`,
);
console.log(`${retired} webp files retired (${DRY ? 'dry run' : 'written'})`);
if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);