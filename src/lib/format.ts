const numberFormatters = new Map<string, Intl.NumberFormat>();

function formatter(locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale}:${JSON.stringify(options)}`;
  let cached = numberFormatters.get(key);
  if (!cached) {
    cached = new Intl.NumberFormat(locale, options);
    numberFormatters.set(key, cached);
  }
  return cached;
}

export function formatNumber(value: number, decimals = 0): string {
  return formatter('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatUsd(value: number, decimals = 2): string {
  return formatter('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatSignedPct(value: number, decimals = 2): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${formatNumber(Math.abs(value), decimals)}%`;
}

const clockFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'UTC',
  hour12: false,
});

export function formatClock(date: Date): string {
  return clockFormatter.format(date);
}

export function formatDay(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
