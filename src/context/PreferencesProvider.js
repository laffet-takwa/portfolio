import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from 'react';
const STORAGE = {
    theme: 'tl.theme',
    lang: 'tl.lang',
    reduceMotion: 'tl.reduceMotion',
    largeText: 'tl.largeText',
};
const PreferencesContext = createContext(null);
function readStored(key, allowed, fallback) {
    try {
        const value = localStorage.getItem(key);
        return allowed.includes(value ?? '') ? value : fallback;
    }
    catch {
        return fallback;
    }
}
function readBoolean(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value === 'true';
    }
    catch {
        return fallback;
    }
}
function write(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        /* storage unavailable — preferences stay in memory for the session */
    }
}
function systemTheme() {
    if (typeof window === 'undefined' || !window.matchMedia)
        return 'dark';
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
export function PreferencesProvider({ children }) {
    const [themeMode, setThemeModeState] = useState(() => readStored(STORAGE.theme, ['system', 'light', 'dark'], 'dark'));
    const [locale, setLocaleState] = useState(() => readStored(STORAGE.lang, ['en', 'fr'], 'en'));
    const [reduceMotion, setReduceMotionState] = useState(() => readBoolean(STORAGE.reduceMotion, false));
    const [largeText, setLargeTextState] = useState(() => readBoolean(STORAGE.largeText, false));
    const [systemPref, setSystemPref] = useState(systemTheme);
    // Follow the operating system when the theme is set to "System".
    useEffect(() => {
        if (!window.matchMedia)
            return;
        const query = window.matchMedia('(prefers-color-scheme: light)');
        const onChange = (event) => setSystemPref(event.matches ? 'light' : 'dark');
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);
    const resolvedTheme = themeMode === 'system' ? systemPref : themeMode;
    useEffect(() => {
        const root = document.documentElement;
        // Exactly one theme class is always present so the token blocks are unambiguous.
        root.classList.toggle('dark', resolvedTheme === 'dark');
        root.classList.toggle('light', resolvedTheme === 'light');
        root.style.colorScheme = resolvedTheme;
        root.dataset.theme = resolvedTheme;
    }, [resolvedTheme]);
    useEffect(() => {
        document.documentElement.dataset.reduceMotion = String(reduceMotion);
        document.documentElement.style.fontSize = largeText ? '18px' : '16px';
    }, [reduceMotion, largeText]);
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);
    const setThemeMode = useCallback((mode) => {
        setThemeModeState(mode);
        write(STORAGE.theme, mode);
    }, []);
    const setLocale = useCallback((next) => {
        setLocaleState(next);
        write(STORAGE.lang, next);
    }, []);
    const setReduceMotion = useCallback((value) => {
        setReduceMotionState(value);
        write(STORAGE.reduceMotion, String(value));
    }, []);
    const setLargeText = useCallback((value) => {
        setLargeTextState(value);
        write(STORAGE.largeText, String(value));
    }, []);
    const reset = useCallback(() => {
        setThemeModeState('dark');
        setLocaleState('en');
        setReduceMotionState(false);
        setLargeTextState(false);
        write(STORAGE.theme, 'dark');
        write(STORAGE.lang, 'en');
        write(STORAGE.reduceMotion, 'false');
        write(STORAGE.largeText, 'false');
    }, []);
    const value = useMemo(() => ({
        themeMode,
        resolvedTheme,
        setThemeMode,
        locale,
        setLocale,
        reduceMotion,
        setReduceMotion,
        largeText,
        setLargeText,
        reset,
    }), [
        themeMode,
        resolvedTheme,
        setThemeMode,
        locale,
        setLocale,
        reduceMotion,
        setReduceMotion,
        largeText,
        setLargeText,
        reset,
    ]);
    return _jsx(PreferencesContext.Provider, { value: value, children: children });
}
export function usePreferences() {
    const ctx = useContext(PreferencesContext);
    if (!ctx)
        throw new Error('usePreferences must be used inside PreferencesProvider');
    return ctx;
}
