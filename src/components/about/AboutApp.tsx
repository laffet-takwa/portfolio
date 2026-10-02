import { profile } from '../../data/profile';
import { education } from '../../data/education';
import { languages } from '../../data/languages';
import { useI18n } from '../../i18n/useI18n';
import { resolveText, type IconName, type LanguageLevel } from '../../types';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Primitives';
import { Avatar } from '../ui/Avatar';

export function AboutApp() {
  const { t, locale } = useI18n();

  const facts: Array<{ icon: IconName; label: string }> = [
    { icon: 'map-pin', label: t.about.facts.location },
    { icon: 'graduation', label: t.about.facts.education },
    { icon: 'code', label: t.about.facts.fullStack },
    { icon: 'shield', label: t.about.facts.security },
    { icon: 'cloud', label: t.about.facts.cloud },
    { icon: 'check-circle', label: t.about.facts.availability },
  ];

  const focusAreas: Array<{ icon: IconName; label: string }> = [
    { icon: 'lock', label: t.about.focus.securityEngineering },
    { icon: 'blocks', label: t.about.focus.secureDevelopment },
    { icon: 'globe', label: t.about.focus.cloudPlatforms },
    { icon: 'zap', label: t.about.focus.automation },
  ];

  const levelLabel = (level: LanguageLevel): string => t.languages[level];

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Identity */}
        <section className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar
            size={104}
            label={t.about.avatarLabel}
            status="available"
            statusLabel={t.about.facts.availability}
          />

          <div className="min-w-0">
            <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{t.about.name}</h3>
            <ul className="mt-1.5 flex flex-col gap-0.5">
              {[t.about.role1, t.about.role2, t.about.role3].map((role) => (
                <li key={role} className="text-sm text-secondary">
                  {role}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Tag tone="accent">
                {resolveText(profile.availability, locale)}
              </Tag>
              <Tag>{resolveText(profile.location, locale)}</Tag>
            </div>
          </div>
        </section>

        <p className="text-[13px] leading-relaxed text-secondary sm:text-sm">{t.about.description}</p>

        {/* Profile facts */}
        <section>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.about.factsLabel}
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {facts.map((fact) => (
              <li
                key={fact.label}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2 text-[13px] text-secondary"
              >
                <Icon name={fact.icon} size={15} className="text-accent" />
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Focus areas */}
        <section>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.about.focusLabel}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <li key={area.label}>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs text-secondary">
                  <Icon name={area.icon} size={14} className="text-accent" />
                  {area.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

{/* Languages */}
        <section aria-labelledby="about-languages-heading">
          <h4
            id="about-languages-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted"
          >
            {t.languages.title}
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {languages.map((language) => (
              <li
                key={language.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Icon name="globe" size={15} className="shrink-0 text-accent" />
                  <span className="truncate text-[13px] font-medium text-ink">{language.name}</span>
                </span>
                <Tag tone={language.level === 'native' ? 'accent' : 'outline'}>
                  {levelLabel(language.level)}
                </Tag>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-muted">{t.languages.subtitle}</p>
        </section>

        {/* Education snapshot */}
        <section>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.education.title}
          </h4>
          <ul className="flex flex-col gap-2">
            {education.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border border-[var(--border)] px-3 py-2.5"
              >
<div className="min-w-0">
                  <p className="text-[13px] font-medium text-ink">
                    {resolveText(entry.degree, locale)}
                  </p>
                  {entry.degreeAlt ? (
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      {resolveText(entry.degreeAlt, locale)}
                    </p>
                  ) : null}
                  <p className="mt-0.5 text-xs text-muted">{entry.school}</p>
                </div>
                <p className="font-mono text-xs text-secondary">{entry.period}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}