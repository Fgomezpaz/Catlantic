import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { lanes } from '../../data/lanes';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';
import { cn } from '../../lib/cn';
import { ArrowRight } from '../icons/UiIcons';
import type { Cadence, LaneMode } from '../../types';

const GlobeCanvas = lazy(() => import('./GlobeCanvas').then((m) => ({ default: m.GlobeCanvas })));

const cadenceKey: Record<Cadence, MessageKey> = { weekly: 'cadence.weekly', fortnightly: 'cadence.fortnightly', monthly: 'cadence.monthly' };
const modeKey: Record<LaneMode, MessageKey> = { bulk: 'mode.bulk', container: 'mode.container', ecommerce: 'mode.ecommerce', minerals: 'mode.minerals' };

export function TradeLanes() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="lanes" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink-950 py-28 lg:py-40">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_50%,#000,transparent)]" />
      <div className="shell relative">
        <SectionHeader
          eyebrow={t('lanes.eyebrow')}
          title={
            <>
              {t('lanes.title1', { count: lanes.length })}
              <br />
              <span className="text-muted">{t('lanes.title2')}</span>
            </>
          }
          body={t('lanes.body')}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ul className="divide-y divide-line border-y border-line" onMouseLeave={() => setActiveId(null)}>
              {lanes.map((lane) => {
                const active = activeId === lane.id;
                return (
                  <li key={lane.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(lane.id)}
                      onFocus={() => setActiveId(lane.id)}
                      onClick={() => setActiveId(active ? null : lane.id)}
                      className={cn('group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-4 text-left transition-colors duration-300', active ? 'text-paper' : 'text-muted hover:text-paper')}
                      aria-pressed={active}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 text-fluid-base font-medium">
                          <span className="truncate">{lane.from.label}</span>
                          <ArrowRight width={16} height={16} className={cn('shrink-0 transition-all duration-300', active ? 'translate-x-1 text-atlantic' : 'text-faint')} />
                          <span className="truncate">{lane.to.label}</span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-fluid-xs text-faint">
                          <span className={lane.direction === 'import' ? 'text-atlantic/80' : undefined}>{lane.direction === 'import' ? t('lanes.inbound') : lane.region}</span>
                          <span>{lane.modes.map((m) => t(modeKey[m])).join(' · ')}</span>
                          <span>{t(cadenceKey[lane.cadence])}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="tabular font-display text-fluid-xl font-semibold tracking-tightest">
                          {lane.transitDays}
                          <span className="ml-1 text-fluid-xs font-normal text-faint">d</span>
                        </div>
                        <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">{t('lanes.transit')}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 font-mono text-fluid-xs text-faint">{t('lanes.note')}</p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full lg:col-span-7"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgb(var(--c-atlantic)/0.14),transparent_62%)]" />
            <Suspense fallback={<div className="h-full w-full" />}>
              <GlobeCanvas lanes={lanes} activeId={activeId} className="absolute inset-0" />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
