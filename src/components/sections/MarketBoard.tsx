import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { quoteBook, freightIndicators } from '../../data/market';
import { useLiveTick } from '../../hooks/useLiveTick';
import { driftPct, driftPrice } from '../../lib/simulation';
import { formatClock, formatNumber, formatSignedPct } from '../../lib/format';
import { ArrowDownRight, ArrowUpRight } from '../icons/UiIcons';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../lib/cn';

function Delta({ pct }: { pct: number }) {
  const up = pct > 0;
  const flat = Math.abs(pct) < 0.05;
  return (
    <span className={cn('tabular inline-flex items-center gap-1 font-mono text-fluid-xs', flat ? 'text-muted' : up ? 'text-status-good' : 'text-status-critical')}>
      {!flat && (up ? <ArrowUpRight width={13} height={13} /> : <ArrowDownRight width={13} height={13} />)}
      {formatSignedPct(pct)}
    </span>
  );
}

export function MarketBoard() {
  const { t, tx } = useI18n();
  const tick = useLiveTick({ intervalMs: 2400 });
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const rows = useMemo(
    () => quoteBook.map((q) => ({ ...q, live: driftPrice(q.id, q.price, q.volatility, tick), pct: driftPct(q.id, q.changePct, tick) })),
    [tick],
  );
  const freight = useMemo(
    () => freightIndicators.map((f) => ({ ...f, live: driftPrice(f.id, f.value, f.volatility, tick), pct: driftPct(f.id, 0, tick) * 0.6 })),
    [tick],
  );

  return (
    <section id="quotes" className="relative scroll-mt-20 border-t border-line bg-ink-900 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('market.eyebrow')}
          title={
            <>
              {t('market.title1')}
              <br />
              <span className="text-muted">{t('market.title2')}</span>
            </>
          }
          body={t('market.body')}
          aside={
            <div className="flex items-center gap-3 font-mono text-fluid-xs text-faint lg:justify-end">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-good/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-good" />
              </span>
              <span className="tabular">{clock} UTC</span>
            </div>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="overflow-hidden rounded-2xl border border-line bg-ink-950 lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">{t('market.caption')}</caption>
                <thead>
                  <tr className="border-b border-line font-mono text-fluid-xs uppercase tracking-wider text-faint">
                    <th scope="col" className="px-6 py-4 font-medium">{t('market.col.commodity')}</th>
                    <th scope="col" className="px-6 py-4 font-medium">{t('market.col.basis')}</th>
                    <th scope="col" className="px-6 py-4 font-medium">{t('market.col.market')}</th>
                    <th scope="col" className="px-6 py-4 text-right font-medium">{t('market.col.level')}</th>
                    <th scope="col" className="px-6 py-4 text-right font-medium">{t('market.col.24h')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-line last:border-b-0 transition-colors hover:bg-ink-900">
                      <td className="px-6 py-4">
                        <div className="text-fluid-sm font-medium text-paper">{tx(row.commodity)}</div>
                        <div className="font-mono text-fluid-xs text-faint">{tx(row.grade)}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-fluid-xs text-muted">
                        <span className="text-paper/80">{row.basis}</span> · {row.origin}
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-fluid-xs text-muted">{row.destination}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <motion.span key={row.live.toFixed(row.decimals ?? 0)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="tabular font-mono text-fluid-sm text-paper">
                          {formatNumber(row.live, row.decimals ?? 0)}
                        </motion.span>
                        <span className="ml-1.5 font-mono text-fluid-xs text-faint">{row.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Delta pct={row.pct} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-4">
            <div className="bg-ink-950 px-6 py-5">
              <h3 className="eyebrow">{t('market.freight')}</h3>
            </div>
            {freight.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-4 bg-ink-950 px-6 py-5">
                <div>
                  <div className="text-fluid-sm text-paper/85">{tx(f.label)}</div>
                  <div className="font-mono text-fluid-xs text-faint">{f.unit}</div>
                </div>
                <div className="text-right">
                  <div className="tabular font-mono text-fluid-base text-paper">{formatNumber(f.live, f.unit === 'USD/MT' ? 1 : 0)}</div>
                  <Delta pct={f.pct} />
                </div>
              </div>
            ))}
            <div className="bg-ink-950 px-6 py-5 font-mono text-fluid-xs text-faint">{t('market.disclaimer')}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
