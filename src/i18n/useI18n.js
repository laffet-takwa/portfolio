import { useCallback } from 'react';
import { dictionaries, localeNames, localeCodes } from '../locales';
import { usePreferences } from '../context/PreferencesProvider';
export function useI18n() {
    const { locale, setLocale } = usePreferences();
    const t = dictionaries[locale];
    const fmt = useCallback((template, vars) => template.replace(/\{\{(\w+)\}\}/g, (match, key) => key in vars ? String(vars[key]) : match), []);
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
