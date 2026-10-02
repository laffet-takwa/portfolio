# Resume / CV

The CV is defined once, in `src/data/resume.ts`. Everything else is generated
from it, so the on-screen version and the PDF can never drift apart.

```
src/data/resume.ts                  the content, EN + FR
src/components/resume/CvDocument.tsx  on-screen rendering
src/components/resume/cvPrint.ts      standalone A4 HTML
scripts/build-cv-pdf.mjs              HTML → PDF
```

## Generating the PDFs

```bash
npm run build:cv
```

Writes `Takwa_Laffet_CV_EN.pdf` and `Takwa_Laffet_CV_FR.pdf` next to this file.
The script bundles the TypeScript with esbuild (already a Vite dependency) and
renders it with headless Edge or Chrome, so no LaTeX installation and no new
dependency is required. It honours `CHROME_PATH` if the browser is somewhere
unusual.

## How the Resume window behaves

- The CV is rendered on screen from `resume.ts`, so there is no missing-file state.
- A language tab follows the interface language and can be overridden by the reader.
- **Save as PDF** opens a standalone A4 document with a print button, for a
  copy generated at read time.
- **Download PDF** appears once the compiled PDF exists for that language.

## LaTeX sources

`Takwa_Laffet_CV_EN.tex` and `Takwa_Laffet_CV_FR.tex` are kept for anyone who
wants to edit a LaTeX CV, for example to add a photo or tweak spacing. They are
now the secondary path: if you edit one, update the matching entry in
`src/data/resume.ts` too, or the site will keep showing the data version.

Compile with any TeX distribution:

```bash
pdflatex -interaction=nonstopmode Takwa_Laffet_CV_EN.tex
```

## Note on `9pt`

Both `.tex` files use `\documentclass[10pt,a4paper]{article}`. The original said
`9pt`, which `article` does not support — it was silently ignored and the
document fell back to 10pt, so the layout is unchanged.