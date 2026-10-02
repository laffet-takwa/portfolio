import { appIcon, appLabelKey, mobileGridAppIds, profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';

/**
 * Desktop home screen — the first thing a recruiter reads.
 * Content is kept to the essentials: who, what, availability, next step.
 */
export function DesktopHome() {
  const { t, locale } = useI18n();
  const { openWindow } = useWindowManager();
  const isMobile = useIsMobile();

  return (
    <section
      className="pointer-events-none flex h-full items-center px-6 pt-24 pb-28 sm:pl-[124px] sm:pr-6 sm:pt-6 sm:pb-24 lg:pl-[140px] lg:pr-10"
      aria-labelledby="hero-name"
    >
        <div className="pointer-events-auto w-full max-w-2xl">
        <h1
          id="hero-name"
          className="animate-rise-in text-[34px] font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          {t.desktop.heroName}
        </h1>

        <ul
          className="animate-rise-in mt-4 flex flex-col gap-1 sm:gap-1.5"
          style={{ animationDelay: '80ms' }}
        >
          {[t.desktop.role1, t.desktop.role2, t.desktop.role3].map((role) => (
            <li key={role} className="flex items-center gap-2.5 text-[15px] text-secondary sm:text-lg">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              {role}
            </li>
          ))}
        </ul>

        <p
          className="animate-rise-in mt-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--success)]"
          style={{ animationDelay: '120ms' }}
        >
          <span aria-hidden="true" className="animate-status-pulse h-2 w-2 rounded-full bg-[var(--success)]" />
          {resolveText(profile.availability, locale)}
        </p>

        <p
          className="animate-rise-in mt-5 max-w-xl text-[13px] leading-relaxed text-secondary sm:text-[15px]"
          style={{ animationDelay: '160ms' }}
        >
          {t.desktop.heroTagline}
        </p>

        <div
          className="animate-rise-in mt-7 flex flex-wrap gap-2"
          style={{ animationDelay: '200ms' }}
        >
          <button
            type="button"
            onClick={() => openWindow('projects')}
            className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-accent px-4 py-2.5 text-sm font-medium text-[var(--accent-contrast)] shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Icon name="folder" size={17} />
            {t.desktop.jumpToProjects}
          </button>
          <button
            type="button"
            onClick={() => openWindow('resume')}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--window)] px-4 py-2.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent/60"
          >
            <Icon name="file-text" size={17} />
            {t.desktop.jumpToResume}
          </button>
          <button
            type="button"
            onClick={() => openWindow('contact')}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--window)] px-4 py-2.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent/60"
          >
            <Icon name="mail" size={17} />
            {t.desktop.jumpToContact}
          </button>
        </div>

        <p
          className="animate-rise-in mt-6 hidden text-[11px] text-muted sm:block"
          style={{ animationDelay: '240ms' }}
        >
          {t.desktop.keyboardHint}
        </p>

        {/* Mobile quick launch — replaces the desktop icon column */}
        {isMobile ? (
          <ul
            aria-label={t.a11y.iconsLabel}
            className="animate-rise-in mt-8 grid grid-cols-4 gap-2"
            style={{ animationDelay: '280ms' }}
          >
            {mobileGridAppIds.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => openWindow(id)}
                  className="flex w-full flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-center transition-colors active:bg-[var(--hover-surface)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--window-border)] bg-[var(--window)] text-xl shadow-[var(--shadow-soft)]"
                  >
                    {<Icon name={appIcon(id)} size={21} />}
                  </span>
                  <span className="line-clamp-2 text-[10px] leading-tight text-secondary">
                    {t.apps[appLabelKey[id]]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {!isMobile ? (
        <div className="pointer-events-auto absolute bottom-[72px] right-8 hidden flex-col items-end gap-1 text-[11px] text-muted xl:flex">
          <span>{t.desktop.heroHint}</span>
        </div>
      ) : null}
    </section>
  );
}