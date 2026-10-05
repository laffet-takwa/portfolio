/**
 * Reports which published screenshots show a screen the gallery already has.
 *
 * Two tiers, because a single threshold cannot separate them:
 *
 * - `identical` — the bytes match exactly. One file copied to another name.
 *   Always a bug; there is no way these are different screens.
 * - `near` — the 64x64 perceptual distance is under 0.4%. These are the same
 *   frame re-encoded, or two views differing only in a filter value or a digit.
 *   Almost always a duplicate, but two genuinely different dialogs of the same
 *   shape can land here too, so this tier is a prompt to look, not a verdict.
 *
 * Pages that merely share a layout land well above 0.6% and are not reported:
 * a list view with a different filter applied is a different screenshot even
 * though a header and a table make them look alike at 64x64.
 */

import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';
import sharp from 'sharp';

sharp.cache(false);

const ROOT = 'public/projects';
const NEAR = 0.4;

async function perceptualDistance(a, b) {
  const [bufA, bufB] = await Promise.all(
    [a, b].map((p) => sharp(p).greyscale().resize(64, 64, { fit: 'fill' }).raw().toBuffer()),
  );
  let sum = 0;
  for (let i = 0; i < bufA.length; i += 1) sum += Math.abs(bufA[i] - bufB[i]);
  return (sum / bufA.length / 255) * 100;
}

let identical = 0;
let near = 0;

for (const dir of readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;

  const files = readdirSync(`${ROOT}/${dir.name}`)
    .filter((f) => f.endsWith('.jpg'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  if (files.length < 2) continue;

  const paths = files.map((f) => `${ROOT}/${dir.name}/${f}`);
  const hashes = await Promise.all(
    paths.map(async (p) => createHash('sha256').update(await readFile(p)).digest('hex')),
  );

  const lines = [];
  for (let i = 0; i < paths.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const exact = hashes[i] === hashes[j];
      const distance = exact ? 0 : await perceptualDistance(paths[i], paths[j]);
      if (exact) {
        identical += 1;
        lines.push(`  identical  ${files[i]}  ==  ${files[j]}`);
      } else if (distance < NEAR) {
        near += 1;
        lines.push(`  near       ${files[i]}  ==  ${files[j]}  (${distance.toFixed(2)}%)`);
      }
    }
  }

  if (lines.length) {
    console.log(`\n== ${dir.name}`);
    lines.forEach((line) => console.log(line));
  }
}

console.log(`\n${identical} identical, ${near} near — run before publishing`);