import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useWindowManager, TASKBAR_HEIGHT } from '../../context/WindowManagerProvider';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/Icon';
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;
export function WindowFrame({ win, title, icon, children, headerExtra, showMinimize = true, showMaximize = true, className = '', contentClassName = '', }) {
    const { setWindowRect, focusWindow, closeWindow, minimizeWindow, toggleMaximize, isMobile } = useWindowManager();
    const { t } = useI18n();
    const panelRef = useRef(null);
    const draggedFocus = useRef(false);
    // Announce and focus the window when it first appears.
    useEffect(() => {
        if (win.focused && !draggedFocus.current) {
            panelRef.current?.focus({ preventScroll: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [win.id]);
    if (win.minimized)
        return null;
    /* ---------------- drag ---------------- */
    const beginDrag = (event) => {
        if (isMobile || win.maximized)
            return;
        if (event.pointerType === 'mouse' && event.button !== 0)
            return;
        const target = event.target;
        if (target.closest('button, a, input, textarea, select, [data-no-drag]'))
            return;
        const panel = panelRef.current;
        if (!panel)
            return;
        const rect = panel.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const maxX = Math.max(0, window.innerWidth - rect.width);
        const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - rect.height);
        let nextX = rect.left;
        let nextY = rect.top;
        if (!win.focused)
            focusWindow(win.id);
        const move = (ev) => {
            nextX = Math.min(Math.max(ev.clientX - offsetX, 0), maxX);
            nextY = Math.min(Math.max(ev.clientY - offsetY, 0), maxY);
            panel.style.left = `${nextX}px`;
            panel.style.top = `${nextY}px`;
        };
        const end = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', end);
            window.removeEventListener('pointercancel', end);
            setWindowRect(win.id, {
                width: win.rect.width,
                height: win.rect.height,
                x: Math.round(nextX),
                y: Math.round(nextY),
            });
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
    };
    /* ---------------- resize ---------------- */
    const beginResize = (event) => {
        if (isMobile || win.maximized)
            return;
        if (event.pointerType === 'mouse' && event.button !== 0)
            return;
        const panel = panelRef.current;
        if (!panel)
            return;
        const rect = panel.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        const maxW = Math.max(MIN_WIDTH, window.innerWidth - rect.left);
        const maxH = Math.max(MIN_HEIGHT, window.innerHeight - TASKBAR_HEIGHT - rect.top);
        let nextW = rect.width;
        let nextH = rect.height;
        const move = (ev) => {
            nextW = Math.min(Math.max(startX + (ev.clientX - startX), MIN_WIDTH), maxW);
            nextH = Math.min(Math.max(startY + (ev.clientY - startY), MIN_HEIGHT), maxH);
            panel.style.width = `${nextW}px`;
            panel.style.height = `${nextH}px`;
        };
        const end = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', end);
            window.removeEventListener('pointercancel', end);
            setWindowRect(win.id, {
                width: Math.round(nextW),
                height: Math.round(nextH),
                x: Math.round(rect.left),
                y: Math.round(rect.top),
            });
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
    };
    const windowStyle = isMobile
        ? undefined
        : {
            left: `${win.rect.x}px`,
            top: `${win.rect.y}px`,
            width: `${win.rect.width}px`,
            height: `${win.rect.height}px`,
        };
    return (_jsxs("div", { ref: panelRef, role: "dialog", "aria-label": title, tabIndex: -1, style: { ...windowStyle, zIndex: win.zIndex }, onPointerDown: () => {
            if (!win.focused)
                focusWindow(win.id);
        }, className: [
            'glass animate-window-in flex flex-col overflow-hidden rounded-xl shadow-[var(--shadow)] outline-none',
            isMobile ? 'fixed inset-0 z-[300] rounded-none' : 'absolute',
            win.focused ? 'border-[color-mix(in_srgb,var(--accent)_38%,var(--window-border))]' : '',
            className,
        ].join(' '), children: [_jsxs("div", { onPointerDown: beginDrag, onDoubleClick: () => !isMobile && showMaximize && toggleMaximize(win.id), className: [
                    'relative flex shrink-0 items-center gap-2 px-2 py-2 sm:px-3',
                    'border-b border-[var(--border)] bg-[var(--window-header)] select-none',
                    !isMobile ? 'cursor-grab active:cursor-grabbing' : '',
                ].join(' '), children: [_jsx("span", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent", children: _jsx(Icon, { name: icon, size: 15 }) }), _jsx("h2", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-ink", children: title }), headerExtra ? _jsx("div", { className: "hidden shrink-0 sm:block", children: headerExtra }) : null, _jsxs("div", { className: "flex shrink-0 items-center gap-0.5", "data-no-drag": true, children: [showMinimize ? (_jsx("button", { type: "button", "aria-label": `${title} — ${t.common.minimize}`, title: t.common.minimize, onClick: () => minimizeWindow(win.id), className: "flex h-7 w-9 items-center justify-center rounded-md text-secondary transition-colors hover:bg-[var(--hover-surface)] hover:text-ink", children: _jsx("span", { "aria-hidden": "true", className: "block h-[2px] w-3 rounded bg-current" }) })) : null, showMaximize ? (_jsx("button", { type: "button", "aria-label": `${title} — ${win.maximized ? t.common.restore : t.common.maximize}`, title: win.maximized ? t.common.restore : t.common.maximize, onClick: () => toggleMaximize(win.id), className: "hidden h-7 w-9 items-center justify-center rounded-md text-secondary transition-colors hover:bg-[var(--hover-surface)] hover:text-ink sm:flex", children: win.maximized ? (_jsxs("svg", { width: "11", height: "11", viewBox: "0 0 12 12", "aria-hidden": "true", children: [_jsx("rect", { x: "1.5", y: "3.5", width: "7", height: "7", rx: "1", fill: "none", stroke: "currentColor" }), _jsx("path", { d: "M3.5 3.5V2.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1", fill: "none", stroke: "currentColor" })] })) : (_jsx("svg", { width: "11", height: "11", viewBox: "0 0 12 12", "aria-hidden": "true", children: _jsx("rect", { x: "1.5", y: "1.5", width: "9", height: "9", rx: "1", fill: "none", stroke: "currentColor" }) })) })) : null, _jsx("button", { type: "button", "aria-label": `${title} — ${t.common.close}`, title: t.common.close, onClick: () => closeWindow(win.id), className: "flex h-7 w-9 items-center justify-center rounded-md text-secondary transition-colors hover:bg-[var(--danger)] hover:text-white", children: _jsx("svg", { width: "11", height: "11", viewBox: "0 0 12 12", "aria-hidden": "true", children: _jsx("path", { d: "M2 2l8 8M10 2l-8 8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) }) })] })] }), _jsx("div", { className: `window-content min-h-0 flex-1 overflow-hidden ${contentClassName}`, children: children }), !isMobile && !win.maximized ? (_jsx("div", { className: "resize-handle", onPointerDown: beginResize, role: "presentation", "aria-hidden": "true" })) : null] }));
}
