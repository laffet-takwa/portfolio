import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { appIcon, appLabelKey, pinnedAppIds, profile } from '../../data/profile';
import { recommendedProjects } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useSearchIndex } from '../../hooks/useSearchIndex';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
export function StartMenu({ onClose, fullScreen }) {
    const { t, fmt } = useI18n();
    const { openWindow } = useWindowManager();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const index = useSearchIndex();
    useEffect(() => {
        const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
        return () => window.clearTimeout(timer);
    }, []);
    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (needle.length < 2)
            return [];
        return index
            .filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(needle))
            .slice(0, 12);
    }, [index, query]);
    const launch = (item) => {
        onClose();
        if (item.type === 'app')
            openWindow(item.id);
        else if (item.type === 'project')
            openWindow('project-detail', { projectId: item.id });
        else
            openWindow('skills');
    };
    const hasQuery = query.trim().length >= 2;
    return (_jsxs("div", { className: [
            'glass window-content animate-menu-in flex flex-col overflow-hidden rounded-xl shadow-[var(--shadow)]',
            fullScreen ? 'fixed inset-0 z-[8000] rounded-none' : 'w-[min(94vw,440px)] max-h-[min(70vh,560px)]',
        ].join(' '), role: "dialog", "aria-label": t.start.title, onPointerDown: (event) => event.stopPropagation(), children: [_jsx("div", { className: "shrink-0 border-b border-[var(--border)] p-3", children: _jsxs("div", { className: "relative", children: [_jsx(Icon, { name: "search", size: 14, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" }), _jsx("label", { htmlFor: "start-search", className: "sr-only", children: t.start.searchLabel }), _jsx("input", { id: "start-search", ref: inputRef, value: query, onChange: (event) => setQuery(event.target.value), placeholder: t.start.searchPlaceholder, className: "w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] py-2 pl-8 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none" })] }) }), _jsx("div", { className: "scroll-thin min-h-0 flex-1 overflow-y-auto p-3", children: hasQuery ? (results.length > 0 ? (_jsx("ul", { "aria-label": t.a11y.searchResults, className: "flex flex-col gap-1", children: results.map((item) => (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => launch(item), className: "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent-soft", children: [_jsx("span", { "aria-hidden": "true", className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-sm", children: _jsx(Icon, { name: item.icon, size: 14 }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block truncate text-[13px] text-ink", children: item.title }), _jsx("span", { className: "block truncate text-[11px] text-muted", children: item.subtitle })] }), _jsx("span", { "aria-hidden": "true", className: "shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted", children: t.search.categories[item.type] })] }) }, `${item.type}-${item.id}`))) })) : (_jsxs("div", { className: "px-2 py-8 text-center", children: [_jsx("p", { className: "text-sm text-secondary", children: t.start.noResults }), _jsx("p", { className: "mt-1 text-xs text-muted", children: t.start.noResultsHint })] }))) : (_jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("section", { children: [_jsx("h2", { className: "mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted", children: t.start.pinned }), _jsx("ul", { className: "grid grid-cols-5 gap-0.5", children: pinnedAppIds.map((id) => {
                                        const label = t.apps[appLabelKey[id]];
                                        return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => {
                                                    onClose();
                                                    openWindow(id);
                                                }, "aria-label": fmt(t.a11y.openApp, { name: label }), className: "flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-2 text-center transition-colors hover:bg-accent-soft", children: [_jsx("span", { "aria-hidden": "true", className: "flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-base", children: _jsx(Icon, { name: appIcon(id), size: 17 }) }), _jsx("span", { className: "line-clamp-2 text-[10px] leading-tight text-secondary", children: label })] }) }, id));
                                    }) })] }), _jsxs("section", { children: [_jsx("h2", { className: "mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted", children: t.start.recommended }), _jsx("ul", { className: "flex flex-col gap-1", children: recommendedProjects.slice(0, 4).map((project) => (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => {
                                                onClose();
                                                openWindow('project-detail', { projectId: project.id });
                                            }, className: "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent-soft", children: [_jsx("span", { "aria-hidden": "true", className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-sm", children: _jsx(Icon, { name: project.icon ?? 'folder', size: 14 }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block truncate text-[13px] text-ink", children: project.title }), _jsx("span", { className: "block truncate text-[11px] text-muted", children: project.category.join(' · ') })] })] }) }, project.id))) })] })] })) }), _jsxs("div", { className: "flex shrink-0 items-center gap-3 border-t border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5", children: [_jsx(Avatar, { size: 36, label: t.about.name, rounded: "rounded-full" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate text-[13px] font-medium text-ink", children: profile.name }), _jsx("p", { className: "truncate text-[11px] text-muted", children: t.start.userRole })] }), _jsx("button", { type: "button", onClick: () => {
                            onClose();
                            openWindow('settings');
                        }, "aria-label": fmt(t.a11y.openApp, { name: t.apps.settings }), title: t.apps.settings, className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm text-secondary transition-colors hover:bg-accent-soft hover:text-accent", children: _jsx(Icon, { name: "settings", size: 15 }) })] })] }));
}
