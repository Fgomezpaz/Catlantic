import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Stagger } from '../ui/Reveal';
import { staggerItem } from '../../lib/motion';
import { commodities, commodityFamilies } from '../../data/commodities';
import { commodityGlyphs, type CommodityGlyphId } from '../icons/glyphMap';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';
import { cn } from '../../lib/cn';
import type { CommodityFamily } from '../../types';

type Filter = CommodityFamily | 'all';

const familyKey: Record<CommodityFamily, MessageKey> = { grain: 'family.grain', organics: 'family.organics', raw: 'family.raw' };

export function Origination() {
  const { t, tx } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? commodities : commodities.filter((c) => c.family === filter);

  return (
    <section id="origination" className="relative scroll-mt-20 bg-ink-950 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('orig.eyebrow')}
          title={
            <>
              {t('orig.title1')}
              <br />
              <span className="text-muted">{t('orig.title2')}</span>
            </>
          }
          body={t('orig.body')}
          aside={
            <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist">
              {(['all', ...commodityFamilies] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-fluid-xs font-medium transition-colors duration-300',
                    filter === f ? 'border-paper bg-paper text-ink-950' : 'border-line text-muted hover:border-paper/40 hover:text-paper',
                  )}
                >
                  {f === 'all' ? t('orig.filterAll') : t(familyKey[f])}
                </button>
              ))}
            </div>
          }
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => {
              const Glyph = commodityGlyphs[item.id as CommodityGlyphId];
              return (
                <motion.article
                  key={item.id}
                  layout
                  variants={staggerItem}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex min-h-[21rem] flex-col bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900"
                >
                  <div className="flex items-start justify-between">
                    <span className="eyebrow">{t(familyKey[item.family])}</span>
                    <Glyph className="h-11 w-11 text-clay transition-transform duration-700 ease-swift group-hover:-rotate-6 group-hover:scale-110" />
                  </div>
                  <h3 className="display mt-8 text-fluid-xl">{tx(item.name)}</h3>
                  <p className="mt-3 text-pretty text-fluid-sm text-muted">{tx(item.note)}</p>
                  <div className="mt-auto pt-6">
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-fluid-xs">
                      <dt className="text-faint">{t('orig.origin')}</dt>
                      <dd className="text-paper/80">{item.origins.join(' · ')}</dd>
                      <dt className="text-faint">{t('orig.terms')}</dt>
                      <dd className="text-paper/80">{item.incoterms.join(' · ')}</dd>
                      <dt className="text-faint">{t('orig.packing')}</dt>
                      <dd className="text-paper/80">{tx(item.packing)}</dd>
                    </dl>
                  </div>
                  <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px scale-x-0 bg-clay transition-transform duration-500 ease-swift group-hover:scale-x-100" />
                </motion.article>
              );
            })}
          </AnimatePresence>
        </Stagger>
      </div>
    </section>
  );
}
