import { experience } from '../../data/experience';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';

export function ExperienceApp() {
  const { t, locale } = useI18n();

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.experience.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.experience.subtitle}</p>
        </header>

        <ol className="relative flex flex-col gap-5 border-l border-[var(--border)] pl-6">
          {experience.map((entry) => (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[var(--window-solid)] bg-accent"
              />
              <article className="card-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-sm font-semibold text-ink">{entry.organization}</h4>
                  <p className="font-mono text-[11px] text-muted">{entry.period}</p>
                </div>

                <p className="mt-1 text-[13px] text-secondary">{resolveText(entry.role, locale)}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                  <span>
                    {t.experience.type}: {resolveText(entry.type, locale)}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>
                    {t.experience.location}: {resolveText(entry.location, locale)}
                  </span>
                </div>

                <div className="mt-3">
                  <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t.experience.workOn}
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {entry.highlights.map((item, index) => (
                      <li key={index} className="flex gap-2 text-[13px] text-secondary">
                        <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{resolveText(item, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 border-t border-[var(--border)] pt-3">
                  <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t.experience.technologies}
                  </h5>
                  <ul className="flex flex-wrap gap-1.5">
                    {entry.technologies.map((tech) => (
                      <li key={tech}>
                        <span className="inline-flex items-center rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-secondary">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}