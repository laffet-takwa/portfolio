import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from './Icon';
const buttonVariants = {
    primary: 'bg-accent text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] border border-transparent shadow-sm',
    secondary: 'bg-[var(--hover-surface)] text-ink hover:bg-accent-soft border border-[var(--border)]',
    ghost: 'bg-transparent text-secondary hover:text-ink hover:bg-[var(--hover-surface)] border border-transparent',
    danger: 'bg-transparent text-[var(--danger)] hover:bg-[var(--danger)]/10 border border-[var(--border)]',
};
export function Button({ variant = 'secondary', size = 'md', icon, fullWidth, className = '', children, ...rest }) {
    return (_jsxs("button", { ...rest, className: [
            'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
            'disabled:cursor-not-allowed disabled:opacity-45',
            size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm',
            buttonVariants[variant],
            fullWidth ? 'w-full' : '',
            className,
        ].join(' '), children: [icon ? (_jsx("span", { "aria-hidden": "true", className: "shrink-0 text-[1.05em] leading-none", children: icon })) : null, children] }));
}
export function IconButton({ label, active, tone = 'default', className = '', ...rest }) {
    return (_jsx("button", { ...rest, "aria-label": label, title: label, className: [
            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm leading-none transition-colors',
            tone === 'danger'
                ? 'text-secondary hover:bg-[var(--danger)]/12 hover:text-[var(--danger)]'
                : tone === 'neutral'
                    ? 'text-secondary hover:bg-[var(--hover-surface)] hover:text-ink'
                    : 'text-secondary hover:bg-[var(--hover-surface)] hover:text-ink',
            active ? 'bg-accent-soft text-accent' : '',
            'disabled:cursor-not-allowed disabled:opacity-40',
            className,
        ].join(' '), children: _jsx("span", { "aria-hidden": "true", children: rest.children }) }));
}
export function Tag({ tone = 'default', className = '', children, ...rest }) {
    const tones = {
        default: 'bg-[var(--hover-surface)] text-secondary border-[var(--border)]',
        accent: 'bg-accent-soft text-accent border-[color-mix(in_srgb,var(--accent)_35%,transparent)]',
        outline: 'bg-transparent text-muted border-[var(--border)]',
    };
    return (_jsx("span", { ...rest, className: [
            'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-5 whitespace-nowrap',
            tones[tone ?? 'default'],
            className,
        ].join(' '), children: children }));
}
/* ---------------- Section heading ---------------- */
export function SectionHeading({ title, hint, action, id, }) {
    return (_jsxs("div", { className: "mb-4 flex flex-wrap items-end justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h2", { id: id, className: "text-base font-semibold tracking-tight text-ink sm:text-lg", children: title }), hint ? _jsx("p", { className: "mt-0.5 text-xs text-muted", children: hint }) : null] }), action] }));
}
/* ---------------- Empty state ---------------- */
export function EmptyState({ icon = _jsx(IconTile, { name: "archive", size: 22, className: "h-11 w-11 rounded-xl" }), title, hint, action, }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border)] px-6 py-12 text-center", children: [_jsx("span", { "aria-hidden": "true", className: "opacity-70", children: icon }), _jsx("p", { className: "text-sm font-medium text-ink", children: title }), hint ? _jsx("p", { className: "max-w-sm text-xs text-muted", children: hint }) : null, action ? _jsx("div", { className: "mt-2", children: action }) : null] }));
}
/* ---------------- Keyboard key ---------------- */
export function Kbd({ children }) {
    return (_jsx("kbd", { className: "rounded border border-[var(--border)] bg-[var(--hover-surface)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-secondary", children: children }));
}
/* ---------------- Section divider ---------------- */
export function Divider({ className = '' }) {
    return _jsx("hr", { className: `border-t border-[var(--border)] ${className}` });
}
