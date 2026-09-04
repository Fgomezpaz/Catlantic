import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextValue } from './context';
import { isThemePreference, resolveTheme, THEME_STORAGE_KEY, type Theme, type ThemePreference } from './types';

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) return stored;
  } catch {
    // Storage may be unavailable (private mode, embedded views).
  }
  return 'auto';
}

function paint(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#0B0A09' : '#FAF9F5';
}

/**
 * Theme = "auto" follows the local clock (light 07:00–19:00, dark otherwise) and
 * re-evaluates every minute so a page left open changes with the day. A manual
 * choice is stored and wins until the user returns to "auto".
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(readPreference()));

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      if (next === 'auto') window.localStorage.removeItem(THEME_STORAGE_KEY);
      else window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the in-memory preference still applies.
    }
  }, []);

  // Resolve now and, in auto mode, keep resolving on a one-minute cadence.
  useEffect(() => {
    setTheme(resolveTheme(preference));
    if (preference !== 'auto') return;
    const id = window.setInterval(() => setTheme(resolveTheme('auto')), 60_000);
    const onVisible = (): void => {
      if (document.visibilityState === 'visible') setTheme(resolveTheme('auto'));
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [preference]);

  // Paint with a short cross-fade; the very first paint is done inline in index.html.
  useEffect(() => {
    const root = document.documentElement;
    const changed = root.dataset.theme !== theme;
    if (changed) root.classList.add('theme-transition');
    paint(theme);
    if (!changed) return;
    const id = window.setTimeout(() => root.classList.remove('theme-transition'), 500);
    return () => window.clearTimeout(id);
  }, [theme]);

  const toggle = useCallback(() => setPreference(theme === 'dark' ? 'light' : 'dark'), [setPreference, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, theme, setPreference, toggle }),
    [preference, theme, setPreference, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
