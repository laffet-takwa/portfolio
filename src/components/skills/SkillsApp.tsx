import { useMemo, useState } from 'react';
import { skillGroups } from '../../data/skills';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';

export function SkillsApp() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState('');

  const total = useMemo(
    () => skillGroups.reduce((sum, group) => sum + group.items.length, 0),
    [],
  );

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return skillGroups;
    return skillGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(needle)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">{t.skills.title}</h3>
            <p className="mt-0.5 text-xs text-muted">{t.skills.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="skills-search">
              {t.skills.searchPlaceholder}
            </label>
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Icon
                name="search"
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="skills-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.skills.searchPlaceholder}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] py-2 pl-8 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
            <p className="text-xs text-muted">
              <span className="font-semibold text-secondary">{total}</span>{' '}
              {t.skills.technologyCount}
            </p>
          </div>
        </header>

        {groups.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] px-4 py-10 text-center text-sm text-muted">
            {t.skills.empty}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.map((group) => (
              <section
                key={group.id}
                className="card-surface flex flex-col gap-3 p-4"
                aria-labelledby={`skill-group-${group.id}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={group.icon} size={15} />
                  </span>
                  <h4
                    id={`skill-group-${group.id}`}
                    className="text-sm font-semibold text-ink"
                  >
                    {resolveText(group.label, locale)}
                  </h4>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--hover-surface)] px-2 py-1 text-[11px] font-medium text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}