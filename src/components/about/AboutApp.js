import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { profile } from '../../data/profile';
import { education } from '../../data/education';
import { languages } from '../../data/languages';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Primitives';
import { Avatar } from '../ui/Avatar';
export function AboutApp() {
    const { t, locale } = useI18n();
    const facts = [
        { icon: 'map-pin', label: t.about.facts.location },
        { icon: 'graduation', label: t.about.facts.education },
        { icon: 'code', label: t.about.facts.fullStack },
        { icon: 'shield', label: t.about.facts.security },
        { icon: 'cloud', label: t.about.facts.cloud },
        { icon: 'check-circle', label: t.about.facts.availability },
    ];
    const focusAreas = [
        { icon: 'lock', label: t.about.focus.securityEngineering },
        { icon: 'blocks', label: t.about.focus.secureDevelopment },
        { icon: 'globe', label: t.about.focus.cloudPlatforms },
        { icon: 'zap', label: t.about.focus.automation },
    ];
    const levelLabel = (level) => t.languages[level];
    return (_jsx("div", { className: "scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-7 sm:py-7", children: _jsxs("div", { className: "mx-auto flex max-w-3xl flex-col gap-6", children: [_jsxs("section", { className: "flex flex-col items-start gap-5 sm:flex-row sm:items-center", children: [_jsx(Avatar, { size: 104, label: t.about.avatarLabel, status: "available", statusLabel: t.about.facts.availability }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "text-xl font-bold tracking-tight text-ink sm:text-2xl", children: t.about.name }), _jsx("ul", { className: "mt-1.5 flex flex-col gap-0.5", children: [t.about.role1, t.about.role2, t.about.role3].map((role) => (_jsx("li", { className: "text-sm text-secondary", children: role }, role))) }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [_jsx(Tag, { tone: "accent", children: resolveText(profile.availability, locale) }), _jsx(Tag, { children: resolveText(profile.location, locale) })] })] })] }), _jsx("p", { className: "text-[13px] leading-relaxed text-secondary sm:text-sm", children: t.about.description }), _jsxs("section", { children: [_jsx("h4", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted", children: t.about.factsLabel }), _jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: facts.map((fact) => (_jsxs("li", { className: "flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2 text-[13px] text-secondary", children: [_jsx(Icon, { name: fact.icon, size: 15, className: "text-accent" }), _jsx("span", { children: fact.label })] }, fact.label))) })] }), _jsxs("section", { children: [_jsx("h4", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted", children: t.about.focusLabel }), _jsx("ul", { className: "flex flex-wrap gap-2", children: focusAreas.map((area) => (_jsx("li", { children: _jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs text-secondary", children: [_jsx(Icon, { name: area.icon, size: 14, className: "text-accent" }), area.label] }) }, area.label))) })] }), _jsxs("section", { "aria-labelledby": "about-languages-heading", children: [_jsx("h4", { id: "about-languages-heading", className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted", children: t.languages.title }), _jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: languages.map((language) => (_jsxs("li", { className: "flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2", children: [_jsxs("span", { className: "flex min-w-0 items-center gap-2.5", children: [_jsx(Icon, { name: "globe", size: 15, className: "shrink-0 text-accent" }), _jsx("span", { className: "truncate text-[13px] font-medium text-ink", children: language.name })] }), _jsx(Tag, { tone: language.level === 'native' ? 'accent' : 'outline', children: levelLabel(language.level) })] }, language.id))) }), _jsx("p", { className: "mt-2 text-[11px] text-muted", children: t.languages.subtitle })] }), _jsxs("section", { children: [_jsx("h4", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted", children: t.education.title }), _jsx("ul", { className: "flex flex-col gap-2", children: education.map((entry) => (_jsxs("li", { className: "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border border-[var(--border)] px-3 py-2.5", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[13px] font-medium text-ink", children: resolveText(entry.degree, locale) }), entry.degreeAlt ? (_jsx("p", { className: "mt-0.5 text-[11px] leading-relaxed text-muted", children: resolveText(entry.degreeAlt, locale) })) : null, _jsx("p", { className: "mt-0.5 text-xs text-muted", children: entry.school })] }), _jsx("p", { className: "font-mono text-xs text-secondary", children: entry.period })] }, entry.id))) })] })] }) }));
}
