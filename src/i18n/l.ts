import type { L10n } from './types';

/** Shorthand for building a tri-lingual string in data files. */
export const l = (en: string, es: string, zh: string): L10n => ({ en, es, zh });

/** For strings that are the same in every language (proper nouns, codes, units). */
export const same = (value: string): L10n => ({ en: value, es: value, zh: value });
