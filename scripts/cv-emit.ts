/**
 * Emits the standalone CV HTML used to build the printable PDF.
 * Run through `scripts/build-cv-pdf.mjs`, never imported by the app.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildCvPrintHtml } from '../src/components/resume/cvPrint';
import type { Locale } from '../src/types';

const outDir = process.argv[2] ?? '.';

for (const locale of ['en', 'fr'] as Locale[]) {
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `cv-${locale}.html`);
  writeFileSync(file, buildCvPrintHtml(locale), 'utf8');
  console.log(`wrote ${file}`);
}