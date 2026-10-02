import type { Locale } from '../../types';
import { cvDocuments } from '../../data/resume';

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char,
  );

/**
 * Builds a standalone A4 HTML document from the CV data.
 *
 * It is opened in a new tab so the browser's own print dialog can produce the
 * PDF. Keeping it self-contained means printing never depends on the app's
 * layout, window chrome or stylesheet.
 */
export function buildCvPrintHtml(locale: Locale): string {
  const cv = cvDocuments[locale === 'fr' ? 'fr' : 'en'];

  const sections = cv.sections
    .map((section) => {
      const heading = `<h2>${escapeHtml(section.heading)}</h2>`;

      if (section.intro) {
        return `${heading}<p class="intro">${escapeHtml(section.intro)}</p>`;
      }

      if (section.line) {
        return `${heading}<p class="intro">${escapeHtml(section.line)}</p>`;
      }

      const entries = (section.entries ?? [])
        .map((entry) => {
          const head = `<div class="row"><strong>${escapeHtml(entry.title)}</strong>${
            entry.period ? `<span class="period">${escapeHtml(entry.period)}</span>` : ''
          }</div>`;
          const subtitle = entry.subtitle
            ? `<div class="sub">${escapeHtml(entry.subtitle)}</div>`
            : '';
          const body = entry.body ? `<div class="sub">${escapeHtml(entry.body)}</div>` : '';
          const bullets = entry.bullets?.length
            ? `<ul>${entry.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
            : '';
          return `<div class="entry">${head}${subtitle}${body}${bullets}</div>`;
        })
        .join('');

      return `${heading}${entries}`;
    })
    .join('');

  const links = cv.links
    .map(
      (link) =>
        `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}: ${escapeHtml(link.display)}</a>`,
    )
    .join('<span class="sep">|</span>');

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(cv.name)} — CV</title>
<style>
  @page { size: A4; margin: 8mm 10mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #f4f5f7;
    font-family: Georgia, 'Times New Roman', serif;
    color: #14171f;
    font-size: 8.7pt;
    line-height: 1.24;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 16px auto;
    padding: 10mm;
    background: #fff;
    box-shadow: 0 2px 18px rgba(0,0,0,.12);
  }
  header { text-align: center; margin-bottom: 5pt; }
  h1 { font-size: 15pt; letter-spacing: .08em; margin: 0; }
  .role { font-size: 9pt; font-weight: bold; margin: 1.5pt 0 1pt; }
  .contact { font-size: 8pt; color: #333; }
  .links { font-size: 7.4pt; margin-top: 1.5pt; }
  .links a { color: #1a4fd6; text-decoration: none; }
  .sep { margin: 0 5pt; color: #999; }
  h2 {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: .07em;
    border-bottom: 1px solid #14171f;
    margin: 5pt 0 2pt;
    padding-bottom: 0.8pt;
  }
  .intro { margin: 0; text-align: justify; }
  .entry { margin: 0 0 2.4pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .row strong { font-size: 8.8pt; }
  .period { white-space: nowrap; font-size: 7.6pt; color: #333; }
  .sub { font-style: italic; font-size: 8pt; color: #333; margin-top: 0.2pt; }
  ul { margin: 0.8pt 0 0; padding-left: 10pt; }
  li { margin-bottom: 0.2pt; }
  @media print {
    body { background: #fff; font-size: 8.7pt; }
    .page { width: auto; min-height: 0; margin: 0; padding: 0; box-shadow: none; }
    .toolbar { display: none !important; }
  }
</style>
</head>
<body>
<div class="toolbar" style="padding:10px;text-align:center;font-family:system-ui,sans-serif;font-size:13px">
  <button onclick="window.print()" style="padding:8px 16px;border-radius:8px;border:1px solid #14171f;background:#14171f;color:#fff;cursor:pointer">
    Print / Save as PDF
  </button>
</div>
<div class="page">
  <header>
    <h1>${escapeHtml(cv.name)}</h1>
    <div class="role">${escapeHtml(cv.title)}</div>
    <div class="contact">${escapeHtml(cv.contactLine)}</div>
    <div class="links">${links}</div>
  </header>
  ${sections}
</div>
</body>
</html>`;
}