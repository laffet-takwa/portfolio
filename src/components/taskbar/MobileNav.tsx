import { appIcon, appLabelKey, mobileNavAppIds } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { Icon } from '../ui/Icon';

/** Mobile bottom navigation — the "phone OS" navigation bar. */
export function MobileNav() {
  const { t, fmt } = useI18n();
  const { openWindow, windows } = useWindowManager();

  const activeId = windows.find((win) => win.focused && !win.minimized)?.id;

  return (
    <nav
      aria-label={t.a11y.taskbar}
      className="acrylic safe-bottom fixed inset-x-0 bottom-0 z-[9000] flex items-stretch gap-1 border-x-0 border-b-0 px-2 py-1"
    >
      {mobileNavAppIds.map((id) => {
        const label = t.apps[appLabelKey[id]];
        const active = activeId === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => openWindow(id)}
            aria-current={active ? 'page' : undefined}
            aria-label={fmt(t.a11y.openApp, { name: label })}
            className="flex min-h-[54px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 transition-colors active:scale-95"
          >
            <span
              aria-hidden="true"
              className={[
                'flex h-8 w-8 items-center justify-center rounded-lg text-base transition-colors',
                active ? 'bg-accent-soft text-accent' : '',
              ].join(' ')}
            >
              <Icon name={appIcon(id)} size={18} />
            </span>
            <span
              className={[
                'line-clamp-1 text-[10px] font-medium',
                active ? 'text-accent' : 'text-muted',
              ].join(' ')}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}