import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../../context/PreferencesProvider';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
/** Interactive elements that make the ring react to what it is over. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [tabindex]';
/**
 * Pointer trail: a soft accent glow plus a lagging ring that tightens over
 * interactive elements. Purely additive — the native cursor is never hidden —
 * and it stays disabled on touch devices and under reduced motion.
 */
export function CursorGlow() {
    const { reduceMotion } = usePreferences();
    const prefersReduced = usePrefersReducedMotion();
    const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
    const glowRef = useRef(null);
    const ringRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [overTarget, setOverTarget] = useState(false);
    const disabled = reduceMotion || prefersReduced || !finePointer;
    useEffect(() => {
        if (disabled) {
            setVisible(false);
            return;
        }
        const glow = glowRef.current;
        const ring = ringRef.current;
        if (!glow || !ring)
            return;
        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const glowPos = { ...target };
        const ringPos = { ...target };
        let frame = requestAnimationFrame(function tick() {
            glowPos.x += (target.x - glowPos.x) * 0.16;
            glowPos.y += (target.y - glowPos.y) * 0.16;
            ringPos.x += (target.x - ringPos.x) * 0.1;
            ringPos.y += (target.y - ringPos.y) * 0.1;
            glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
            frame = requestAnimationFrame(tick);
        });
        const onMove = (event) => {
            target.x = event.clientX;
            target.y = event.clientY;
            setVisible((current) => (current ? current : true));
        };
        const onOver = (event) => {
            const node = event.target;
            setOverTarget(Boolean(node?.closest?.(INTERACTIVE)));
        };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onOver, true);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onOver, true);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [disabled]);
    if (disabled)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: glowRef, "aria-hidden": "true", "data-visible": visible, className: "cursor-glow" }), _jsx("div", { ref: ringRef, "aria-hidden": "true", "data-visible": visible, "data-hover": overTarget, className: "cursor-ring" })] }));
}
