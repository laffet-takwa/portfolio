import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { CursorGlow } from './components/ui/CursorGlow';
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
        const onKeyDown = (event) => {
            const target = event.target;
            const isField = target?.tagName === 'INPUT' ||
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable === true;
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setSearchOpen(true);
                return;
            }
            if (event.key !== 'Escape')
                return;
            if (isField) {
                target.blur();
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
        if (hasWindows)
            setStartOpen(false);
    }, [hasWindows]);
    return (_jsxs("div", { className: "relative h-full w-full overflow-hidden", children: [_jsx("a", { href: "#main-content", className: "sr-only-focusable absolute left-3 top-3 z-[9500] rounded-lg bg-accent px-3 py-2 text-sm text-[var(--accent-contrast)]", children: t.a11y.skipToContent }), _jsx(Wallpaper, {}), _jsx(CursorGlow, {}), homeVisible ? (_jsxs("main", { id: "main-content", className: "relative z-[1] h-full", "aria-label": t.a11y.desktop, children: [_jsx(DesktopHome, {}), _jsx(DesktopIcons, {})] })) : (_jsx("main", { id: "main-content", className: "h-full", "aria-label": t.a11y.desktop })), _jsx(WindowHost, {}), startOpen ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-[7900]", "aria-hidden": "true", onClick: () => setStartOpen(false) }), isMobile ? (_jsx(StartMenu, { fullScreen: true, onClose: () => setStartOpen(false) })) : (_jsx("div", { className: "fixed z-[8000]", style: { bottom: TASKBAR_HEIGHT + 8, left: 8 }, children: _jsx(StartMenu, { onClose: () => setStartOpen(false) }) }))] })) : null, searchOpen ? _jsx(SearchOverlay, { onClose: () => setSearchOpen(false) }) : null, isMobile ? (!hasWindows ? (_jsxs(_Fragment, { children: [_jsx(MobileNav, {}), _jsx("button", { type: "button", onClick: () => setStartOpen(true), "aria-label": t.a11y.startMenu, className: "fixed left-1/2 top-3 z-[8500] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--window)] shadow-[var(--shadow-soft)] backdrop-blur transition-transform active:scale-95", children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("rect", { x: "2", y: "4", width: "9", height: "7", rx: "1.5", fill: "var(--accent)" }), _jsx("rect", { x: "13", y: "4", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.65" }), _jsx("rect", { x: "2", y: "13", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.65" }), _jsx("rect", { x: "13", y: "13", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.4" })] }) }), _jsx("button", { type: "button", onClick: () => setSearchOpen(true), "aria-label": t.common.search, className: "fixed right-3 top-3 z-[8500] flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--window)] shadow-[var(--shadow-soft)] backdrop-blur transition-transform active:scale-95", children: _jsx(Icon, { name: "search", size: 17, className: "text-secondary" }) })] })) : null) : (_jsx(Taskbar, { startOpen: startOpen, onToggleStart: () => setStartOpen((open) => !open), onOpenSearch: () => setSearchOpen(true) }))] }));
}
export default function App() {
    return (_jsx(PreferencesProvider, { children: _jsx(WindowManagerProvider, { children: _jsx(Shell, {}) }) }));
}
