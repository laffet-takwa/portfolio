import { useMemo, useState } from 'react';
import { publishedProjects, usedFilters } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { ProjectCard } from './ProjectCard';
import { EmptyState, Button } from '../ui/Primitives';
import { Icon } from '../ui/Icon';
import { resolveText } from '../../types';

export function ProjectsApp() {
  const { t, locale } = useI18n();
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = useMemo(() => usedFilters(), []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return publishedProjects.filter((project) => {
      const matchesFilter = filter === 'All' || project.category.includes(filter);
      if (!matchesFilter) return false;
      if (!needle) return true;
      const haystack = [
        project.title,
        resolveText(project.description, locale),
        ...project.category,
        ...project.technologies,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, filter, locale]);

  const featured = useMemo(
    () => (filter === 'All' && !query.trim() ? results.filter((project) => project.featured) : []),
    [filter, query, results],
  );

  const openDetail = (projectId: string) => openWindow('project-detail', { projectId });
  const isFiltered = filter !== 'All' || Boolean(query.trim());

  return (
    <div className="scroll-thin h-full overflow-y-auto">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--window-solid)_88%,transparent)] px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Icon
                name="search"
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <label htmlFor="projects-search" className="sr-only">
                {t.projects.searchPlaceholder}
              </label>
              <input
                id="projects-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.projects.searchPlaceholder}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] py-2 pl-8 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
            <p className="shrink-0 text-xs text-muted">
              <span className="font-semibold text-secondary">{results.length}</span>{' '}
              {t.projects.resultsCount}
            </p>
          </div>

          <div
            role="group"
            aria-label={t.projects.filters}
            className="-mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 pb-1 scroll-thin"
          >
            {filters.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                  className={[
                    'shrink-0 snap-start rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    active
                      ? 'border-transparent bg-accent text-[var(--accent-contrast)]'
                      : 'border-[var(--border)] text-secondary hover:border-accent/50 hover:text-ink',
                  ].join(' ')}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6">
        {results.length === 0 ? (
          <EmptyState
            icon={<Icon name="search" size={14} />}
            title={t.projects.noResults}
            hint={t.projects.noResultsHint}
            action={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setFilter('All');
                }}
              >
                {t.projects.clearSearch}
              </Button>
            }
          />
        ) : (
          <>
            {featured.length > 0 ? (
              <section aria-labelledby="featured-heading">
                <header className="mb-4">
                  <h2 id="featured-heading" className="text-base font-semibold tracking-tight text-ink">
                    <span className="inline-flex items-center gap-1.5"><Icon name="star" size={15} className="text-[var(--success)]" />{t.projects.featured}</span>
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">{t.projects.featuredHint}</p>
                </header>
                <div className="grid gap-4 sm:grid-cols-2">
                  {featured.map((project) => (
                    <ProjectCard key={project.id} project={project} onOpen={openDetail} featured />
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="all-heading">
              <header className="mb-4">
                <h2 id="all-heading" className="text-base font-semibold tracking-tight text-ink">
                  {isFiltered ? `${t.projects.all} — ${filter === 'All' ? '' : filter}` : t.projects.all}
                </h2>
              </header>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {(featured.length > 0
                  ? results.filter((project) => !featured.some((f) => f.id === project.id))
                  : results
                ).map((project) => (
                  <ProjectCard key={project.id} project={project} onOpen={openDetail} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}