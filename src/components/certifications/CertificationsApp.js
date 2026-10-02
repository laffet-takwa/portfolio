import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { certificationGroups, certifications } from '../../data/certifications';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
export function CertificationsApp() {
    const { t, locale } = useI18n();
    const groups = certificationGroups
        .map((group) => ({
        ...group,
        items: certifications.filter((cert) => cert.group === group.id),
    }))
        .filter((group) => group.items.length > 0);
    return (_jsx("div", { className: "scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6", children: _jsxs("div", { className: "mx-auto flex max-w-3xl flex-col gap-6", children: [_jsxs("header", { children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight text-ink", children: t.certs.title }), _jsx("p", { className: "mt-0.5 text-xs text-muted", children: t.certs.subtitle })] }), groups.map((group, index) => (_jsxs("section", { "aria-labelledby": `cert-group-${group.id}`, className: "animate-rise-in", style: { animationDelay: `${index * 60}ms` }, children: [_jsxs("div", { className: "mb-3 flex items-center gap-2.5", children: [_jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent", children: _jsx(Icon, { name: group.icon, size: 15 }) }), _jsx("h4", { id: `cert-group-${group.id}`, className: "text-sm font-semibold text-ink", children: group.label }), _jsxs("span", { className: "text-xs text-muted", children: ["(", group.items.length, ")"] })] }), _jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: group.items.map((cert) => {
                                const body = (_jsxs(_Fragment, { children: [_jsx(Icon, { name: "check-circle", size: 16, className: "shrink-0 text-[var(--success)]" }), _jsxs("span", { className: "min-w-0", children: [_jsx("span", { className: "block text-[13px] font-medium leading-snug text-ink", children: cert.name }), _jsx("span", { className: "block text-[11px] text-muted", children: resolveText(cert.issuer, locale) })] })] }));
                                return (_jsx("li", { children: cert.url ? (_jsxs("a", { href: cert.url, target: "_blank", rel: "noreferrer noopener", className: "group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5 transition-colors hover:border-accent/60", children: [body, _jsx(Icon, { name: "external-link", size: 13, className: "ml-auto shrink-0 text-muted transition-colors group-hover:text-accent" })] })) : (_jsx("div", { className: "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5", children: body })) }, cert.id));
                            }) })] }, group.id))), _jsx("p", { className: "text-[11px] leading-relaxed text-muted", children: t.certs.note })] }) }));
}
