/**
 * Resolves a root-relative public asset against Vite's `base`.
 *
 * The site is served from `https://laffet-takwa.github.io/portfolio/`, so a
 * hard-coded `/projects/...` URL resolves to `https://laffet-takwa.github.io/projects/...`
 * and 404s. Prefixing with `import.meta.env.BASE_URL` keeps every asset path
 * correct on GitHub Pages and in a root-served local build.
 */
export function assetUrl(path) {
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}
