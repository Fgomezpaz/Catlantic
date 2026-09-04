import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { ArrowRight, Lock } from '../icons/UiIcons';
import { company } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';

export function CallToAction() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-ink-950 py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(217,119,87,0.16),transparent_70%)]" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow mb-6">{t('cta.eyebrow')}</p>
          <h2 className="display text-balance text-fluid-3xl">
            {t('cta.title1')}
            <br />
            <span className="text-muted">{t('cta.title2')}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="text-pretty text-fluid-base text-muted">{t('cta.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${company.emails.trade}`} size="lg" icon={<ArrowRight />}>
              {company.emails.trade}
            </Button>
            <Button to="/access" size="lg" variant="outline" icon={<Lock />}>
              {t('nav.access')}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
