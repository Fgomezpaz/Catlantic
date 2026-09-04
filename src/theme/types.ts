export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'auto';

export const THEME_STORAGE_KEY = 'catlantic.theme';

/** Daylight window used by the automatic mode (local time, inclusive start, exclusive end). */
export const DAYLIGHT = { start: 7, end: 19 } as const;

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'dark' || value === 'light' || value === 'auto';
}

/** Light between 07:00 and 19:00 local time, dark otherwise. */
export function themeForTime(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= DAYLIGHT.start && hour < DAYLIGHT.end ? 'light' : 'dark';
}

export function resolveTheme(preference: ThemePreference, date = new Date()): Theme {
  return preference === 'auto' ? themeForTime(date) : preference;
}
