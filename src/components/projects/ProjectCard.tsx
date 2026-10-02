import { useI18n } from '../../i18n/useI18n';
import { resolveText, type Project } from '../../types';
import { Tag } from '../ui/Primitives';
import { Icon } from '../ui/Icon';

interface ProjectCardProps {
  project: Project;
  onOpen: (projectId: string) => void;
  featured?: boolean;
}

const MAX_TAGS = 5;

export function ProjectCard({ project, onOpen, featured }: ProjectCardProps) {
  const { t, locale, fmt } = useI18n();
  const description = resolveText(project.description, locale);
  const visibleTags = project.technologies.slice(0, MAX_TAGS);
  const overflow = project.technologies.length - visibleTags.length;

  return (
    <article
      className={[
        'card-surface group flex flex-col overflow-hidden',
        featured ? 'sm:col-span-2 sm:flex-row' : '',
      ].join(' ')}
    >
      {/* Cover */}
      <div
        className={[
          'relative overflow-hidden border-b border-[var(--border)]',
          featured ? 'h-36 sm:h-auto sm:w-[38%] sm:border-b-0 sm:border-r lg:w-[42%]' : 'h-32 sm:h-36',
        ].join(' ')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/10 to-transparent transition-transform duration-500 group-hover:scale-[1.06]" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(var(--wallpaper-line) 1px, transparent 1px), linear-gradient(90deg, var(--wallpaper-line) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Cover meta */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
        >
          {project.id}
        </span>
        {project.year ? (
          <span
            aria-hidden="true"
            className="absolute right-3 top-2.5 rounded-md border border-[var(--border)] bg-[var(--window-solid)]/70 px-1.5 py-0.5 font-mono text-[10px] text-secondary"
          >
            {project.year}
          </span>
        ) : null}
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110',
              featured ? 'text-5xl sm:text-6xl' : 'text-4xl',
            ].join(' ')}
          >
            <Icon name={project.icon ?? 'folder'} size={featured ? 56 : 40} />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1 bg-gradient-to-t from-[var(--background)] to-transparent p-2.5">
          {project.category.map((category) => (
            <Tag key={category} tone="accent">
              {category}
            </Tag>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3
          className={[
            'font-semibold leading-snug text-ink transition-colors group-hover:text-accent',
            featured ? 'text-lg' : 'text-[15px]',
          ].join(' ')}
        >
          {project.title}
        </h3>

        <p
          className={[
            'flex-1 leading-relaxed text-secondary',
            featured ? 'line-clamp-4 text-[13px]' : 'line-clamp-3 text-[13px]',
          ].join(' ')}
        >
          {description}
        </p>

        {visibleTags.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {visibleTags.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted"
              >
                {tech}
              </li>
            ))}
            {overflow > 0 ? (
              <li className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted">
                +{overflow}
              </li>
            ) : null}
          </ul>
        ) : null}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            aria-label={fmt(t.a11y.openApp, { name: project.title })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-accent px-2.5 py-1.5 text-xs font-medium text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            {t.projects.viewProject}
            <Icon name="arrow-right" size={13} />
          </button>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink"
            >
              <Icon name="git-branch" size={13} />
              {t.projects.github}
            </a>
          ) : (
            <span
              title={t.detail.linkUnavailable}
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-muted opacity-50"
            >
              <Icon name="git-branch" size={13} />
              {t.projects.github}
            </span>
          )}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink"
            >
              <Icon name="external-link" size={13} />
              {t.projects.demo}
            </a>
          ) : (
            <span
              title={t.detail.linkUnavailable}
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-muted opacity-50"
            >
              <Icon name="external-link" size={13} />
              {t.projects.demo}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}