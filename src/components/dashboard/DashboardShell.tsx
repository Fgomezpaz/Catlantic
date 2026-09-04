import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from '../icons/Logo';
import { FileText, Globe, Grid, Logout, Package, Ship } from '../icons/UiIcons';
import { StatTile } from './StatTile';
import { ShipmentTable } from './ShipmentTable';
import { PriceChart } from './PriceChart';
import { VolumeBars } from './VolumeBars';
import { dashboardKpis, priceSeries, volumeByDestination } from '../../data/dashboard';
import { company } from '../../data/site';
import { formatClock } from '../../lib/format';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

const sidebar: Array<{ id: string; key: MessageKey; Icon: typeof Grid; active: boolean }> = [
  { id: 'overview', key: 'dash.overview', Icon: Grid, active: true },
  { id: 'shipments', key: 'dash.shipments', Icon: Ship, active: false },
  { id: 'documents', key: 'dash.documents', Icon: FileText, active: false },
  { id: 'contracts', key: 'dash.contracts', Icon: Package, active: false },
  { id: 'market', key: 'dash.market', Icon: Globe, active: false },
];

interface DashboardShellProps {
  onSignOut: () => void;
}

export function DashboardShell({ onSignOut }: DashboardShellProps) {
  const { t, tx } = useI18n();
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="flex items-center justify-between border-b border-line px-5 py-4 lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:items-stretch lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <Link to="/" className="flex items-center gap-3 text-paper" aria-label="Back to Catlantic">
          <LogoMark size={32} />
          <span className="font-display text-fluid-sm font-semibold tracking-tightest">CATLANTIC</span>
        </Link>

        <nav className="hidden lg:mt-12 lg:block" aria-label="Dashboard">
          <ul className="space-y-1">
            {sidebar.map(({ id, key, Icon, active }) => (
              <li key={id}>
                <button
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-fluid-sm transition-colors',
                    active ? 'bg-paper/[0.06] text-paper' : 'text-muted hover:bg-paper/[0.04] hover:text-paper',
                  )}
                >
                  <Icon width={16} height={16} />
                  {t(key)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:mt-auto lg:flex-col lg:items-stretch">
          <LanguageSwitcher align="left" />
          <button
            type="button"
            onClick={onSignOut}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-fluid-xs text-muted transition-colors hover:text-paper"
          >
            <Logout width={15} height={15} />
            {t('dash.signOut')}
          </button>
        </div>
      </aside>

      <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow">{t('dash.overview')}</p>
            <h1 className="display mt-2 text-fluid-xl">{t('dash.greeting', { name: 'Demo Buyer Co.' })}</h1>
          </div>
          <div className="flex items-center gap-3 font-mono text-fluid-xs text-faint">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-good/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-good" />
            </span>
            <span className="tabular">{clock} UTC</span>
          </div>
        </motion.header>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {dashboardKpis.map((k) => (
            <motion.div key={k.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <StatTile label={t(k.labelKey)} value={k.value} suffix={k.suffix} decimals={k.decimals} delta={tx(k.delta)} tone={k.tone} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 grid gap-4 xl:grid-cols-12"
        >
          <div className="xl:col-span-8">
            <PriceChart
              series={priceSeries}
              title={t('dash.chart.title')}
              caption={t('dash.chart.caption')}
            />
          </div>
          <div className="xl:col-span-4">
            <VolumeBars slices={volumeByDestination} title={t('dash.vol.title')} caption={t('dash.vol.caption')} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <ShipmentTable />
        </motion.div>

        <p className="mt-10 font-mono text-[0.66rem] leading-relaxed text-faint">
          {company.name} · {t('dash.demo')}
        </p>
      </main>
    </div>
  );
}
