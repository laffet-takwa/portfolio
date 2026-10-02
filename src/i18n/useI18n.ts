import { useCallback } from 'react';
import { dictionaries, localeNames, localeCodes } from '../locales';
import { usePreferences } from '../context/PreferencesProvider';
import type { Dictionary } from '../locales/en';
import type { Locale } from '../types';

export interface I18n {
  locale: Locale;
  /** Dictionary for the active locale. `t.apps.projects` etc. */
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  localeName: string;
  localeCode: string;
  otherLocale: Locale;
  otherLocaleName: string;
  /** Replace {{placeholders}} in a translated string. */
  fmt: (template: string, vars: Record<string, string | number>) => string;
}

export function useI18n(): I18n {
  const { locale, setLocale } = usePreferences();
  const t = dictionaries[locale];

  const fmt = useCallback(
    (template: string, vars: Record<string, string | number>) =>
      template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
        key in vars ? String(vars[key]) : match,
      ),
    [],
  );

  return {
    locale,
    t,
    setLocale,
    localeName: localeNames[locale],
    localeCode: localeCodes[locale],
    otherLocale: locale === 'en' ? 'fr' : 'en',
    otherLocaleName: locale === 'en' ? localeNames.fr : localeNames.en,
    fmt,
  };
}