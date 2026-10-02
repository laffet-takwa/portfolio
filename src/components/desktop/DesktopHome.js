import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { appIcon, appLabelKey, mobileGridAppIds, profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
/**
 * Desktop home screen — the first thing a recruiter reads.
 * Content is kept to the essentials: who, what, availability, next step.
 */
export function DesktopHome() {
    const { t, locale } = useI18n();
    const { openWindow } = useWindowManager();
    const isMobile = useIsMobile();
    const socialLinks = [
        {
            label: t.desktop.githubLabel,
            value: profile.handles.github,
            href: profile.github,
            icon: 'git-branch',
            external: true,
        },
        {
            label: t.desktop.linkedinLabel,
            value: profile.handles.linkedin,
            href: profile.linkedin,
            icon: 'briefcase',
            external: true,
        },
        {
            label: t.desktop.emailLabel,
            value: profile.email,
            href: `mailto:${profile.email}`,
            icon: 'mail',
            external: false,
        },
    ];
    return (_jsxs("section", { className: "pointer-events-none flex h-full items-center px-6 pt-20 pb-24 sm:pl-[124px] sm:pr-6 sm:pt-6 sm:pb-24 lg:pl-[140px] lg:pr-10", "aria-labelledby": "hero-name", children: [_jsxs("div", { className: "pointer-events-auto w-full max-w-2xl", children: [_jsx("h1", { id: "hero-name", className: "animate-rise-in text-[34px] font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl", children: t.desktop.heroName }), _jsx("p", { className: "animate-rise-in mt-2 max-w-xl text-[15px] font-medium leading-snug text-accent sm:mt-3 sm:text-lg", style: { animationDelay: '60ms' }, children: profile.headline }), _jsx("p", { className: "animate-rise-in mt-3 max-w-xl text-[13px] leading-relaxed text-secondary sm:mt-4 sm:text-[15px]", style: { animationDelay: '100ms' }, children: t.desktop.heroTagline }), _jsxs("p", { className: "animate-rise-in mt-4 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--success)] sm:mt-5", style: { animationDelay: '140ms' }, children: [_jsx("span", { "aria-hidden": "true", className: "animate-status-pulse h-2 w-2 rounded-full bg-[var(--success)]" }), resolveText(profile.availability, locale)] }), _jsxs("div", { className: "animate-rise-in mt-5 flex flex-wrap gap-2 sm:mt-7", style: { animationDelay: '180ms' }, children: [_jsxs("button", { type: "button", onClick: () => openWindow('projects'), className: "inline-flex items-center gap-2 rounded-xl border border-transparent bg-accent px-4 py-2.5 text-sm font-medium text-[var(--accent-contrast)] shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--accent-hover)]", children: [_jsx(Icon, { name: "folder", size: 17 }), t.desktop.jumpToProjects] }), _jsxs("button", { type: "button", onClick: () => openWindow('resume'), className: "inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--window)] px-4 py-2.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent/60", children: [_jsx(Icon, { name: "download", size: 17 }), t.desktop.jumpToResume] }), _jsxs("button", { type: "button", onClick: () => openWindow('contact'), className: "inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--window)] px-4 py-2.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent/60", children: [_jsx(Icon, { name: "mail", size: 17 }), t.desktop.jumpToContact] })] }), _jsx("ul", { "aria-label": t.desktop.socialLabel, className: "animate-rise-in mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted sm:mt-5 sm:gap-y-2", style: { animationDelay: '220ms' }, children: socialLinks.map((link) => (_jsx("li", { children: _jsxs("a", { href: link.href, target: link.external ? '_blank' : undefined, rel: link.external ? 'noreferrer noopener' : undefined, className: "inline-flex items-center gap-1.5 transition-colors hover:text-accent", children: [_jsx(Icon, { name: link.icon, size: 14 }), _jsx("span", { className: "max-w-[13rem] truncate", children: link.value })] }) }, link.label))) }), _jsx("p", { className: "animate-rise-in mt-6 hidden text-[11px] text-muted sm:block", style: { animationDelay: '260ms' }, children: t.desktop.keyboardHint }), isMobile ? (_jsx("ul", { "aria-label": t.a11y.iconsLabel, className: "animate-rise-in mt-6 grid grid-cols-4 gap-2 sm:mt-8", style: { animationDelay: '300ms' }, children: mobileGridAppIds.map((id) => (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => openWindow(id), className: "flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-center transition-colors active:bg-[var(--hover-surface)] sm:gap-1.5 sm:py-2.5", children: [_jsx("span", { "aria-hidden": "true", className: "flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--window-border)] bg-[var(--window)] shadow-[var(--shadow-soft)] sm:h-11 sm:w-11 sm:rounded-xl", children: _jsx(Icon, { name: appIcon(id), size: 18 }) }), _jsx("span", { className: "line-clamp-1 text-[10px] leading-tight text-secondary sm:line-clamp-2", children: t.apps[appLabelKey[id]] })] }) }, id))) })) : null] }), !isMobile ? (_jsx("div", { className: "pointer-events-auto absolute bottom-[72px] right-8 hidden flex-col items-end gap-1 text-[11px] text-muted xl:flex", children: _jsx("span", { children: t.desktop.heroHint }) })) : null] }));
}
