/**
 * Builds public/resume/Takwa_Laffet_CV_EN.pdf and Takwa_Laffet_CV_FR.pdf.
 *
 * The HTML comes from the same `buildCvPrintHtml` used by the in-app print
 * button, so the PDFs and the site can never drift apart. Headless Edge does
 * the rendering — it ships with Windows, so this needs no LaTeX installation
 * and no new dependency.
 *
 *   npm run build:cv
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = join(root, 'node_modules', '.cache', 'cv-build');
const resumeDir = join(root, 'public', 'resume');

const BROWSERS = [
  process.env.CHROME_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

const browser = BROWSERS.find((candidate) => candidate && existsSync(candidate));
if (!browser) {
  console.error('No Chrome or Edge binary found. Set CHROME_PATH and retry.');
  process.exit(1);
}

const printToPdf = (htmlPath, pdfPath) =>
  new Promise((resolve, reject) => {
    const child = spawn(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--no-pdf-header-footer',
        '--print-to-pdf-no-header',
        `--print-to-pdf=${pdfPath}`,
        pathToFileURL(htmlPath).href,
      ],
      { stdio: 'ignore' },
    );
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`Browser exited with code ${code}`)),
    );
  });

async function main() {
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  await build({
    entryPoints: [join(root, 'scripts', 'cv-emit.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile: join(tmp, 'cv-emit.mjs'),
    logLevel: 'error',
  });

  const { execFileSync } = await import('node:child_process');
  execFileSync(process.execPath, [join(tmp, 'cv-emit.mjs'), tmp], { stdio: 'inherit' });

  mkdirSync(resumeDir, { recursive: true });

  for (const locale of ['EN', 'FR']) {
    const html = join(tmp, `cv-${locale.toLowerCase()}.html`);
    const pdf = join(resumeDir, `Takwa_Laffet_CV_${locale}.pdf`);
    await printToPdf(html, pdf);
    if (!existsSync(pdf)) throw new Error(`PDF was not produced: ${pdf}`);
    console.log(`wrote ${pdf} (${(statSync(pdf).size / 1024).toFixed(0)} KB)`);
  }

  console.log('\nFiles in public/resume:');
  for (const entry of readdirSync(resumeDir)) console.log(`  ${entry}`);
  rmSync(tmp, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});