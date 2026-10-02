/* ============================================================
   Shared domain types
   ============================================================
   Translatable content uses `TText`:
     description: 'English only'                  → EN fallback everywhere
     description: { en: '…', fr: '…' }            → full translation
   This keeps a project entry as small as one English string
   while still allowing French content per field.
   ============================================================ */
export function resolveText(value, locale) {
    if (value === undefined)
        return '';
    if (typeof value === 'string')
        return value;
    return value[locale] ?? value.en;
}
export function hasTranslation(value, locale) {
    if (value === undefined)
        return false;
    if (typeof value === 'string')
        return locale === 'en';
    return Boolean(value[locale]);
}
