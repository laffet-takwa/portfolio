import { appIcon, appLabelKey, desktopIconAppIds } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { Icon } from '../ui/Icon';

export function DesktopIcons() {
  const { t, fmt } = useI18n();
  const { openWindow, windows } = useWindowManager();

  const openAppIds = new Set(windows.map((win) => win.id));

  return (
    <ul
      aria-label={t.a11y.iconsLabel}
      className="absolute left-3 top-3 z-[10] hidden flex-col sm:flex lg:left-4 lg:top-4"
    >
      {desktopIconAppIds.map((id) => {
        const key = appLabelKey[id];
        const label = t.apps[key];
        const isOpen = openAppIds.has(id);
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => openWindow(id)}
              title={label}
              aria-label={fmt(t.a11y.openApp, { name: label })}
              className="group flex w-[84px] flex-col items-center gap-0.5 rounded-lg p-0.5 text-center transition-colors hover:bg-[var(--hover-surface)] focus-visible:bg-[var(--hover-surface)]"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--window-border)] bg-[var(--window)] text-secondary shadow-[var(--shadow-soft)] backdrop-blur transition-all group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:text-accent"
              >
                <Icon name={appIcon(id)} size={17} />
              </span>
              <span
                className={[
                  'line-clamp-1 text-[10px] leading-tight',
                  isOpen ? 'text-accent' : 'text-secondary',
                ].join(' ')}
              >
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}