import { createContext } from 'react';
import type { L10n, Locale } from './types';
import type { MessageKey } from './messages';

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI dictionary lookup with `{name}` interpolation. */
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  /** Pick the current language from a tri-lingual data string. */
  tx: (value: L10n) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
