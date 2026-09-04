import { useId, useMemo, useState, type PointerEvent } from 'react';
import type { Series } from '../../types';
import { formatNumber } from '../../lib/format';
import { ChartLine, Table as TableIcon } from '../icons/UiIcons';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n/useI18n';

/** Categorical slots validated on both ink and paper surfaces (OKLab CVD ΔE ≥ 9, ≥ 3:1 vs background). */
const SERIES_COLORS = ['#3987E5', '#D95926', '#199E70'] as const;

interface PriceChartProps {
  series: Series[];
  title: string;
  caption: string;
}

const W = 720;
const H = 260;
const PAD = { top: 18, right: 84, bottom: 30, left: 44 };

export function PriceChart({ series, title, caption }: PriceChartProps) {
  const id = useId();
  const { t, tx } = useI18n();
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const [hover, setHover] = useState<number | null>(null);

  const model = useMemo(() => {
    const labels = series[0]?.points.map((p) => p.t) ?? [];
    const values = series.flatMap((s) => s.points.map((p) => p.v));
    const min = Math.floor(Math.min(...values) - 2);
    const max = Math.ceil(Math.max(...values) + 2);
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i: number) => PAD.left + (i / Math.max(labels.length - 1, 1)) * innerW;
    const y = (v: number) => PAD.top + (1 - (v - min) / (max - min)) * innerH;
    const ticks = 4;
    const gridValues = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) * i) / ticks);
    const paths = series.map((s) => s.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' '));
    return { labels, min, max, x, y, gridValues, paths, innerW, innerH };
  }, [series]);

  const onMove = (event: PointerEvent<SVGSVGElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const ratio = (px - PAD.left) / model.innerW;
    const index = Math.round(ratio * (model.labels.length - 1));
    setHover(Math.max(0, Math.min(model.labels.length - 1, index)));
  };

  return (
    <div className="rounded-2xl border border-line bg-ink-900">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <h2 className="text-fluid-base font-medium text-paper">{title}</h2>
          <p className="mt-0.5 font-mono text-fluid-xs text-faint">{caption}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-line p-1" role="tablist" aria-label="View">
          {(['chart', 'table'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full transition-colors',
                view === v ? 'bg-paper text-ink-950' : 'text-muted hover:text-paper',
              )}
              aria-label={v === 'chart' ? t('dash.view.chart') : t('dash.view.table')}
            >
              {v === 'chart' ? <ChartLine width={15} height={15} /> : <TableIcon width={15} height={15} />}
            </button>
          ))}
        </div>
      </div>

      {view === 'chart' ? (
        <div className="p-4 sm:p-6">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-labelledby={`${id}-title`}
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <title id={`${id}-title`}>{title}</title>
            {model.gridValues.map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={model.y(v)}
                  y2={model.y(v)}
                  className="stroke-paper/[0.08]"
                  strokeWidth={1}
                />
                <text x={PAD.left - 8} y={model.y(v) + 3.5} textAnchor="end" fontSize={10} className="fill-faint" fontFamily="JetBrains Mono, monospace">
                  {formatNumber(v, 0)}
                </text>
              </g>
            ))}
            {model.labels.map((label, i) => (
              <text key={label} x={model.x(i)} y={H - 8} textAnchor="middle" fontSize={10} className="fill-faint" fontFamily="JetBrains Mono, monospace">
                {label}
              </text>
            ))}

            {hover !== null && (
              <line
                x1={model.x(hover)}
                x2={model.x(hover)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                className="stroke-paper/30"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}

            {series.map((s, si) => {
              const color = SERIES_COLORS[si % SERIES_COLORS.length];
              const last = s.points[s.points.length - 1];
              return (
                <g key={s.id}>
                  <path d={model.paths[si]} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx={model.x(s.points.length - 1)} cy={model.y(last.v)} r={3.5} fill={color} className="stroke-ink-850" strokeWidth={2} />
                  <text
                    x={W - PAD.right + 12}
                    y={model.y(last.v) + 3.5}
                    fontSize={11}
                    className="fill-paper/80"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {tx(s.short)}
                  </text>
                  {hover !== null && (
                    <circle
                      cx={model.x(hover)}
                      cy={model.y(s.points[hover].v)}
                      r={4.5}
                      fill={color}
                      className="stroke-ink-850"
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="relative mt-3 min-h-[3.25rem]">
            {hover !== null ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line bg-ink-950 px-4 py-3 font-mono text-fluid-xs">
                <span className="text-paper">{model.labels[hover]}</span>
                {series.map((s, si) => (
                  <span key={s.id} className="flex items-center gap-2 text-muted">
                    <span className="h-2 w-2 rounded-full" style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }} />
                    {tx(s.label)}
                    <span className="tabular text-paper">{formatNumber(s.points[hover].v, 1)}</span>
                  </span>
                ))}
              </div>
            ) : (
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 font-mono text-fluid-xs text-muted" aria-label={t('dash.legend')}>
                {series.map((s, si) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }} />
                    {tx(s.label)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{title} as a table</caption>
            <thead>
              <tr className="border-b border-line font-mono text-fluid-xs uppercase tracking-wider text-faint">
                <th scope="col" className="px-6 py-3 font-medium">{t('dash.month')}</th>
                {series.map((s) => (
                  <th key={s.id} scope="col" className="px-6 py-3 text-right font-medium">
                    {tx(s.label)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {model.labels.map((label, i) => (
                <tr key={label} className="border-b border-line last:border-b-0">
                  <td className="px-6 py-3 font-mono text-fluid-xs text-paper">{label}</td>
                  {series.map((s) => (
                    <td key={s.id} className="tabular px-6 py-3 text-right font-mono text-fluid-xs text-paper/85">
                      {formatNumber(s.points[i].v, 1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
