# Project screenshots

Drop images into the folder named after the project id. Vite publishes
everything under `public/`, so each file is served from
`/projects/<project-id>/<file>`.

```
public/projects/shopsphere-ecommerce/shopsphere-01-catalog.jpg
public/projects/shopsphere-ecommerce/shopsphere-02-cart.jpg
public/projects/shopsphere-ecommerce/shopsphere-03-orders.jpg
public/projects/shopsphere-ecommerce/shopsphere-04-kafka.jpg
```

## No wiring needed

`ProjectDetailApp` resolves each declared screenshot automatically. For the
*n*-th screenshot whose `id` is `<id>`, it looks for:

```
<project-id>-<nn>-<id>.jpg  →  .webp  →  .png
```

JPG is the published asset. A `.webp` or `.png` next to it is picked up
automatically, so a folder that predates the JPG pass still renders.

The first file that exists is displayed; if none exists the card stays a
labelled placeholder. So publishing a screenshot needs no code change — and an
empty folder never produces a broken image.

Slot ids come from the `screenshots` array in `src/data/projects.ts`. Setting an
explicit `src` on a slot overrides the convention.

Folder names do not have to match the project id. ShopSphere's folder is
`shopsphere-ecommerce` while its id is `shopsphere`; if you rename the folder,
also update the prefix in `useScreenshotSources`.

## Existing folders

| Folder | Project id |
| --- | --- |
| `beta-ai-soc` | `beta-ai-soc` |
| `shopsphere-ecommerce` | `shopsphere` |
| `finova` | `finova` |
| `nexora-erp` | `nexora-erp` |
| `focus` | `focus` |
| `fleetflow` | `fleetflow` |
| `stockly` | `stockly` |
| `diva-store` | `diva-store` |
| `logistics-platform` | `logistics-platform` |
| `odoo-invoice-automation` | `odoo-invoice-automation` |
| `donation-event-platform` | `donation-event-platform` |
| `time-tracking-app` | `time-tracking-app` |

## Masters and the published asset

A folder holds two kinds of file:

| File | Role |
| --- | --- |
| `<name>.jpg` | the published asset the gallery serves, one spec for every shot |
| `<name>.png` | the lossless master, kept so a JPG can always be re-derived |

`scripts/normalize-screenshots.mjs` is what keeps them in step. It rewrites every
published JPG to 1100×688, cropped from the top, and retires the WebP that used
to be served:

```bash
npm install --no-save sharp
node scripts/normalize-screenshots.mjs [--quality=78] [--dry]
```

Where a PNG master sits behind a JPG, the JPG is re-encoded from the PNG rather
than from the older WebP, so a later quality bump starts from the better source.

## Suggested capture format

16:10 or 16:9, roughly 1280×800. Capture as PNG and let the normaliser handle
the resize and encode; under ~250 KB per published image is plenty for a
card-sized preview.

Remove the `.gitkeep` in a folder once it contains a real image.