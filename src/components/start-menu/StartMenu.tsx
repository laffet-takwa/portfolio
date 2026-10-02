import { useEffect, useMemo, useRef, useState } from 'react';
import { appIcon, appLabelKey, pinnedAppIds, profile } from '../../data/profile';
import { recommendedProjects } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useSearchIndex, type SearchItem } from '../../hooks/useSearchIndex';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import type { WindowId } from '../../types';

interface StartMenuProps {
  onClose: () => void;
  fullScreen?: boolean;
}

export function StartMenu({ onClose, fullScreen }: StartMenuProps) {
  const { t, fmt } = useI18n();
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useSearchIndex();

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo<SearchItem[]>(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return index
      .filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(needle))
      .slice(0, 12);
  }, [index, query]);

  const launch = (item: SearchItem) => {
    onClose();
    if (item.type === 'app') openWindow(item.id as WindowId);
    else if (item.type === 'project') openWindow('project-detail', { projectId: item.id });
    else openWindow('skills');
  };

  const hasQuery = query.trim().length >= 2;

  return (
    <div
      className={[
        'glass window-content animate-menu-in flex flex-col overflow-hidden rounded-xl shadow-[var(--shadow)]',
        fullScreen ? 'fixed inset-0 z-[8000] rounded-none' : 'w-[min(94vw,440px)] max-h-[min(70vh,560px)]',
      ].join(' ')}
      role="dialog"
      aria-label={t.start.title}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {/* Search */}
      <div className="shrink-0 border-b border-[var(--border)] p-3">
        <div className="relative">
          <Icon
            name="search"
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <label htmlFor="start-search" className="sr-only">
            {t.start.searchLabel}
          </label>
          <input
            id="start-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.start.searchPlaceholder}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] py-2 pl-8 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto p-3">
        {hasQuery ? (
          results.length > 0 ? (
            <ul aria-label={t.a11y.searchResults} className="flex flex-col gap-1">
              {results.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => launch(item)}
                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-sm"
                    >
                      <Icon name={item.icon} size={14} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-ink">{item.title}</span>
                      <span className="block truncate text-[11px] text-muted">{item.subtitle}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted"
                    >
                      {t.search.categories[item.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-2 py-8 text-center">
              <p className="text-sm text-secondary">{t.start.noResults}</p>
              <p className="mt-1 text-xs text-muted">{t.start.noResultsHint}</p>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-5">
            {/* Pinned */}
            <section>
              <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t.start.pinned}
              </h2>
              <ul className="grid grid-cols-5 gap-0.5">
                {pinnedAppIds.map((id) => {
                  const label = t.apps[appLabelKey[id]];
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openWindow(id);
                        }}
                        aria-label={fmt(t.a11y.openApp, { name: label })}
                        className="flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-2 text-center transition-colors hover:bg-accent-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-base"
                        >
                          <Icon name={appIcon(id)} size={17} />
                        </span>
                        <span className="line-clamp-2 text-[10px] leading-tight text-secondary">
                          {label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Recommended projects */}
            <section>
              <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t.start.recommended}
              </h2>
              <ul className="flex flex-col gap-1">
                {recommendedProjects.slice(0, 4).map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openWindow('project-detail', { projectId: project.id });
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-sm"
                      >
                        <Icon name={project.icon ?? 'folder'} size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] text-ink">
                          {project.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted">
                          {project.category.join(' · ')}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex shrink-0 items-center gap-3 border-t border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5">
        <Avatar size={36} label={t.about.name} rounded="rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-ink">{profile.name}</p>
          <p className="truncate text-[11px] text-muted">{t.start.userRole}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            openWindow('settings');
          }}
          aria-label={fmt(t.a11y.openApp, { name: t.apps.settings })}
          title={t.apps.settings}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm text-secondary transition-colors hover:bg-accent-soft hover:text-accent"
        >
          <Icon name="settings" size={15} />
        </button>
      </div>
    </div>
  );
}