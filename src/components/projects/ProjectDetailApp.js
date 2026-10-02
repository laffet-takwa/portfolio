import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getProjectById, publishedProjects } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { resolveText } from '../../types';
import { assetUrl } from '../../lib/assets';
import { Button, EmptyState, Tag } from '../ui/Primitives';
import { Icon } from '../ui/Icon';
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];
/**
 * Resolves each declared screenshot to a real image.
 *
 * An explicit `src` always wins. Otherwise the file is looked up by
 * convention — `/projects/<project-id>/<project-id>-NN-<shot-id>.<ext>` — so
 * dropping a correctly named image into the folder is enough to publish it,
 * with no code change and no broken image while the file is absent.
 */
function useScreenshotSources(project) {
    const shots = project.screenshots ?? [];
    const signature = `${project.id}:${shots.map((shot) => shot.id).join(',')}`;
    const [sources, setSources] = useState({});
    useEffect(() => {
        let cancelled = false;
        const found = {};
        const resolve = async () => {
            for (const [index, shot] of shots.entries()) {
                if (cancelled)
                    return;
                const candidates = shot.src
                    ? [assetUrl(shot.src)]
                    : IMAGE_EXTENSIONS.map((ext) => {
                        const stem = `${String(index + 1).padStart(2, '0')}-${shot.id}`;
                        const folder = project.screenshotFolder ?? project.id;
                        return assetUrl(`/projects/${folder}/${folder}-${stem}.${ext}`);
                    });
                for (const url of candidates) {
                    try {
                        const response = await fetch(url, { method: 'HEAD' });
                        const type = response.headers.get('content-type') ?? '';
                        if (response.ok && type.startsWith('image/')) {
                            found[shot.id] = url;
                            break;
                        }
                    }
                    catch {
                        /* candidate missing — try the next extension */
                    }
                }
            }
            if (!cancelled)
                setSources(found);
        };
        void resolve();
        return () => {
            cancelled = true;
        };
        // `signature` collapses the dependency to "which shots are declared".
    }, [signature]);
    return sources;
}
function Block({ title, icon, children, }) {
    return (_jsxs("section", { className: "border-t border-[var(--border)] pt-4", children: [_jsxs("h3", { className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted", children: [_jsx(Icon, { name: icon, size: 14, className: "text-accent" }), title] }), _jsx("div", { className: "text-[13px] leading-relaxed text-secondary", children: children })] }));
}
function Screenshot({ shot, project, locale, src, }) {
    const caption = resolveText(shot.caption, locale);
    if (src) {
        return (_jsxs("figure", { className: "overflow-hidden rounded-xl border border-[var(--border)]", children: [_jsx("img", { src: src, alt: caption, loading: "lazy", className: "h-36 w-full object-cover sm:h-44" }), _jsx("figcaption", { className: "border-t border-[var(--border)] px-3 py-2 text-[11px] text-muted", children: caption })] }));
    }
    return (_jsxs("figure", { className: "overflow-hidden rounded-xl border border-[var(--border)]", children: [_jsx("div", { className: "relative flex h-36 items-center justify-center sm:h-44", style: {
                    background: 'linear-gradient(140deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)',
                }, children: _jsx("span", { "aria-hidden": "true", className: "text-3xl opacity-40", children: _jsx(Icon, { name: project.icon ?? 'folder', size: 30 }) }) }), _jsx("figcaption", { className: "border-t border-[var(--border)] px-3 py-2 text-[11px] text-muted", children: caption })] }));
}
export function ProjectDetailApp({ projectId }) {
    const { t, locale } = useI18n();
    const { openWindow, closeWindow } = useWindowManager();
    const project = getProjectById(projectId);
    if (!project) {
        return (_jsx("div", { className: "p-6", children: _jsx(EmptyState, { icon: _jsx(Icon, { name: "image", size: 14 }), title: t.projects.projectNotFound, action: _jsx(Button, { variant: "primary", size: "sm", onClick: () => openWindow('projects'), children: t.detail.backToProjects }) }) }));
    }
    const others = publishedProjects.filter((item) => item.id !== project.id).slice(0, 4);
    const features = (project.features ?? []).map((feature) => resolveText(feature, locale));
    const screenshots = project.screenshots ?? [];
    const sources = useScreenshotSources(project);
    const openSibling = (id) => openWindow('project-detail', { projectId: id });
    return (_jsxs("div", { className: "scroll-thin h-full overflow-y-auto", children: [_jsxs("header", { className: "relative overflow-hidden border-b border-[var(--border)] px-4 py-6 sm:px-7", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/18 via-transparent to-transparent" }), _jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-mono text-[11px] uppercase tracking-wider text-accent", children: project.id }), _jsx("h2", { className: "mt-1 text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl", children: project.title }), project.subtitle ? (_jsx("p", { className: "mt-1 text-[13px] text-secondary", children: resolveText(project.subtitle, locale) })) : null] }), project.year ? (_jsx("span", { className: "shrink-0 rounded-lg border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-muted", children: project.year })) : null] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [project.category.map((category) => (_jsx(Tag, { tone: "accent", children: category }, category))), project.role ? _jsx(Tag, { children: resolveText(project.role, locale) }) : null] }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [project.github ? (_jsxs("a", { href: project.github, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink", children: [_jsx(Icon, { name: "git-branch", size: 14 }), t.projects.github] })) : (_jsxs("span", { title: t.detail.linkUnavailable, "aria-disabled": "true", className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-muted opacity-55", children: [_jsx(Icon, { name: "git-branch", size: 14 }), t.projects.github, " \u00B7 ", t.common.comingSoon] })), project.demo ? (_jsxs("a", { href: project.demo, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-accent/60 hover:text-ink", children: [_jsx(Icon, { name: "external-link", size: 14 }), t.projects.demo] })) : (_jsxs("span", { title: t.detail.linkUnavailable, "aria-disabled": "true", className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-muted opacity-55", children: [_jsx(Icon, { name: "external-link", size: 14 }), t.projects.demo, " \u00B7 ", t.common.comingSoon] }))] })] })] }), _jsxs("div", { className: "mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6 sm:px-7", children: [_jsx("p", { className: "text-[14px] leading-relaxed text-secondary", children: resolveText(project.longDescription || project.description, locale) }), project.highlight ? (_jsxs("p", { className: "flex items-start gap-2.5 rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-accent-soft px-3.5 py-3 text-[13px] font-medium leading-relaxed text-accent", children: [_jsx(Icon, { name: "star", size: 15, className: "mt-[2px] shrink-0" }), _jsx("span", { children: resolveText(project.highlight, locale) })] })) : null, project.problem ? (_jsx(Block, { title: t.detail.problem, icon: "help", children: _jsx("p", { children: resolveText(project.problem, locale) }) })) : null, project.solution ? (_jsx(Block, { title: t.detail.solution, icon: "lightbulb", children: _jsx("p", { children: resolveText(project.solution, locale) }) })) : null, project.architecture || project.architectureFlow ? (_jsxs(Block, { title: t.detail.architecture, icon: "layers", children: [project.architecture ? _jsx("p", { children: resolveText(project.architecture, locale) }) : null, project.architectureFlow && project.architectureFlow.length > 0 ? (_jsx("ol", { "aria-label": t.detail.flowLabel, className: "mt-3 flex flex-col items-stretch gap-0", children: project.architectureFlow.map((node, index) => (_jsxs("li", { className: "flex flex-col items-center", children: [_jsx("span", { className: "w-full rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2 text-center font-mono text-xs text-ink", children: node }), index < project.architectureFlow.length - 1 ? (_jsx(Icon, { name: "chevron-down", size: 15, className: "my-1 text-muted" })) : null] }, node))) })) : null] })) : null, features.length > 0 ? (_jsx(Block, { title: t.detail.features, icon: "check-circle", children: _jsx("ul", { className: "grid gap-1.5 sm:grid-cols-2", children: features.map((feature) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { "aria-hidden": "true", className: "mt-[3px] text-[10px] text-[var(--success)]", children: "\u25B8" }), _jsx("span", { children: feature })] }, feature))) }) })) : null, project.technologies.length > 0 ? (_jsx(Block, { title: t.detail.technologies, icon: "wrench", children: _jsx("ul", { className: "flex flex-wrap gap-1.5", children: project.technologies.map((tech) => (_jsx("li", { children: _jsx("span", { className: "inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--hover-surface)] px-2 py-1 text-[11px] text-secondary", children: tech }) }, tech))) }) })) : null, screenshots.length > 0 ? (_jsx(Block, { title: t.detail.screenshots, icon: "image", children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: screenshots.map((shot) => (_jsx(Screenshot, { shot: shot, project: project, locale: locale, src: sources[shot.id] }, shot.id))) }) })) : null, others.length > 0 ? (_jsxs("section", { className: "border-t border-[var(--border)] pt-4", children: [_jsx("h3", { className: "mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted", children: t.detail.otherProjects }), _jsx("ul", { className: "flex flex-col gap-1.5", children: others.map((item) => (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => openSibling(item.id), className: "flex w-full items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2 text-left transition-colors hover:border-accent/60 hover:bg-accent-soft", children: [_jsx(Icon, { name: item.icon ?? 'folder', size: 16 }), _jsx("span", { className: "min-w-0 flex-1 truncate text-[13px] text-secondary", children: item.title }), _jsx(Icon, { name: "arrow-right", size: 14, className: "text-muted" })] }) }, item.id))) }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: _jsxs(Button, { size: "sm", variant: "secondary", onClick: () => {
                                        closeWindow('project-detail');
                                        openWindow('projects');
                                    }, children: [_jsx(Icon, { name: "arrow-left", size: 13 }), " ", t.detail.backToProjects] }) })] })) : (_jsx("div", { className: "border-t border-[var(--border)] pt-4", children: _jsxs(Button, { size: "sm", variant: "secondary", onClick: () => {
                                closeWindow('project-detail');
                                openWindow('projects');
                            }, children: [_jsx(Icon, { name: "arrow-left", size: 13 }), " ", t.detail.backToProjects] }) }))] })] }));
}
