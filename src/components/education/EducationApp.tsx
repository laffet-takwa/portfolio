import { education } from '../../data/education';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
import { Button, Tag } from '../ui/Primitives';
import { useWindowManager } from '../../context/WindowManagerProvider';

export function EducationApp() {
  const { t, locale } = useI18n();
  const { openWindow } = useWindowManager();

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.education.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.education.subtitle}</p>
        </header>

        <ol className="flex flex-col gap-4">
          {education.map((entry, index) => (
            <li key={entry.id} className="animate-rise-in" style={{ animationDelay: `${index * 70}ms` }}>
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

                {entry.degreeAlt ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {resolveText(entry.degreeAlt, locale)}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-2.5 py-1 text-[13px] font-medium text-ink">
                    <Icon name="school" size={15} className="text-accent" />
                    {entry.school}
                  </span>
                  {entry.note ? <Tag tone="accent">{resolveText(entry.note, locale)}</Tag> : null}
                </div>

                {entry.schoolDetail ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    {resolveText(entry.schoolDetail, locale)}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>

        <div className="rounded-xl border border-dashed border-[var(--border)] px-4 py-4">
          <p className="text-[13px] leading-relaxed text-secondary">{t.certs.subtitle}</p>
          <Button
            size="sm"
            variant="secondary"
            className="mt-3"
            icon={<Icon name="award" size={14} />}
            onClick={() => openWindow('certifications')}
          >
            {t.apps.certifications}
          </Button>
        </div>
      </div>
    </div>
  );
}