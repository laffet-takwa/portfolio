# Deployment

The site is published to GitHub Pages by `.github/workflows/deploy.yml`.

- Live URL: **https://laffet-takwa.github.io/portfolio/**
- Pushes to `main` build and publish automatically; so does a manual
  *Run workflow* from the Actions tab.

## One-time repo setup

The workflow deploys through the official Pages action, which requires Pages to
be pointed at GitHub Actions. In **Settings → Pages → Build and deployment**,
set **Source** to **GitHub Actions**. Until that is set, the workflow fails at
the deploy step even though the build succeeds.

## Why `base` is set

`vite.config.ts` sets `base: '/portfolio/'` because the repository name becomes
a path segment on GitHub Pages. Without it every asset URL would resolve at the
domain root and the page would load blank. Change `base` and `portfolioUrl`
together if the repository is ever renamed.

## Regenerating the CV PDFs

The two PDFs in `public/resume/` are committed artifacts. Rebuild them locally
when the CV content changes:

```bash
npm run build:cv
```

That step is deliberately **not** part of CI — it needs a local browser, and
running it on every push would overwrite reviewed output. If you edit
`src/data/resume.ts`, commit the regenerated PDFs with the change.

## Locally

```bash
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the built site
```

`npm run preview` uses Vite's own dev server, which ignores `base`; to check
the deployed paths locally, serve `dist/` from a subpath instead.