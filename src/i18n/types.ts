export const locales = ['en', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

/** A user-facing string in every supported language. */
export type L10n = Record<Locale, string>;

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es' },
  zh: { label: '中文', short: '中文', htmlLang: 'zh-CN' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
