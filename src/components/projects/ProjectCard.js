import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Tag } from '../ui/Primitives';
import { Icon } from '../ui/Icon';
const MAX_TAGS = 5;
export function ProjectCard({ project, onOpen, featured }) {
    const { t, locale, fmt } = useI18n();
    const description = resolveText(project.description, locale);
    const highlight = resolveText(project.highlight, locale);
    const visibleTags = project.technologies.slice(0, MAX_TAGS);
    const overflow = project.technologies.length - visibleTags.length;
    const hasLinks = Boolean(project.github || project.demo);
    return (_jsxs("article", { className: [
            'card-surface group flex flex-col overflow-hidden',
            featured ? 'sm:col-span-2 sm:flex-row' : '',
        ].join(' '), children: [_jsxs("div", { className: [
                    'relative overflow-hidden border-b border-[var(--border)]',
                    featured ? 'h-36 sm:h-auto sm:w-[38%] sm:border-b-0 sm:border-r lg:w-[42%]' : 'h-32 sm:h-36',
                ].join(' '), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/10 to-transparent transition-transform duration-500 group-hover:scale-[1.06]" }), _jsx("div", { "aria-hidden": "true", className: "absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" }), _jsx("div", { "aria-hidden": "true", className: "absolute inset-0 opacity-[0.35]", style: {
                            backgroundImage: 'linear-gradient(var(--wallpaper-line) 1px, transparent 1px), linear-gradient(90deg, var(--wallpaper-line) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                        } }), _jsx("span", { "aria-hidden": "true", className: "absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted", children: project.id }), project.year ? (_jsx("span", { "aria-hidden": "true", className: "absolute right-3 top-2.5 rounded-md border border-[var(--border)] bg-[var(--window-solid)]/70 px-1.5 py-0.5 font-mono text-[10px] text-secondary", children: project.year })) : null, project.image ? (_jsx("img", { src: project.image, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" })) : (_jsx("span", { "aria-hidden": "true", className: [
                            'absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110',
                            featured ? 'text-5xl sm:text-6xl' : 'text-4xl',
                        ].join(' '), children: _jsx(Icon, { name: project.icon ?? 'folder', size: featured ? 56 : 40 }) })), _jsx("div", { className: "absolute inset-x-0 bottom-0 flex flex-wrap gap-1 bg-gradient-to-t from-[var(--background)] to-transparent p-2.5", children: project.category.map((category) => (_jsx(Tag, { tone: "accent", children: category }, category))) })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [_jsx("h3", { className: [
                            'font-semibold leading-snug text-ink transition-colors group-hover:text-accent',
                            featured ? 'text-lg' : 'text-[15px]',
                        ].join(' '), children: project.title }), highlight ? (_jsxs("p", { className: "flex items-start gap-1.5 text-[12px] font-medium leading-snug text-accent", children: [_jsx(Icon, { name: "star", size: 13, className: "mt-[3px] shrink-0" }), _jsx("span", { children: highlight })] })) : null, _jsx("p", { className: [
                            'flex-1 leading-relaxed text-secondary',
                            featured ? 'line-clamp-4 text-[13px]' : 'line-clamp-3 text-[13px]',
                        ].join(' '), children: description }), visibleTags.length > 0 ? (_jsxs("ul", { className: "flex flex-wrap gap-1", children: [visibleTags.map((tech) => (_jsx("li", { className: "rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted", children: tech }, tech))), overflow > 0 ? (_jsxs("li", { className: "rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted", children: ["+", overflow] })) : null] })) : null, _jsxs("div", { className: "mt-auto flex flex-wrap items-center gap-1.5 pt-1", children: [_jsxs("button", { type: "button", onClick: () => onOpen(project.id), "aria-label": fmt(t.a11y.openApp, { name: project.title }), className: "inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-accent px-2.5 py-1.5 text-xs font-medium text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]", children: [t.projects.viewProject, _jsx(Icon, { name: "arrow-right", size: 13 })] }), project.github ? (_jsxs("a", { href: project.github, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink", children: [_jsx(Icon, { name: "git-branch", size: 13 }), t.projects.github] })) : hasLinks ? (_jsxs("span", { title: t.detail.linkUnavailable, "aria-disabled": "true", className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-muted opacity-50", children: [_jsx(Icon, { name: "git-branch", size: 13 }), t.projects.github] })) : null, project.demo ? (_jsxs("a", { href: project.demo, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink", children: [_jsx(Icon, { name: "external-link", size: 13 }), t.projects.demo] })) : project.github ? (_jsxs("span", { title: t.detail.linkUnavailable, "aria-disabled": "true", className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-muted opacity-50", children: [_jsx(Icon, { name: "external-link", size: 13 }), t.projects.demo] })) : null] })] })] }));
}
