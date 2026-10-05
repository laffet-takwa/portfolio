import { useEffect, useState, type ReactNode } from 'react';
import { getProjectById, publishedProjects } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import type { ProjectScreenshot, IconName, Locale, Project } from '../../types';
import { resolveText } from '../../types';
import { assetUrl } from '../../lib/assets';
import { Button, EmptyState, Tag } from '../ui/Primitives';
import { Icon } from '../ui/Icon';

const IMAGE_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg'];

/** A resolved shot: WebP for modern browsers, PNG master as the fallback. */
interface ScreenshotSource {
  webp?: string;
  png?: string;
}

/**
 * Candidate file names for one declared shot, in the order they are tried.
 *
 * An explicit `src` is used as-is. Otherwise the shot is looked up by convention
 * under the project's screenshot folder, covering the three naming shapes the
 * captures actually use on disk: `<folder>-NN-<id>`, `NN-<id>` and `<id>`.
 * Trying all three means dropping a correctly named image into the folder is
 * enough to publish it, with no code change and no broken image while the file
 * is absent.
 */
function screenshotCandidates(folder: string, index: number, shotId: string, src?: string): string[] {
  if (src) return [assetUrl(src)];

  const stem = String(index + 1).padStart(2, '0');
  const names = [`${folder}-${stem}-${shotId}`, `${stem}-${shotId}`, shotId];

  return names.flatMap((name) =>
    IMAGE_EXTENSIONS.map((ext) => assetUrl(`/projects/${folder}/${name}.${ext}`)),
  );
}

/** The PNG master that sits beside a WebP of the same shot, if there is one. */
function pngFallback(url: string): string | undefined {
  if (!url.endsWith('.webp')) return undefined;
  return assetUrl(`${url.slice(0, -'.webp'.length)}.png`);
}

/**
 * Resolves each declared screenshot to real images.
 *
 * Returns the WebP where the folder has one and the PNG master alongside it, so
 * the card can serve WebP to browsers that support it and fall back to PNG for
 * the rest.
 */
function useScreenshotSources(project: Project): Record<string, ScreenshotSource> {
  const shots = project.screenshots ?? [];
  const signature = `${project.id}:${shots.map((shot) => shot.id).join(',')}`;
  const [sources, setSources] = useState<Record<string, ScreenshotSource>>({});

  useEffect(() => {
    let cancelled = false;
    const found: Record<string, ScreenshotSource> = {};

    const resolve = async () => {
      const folder = project.screenshotFolder ?? project.id;

      for (const [index, shot] of shots.entries()) {
        if (cancelled) return;

        const webp: string[] = [];
        const png: string[] = [];

        for (const url of screenshotCandidates(folder, index, shot.id, shot.src)) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            const type = response.headers.get('content-type') ?? '';
            if (!response.ok || !type.startsWith('image/')) continue;

            if (url.endsWith('.webp')) webp.push(url);
            else png.push(url);
          } catch {
            /* candidate missing — try the next name */
          }
        }

        const primary = webp[0] ?? png[0];
        if (primary) found[shot.id] = { webp: webp[0], png: png[0] ?? pngFallback(primary) };
      }
      if (!cancelled) setSources(found);
    };

    void resolve();
    return () => {
      cancelled = true;
    };
    // `signature` collapses the dependency to "which shots are declared".
  }, [signature]);

  return sources;
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border)] pt-4">
      <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
        <Icon name={icon} size={14} className="text-accent" />
        {title}
      </h3>
      <div className="text-[13px] leading-relaxed text-secondary">{children}</div>
    </section>
  );
}

function Screenshot({
  shot,
  project,
  locale,
  source,
}: {
  shot: ProjectScreenshot;
  project: Project;
  locale: Locale;
  source?: ScreenshotSource;
}) {
  const caption = resolveText(shot.caption, locale);

  if (source) {
    return (
      <figure className="overflow-hidden rounded-xl border border-[var(--border)]">
        <picture>
          {source.webp ? <source srcSet={source.webp} type="image/webp" /> : null}
          <img
            src={source.webp ?? source.png}
            alt={caption}
            loading="lazy"
            className="h-36 w-full object-cover sm:h-44"
          />
        </picture>
        <figcaption className="border-t border-[var(--border)] px-3 py-2 text-[11px] text-muted">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--border)]">
      <div
        className="relative flex h-36 items-center justify-center sm:h-44"
        style={{
          background:
            'linear-gradient(140deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)',
        }}
      >
        <span aria-hidden="true" className="text-3xl opacity-40">
          <Icon name={project.icon ?? 'folder'} size={30} />
        </span>
      </div>
      <figcaption className="border-t border-[var(--border)] px-3 py-2 text-[11px] text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export function ProjectDetailApp({ projectId }: { projectId?: string }) {
  const { t, locale } = useI18n();
  const { openWindow, closeWindow } = useWindowManager();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="p-6">
        <EmptyState
          icon={<Icon name="image" size={14} />}
          title={t.projects.projectNotFound}
          action={
            <Button variant="primary" size="sm" onClick={() => openWindow('projects')}>
              {t.detail.backToProjects}
            </Button>
          }
        />
      </div>
    );
  }

const others = publishedProjects.filter((item) => item.id !== project.id).slice(0, 4);
  const features = (project.features ?? []).map((feature) => resolveText(feature, locale));
  const screenshots = project.screenshots ?? [];
  const sources = useScreenshotSources(project);

  const openSibling = (id: string) => openWindow('project-detail', { projectId: id });

  return (
    <div className="scroll-thin h-full overflow-y-auto">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[var(--border)] px-4 py-6 sm:px-7">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/18 via-transparent to-transparent" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                {project.id}
              </p>
              <h2 className="mt-1 text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                {project.title}
              </h2>
              {project.subtitle ? (
                <p className="mt-1 text-[13px] text-secondary">
                  {resolveText(project.subtitle, locale)}
                </p>
              ) : null}
            </div>
            {project.year ? (
              <span className="shrink-0 rounded-lg border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-muted">
                {project.year}
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.category.map((category) => (
              <Tag key={category} tone="accent">
                {category}
              </Tag>
            ))}
            {project.role ? <Tag>{resolveText(project.role, locale)}</Tag> : null}
          </div>

          {/* Links */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink"
              >
                <Icon name="git-branch" size={14} />
                {t.projects.github}
              </a>
            ) : (
              <span
                title={t.detail.linkUnavailable}
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-muted opacity-55"
              >
                <Icon name="git-branch" size={14} />
                {t.projects.github} · {t.common.comingSoon}
              </span>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink"
              >
                <Icon name="external-link" size={14} />
                {t.projects.demo}
              </a>
            ) : (
              <span
                title={t.detail.linkUnavailable}
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-muted opacity-55"
              >
                <Icon name="external-link" size={14} />
                {t.projects.demo} · {t.common.comingSoon}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6 sm:px-7">
<p className="text-[14px] leading-relaxed text-secondary">
          {resolveText(project.longDescription || project.description, locale)}
        </p>

        {project.highlight ? (
          <p className="flex items-start gap-2.5 rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-accent-soft px-3.5 py-3 text-[13px] font-medium leading-relaxed text-accent">
            <Icon name="star" size={15} className="mt-[2px] shrink-0" />
            <span>{resolveText(project.highlight, locale)}</span>
          </p>
        ) : null}

        {project.problem ? (
          <Block title={t.detail.problem} icon="help">
            <p>{resolveText(project.problem, locale)}</p>
          </Block>
        ) : null}

        {project.solution ? (
          <Block title={t.detail.solution} icon="lightbulb">
            <p>{resolveText(project.solution, locale)}</p>
          </Block>
        ) : null}

        {project.architecture || project.architectureFlow ? (
          <Block title={t.detail.architecture} icon="layers">
            {project.architecture ? <p>{resolveText(project.architecture, locale)}</p> : null}
            {project.architectureFlow && project.architectureFlow.length > 0 ? (
              <ol
                aria-label={t.detail.flowLabel}
                className="mt-3 flex flex-col items-stretch gap-0"
              >
                {project.architectureFlow.map((node, index) => (
                  <li key={node} className="flex flex-col items-center">
                    <span className="w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2 text-center font-mono text-xs text-ink">
                      {node}
                    </span>
                    {index < project.architectureFlow!.length - 1 ? (
                      <Icon name="chevron-down" size={15} className="my-1 text-muted" />
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </Block>
        ) : null}

        {features.length > 0 ? (
          <Block title={t.detail.features} icon="check-circle">
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[3px] text-[10px] text-[var(--success)]">
                    ▸
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.technologies.length > 0 ? (
          <Block title={t.detail.technologies} icon="wrench">
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--hover-surface)] px-2 py-1 text-[11px] text-secondary">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

{screenshots.length > 0 ? (
          <Block title={t.detail.screenshots} icon="image">
            <div className="grid gap-3 sm:grid-cols-2">
              {screenshots.map((shot) => (
                <Screenshot key={shot.id} shot={shot} project={project} locale={locale} source={sources[shot.id]} />
              ))}
            </div>
          </Block>
        ) : null}

        {others.length > 0 ? (
          <section className="border-t border-[var(--border)] pt-4">
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.detail.otherProjects}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {others.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => openSibling(item.id)}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2 text-left transition-colors hover:border-accent/60 hover:bg-accent-soft"
                  >
                    <Icon name={item.icon ?? 'folder'} size={16} />
                    <span className="min-w-0 flex-1 truncate text-[13px] text-secondary">
                      {item.title}
                    </span>
                    <Icon name="arrow-right" size={14} className="text-muted" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  closeWindow('project-detail');
                  openWindow('projects');
                }}
              >
                <Icon name="arrow-left" size={13} /> {t.detail.backToProjects}
              </Button>
            </div>
          </section>
        ) : (
          <div className="border-t border-[var(--border)] pt-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                closeWindow('project-detail');
                openWindow('projects');
              }}
            >
              <Icon name="arrow-left" size={13} /> {t.detail.backToProjects}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}