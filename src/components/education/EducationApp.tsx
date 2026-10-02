import { education } from '../../data/education';
import { certifications } from '../../data/certifications';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Tag } from '../ui/Primitives';
import { Icon } from '../ui/Icon';

export function EducationApp() {
  const { t, locale } = useI18n();

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.education.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.education.subtitle}</p>
        </header>

        <ol className="flex flex-col gap-4">
          {education.map((entry) => (
            <li key={entry.id}>
              <article className="card-surface relative overflow-hidden p-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-transparent"
                />
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <h4 className="max-w-xl text-[15px] font-semibold leading-snug text-ink">
                    {resolveText(entry.degree, locale)}
                  </h4>
                  <p className="font-mono text-xs text-secondary">{entry.period}</p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-2.5 py-1 text-[13px] font-medium text-ink">
                    <Icon name="school" size={15} className="text-accent" />
                    {entry.school}
                  </span>
                  {entry.note ? <Tag tone="accent">{resolveText(entry.note, locale)}</Tag> : null}
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Certifications */}
        <section aria-labelledby="certs-heading">
          <h4 id="certs-heading" className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.certs.title}
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li
                key={cert.id}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2 text-[13px] text-secondary"
              >
                <Icon name="check-circle" size={15} className="shrink-0 text-[var(--success)]" />
                <span className="min-w-0 truncate" title={cert.name}>
                  {cert.name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">{t.certs.note}</p>
        </section>
      </div>
    </div>
  );
}