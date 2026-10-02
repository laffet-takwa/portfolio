import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import profilePhoto from '../../assets/takwa laffet.jpg';
/** Profile photograph. */
export function Avatar({ size = 96, label, status = 'none', statusLabel, className = '', rounded = 'rounded-2xl', }) {
    return (_jsxs("div", { className: `relative shrink-0 ${className}`, style: { width: size, height: size }, children: [_jsx("img", { src: profilePhoto, alt: label, width: size, height: size, className: `h-full w-full border border-[var(--border)] object-cover shadow-[var(--shadow-soft)] ${rounded}` }), status === 'available' ? (_jsx("span", { "aria-hidden": "true", title: statusLabel, className: "absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--window-content)] bg-[var(--success)]/20 text-[10px] text-[var(--success)]", children: "\u25CF" })) : null] }));
}
