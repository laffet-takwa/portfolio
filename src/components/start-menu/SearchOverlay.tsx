import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useSearchIndex, type SearchItem } from '../../hooks/useSearchIndex';
import { Icon } from '../ui/Icon';
import type { WindowId } from '../../types';

interface SearchOverlayProps {
  onClose: () => void;
}

/** Ctrl + K quick search across applications, projects and skills. */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const { t, fmt } = useI18n();
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const index = useSearchIndex();

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo<SearchItem[]>(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return index
      .filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(needle))
      .slice(0, 10);
  }, [index, query]);

  useEffect(() => setActive(0), [query]);

  const launch = (item: SearchItem | undefined) => {
    if (!item) return;
    onClose();
    if (item.type === 'app') openWindow(item.id as WindowId);
    else if (item.type === 'project') openWindow('project-detail', { projectId: item.id });
    else openWindow('skills');
  };

  useEffect(() => {
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const hasQuery = query.trim().length >= 2;

  return (
    <div
      className="fixed inset-0 z-[8500] flex items-start justify-center bg-[var(--scrim)] px-4 pt-[12vh] backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t.search.title}
      onClick={onClose}
    >
      <div
        className="glass window-content animate-menu-in w-full max-w-xl overflow-hidden rounded-xl shadow-[var(--shadow)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2.5">
          <Icon name="search" size={15} className="text-muted" />
          <label htmlFor="global-search" className="sr-only">
            {t.search.placeholder}
          </label>
          <input
            id="global-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActive((current) => Math.min(current + 1, results.length - 1));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActive((current) => Math.max(current - 1, 0));
              } else if (event.key === 'Enter') {
                event.preventDefault();
                launch(results[active]);
              }
            }}
            placeholder={t.search.placeholder}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <div className="scroll-thin max-h-[52vh] overflow-y-auto p-2">
          {!hasQuery ? (
            <p className="px-3 py-6 text-center text-xs text-muted">{t.search.empty}</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-secondary">{t.search.noResults}</p>
          ) : (
            <>
              <ul ref={listRef} role="listbox" aria-label={t.a11y.searchResults}>
                {results.map((item, index) => (
                  <li key={`${item.type}-${item.id}`} role="option" aria-selected={index === active}>
                    <button
                      type="button"
                      onClick={() => launch(item)}
                      onMouseEnter={() => setActive(index)}
                      className={[
                        'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                        index === active ? 'bg-accent-soft' : 'hover:bg-[var(--hover-surface)]',
                      ].join(' ')}
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
              <p className="px-3 py-2 text-[10px] text-muted">{t.search.enterHint}</p>
            </>
          )}
        </div>

        <p className="sr-only">{fmt(t.a11y.searchResults, {})}</p>
      </div>
    </div>
  );
}