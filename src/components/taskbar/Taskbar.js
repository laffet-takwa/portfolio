import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { appIcon, profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/Icon';
import { useAppLabel } from '../../hooks/useAppLabel';
import { usePreferences } from '../../context/PreferencesProvider';
import { useWindowManager, TASKBAR_HEIGHT } from '../../context/WindowManagerProvider';
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
    const [online, setOnline] = useState(() => typeof navigator === 'undefined' ? true : navigator.onLine);
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
function useBattery() {
    const [battery, setBattery] = useState(null);
    useEffect(() => {
        let cancelled = false;
        const nav = navigator;
        if (typeof nav.getBattery !== 'function')
            return;
        nav
            .getBattery()
            .then((manager) => {
            if (cancelled)
                return;
            const sync = () => setBattery({ level: manager.level, charging: manager.charging });
            sync();
            manager.addEventListener('levelchange', sync);
            manager.addEventListener('chargingchange', sync);
        })
            .catch(() => { });
        return () => {
            cancelled = true;
        };
    }, []);
    return battery;
}
/** One running application in the taskbar. */
function TaskbarAppButton({ winId, projectId }) {
    const { t, fmt } = useI18n();
    const { windows, toggleWindow } = useWindowManager();
    const label = useAppLabel(winId, projectId);
    const win = windows.find((item) => item.id === winId);
    if (!win)
        return null;
    const active = win.focused && !win.minimized;
    const accessible = fmt(t.a11y.openApp, { name: label });
    return (_jsxs("button", { type: "button", onClick: () => toggleWindow(win.id, { projectId: win.projectId }), "aria-pressed": active, "aria-label": accessible, title: win.minimized
            ? accessible
            : `${fmt(t.a11y.minimizeWindow, { name: label })} · ${label}`, className: [
            'relative flex h-10 w-10 items-center justify-center rounded-lg text-[15px] transition-all',
            'hover:bg-[var(--hover-surface)] active:scale-95',
            win.minimized ? 'opacity-55' : '',
            active ? 'bg-[var(--hover-surface)]' : '',
        ].join(' '), children: [_jsx(Icon, { name: appIcon(win.id), size: 19 }), active ? (_jsx("span", { "aria-hidden": "true", className: "absolute -bottom-0.5 h-1 w-4 rounded-full bg-accent" })) : null] }));
}
export function Taskbar({ startOpen, onToggleStart, onOpenSearch }) {
    const { t, locale, otherLocale, otherLocaleName, setLocale, fmt } = useI18n();
    const { themeMode, setThemeMode, resolvedTheme } = usePreferences();
    const { windows, toggleWindow } = useWindowManager();
    const now = useClock();
    const online = useOnlineStatus();
    const battery = useBattery();
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const themeLabel = themeMode === 'system'
        ? `${t.taskbar.theme}: ${t.taskbar.themeSystem}`
        : `${t.taskbar.theme}: ${nextTheme === 'dark' ? t.taskbar.themeDark : t.taskbar.themeLight}`;
    const batteryLabel = battery
        ? `${t.taskbar.battery} ${Math.round(battery.level * 100)}%${battery.charging ? ` — ${t.taskbar.battery}` : ''}`
        : t.taskbar.battery;
    return (_jsxs("div", { className: "acrylic safe-bottom fixed inset-x-0 bottom-0 z-[9000] flex items-center gap-1 border-x-0 border-b-0 px-2", style: { height: TASKBAR_HEIGHT }, role: "region", "aria-label": t.a11y.taskbar, children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-1", children: [_jsx("button", { type: "button", onClick: onToggleStart, "aria-expanded": startOpen, "aria-label": startOpen ? t.a11y.closeStartMenu : t.a11y.startMenu, title: t.a11y.startMenu, className: [
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-[var(--hover-surface)] active:scale-95',
                            startOpen ? 'bg-accent-soft text-accent' : '',
                        ].join(' '), children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("rect", { x: "2", y: "4", width: "9", height: "7", rx: "1.5", fill: "var(--accent)" }), _jsx("rect", { x: "13", y: "4", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.65" }), _jsx("rect", { x: "2", y: "13", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.65" }), _jsx("rect", { x: "13", y: "13", width: "9", height: "7", rx: "1.5", fill: "var(--accent)", opacity: "0.4" })] }) }), _jsxs("button", { type: "button", onClick: onOpenSearch, title: `${t.common.search} (Ctrl + K)`, "aria-label": t.common.search, className: "hidden h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 text-xs text-muted transition-colors hover:border-accent/50 hover:text-secondary md:flex lg:w-64", children: [_jsx(Icon, { name: "search", size: 14 }), _jsx("span", { className: "truncate", children: t.taskbar.searchPlaceholder }), _jsx("kbd", { className: "ml-auto hidden rounded border border-[var(--border)] px-1 font-mono text-[10px] lg:inline", children: "Ctrl K" })] }), _jsx("button", { type: "button", onClick: onOpenSearch, "aria-label": t.common.search, className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-[var(--hover-surface)] md:hidden", children: _jsx(Icon, { name: "search", size: 17 }) }), _jsx("div", { className: "mx-1 hidden h-6 w-px bg-[var(--border)] md:block" }), _jsx("ul", { className: "flex min-w-0 items-center gap-0.5 overflow-x-auto scroll-thin", children: windows.map((win) => (_jsx("li", { className: "shrink-0", children: _jsx(TaskbarAppButton, { winId: win.id, projectId: win.projectId }) }, win.id))) })] }), _jsxs("div", { className: "flex shrink-0 items-center gap-0.5", children: [_jsx("div", { className: "mr-1 hidden items-center rounded-lg border border-[var(--border)] p-0.5 sm:flex", children: ['en', 'fr'].map((code) => (_jsx("button", { type: "button", onClick: () => setLocale(code), "aria-pressed": locale === code, "aria-label": fmt(t.a11y.languageSwitch, {
                                name: code === 'en' ? t.settings.english : t.settings.french,
                            }), title: fmt(t.a11y.languageSwitch, {
                                name: code === 'en' ? t.settings.english : t.settings.french,
                            }), className: [
                                'rounded-md px-2 py-1 text-[10px] font-semibold transition-colors',
                                locale === code
                                    ? 'bg-accent text-[var(--accent-contrast)]'
                                    : 'text-muted hover:text-secondary',
                            ].join(' '), children: code.toUpperCase() }, code))) }), _jsx("button", { type: "button", onClick: () => setThemeMode(nextTheme), title: themeLabel, "aria-label": fmt(t.a11y.themeSwitch, {
                            name: nextTheme === 'dark' ? t.taskbar.themeDark : t.taskbar.themeLight,
                        }), className: "flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-[var(--hover-surface)] active:scale-95", children: _jsx(Icon, { name: resolvedTheme === 'dark' ? 'moon' : 'sun', size: 18 }) }), _jsxs("div", { className: "hidden items-center gap-2.5 px-1.5 text-muted md:flex", children: [_jsx("span", { title: `${t.taskbar.wifi}: ${online ? t.common.yes : t.common.no}`, "aria-label": `${t.taskbar.wifi}: ${online ? t.common.yes : t.common.no}`, className: "inline-flex", children: _jsx(Icon, { name: "wifi", size: 16, strokeWidth: online ? 1.7 : 1.2 }) }), _jsx("span", { title: t.taskbar.sound, "aria-label": t.taskbar.sound, className: "inline-flex", children: _jsx(Icon, { name: "speaker", size: 16 }) }), _jsx("span", { title: batteryLabel, "aria-label": batteryLabel, className: "inline-flex", children: _jsx(Icon, { name: "battery", size: 17 }) })] }), _jsxs("button", { type: "button", onClick: () => toggleWindow('terminal'), title: `${profile.name} — ${t.apps.terminal}`, "aria-label": `${t.taskbar.openWindows}: ${windows.length}`, className: "ml-0.5 flex h-10 flex-col items-end justify-center rounded-lg px-2 text-right transition-colors hover:bg-[var(--hover-surface)]", children: [_jsx("span", { className: "font-mono text-xs leading-none text-secondary", children: now.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }) }), _jsx("span", { className: "mt-0.5 text-[10px] leading-none text-muted", children: now.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                }) })] })] }), _jsx("button", { type: "button", onClick: () => setLocale(otherLocale), className: "flex h-10 shrink-0 items-center rounded-lg px-2 text-[10px] font-semibold text-muted transition-colors hover:bg-[var(--hover-surface)] sm:hidden", "aria-label": fmt(t.a11y.languageSwitch, { name: otherLocaleName }), title: fmt(t.a11y.languageSwitch, { name: otherLocaleName }), children: otherLocale.toUpperCase() })] }));
}
