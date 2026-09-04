import { useState } from 'react';
import type { VolumeSlice } from '../../types';
import { formatNumber } from '../../lib/format';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n/useI18n';

interface VolumeBarsProps {
  slices: VolumeSlice[];
  title: string;
  caption: string;
}

/**
 * Emphasis form: the highlighted market takes the accent, the rest recede to gray.
 * Bars are thin, end-rounded only on the data end, and separated by a surface gap.
 */
export function VolumeBars({ slices, title, caption }: VolumeBarsProps) {
  const { t, tx } = useI18n();
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...slices.map((s) => s.valueMt));
  const total = slices.reduce((sum, s) => sum + s.valueMt, 0);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900">
      <div className="border-b border-line px-6 py-5">
        <h2 className="text-fluid-base font-medium text-paper">{title}</h2>
        <p className="mt-0.5 font-mono text-fluid-xs text-faint">{caption}</p>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-5 p-6" aria-label={title}>
        {slices.map((slice) => {
          const pct = slice.valueMt / max;
          const share = (slice.valueMt / total) * 100;
          const active = hover === slice.id;
          return (
            <li
              key={slice.id}
              onMouseEnter={() => setHover(slice.id)}
              onMouseLeave={() => setHover(null)}
              className="group"
            >
              <div className="mb-2 flex items-baseline justify-between font-mono text-fluid-xs">
                <span className={cn('transition-colors', slice.emphasis || active ? 'text-paper' : 'text-muted')}>
                  {tx(slice.label)}
                </span>
                <span className="tabular text-paper">
                  {formatNumber(slice.valueMt)} <span className="text-faint">MT</span>
                  <span className="ml-3 text-faint">{formatNumber(share, 1)}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-sm bg-ink-800" role="presentation">
                <div
                  className={cn(
                    'h-full rounded-r-[4px] transition-[width,background-color] duration-700 ease-swift',
                    slice.emphasis ? 'bg-clay' : active ? 'bg-paper/55' : 'bg-paper/25',
                  )}
                  style={{ width: `${Math.max(pct * 100, 1.5)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-6 py-4 font-mono text-fluid-xs text-faint">
        {t('dash.vol.total', { total: formatNumber(total) })}
      </p>
    </div>
  );
}
