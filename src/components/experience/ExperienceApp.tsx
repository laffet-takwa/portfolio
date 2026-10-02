import { useState } from 'react';
import { experience } from '../../data/experience';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Primitives';

const COLLAPSED_TAGS = 6;

export function ExperienceApp() {
  const { t, locale } = useI18n();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((current) => ({ ...current, [id]: !current[id] }));

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.experience.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.experience.subtitle}</p>
        </header>

        <ol className="relative flex flex-col gap-5 border-l border-[var(--border)] pl-6">
          {experience.map((entry, index) => {
            const isOpen = Boolean(expanded[entry.id]);
            const technologies = isOpen
              ? entry.technologies
              : entry.technologies.slice(0, COLLAPSED_TAGS);
            const overflow = entry.technologies.length - technologies.length;

            return (
              <li
                key={entry.id}
                className="animate-rise-in relative"
                style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[var(--window-solid)] bg-accent"
                />
                <article className="card-surface p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-sm font-semibold text-ink">{entry.organization}</h4>
                    <p className="font-mono text-[11px] text-muted">{entry.period}</p>
                  </div>

                  <p className="mt-1 text-[13px] font-medium text-secondary">
                    {resolveText(entry.role, locale)}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                    <span>
                      {t.experience.type}: {resolveText(entry.type, locale)}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>
                      {t.experience.location}: {resolveText(entry.location, locale)}
                    </span>
                  </div>

                  {entry.project ? (
                    <p className="mt-3 flex items-start gap-2 text-[13px] font-medium text-accent">
                      <Icon name="folder" size={14} className="mt-[3px]" />
                      <span className="min-w-0">{resolveText(entry.project, locale)}</span>
                    </p>
                  ) : null}

                  {entry.summary && !isOpen ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-secondary">
                      {resolveText(entry.summary, locale)}
                    </p>
                  ) : null}

                  {entry.highlights.length > 0 ? (
                    <div className="mt-3">
                      <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {t.experience.workOn}
                      </h5>
                      <ul className="flex flex-col gap-1">
                        {entry.highlights.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex gap-2 text-[13px] leading-relaxed text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            <span>{resolveText(item, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {entry.technologies.length > 0 ? (
                    <div className="mt-3 border-t border-[var(--border)] pt-3">
                      <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {t.experience.technologies}
                      </h5>
                      <ul className="flex flex-wrap gap-1.5">
                        {technologies.map((tech) => (
                          <li key={tech}>
                            <Tag>{tech}</Tag>
                          </li>
                        ))}
                        {overflow > 0 && !isOpen ? (
                          <li>
                            <Tag tone="outline">+{overflow}</Tag>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}

                  {entry.contributions?.length || entry.methodologies?.length ? (
                    <div className="mt-3 border-t border-[var(--border)] pt-3">
                      <div
                        id={`exp-details-${entry.id}`}
                        hidden={!isOpen}
                        className="flex flex-col gap-3"
                      >
                        {entry.contributions?.length ? (
                          <div>
                            <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {t.experience.contributions}
                            </h5>
                            <ul className="grid gap-1 sm:grid-cols-2">
                              {entry.contributions.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex gap-2 text-[12px] leading-relaxed text-secondary"
                                >
                                  <span className="mt-[3px] text-[9px] text-[var(--success)]">
                                    ▸
                                  </span>
                                  <span>{resolveText(item, locale)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {entry.methodologies?.length ? (
                          <div>
                            <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {t.experience.methodology}
                            </h5>
                            <ul className="flex flex-wrap gap-1.5">
                              {entry.methodologies.map((method) => (
                                <li key={method}>
                                  <Tag tone="accent">{method}</Tag>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggle(entry.id)}
                        aria-expanded={isOpen}
                        aria-controls={`exp-details-${entry.id}`}
                        className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink"
                      >
                        <Icon
                          name="chevron-down"
                          size={14}
                          className={['transition-transform', isOpen ? 'rotate-180' : ''].join(' ')}
                        />
                        {isOpen ? t.experience.hideDetails : t.experience.details}
                      </button>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}