import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { usePreferences } from '../../context/PreferencesProvider';
import { profile } from '../../data/profile';
import { resolveText } from '../../types';
import type { IconName, Locale, ThemeMode } from '../../types';
import { Icon } from '../ui/Icon';

type SectionId = 'appearance' | 'language' | 'accessibility' | 'about';

export function SettingsApp() {
  const { t, locale } = useI18n();
  const { themeMode, setThemeMode, setLocale, reduceMotion, setReduceMotion, largeText, setLargeText, reset } =
    usePreferences();
  const [section, setSection] = useState<SectionId>('appearance');
  const [resetMessage, setResetMessage] = useState(false);

  useEffect(() => {
    if (!resetMessage) return;
    const timer = window.setTimeout(() => setResetMessage(false), 2200);
    return () => window.clearTimeout(timer);
  }, [resetMessage]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sections: Array<{ id: SectionId; icon: IconName; label: string }> = [
    { id: 'appearance', icon: 'palette', label: t.settings.appearance },
    { id: 'language', icon: 'globe', label: t.settings.language },
    { id: 'accessibility', icon: 'accessibility', label: t.settings.accessibility },
    { id: 'about', icon: 'info', label: t.settings.about },
  ];

  const appearanceOptions: Array<{ id: ThemeMode; label: string; icon: IconName }> = [
    { id: 'light', label: t.settings.light, icon: 'sun' },
    { id: 'dark', label: t.settings.dark, icon: 'moon' },
    { id: 'system', label: t.settings.system, icon: 'monitor' },
  ];

  const languageOptions: Array<{ id: Locale; label: string; code: string }> = [
    { id: 'en', label: t.settings.english, code: 'EN' },
    { id: 'fr', label: t.settings.french, code: 'FR' },
  ];

  const showNav = !isMobile;

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      {/* Section navigation */}
      {showNav ? (
        <nav
          aria-label={t.settings.title}
          className="w-56 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--hover-surface)] p-3 scroll-thin"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((item) => {
              const active = section === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setSection(item.id)}
                    className={[
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
                      active
                        ? 'bg-accent-soft font-medium text-accent'
                        : 'text-secondary hover:bg-[var(--hover-surface)] hover:text-ink',
                    ].join(' ')}
                  >
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {/* Panel */}
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {isMobile ? (
            <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 scroll-thin">
              {sections.map((item) => {
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSection(item.id)}
                    className={[
                      'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      active
                        ? 'border-transparent bg-accent text-[var(--accent-contrast)]'
                        : 'border-[var(--border)] text-secondary',
                    ].join(' ')}
                  >
                    <Icon name={item.icon} size={16} /> {item.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {/* Appearance */}
          {section === 'appearance' ? (
            <section>
              <h3 className="text-sm font-semibold text-ink">{t.settings.appearance}</h3>
              <p className="mt-1 text-xs text-muted">{t.settings.appearanceHint}</p>

              <div
                role="radiogroup"
                aria-label={t.settings.appearance}
                className="mt-4 grid gap-2 sm:grid-cols-3"
              >
                {appearanceOptions.map((option) => {
                  const active = themeMode === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setThemeMode(option.id)}
                      className={[
                        'flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-colors',
                        active
                          ? 'border-accent bg-accent-soft'
                          : 'border-[var(--border)] hover:border-accent/50',
                      ].join(' ')}
                    >
<Icon name={option.icon} size={22} className={active ? 'text-accent' : 'text-secondary'} />
                      <span
                        className={`text-[13px] font-medium ${active ? 'text-accent' : 'text-secondary'}`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] text-muted">{t.settings.saved}</p>
            </section>
          ) : null}

          {/* Language */}
          {section === 'language' ? (
            <section>
              <h3 className="text-sm font-semibold text-ink">{t.settings.language}</h3>
              <p className="mt-1 text-xs text-muted">{t.settings.languageHint}</p>

              <div
                role="radiogroup"
                aria-label={t.settings.language}
                className="mt-4 grid gap-2 sm:grid-cols-2"
              >
                {languageOptions.map((option) => {
                  const active = locale === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setLocale(option.id)}
                      className={[
                        'flex items-center gap-3 rounded-xl border p-3 text-left transition-colors',
                        active
                          ? 'border-accent bg-accent-soft'
                          : 'border-[var(--border)] hover:border-accent/50',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-semibold',
                          active
                            ? 'border-accent bg-accent text-[var(--accent-contrast)]'
                            : 'border-[var(--border)] text-muted',
                        ].join(' ')}
                      >
                        {option.code}
                      </span>
                      <span
                        className={`text-[13px] font-medium ${active ? 'text-accent' : 'text-secondary'}`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* Accessibility */}
          {section === 'accessibility' ? (
            <section>
              <h3 className="text-sm font-semibold text-ink">{t.settings.accessibility}</h3>
              <p className="mt-1 text-xs text-muted">{t.settings.accessibilityHint}</p>

              <ul className="mt-4 flex flex-col gap-2">
                <li className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink">{t.settings.reduceMotion}</p>
                    <p className="text-[11px] text-muted">{t.settings.reduceMotionHint}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={reduceMotion}
                    aria-label={t.settings.reduceMotion}
                    onClick={() => setReduceMotion(!reduceMotion)}
                    className={[
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      reduceMotion ? 'bg-accent' : 'bg-[var(--hover-surface)] border border-[var(--border)]',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                        reduceMotion ? 'left-[22px]' : 'left-0.5',
                      ].join(' ')}
                    />
                  </button>
                </li>

                <li className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink">{t.settings.largeText}</p>
                    <p className="text-[11px] text-muted">{t.settings.largeTextHint}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={largeText}
                    aria-label={t.settings.largeText}
                    onClick={() => setLargeText(!largeText)}
                    className={[
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      largeText ? 'bg-accent' : 'bg-[var(--hover-surface)] border border-[var(--border)]',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                        largeText ? 'left-[22px]' : 'left-0.5',
                      ].join(' ')}
                    />
                  </button>
                </li>
              </ul>
            </section>
          ) : null}

          {/* About */}
          {section === 'about' ? (
            <section className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold text-ink">{t.settings.about}</h3>
                <p className="mt-1 text-xs text-muted">{t.settings.subtitle}</p>
              </div>

              <dl className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5">
                  <dt className="text-xs text-muted">{t.settings.deviceLabel}</dt>
                  <dd className="truncate font-mono text-xs text-secondary">
                    {typeof navigator !== 'undefined' ? navigator.platform : '—'}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5">
                  <dt className="text-xs text-muted">{t.settings.browserLabel}</dt>
                  <dd className="truncate font-mono text-xs text-secondary">
                    {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 48) : '—'}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5">
                  <dt className="text-xs text-muted">{t.terminal.outputs.os}</dt>
                  <dd className="font-mono text-xs text-secondary">{t.terminal.outputs.terminal}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5">
                  <dt className="text-xs text-muted">{t.settings.storageLabel}</dt>
                  <dd className="text-xs text-secondary">{t.settings.storageHint}</dd>
                </div>
              </dl>

              <div className="rounded-xl border border-[var(--border)] px-3 py-3">
                <p className="text-[13px] font-medium text-ink">{profile.name}</p>
                <p className="text-xs text-secondary">{t.about.role1}</p>
                <p className="mt-1 text-[11px] text-muted">
                  <Icon name="map-pin" size={12} /> {resolveText(profile.location, locale)} · {resolveText(profile.availability, locale)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  reset();
                  setResetMessage(true);
                }}
                className="self-start rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-[var(--danger)] hover:text-[var(--danger)]"
              >
                {t.settings.reset}
              </button>
              <p aria-live="polite" className="min-h-[1rem] text-[11px] text-[var(--success)]">
                {resetMessage ? t.settings.resetDone : ''}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}