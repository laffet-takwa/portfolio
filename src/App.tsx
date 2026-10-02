import { useEffect, useState } from 'react';
import { PreferencesProvider } from './context/PreferencesProvider';
import { WindowManagerProvider, useWindowManager, TASKBAR_HEIGHT } from './context/WindowManagerProvider';
import { useIsMobile } from './hooks/useMediaQuery';
import { useI18n } from './i18n/useI18n';
import { Wallpaper } from './components/desktop/Wallpaper';
import { DesktopHome } from './components/desktop/DesktopHome';
import { DesktopIcons } from './components/desktop/DesktopIcons';
import { WindowHost } from './components/windows/WindowHost';
import { Taskbar } from './components/taskbar/Taskbar';
import { MobileNav } from './components/taskbar/MobileNav';
import { StartMenu } from './components/start-menu/StartMenu';
import { SearchOverlay } from './components/start-menu/SearchOverlay';
import { Icon } from './components/ui/Icon';

function Shell() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const { windows, closeTopWindow } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const hasWindows = windows.some((win) => !win.minimized);
  const homeVisible = !hasWindows || !isMobile;

  /* ---------------- keyboard shortcuts ---------------- */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isField =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable === true;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }

      if (event.key !== 'Escape') return;

      if (isField) {
        (target as HTMLElement).blur();
        return;
      }
      if (searchOpen) {
        setSearchOpen(false);
        return;
      }
      if (startOpen) {
        setStartOpen(false);
        return;
      }
      closeTopWindow();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, startOpen, closeTopWindow]);

  // Close the Start menu when a window comes to the front.
  useEffect(() => {
    if (hasWindows) setStartOpen(false);
  }, [hasWindows]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <a
        href="#main-content"
        className="sr-only-focusable absolute left-3 top-3 z-[9500] rounded-lg bg-accent px-3 py-2 text-sm text-[var(--accent-contrast)]"
      >
        {t.a11y.skipToContent}
      </a>

      <Wallpaper />

      {homeVisible ? (
        <main id="main-content" className="relative z-[1] h-full" aria-label={t.a11y.desktop}>
          <DesktopHome />
          <DesktopIcons />
        </main>
      ) : (
        <main id="main-content" className="h-full" aria-label={t.a11y.desktop} />
      )}

      <WindowHost />

      {/* Start menu */}
      {startOpen ? (
        <>
          <div
            className="fixed inset-0 z-[7900]"
            aria-hidden="true"
            onClick={() => setStartOpen(false)}
          />
          {isMobile ? (
            <StartMenu fullScreen onClose={() => setStartOpen(false)} />
          ) : (
            <div
              className="fixed z-[8000]"
              style={{ bottom: TASKBAR_HEIGHT + 8, left: 8 }}
            >
              <StartMenu onClose={() => setStartOpen(false)} />
            </div>
          )}
        </>
      ) : null}

      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}

      {/* Navigation bar */}
      {isMobile ? (
        !hasWindows ? (
          <>
            <MobileNav />
            <button
              type="button"
              onClick={() => setStartOpen(true)}
              aria-label={t.a11y.startMenu}
              className="fixed left-1/2 top-3 z-[8500] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--window)] shadow-[var(--shadow-soft)] backdrop-blur transition-transform active:scale-95"
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
              onClick={() => setSearchOpen(true)}
              aria-label={t.common.search}
              className="fixed right-3 top-3 z-[8500] flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--window)] shadow-[var(--shadow-soft)] backdrop-blur transition-transform active:scale-95"
            >
              <Icon name="search" size={17} className="text-secondary" />
            </button>
          </>
        ) : null
      ) : (
        <Taskbar
          startOpen={startOpen}
          onToggleStart={() => setStartOpen((open) => !open)}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <WindowManagerProvider>
        <Shell />
      </WindowManagerProvider>
    </PreferencesProvider>
  );
}