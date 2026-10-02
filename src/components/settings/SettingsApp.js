import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { usePreferences } from '../../context/PreferencesProvider';
import { profile } from '../../data/profile';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
export function SettingsApp() {
    const { t, locale } = useI18n();
    const { themeMode, setThemeMode, setLocale, reduceMotion, setReduceMotion, largeText, setLargeText, reset } = usePreferences();
    const [section, setSection] = useState('appearance');
    const [resetMessage, setResetMessage] = useState(false);
    useEffect(() => {
        if (!resetMessage)
            return;
        const timer = window.setTimeout(() => setResetMessage(false), 2200);
        return () => window.clearTimeout(timer);
    }, [resetMessage]);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const sections = [
        { id: 'appearance', icon: 'palette', label: t.settings.appearance },
        { id: 'language', icon: 'globe', label: t.settings.language },
        { id: 'accessibility', icon: 'accessibility', label: t.settings.accessibility },
        { id: 'about', icon: 'info', label: t.settings.about },
    ];
    const appearanceOptions = [
        { id: 'light', label: t.settings.light, icon: 'sun' },
        { id: 'dark', label: t.settings.dark, icon: 'moon' },
        { id: 'system', label: t.settings.system, icon: 'monitor' },
    ];
    const languageOptions = [
        { id: 'en', label: t.settings.english, code: 'EN' },
        { id: 'fr', label: t.settings.french, code: 'FR' },
    ];
    const showNav = !isMobile;
    return (_jsxs("div", { className: "flex h-full min-h-0 flex-col md:flex-row", children: [showNav ? (_jsx("nav", { "aria-label": t.settings.title, className: "w-56 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--hover-surface)] p-3 scroll-thin", children: _jsx("ul", { className: "flex flex-col gap-1", children: sections.map((item) => {
                        const active = section === item.id;
                        return (_jsx("li", { children: _jsxs("button", { type: "button", "aria-current": active ? 'page' : undefined, onClick: () => setSection(item.id), className: [
                                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
                                    active
                                        ? 'bg-accent-soft font-medium text-accent'
                                        : 'text-secondary hover:bg-[var(--hover-surface)] hover:text-ink',
                                ].join(' '), children: [_jsx(Icon, { name: item.icon, size: 16 }), item.label] }) }, item.id));
                    }) }) })) : null, _jsx("div", { className: "scroll-thin min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6", children: _jsxs("div", { className: "mx-auto max-w-2xl", children: [isMobile ? (_jsx("div", { className: "mb-4 flex gap-1.5 overflow-x-auto pb-1 scroll-thin", children: sections.map((item) => {
                                const active = section === item.id;
                                return (_jsxs("button", { type: "button", "aria-pressed": active, onClick: () => setSection(item.id), className: [
                                        'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                                        active
                                            ? 'border-transparent bg-accent text-[var(--accent-contrast)]'
                                            : 'border-[var(--border)] text-secondary',
                                    ].join(' '), children: [_jsx(Icon, { name: item.icon, size: 16 }), " ", item.label] }, item.id));
                            }) })) : null, section === 'appearance' ? (_jsxs("section", { children: [_jsx("h3", { className: "text-sm font-semibold text-ink", children: t.settings.appearance }), _jsx("p", { className: "mt-1 text-xs text-muted", children: t.settings.appearanceHint }), _jsx("div", { role: "radiogroup", "aria-label": t.settings.appearance, className: "mt-4 grid gap-2 sm:grid-cols-3", children: appearanceOptions.map((option) => {
                                        const active = themeMode === option.id;
                                        return (_jsxs("button", { type: "button", role: "radio", "aria-checked": active, onClick: () => setThemeMode(option.id), className: [
                                                'flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-colors',
                                                active
                                                    ? 'border-accent bg-accent-soft'
                                                    : 'border-[var(--border)] hover:border-accent/50',
                                            ].join(' '), children: [_jsx(Icon, { name: option.icon, size: 22, className: active ? 'text-accent' : 'text-secondary' }), _jsx("span", { className: `text-[13px] font-medium ${active ? 'text-accent' : 'text-secondary'}`, children: option.label })] }, option.id));
                                    }) }), _jsx("p", { className: "mt-3 text-[11px] text-muted", children: t.settings.saved })] })) : null, section === 'language' ? (_jsxs("section", { children: [_jsx("h3", { className: "text-sm font-semibold text-ink", children: t.settings.language }), _jsx("p", { className: "mt-1 text-xs text-muted", children: t.settings.languageHint }), _jsx("div", { role: "radiogroup", "aria-label": t.settings.language, className: "mt-4 grid gap-2 sm:grid-cols-2", children: languageOptions.map((option) => {
                                        const active = locale === option.id;
                                        return (_jsxs("button", { type: "button", role: "radio", "aria-checked": active, onClick: () => setLocale(option.id), className: [
                                                'flex items-center gap-3 rounded-xl border p-3 text-left transition-colors',
                                                active
                                                    ? 'border-accent bg-accent-soft'
                                                    : 'border-[var(--border)] hover:border-accent/50',
                                            ].join(' '), children: [_jsx("span", { className: [
                                                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-semibold',
                                                        active
                                                            ? 'border-accent bg-accent text-[var(--accent-contrast)]'
                                                            : 'border-[var(--border)] text-muted',
                                                    ].join(' '), children: option.code }), _jsx("span", { className: `text-[13px] font-medium ${active ? 'text-accent' : 'text-secondary'}`, children: option.label })] }, option.id));
                                    }) })] })) : null, section === 'accessibility' ? (_jsxs("section", { children: [_jsx("h3", { className: "text-sm font-semibold text-ink", children: t.settings.accessibility }), _jsx("p", { className: "mt-1 text-xs text-muted", children: t.settings.accessibilityHint }), _jsxs("ul", { className: "mt-4 flex flex-col gap-2", children: [_jsxs("li", { className: "flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[13px] font-medium text-ink", children: t.settings.reduceMotion }), _jsx("p", { className: "text-[11px] text-muted", children: t.settings.reduceMotionHint })] }), _jsx("button", { type: "button", role: "switch", "aria-checked": reduceMotion, "aria-label": t.settings.reduceMotion, onClick: () => setReduceMotion(!reduceMotion), className: [
                                                        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                                                        reduceMotion ? 'bg-accent' : 'bg-[var(--hover-surface)] border border-[var(--border)]',
                                                    ].join(' '), children: _jsx("span", { "aria-hidden": "true", className: [
                                                            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                                                            reduceMotion ? 'left-[22px]' : 'left-0.5',
                                                        ].join(' ') }) })] }), _jsxs("li", { className: "flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[13px] font-medium text-ink", children: t.settings.largeText }), _jsx("p", { className: "text-[11px] text-muted", children: t.settings.largeTextHint })] }), _jsx("button", { type: "button", role: "switch", "aria-checked": largeText, "aria-label": t.settings.largeText, onClick: () => setLargeText(!largeText), className: [
                                                        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                                                        largeText ? 'bg-accent' : 'bg-[var(--hover-surface)] border border-[var(--border)]',
                                                    ].join(' '), children: _jsx("span", { "aria-hidden": "true", className: [
                                                            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                                                            largeText ? 'left-[22px]' : 'left-0.5',
                                                        ].join(' ') }) })] })] })] })) : null, section === 'about' ? (_jsxs("section", { className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-ink", children: t.settings.about }), _jsx("p", { className: "mt-1 text-xs text-muted", children: t.settings.subtitle })] }), _jsxs("dl", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5", children: [_jsx("dt", { className: "text-xs text-muted", children: t.settings.deviceLabel }), _jsx("dd", { className: "truncate font-mono text-xs text-secondary", children: typeof navigator !== 'undefined' ? navigator.platform : '—' })] }), _jsxs("div", { className: "flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5", children: [_jsx("dt", { className: "text-xs text-muted", children: t.settings.browserLabel }), _jsx("dd", { className: "truncate font-mono text-xs text-secondary", children: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 48) : '—' })] }), _jsxs("div", { className: "flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5", children: [_jsx("dt", { className: "text-xs text-muted", children: t.terminal.outputs.os }), _jsx("dd", { className: "font-mono text-xs text-secondary", children: t.terminal.outputs.terminal })] }), _jsxs("div", { className: "flex items-baseline justify-between gap-4 rounded-xl border border-[var(--border)] px-3 py-2.5", children: [_jsx("dt", { className: "text-xs text-muted", children: t.settings.storageLabel }), _jsx("dd", { className: "text-xs text-secondary", children: t.settings.storageHint })] })] }), _jsxs("div", { className: "rounded-xl border border-[var(--border)] px-3 py-3", children: [_jsx("p", { className: "text-[13px] font-medium text-ink", children: profile.name }), _jsx("p", { className: "text-xs text-secondary", children: t.about.role1 }), _jsxs("p", { className: "mt-1 text-[11px] text-muted", children: [_jsx(Icon, { name: "map-pin", size: 12 }), " ", resolveText(profile.location, locale), " \u00B7 ", resolveText(profile.availability, locale)] })] }), _jsx("button", { type: "button", onClick: () => {
                                        reset();
                                        setResetMessage(true);
                                    }, className: "self-start rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-[var(--danger)] hover:text-[var(--danger)]", children: t.settings.reset }), _jsx("p", { "aria-live": "polite", className: "min-h-[1rem] text-[11px] text-[var(--success)]", children: resetMessage ? t.settings.resetDone : '' })] })) : null] }) })] }));
}
