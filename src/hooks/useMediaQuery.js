import { useEffect, useState } from 'react';
/** Reactive media query hook. */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined' || !window.matchMedia)
            return false;
        return window.matchMedia(query).matches;
    });
    useEffect(() => {
        if (!window.matchMedia)
            return;
        const list = window.matchMedia(query);
        const onChange = (event) => setMatches(event.matches);
        setMatches(list.matches);
        list.addEventListener('change', onChange);
        return () => list.removeEventListener('change', onChange);
    }, [query]);
    return matches;
}
/** True on phones and small tablets, where the OS metaphor switches to full-screen apps. */
export function useIsMobile() {
    return useMediaQuery('(max-width: 767px)');
}
export function useIsDesktop() {
    return useMediaQuery('(min-width: 768px)');
}
/** Honours the operating-system preference for reduced motion. */
export function usePrefersReducedMotion() {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
