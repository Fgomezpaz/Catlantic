import { shipments } from '../../data/dashboard';
import { formatDay, formatNumber } from '../../lib/format';
import { StatusPill } from './StatusPill';
import { useI18n } from '../../i18n/useI18n';

export function ShipmentTable() {
  const { t, tx } = useI18n();
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-900">
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 className="text-fluid-base font-medium text-paper">{t('dash.table.title')}</h2>
        <span className="font-mono text-fluid-xs text-faint">{t('dash.table.files', { count: shipments.length })}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[60rem] border-collapse text-left">
          <caption className="sr-only">{t('dash.table.title')}</caption>
          <thead>
            <tr className="border-b border-line font-mono text-fluid-xs uppercase tracking-wider text-faint">
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.reference')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.commodity')}</th>
              <th scope="col" className="px-6 py-3 text-right font-medium">{t('dash.col.mt')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.vessel')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.lane')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.etd')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.eta')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.progress')}</th>
              <th scope="col" className="px-6 py-3 font-medium">{t('dash.col.status')}</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="border-b border-line last:border-b-0 transition-colors hover:bg-ink-850">
                <td className="whitespace-nowrap px-6 py-4 font-mono text-fluid-xs text-paper">{s.reference}</td>
                <td className="px-6 py-4 text-fluid-sm text-paper/85">{tx(s.commodity)}</td>
                <td className="tabular px-6 py-4 text-right font-mono text-fluid-xs text-paper/85">{formatNumber(s.quantityMt)}</td>
                <td className="px-6 py-4 text-fluid-xs text-muted">{s.vessel}</td>
                <td className="px-6 py-4 text-fluid-xs text-muted">{s.lane}</td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-fluid-xs text-muted">{formatDay(s.etd)}</td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-fluid-xs text-muted">{formatDay(s.eta)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-24 overflow-hidden rounded-full bg-ink-700" aria-hidden="true">
                      <div className="h-full rounded-full bg-paper/70" style={{ width: `${Math.round(s.progress * 100)}%` }} />
                    </div>
                    <span className="tabular font-mono text-fluid-xs text-faint">{Math.round(s.progress * 100)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
