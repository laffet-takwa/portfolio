import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale, ResolvedTheme, ThemeMode } from '../types';

const STORAGE = {
  theme: 'tl.theme',
  lang: 'tl.lang',
  reduceMotion: 'tl.reduceMotion',
  largeText: 'tl.largeText',
} as const;

interface PreferencesValue {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  reset: () => void;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return (allowed as readonly string[]).includes(value ?? '') ? (value as T) : fallback;
  } catch {
    return fallback;
  }
}

function readBoolean(key: string, fallback: boolean): boolean {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === 'true';
  } catch {
    return fallback;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — preferences stay in memory for the session */
  }
}

function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() =>
    readStored<ThemeMode>(STORAGE.theme, ['system', 'light', 'dark'], 'dark'),
  );
  const [locale, setLocaleState] = useState<Locale>(() =>
    readStored<Locale>(STORAGE.lang, ['en', 'fr'], 'en'),
  );
  const [reduceMotion, setReduceMotionState] = useState<boolean>(() =>
    readBoolean(STORAGE.reduceMotion, false),
  );
  const [largeText, setLargeTextState] = useState<boolean>(() =>
    readBoolean(STORAGE.largeText, false),
  );
  const [systemPref, setSystemPref] = useState<ResolvedTheme>(systemTheme);

  // Follow the operating system when the theme is set to "System".
  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => setSystemPref(event.matches ? 'light' : 'dark');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: ResolvedTheme =
    themeMode === 'system' ? systemPref : (themeMode as ResolvedTheme);

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

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    write(STORAGE.theme, mode);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    write(STORAGE.lang, next);
  }, []);

  const setReduceMotion = useCallback((value: boolean) => {
    setReduceMotionState(value);
    write(STORAGE.reduceMotion, String(value));
  }, []);

  const setLargeText = useCallback((value: boolean) => {
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

  const value = useMemo<PreferencesValue>(
    () => ({
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
    }),
    [
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
    ],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside PreferencesProvider');
  return ctx;
}