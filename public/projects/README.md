# Project screenshots

Drop images into the folder named after the project id. Vite publishes
everything under `public/`, so each file is served from
`/projects/<project-id>/<file>`.

```
public/projects/shopsphere-ecommerce/shopsphere-01-catalog.png
public/projects/shopsphere-ecommerce/shopsphere-02-cart.png
public/projects/shopsphere-ecommerce/shopsphere-03-orders.png
public/projects/shopsphere-ecommerce/shopsphere-04-kafka.png
```

## No wiring needed

`ProjectDetailApp` resolves each declared screenshot automatically. For the
*n*-th screenshot whose `id` is `<id>`, it looks for:

```
<project-id>-<nn>-<id>.png  →  .jpg  →  .jpeg  →  .webp
```

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
| `logistics-platform` | `logistics-platform` |
| `odoo-invoice-automation` | `odoo-invoice-automation` |
| `donation-event-platform` | `donation-event-platform` |
| `time-tracking-app` | `time-tracking-app` |

## Suggested format

16:10 or 16:9, roughly 1280×800. JPG or WebP keeps the page fast; under
~250 KB per image is plenty for a card-sized preview.

Remove the `.gitkeep` in a folder once it contains a real image.