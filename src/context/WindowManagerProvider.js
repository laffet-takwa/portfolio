import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { apps, defaultOpenAppIds } from '../data/profile';
import { getProjectById } from '../data/projects';
import { useIsMobile } from '../hooks/useMediaQuery';
/** Height reserved by the taskbar at the bottom of the viewport. */
export const TASKBAR_HEIGHT = 56;
/** Extra room for the desktop home content on first paint. */
const CASCADE_STEP = 28;
const BASE_Z = 100;
const WindowManagerContext = createContext(null);
function viewport() {
    return {
        width: typeof window === 'undefined' ? 1280 : window.innerWidth,
        height: typeof window === 'undefined' ? 800 : window.innerHeight,
    };
}
/** Keeps a window inside the usable desktop area. */
function clampRect(rect) {
    const { width: vw, height: vh } = viewport();
    const usableHeight = Math.max(240, vh - TASKBAR_HEIGHT);
    const width = Math.min(Math.max(rect.width, 280), vw);
    const height = Math.min(Math.max(rect.height, 200), usableHeight);
    return {
        width,
        height,
        x: Math.min(Math.max(rect.x, 0), Math.max(0, vw - width)),
        y: Math.min(Math.max(rect.y, 0), Math.max(0, usableHeight - height)),
    };
}
function createRect(id, index) {
    const app = apps[id];
    const { width: vw, height: vh } = viewport();
    const usableHeight = Math.max(240, vh - TASKBAR_HEIGHT);
    const preferred = app.size;
    const width = Math.min(preferred.width, Math.max(320, vw - 48));
    const height = Math.min(preferred.height, Math.max(260, usableHeight - 48));
    const offset = (index % 6) * CASCADE_STEP;
    return clampRect({
        x: Math.max(24, (vw - width) / 2 + offset - 60),
        y: Math.max(16, (usableHeight - height) / 2 + offset - 40),
        width,
        height,
    });
}
export function WindowManagerProvider({ children }) {
    const isMobile = useIsMobile();
    const [windows, setWindows] = useState([]);
    const zCounter = useRef(BASE_Z);
    const seqCounter = useRef(0);
    const cascade = useRef(0);
    // Open one window on first load so the desktop never feels empty.
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        if (window.innerWidth < 768)
            return;
        setWindows((current) => {
            if (current.length > 0)
                return current;
            return defaultOpenAppIds
                .filter((id) => apps[id])
                .map((id, index) => ({
                id,
                rect: createRect(id, index),
                restoreRect: createRect(id, index),
                zIndex: BASE_Z + index,
                minimized: false,
                maximized: false,
                focused: index === defaultOpenAppIds.length - 1,
                seq: seqCounter.current++,
            }));
        });
    }, []);
    // Re-clamp every window when the viewport changes (rotation, resize, devtools).
    useEffect(() => {
        const onResize = () => {
            setWindows((current) => current.map((win) => ({
                ...win,
                rect: win.maximized ? win.rect : clampRect(win.rect),
                restoreRect: clampRect(win.restoreRect),
            })));
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const focusWindow = useCallback((id) => {
        setWindows((current) => {
            const target = current.find((w) => w.id === id);
            if (!target)
                return current;
            if (target.focused && !target.minimized)
                return current;
            zCounter.current += 1;
            const z = zCounter.current;
            return current.map((w) => w.id === id ? { ...w, focused: true, minimized: false, zIndex: z } : { ...w, focused: false });
        });
    }, []);
    const openWindow = useCallback((id, options) => {
        if (id === 'project-detail' && !getProjectById(options?.projectId))
            return;
        setWindows((current) => {
            const existing = current.find((w) => w.id === id);
            zCounter.current += 1;
            const z = zCounter.current;
            if (existing) {
                return current.map((w) => w.id === id
                    ? {
                        ...w,
                        focused: true,
                        minimized: false,
                        zIndex: z,
                        projectId: options?.projectId ?? w.projectId,
                        seq: w.seq,
                    }
                    : { ...w, focused: false });
            }
            cascade.current += 1;
            const rect = createRect(id, cascade.current - 1);
            seqCounter.current += 1;
            return [
                ...current.map((w) => ({ ...w, focused: false })),
                {
                    id,
                    rect,
                    restoreRect: rect,
                    zIndex: z,
                    minimized: false,
                    maximized: false,
                    focused: true,
                    seq: seqCounter.current,
                    projectId: options?.projectId,
                },
            ];
        });
    }, []);
    const closeWindow = useCallback((id) => {
        setWindows((current) => {
            const next = current.filter((w) => w.id !== id);
            if (next.length === 0)
                return next;
            // Focus the most recently opened remaining window.
            const candidate = [...next].sort((a, b) => b.seq - a.seq).find((w) => !w.minimized);
            const focusId = candidate?.id ?? [...next].sort((a, b) => b.seq - a.seq)[0].id;
            zCounter.current += 1;
            return next.map((w) => w.id === focusId ? { ...w, focused: true, zIndex: zCounter.current } : { ...w, focused: false });
        });
    }, []);
    const closeAll = useCallback(() => setWindows([]), []);
    const minimizeWindow = useCallback((id) => {
        setWindows((current) => current.map((w) => (w.id === id ? { ...w, minimized: true, focused: false } : w)));
    }, []);
    const toggleWindow = useCallback((id, options) => {
        const existing = windows.find((w) => w.id === id);
        if (existing && existing.focused && !existing.minimized) {
            minimizeWindow(id);
            return;
        }
        openWindow(id, options);
    }, [windows, minimizeWindow, openWindow]);
    const toggleMaximize = useCallback((id) => {
        setWindows((current) => {
            const { width: vw, height: vh } = viewport();
            const usableHeight = Math.max(240, vh - TASKBAR_HEIGHT);
            let focusId;
            const updated = current.map((w) => {
                if (w.id !== id)
                    return w;
                if (w.maximized) {
                    focusId = w.id;
                    return { ...w, maximized: false, rect: clampRect(w.restoreRect) };
                }
                focusId = w.id;
                return {
                    ...w,
                    maximized: true,
                    restoreRect: w.rect,
                    rect: { x: 0, y: 0, width: vw, height: usableHeight },
                };
            });
            if (focusId) {
                zCounter.current += 1;
                const z = zCounter.current;
                return updated.map((w) => w.id === focusId ? { ...w, focused: true, zIndex: z } : { ...w, focused: false });
            }
            return updated;
        });
    }, []);
    const setWindowRect = useCallback((id, rect) => {
        setWindows((current) => current.map((w) => (w.id === id ? { ...w, rect, restoreRect: rect } : w)));
    }, []);
    const setMinimized = useCallback((id, minimized) => {
        setWindows((current) => current.map((w) => (w.id === id ? { ...w, minimized } : w)));
    }, []);
    const closeTopWindow = useCallback(() => {
        setWindows((current) => {
            const candidates = current.filter((w) => !w.minimized);
            if (candidates.length === 0)
                return current;
            const top = [...candidates].sort((a, b) => b.zIndex - a.zIndex)[0];
            const next = current.filter((w) => w.id !== top.id);
            if (next.length === 0)
                return next;
            const focusId = [...next].sort((a, b) => b.seq - a.seq)[0].id;
            zCounter.current += 1;
            const z = zCounter.current;
            return next.map((w) => w.id === focusId ? { ...w, focused: true, zIndex: z } : { ...w, focused: false });
        });
    }, []);
    const minimizeAll = useCallback(() => {
        setWindows((current) => current.map((w) => ({ ...w, minimized: true, focused: false })));
    }, []);
    const getWindow = useCallback((id) => windows.find((w) => w.id === id), [windows]);
    const activeWindow = useMemo(() => windows.filter((w) => w.focused && !w.minimized).sort((a, b) => b.zIndex - a.zIndex)[0], [windows]);
    const value = useMemo(() => ({
        windows,
        isMobile,
        openWindow,
        closeWindow,
        closeAll,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        toggleWindow,
        setWindowRect,
        setMinimized,
        getWindow,
        activeWindow,
        closeTopWindow,
        minimizeAll,
    }), [
        windows,
        isMobile,
        openWindow,
        closeWindow,
        closeAll,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        toggleWindow,
        setWindowRect,
        setMinimized,
        getWindow,
        activeWindow,
        closeTopWindow,
        minimizeAll,
    ]);
    return _jsx(WindowManagerContext.Provider, { value: value, children: children });
}
export function useWindowManager() {
    const ctx = useContext(WindowManagerContext);
    if (!ctx)
        throw new Error('useWindowManager must be used inside WindowManagerProvider');
    return ctx;
}
