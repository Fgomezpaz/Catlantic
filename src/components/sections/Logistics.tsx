import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { logisticsServices, type LogisticsService } from '../../data/services';
import { surveyors } from '../../data/site';
import { Anchor, ArrowUpRight, Check, FileText, Package, Ship } from '../icons/UiIcons';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../lib/cn';

const icons: Record<LogisticsService['id'], typeof Anchor> = { ocean: Anchor, portcontrol: Ship, ecommerce: Package, customs: FileText };

export function Logistics() {
  const { t, tx } = useI18n();
  const [activeId, setActiveId] = useState<LogisticsService['id']>('ocean');
  const active = logisticsServices.find((s) => s.id === activeId) ?? logisticsServices[0];

  return (
    <section id="logistics" className="relative scroll-mt-20 border-t border-line bg-ink-900 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('log.eyebrow')}
          title={
            <>
              {t('log.title1')}
              <br />
              <span className="text-muted">{t('log.title2')}</span>
            </>
          }
          body={t('log.body')}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <ul className="flex flex-col gap-2" role="tablist">
              {logisticsServices.map((service) => {
                const Icon = icons[service.id];
                const selected = service.id === activeId;
                return (
                  <li key={service.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(service.id)}
                      onMouseEnter={() => setActiveId(service.id)}
                      className={cn(
                        'flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-300',
                        selected ? 'border-atlantic/50 bg-ink-950 text-paper' : 'border-line bg-transparent text-muted hover:border-paper/30 hover:text-paper',
                      )}
                    >
                      <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors', selected ? 'border-atlantic/50 text-atlantic' : 'border-line text-faint')}>
                        <Icon width={17} height={17} />
                      </span>
                      <span>
                        <span className="block text-fluid-base font-medium">{tx(service.title)}</span>
                        <span className="mt-1 block text-fluid-xs text-faint">{tx(service.lead)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-line bg-ink-950 p-8 lg:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--c-atlantic)/0.18),transparent_65%)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex-1"
                >
                  <p className="eyebrow">{tx(active.corridors)}</p>
                  <h3 className="display mt-6 text-fluid-2xl">{tx(active.title)}</h3>
                  <p className="mt-6 max-w-2xl text-pretty text-fluid-lg text-muted">{tx(active.body)}</p>
                  <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                    {active.scope.map((item) => (
                      <li key={item.en} className="flex items-center gap-3 text-fluid-sm text-paper/85">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-atlantic/40 text-atlantic">
                          <Check width={12} height={12} />
                        </span>
                        {tx(item)}
                      </li>
                    ))}
                  </ul>
                  {active.id === 'portcontrol' && (
                    <div className="mt-10 border-t border-line pt-6">
                      <p className="eyebrow mb-4">Survey partners</p>
                      <ul className="flex flex-wrap gap-2">
                        {surveyors.map((s) => (
                          <li key={s.id} className="rounded-full border border-line px-3.5 py-1.5 font-display text-fluid-sm font-semibold tracking-tight text-paper/85">
                            {s.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-fluid-xs text-faint">{t('log.apiNote')}</p>
                <Button to="/api" size="sm" variant="outline" icon={<ArrowUpRight width={15} height={15} />} magnetic={false}>
                  {t('log.apiCta')}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
