import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isLocale, localeMeta, type Locale } from './types';
import { messages } from './messages';
import { I18nContext, type I18nContextValue } from './context';

const STORAGE_KEY = 'catlantic.locale';

function detectLocale(): Locale {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(fromQuery)) return fromQuery;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('es')) return 'es';
  } catch {
    // Storage or location may be unavailable; fall through to the default.
  }
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the in-memory locale still applies.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = messages[locale];
    const fallback = messages.en;
    return {
      locale,
      setLocale,
      t: (key, vars) => {
        let text = dict[key] ?? fallback[key] ?? key;
        if (vars) {
          for (const [name, v] of Object.entries(vars)) text = text.split(`{${name}}`).join(String(v));
        }
        return text;
      },
      tx: (l10n) => l10n[locale] || l10n.en,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

