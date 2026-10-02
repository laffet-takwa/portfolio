import { useEffect, useState } from 'react';
import { appIcon, profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/Icon';
import { useAppLabel } from '../../hooks/useAppLabel';
import { usePreferences } from '../../context/PreferencesProvider';
import { useWindowManager, TASKBAR_HEIGHT } from '../../context/WindowManagerProvider';
import type { WindowId } from '../../types';

/** Clock with a one-second resolution, locale aware. */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

function useOnlineStatus() {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  return online;
}

interface BatteryLike {
  level: number;
  charging: boolean;
}

function useBattery(): BatteryLike | null {
  const [battery, setBattery] = useState<BatteryLike | null>(null);
  useEffect(() => {
    let cancelled = false;
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<BatteryLike & { addEventListener: (t: string, f: () => void) => void }>;
    };
    if (typeof nav.getBattery !== 'function') return;
    nav
      .getBattery()
      .then((manager) => {
        if (cancelled) return;
        const sync = () =>
          setBattery({ level: manager.level, charging: manager.charging });
        sync();
        manager.addEventListener('levelchange', sync);
        manager.addEventListener('chargingchange', sync);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return battery;
}

interface TaskbarProps {
  startOpen: boolean;
  onToggleStart: () => void;
  onOpenSearch: () => void;
}

/** One running application in the taskbar. */
function TaskbarAppButton({ winId, projectId }: { winId: WindowId; projectId?: string }) {
  const { t, fmt } = useI18n();
  const { windows, toggleWindow } = useWindowManager();
  const label = useAppLabel(winId, projectId);
  const win = windows.find((item) => item.id === winId);
  if (!win) return null;

  const active = win.focused && !win.minimized;
  const accessible = fmt(t.a11y.openApp, { name: label });

  return (
    <button
      type="button"
      onClick={() => toggleWindow(win.id, { projectId: win.projectId })}
      aria-pressed={active}
      aria-label={accessible}
      title={
        win.minimized
          ? accessible
          : `${fmt(t.a11y.minimizeWindow, { name: label })} · ${label}`
      }
      className={[
        'relative flex h-10 w-10 items-center justify-center rounded-lg text-[15px] transition-all',
        'hover:bg-[var(--hover-surface)] active:scale-95',
        win.minimized ? 'opacity-55' : '',
        active ? 'bg-[var(--hover-surface)]' : '',
      ].join(' ')}
    >
      <Icon name={appIcon(win.id)} size={19} />
      {active ? (
        <span aria-hidden="true" className="absolute -bottom-0.5 h-1 w-4 rounded-full bg-accent" />
      ) : null}
    </button>
  );
}

export function Taskbar({ startOpen, onToggleStart, onOpenSearch }: TaskbarProps) {
  const { t, locale, otherLocale, otherLocaleName, setLocale, fmt } = useI18n();
  const { themeMode, setThemeMode, resolvedTheme } = usePreferences();
  const { windows, toggleWindow } = useWindowManager();
  const now = useClock();
  const online = useOnlineStatus();
  const battery = useBattery();

  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const themeLabel =
    themeMode === 'system'
      ? `${t.taskbar.theme}: ${t.taskbar.themeSystem}`
      : `${t.taskbar.theme}: ${nextTheme === 'dark' ? t.taskbar.themeDark : t.taskbar.themeLight}`;

  const batteryLabel = battery
    ? `${t.taskbar.battery} ${Math.round(battery.level * 100)}%${battery.charging ? ` — ${t.taskbar.battery}` : ''}`
    : t.taskbar.battery;
  return (
    <div
      className="acrylic safe-bottom fixed inset-x-0 bottom-0 z-[9000] flex items-center gap-1 border-x-0 border-b-0 px-2"
      style={{ height: TASKBAR_HEIGHT }}
      role="region"
      aria-label={t.a11y.taskbar}
    >
      {/* Left: start + search + running apps */}
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <button
          type="button"
          onClick={onToggleStart}
          aria-expanded={startOpen}
          aria-label={startOpen ? t.a11y.closeStartMenu : t.a11y.startMenu}
          title={t.a11y.startMenu}
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-[var(--hover-surface)] active:scale-95',
            startOpen ? 'bg-accent-soft text-accent' : '',
          ].join(' ')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="4" width="9" height="7" rx="1.5" fill="var(--accent)" />
            <rect x="13" y="4" width="9" height="7" rx="1.5" fill="var(--accent)" opacity="0.65" />
            <rect x="2" y="13" width="9" height="7" rx="1.5" fill="var(--accent)" opacity="0.65" />
            <rect x="13" y="13" width="9" height="7" rx="1.5" fill="var(--accent)" opacity="0.4" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          title={`${t.common.search} (Ctrl + K)`}
          aria-label={t.common.search}
          className="hidden h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 text-xs text-muted transition-colors hover:border-accent/50 hover:text-secondary md:flex lg:w-64"
        >
          <Icon name="search" size={14} />
          <span className="truncate">{t.taskbar.searchPlaceholder}</span>
          <kbd className="ml-auto hidden rounded border border-[var(--border)] px-1 font-mono text-[10px] lg:inline">
            Ctrl K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          aria-label={t.common.search}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-[var(--hover-surface)] md:hidden"
        >
          <Icon name="search" size={17} />
        </button>

        <div className="mx-1 hidden h-6 w-px bg-[var(--border)] md:block" />

        {/* Running applications */}
        <ul className="flex min-w-0 items-center gap-0.5 overflow-x-auto scroll-thin">
          {windows.map((win) => (
            <li key={win.id} className="shrink-0">
              <TaskbarAppButton winId={win.id} projectId={win.projectId} />
            </li>
          ))}
        </ul>
      </div>

      {/* Right: system tray */}
      <div className="flex shrink-0 items-center gap-0.5">
        {/* Language */}
        <div className="mr-1 hidden items-center rounded-lg border border-[var(--border)] p-0.5 sm:flex">
          {(['en', 'fr'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
              aria-label={fmt(t.a11y.languageSwitch, {
                name: code === 'en' ? t.settings.english : t.settings.french,
              })}
              title={fmt(t.a11y.languageSwitch, {
                name: code === 'en' ? t.settings.english : t.settings.french,
              })}
              className={[
                'rounded-md px-2 py-1 text-[10px] font-semibold transition-colors',
                locale === code
                  ? 'bg-accent text-[var(--accent-contrast)]'
                  : 'text-muted hover:text-secondary',
              ].join(' ')}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Theme */}
        <button
          type="button"
          onClick={() => setThemeMode(nextTheme)}
          title={themeLabel}
          aria-label={fmt(t.a11y.themeSwitch, {
            name: nextTheme === 'dark' ? t.taskbar.themeDark : t.taskbar.themeLight,
          })}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-[var(--hover-surface)] active:scale-95"
        >
          <Icon name={resolvedTheme === 'dark' ? 'moon' : 'sun'} size={18} />
        </button>

        {/* System status indicators */}
        <div className="hidden items-center gap-2.5 px-1.5 text-muted md:flex">
          <span
            title={`${t.taskbar.wifi}: ${online ? t.common.yes : t.common.no}`}
            aria-label={`${t.taskbar.wifi}: ${online ? t.common.yes : t.common.no}`}
            className="inline-flex"
          >
            <Icon name="wifi" size={16} strokeWidth={online ? 1.7 : 1.2} />
          </span>
          <span title={t.taskbar.sound} aria-label={t.taskbar.sound} className="inline-flex">
            <Icon name="speaker" size={16} />
          </span>
          <span title={batteryLabel} aria-label={batteryLabel} className="inline-flex">
            <Icon name="battery" size={17} />
          </span>
        </div>

        {/* Clock */}
        <button
          type="button"
          onClick={() => toggleWindow('terminal')}
          title={`${profile.name} — ${t.apps.terminal}`}
          aria-label={`${t.taskbar.openWindows}: ${windows.length}`}
          className="ml-0.5 flex h-10 flex-col items-end justify-center rounded-lg px-2 text-right transition-colors hover:bg-[var(--hover-surface)]"
        >
          <span className="font-mono text-xs leading-none text-secondary">
            {now.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span className="mt-0.5 text-[10px] leading-none text-muted">
            {now.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
              day: '2-digit',
              month: '2-digit',
            })}
          </span>
        </button>
      </div>

      {/* Language shortcut for small screens */}
      <button
        type="button"
        onClick={() => setLocale(otherLocale)}
        className="flex h-10 shrink-0 items-center rounded-lg px-2 text-[10px] font-semibold text-muted transition-colors hover:bg-[var(--hover-surface)] sm:hidden"
        aria-label={fmt(t.a11y.languageSwitch, { name: otherLocaleName })}
        title={fmt(t.a11y.languageSwitch, { name: otherLocaleName })}
      >
        {otherLocale.toUpperCase()}
      </button>
    </div>
  );
}