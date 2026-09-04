import { useMemo } from 'react';
import { Marquee } from '../ui/Marquee';
import { quoteBook, freightIndicators } from '../../data/market';
import { useLiveTick } from '../../hooks/useLiveTick';
import { driftPct, driftPrice } from '../../lib/simulation';
import { formatNumber, formatSignedPct } from '../../lib/format';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../lib/cn';

interface TickerItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  changePct: number | null;
}

export function LiveTicker() {
  const { t, tx } = useI18n();
  const tick = useLiveTick({ intervalMs: 2600 });

  const items = useMemo<TickerItem[]>(() => {
    const quotes = quoteBook.map((q) => ({
      id: q.id,
      label: `${tx(q.commodity)} · ${q.basis} ${q.origin}`,
      value: formatNumber(driftPrice(q.id, q.price, q.volatility, tick), q.decimals ?? 0),
      unit: q.unit,
      changePct: driftPct(q.id, q.changePct, tick),
    }));
    const freight = freightIndicators.map((f) => ({
      id: f.id,
      label: tx(f.label),
      value: formatNumber(driftPrice(f.id, f.value, f.volatility, tick), f.unit === 'USD/MT' ? 1 : 0),
      unit: f.unit,
      changePct: null,
    }));
    return [...quotes, ...freight];
  }, [tick, tx]);

  return (
    <div className="flex items-center gap-6">
      <span className="hidden shrink-0 items-center gap-2 font-mono text-fluid-xs uppercase tracking-widest text-faint sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-good/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-status-good" />
        </span>
        {t('ticker.indicative')}
      </span>
      <Marquee speedSeconds={70} className="flex-1">
        {items.map((item) => (
          <span key={item.id} className="mr-12 flex items-baseline gap-3 whitespace-nowrap font-mono text-fluid-xs">
            <span className="uppercase tracking-wider text-faint">{item.label}</span>
            <span className="tabular text-paper">{item.value}</span>
            <span className="text-faint">{item.unit}</span>
            {item.changePct !== null && (
              <span className={cn('tabular', item.changePct > 0 ? 'text-status-good' : item.changePct < 0 ? 'text-status-critical' : 'text-muted')}>
                {formatSignedPct(item.changePct)}
              </span>
            )}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
