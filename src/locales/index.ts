import en, { type Dictionary } from './en';
import fr from './fr';
import type { Locale } from '../types';

export const dictionaries: Record<Locale, Dictionary> = { en, fr };

export const locales: Locale[] = ['en', 'fr'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

export type { Dictionary };