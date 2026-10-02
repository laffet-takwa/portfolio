import type { LanguageEntry } from '../types';

/**
 * Languages with their self-assessed CEFR levels. Levels are shown as labels,
 * never as progress bars — a percentage would imply a precision that does not
 * exist for a self-declaration.
 */
export const languages: LanguageEntry[] = [
  { id: 'arabic', name: 'Arabic', level: 'native' },
  { id: 'french', name: 'French', level: 'b2' },
  { id: 'english', name: 'English', level: 'b2' },
  { id: 'german', name: 'German', level: 'b1' },
];