import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useSearchIndex } from '../../hooks/useSearchIndex';
import { Icon } from '../ui/Icon';
/** Ctrl + K quick search across applications, projects and skills. */
export function SearchOverlay({ onClose }) {
    const { t, fmt } = useI18n();
    const { openWindow } = useWindowManager();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const index = useSearchIndex();
    useEffect(() => {
        const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
        return () => window.clearTimeout(timer);
    }, []);
    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (needle.length < 2)
            return [];
        return index
            .filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(needle))
            .slice(0, 10);
    }, [index, query]);
    useEffect(() => setActive(0), [query]);
    const launch = (item) => {
        if (!item)
            return;
        onClose();
        if (item.type === 'app')
            openWindow(item.id);
        else if (item.type === 'project')
            openWindow('project-detail', { projectId: item.id });
        else
            openWindow('skills');
    };
    useEffect(() => {
        const node = listRef.current?.children[active];
        node?.scrollIntoView({ block: 'nearest' });
    }, [active]);
    const hasQuery = query.trim().length >= 2;
    return (_jsx("div", { className: "fixed inset-0 z-[8500] flex items-start justify-center bg-[var(--scrim)] px-4 pt-[12vh] backdrop-blur-sm animate-fade-in", role: "dialog", "aria-modal": "true", "aria-label": t.search.title, onClick: onClose, children: _jsxs("div", { className: "glass window-content animate-menu-in w-full max-w-xl overflow-hidden rounded-xl shadow-[var(--shadow)]", onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-[var(--border)] px-3 py-2.5", children: [_jsx(Icon, { name: "search", size: 15, className: "text-muted" }), _jsx("label", { htmlFor: "global-search", className: "sr-only", children: t.search.placeholder }), _jsx("input", { id: "global-search", ref: inputRef, value: query, onChange: (event) => setQuery(event.target.value), onKeyDown: (event) => {
                                if (event.key === 'ArrowDown') {
                                    event.preventDefault();
                                    setActive((current) => Math.min(current + 1, results.length - 1));
                                }
                                else if (event.key === 'ArrowUp') {
                                    event.preventDefault();
                                    setActive((current) => Math.max(current - 1, 0));
                                }
                                else if (event.key === 'Enter') {
                                    event.preventDefault();
                                    launch(results[active]);
                                }
                            }, placeholder: t.search.placeholder, autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none" }), _jsx("kbd", { className: "shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-muted", children: "ESC" })] }), _jsx("div", { className: "scroll-thin max-h-[52vh] overflow-y-auto p-2", children: !hasQuery ? (_jsx("p", { className: "px-3 py-6 text-center text-xs text-muted", children: t.search.empty })) : results.length === 0 ? (_jsx("p", { className: "px-3 py-6 text-center text-sm text-secondary", children: t.search.noResults })) : (_jsxs(_Fragment, { children: [_jsx("ul", { ref: listRef, role: "listbox", "aria-label": t.a11y.searchResults, children: results.map((item, index) => (_jsx("li", { role: "option", "aria-selected": index === active, children: _jsxs("button", { type: "button", onClick: () => launch(item), onMouseEnter: () => setActive(index), className: [
                                            'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                                            index === active ? 'bg-accent-soft' : 'hover:bg-[var(--hover-surface)]',
                                        ].join(' '), children: [_jsx("span", { "aria-hidden": "true", className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] text-sm", children: _jsx(Icon, { name: item.icon, size: 14 }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block truncate text-[13px] text-ink", children: item.title }), _jsx("span", { className: "block truncate text-[11px] text-muted", children: item.subtitle })] }), _jsx("span", { "aria-hidden": "true", className: "shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted", children: t.search.categories[item.type] })] }) }, `${item.type}-${item.id}`))) }), _jsx("p", { className: "px-3 py-2 text-[10px] text-muted", children: t.search.enterHint })] })) }), _jsx("p", { className: "sr-only", children: fmt(t.a11y.searchResults, {}) })] }) }));
}
