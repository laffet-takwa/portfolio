import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { publishedProjects, usedFilters } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { ProjectCard } from './ProjectCard';
import { EmptyState, Button } from '../ui/Primitives';
import { Icon } from '../ui/Icon';
import { resolveText } from '../../types';
export function ProjectsApp() {
    const { t, locale } = useI18n();
    const { openWindow } = useWindowManager();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const filters = useMemo(() => usedFilters(), []);
    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return publishedProjects.filter((project) => {
            const matchesFilter = filter === 'All' || project.category.includes(filter);
            if (!matchesFilter)
                return false;
            if (!needle)
                return true;
            const haystack = [
                project.title,
                resolveText(project.description, locale),
                ...project.category,
                ...project.technologies,
            ]
                .join(' ')
                .toLowerCase();
            return haystack.includes(needle);
        });
    }, [query, filter, locale]);
    const featured = useMemo(() => (filter === 'All' && !query.trim() ? results.filter((project) => project.featured) : []), [filter, query, results]);
    const openDetail = (projectId) => openWindow('project-detail', { projectId });
    const isFiltered = filter !== 'All' || Boolean(query.trim());
    return (_jsxs("div", { className: "scroll-thin h-full overflow-y-auto", children: [_jsx("div", { className: "sticky top-0 z-10 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--window-solid)_88%,transparent)] px-4 py-3 backdrop-blur-md sm:px-6", children: _jsxs("div", { className: "mx-auto flex max-w-5xl flex-col gap-3", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [_jsxs("div", { className: "relative min-w-0 flex-1", children: [_jsx(Icon, { name: "search", size: 14, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" }), _jsx("label", { htmlFor: "projects-search", className: "sr-only", children: t.projects.searchPlaceholder }), _jsx("input", { id: "projects-search", type: "search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: t.projects.searchPlaceholder, className: "w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] py-2 pl-8 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none" })] }), _jsxs("p", { className: "shrink-0 text-xs text-muted", children: [_jsx("span", { className: "font-semibold text-secondary", children: results.length }), ' ', t.projects.resultsCount] })] }), _jsx("div", { role: "group", "aria-label": t.projects.filters, className: "-mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 pb-1 scroll-thin", children: filters.map((category) => {
                                const active = filter === category;
                                return (_jsx("button", { type: "button", "aria-pressed": active, onClick: () => setFilter(category), className: [
                                        'shrink-0 snap-start rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                                        active
                                            ? 'border-transparent bg-accent text-[var(--accent-contrast)]'
                                            : 'border-[var(--border)] text-secondary hover:border-accent/50 hover:text-ink',
                                    ].join(' '), children: category }, category));
                            }) })] }) }), _jsx("div", { className: "mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6", children: results.length === 0 ? (_jsx(EmptyState, { icon: _jsx(Icon, { name: "search", size: 14 }), title: t.projects.noResults, hint: t.projects.noResultsHint, action: _jsx(Button, { size: "sm", variant: "secondary", onClick: () => {
                            setQuery('');
                            setFilter('All');
                        }, children: t.projects.clearSearch }) })) : (_jsxs(_Fragment, { children: [featured.length > 0 ? (_jsxs("section", { "aria-labelledby": "featured-heading", children: [_jsxs("header", { className: "mb-4", children: [_jsx("h2", { id: "featured-heading", className: "text-base font-semibold tracking-tight text-ink", children: _jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(Icon, { name: "star", size: 15, className: "text-[var(--success)]" }), t.projects.featured] }) }), _jsx("p", { className: "mt-0.5 text-xs text-muted", children: t.projects.featuredHint })] }), _jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: featured.map((project) => (_jsx(ProjectCard, { project: project, onOpen: openDetail, featured: true }, project.id))) })] })) : null, _jsxs("section", { "aria-labelledby": "all-heading", children: [_jsx("header", { className: "mb-4", children: _jsx("h2", { id: "all-heading", className: "text-base font-semibold tracking-tight text-ink", children: isFiltered ? `${t.projects.all} — ${filter === 'All' ? '' : filter}` : t.projects.all }) }), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: (featured.length > 0
                                        ? results.filter((project) => !featured.some((f) => f.id === project.id))
                                        : results).map((project) => (_jsx(ProjectCard, { project: project, onOpen: openDetail }, project.id))) })] })] })) })] }));
}
