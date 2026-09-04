import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal, Stagger } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { staggerItem } from '../../lib/motion';
import { partnerCategories, soloTraderPoints } from '../../data/services';
import { surveyors } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';
import { ArrowRight, Check } from '../icons/UiIcons';

export function Partners() {
  const { t, tx } = useI18n();

  return (
    <section id="partners" className="relative scroll-mt-20 border-t border-line bg-ink-950 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('part.eyebrow')}
          title={
            <>
              {t('part.title1')}
              <br />
              <span className="text-muted">{t('part.title2')}</span>
            </>
          }
          body={t('part.body')}
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
          {partnerCategories.map((cat) => (
            <motion.article key={cat.id} variants={staggerItem} className="flex min-h-[16rem] flex-col bg-ink-950 p-7 transition-colors hover:bg-ink-900">
              <div className="flex items-start justify-between">
                <h3 className="text-fluid-base font-medium text-paper">{tx(cat.title)}</h3>
                <span className="display text-fluid-xl text-atlantic">{cat.count}</span>
              </div>
              <p className="mt-4 text-pretty text-fluid-sm text-muted">{tx(cat.body)}</p>
              <p className="mt-auto pt-6 font-mono text-fluid-xs text-faint">
                <span className="uppercase tracking-wider">{t('part.coverage')}</span> · {tx(cat.coverage)}
              </p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-ink-900 px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-mono text-fluid-xs uppercase tracking-wider text-faint">Independent surveyors we appoint</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {surveyors.map((s) => (
              <li key={s.id} className="font-display text-fluid-lg font-semibold tracking-tight text-paper/80">
                {s.name}
              </li>
            ))}
          </ul>
        </Reveal>

        <div id="independent" className="mt-24 grid gap-10 rounded-3xl border border-atlantic/25 bg-[radial-gradient(ellipse_70%_100%_at_100%_0%,rgb(var(--c-atlantic)/0.14),transparent_60%)] p-8 lg:grid-cols-12 lg:p-14">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">{t('solo.eyebrow')}</p>
            <h3 className="display text-fluid-2xl">
              {t('solo.title1')}
              <br />
              <span className="text-muted">{t('solo.title2')}</span>
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-fluid-lg text-muted">{t('solo.body')}</p>
            <div className="mt-8">
              <Button to="/access?side=client&profile=solo" size="lg" icon={<ArrowRight />}>
                {t('solo.cta')}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6">
            <ul className="grid gap-3">
              {soloTraderPoints.map((p) => (
                <li key={p.en} className="flex items-start gap-3 rounded-xl border border-line bg-ink-950/70 p-4 text-fluid-sm text-paper/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-atlantic/40 text-atlantic">
                    <Check width={12} height={12} />
                  </span>
                  {tx(p)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
