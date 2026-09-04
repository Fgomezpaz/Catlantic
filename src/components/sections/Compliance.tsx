import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal, Stagger } from '../ui/Reveal';
import { staggerItem } from '../../lib/motion';
import { Marquee } from '../ui/Marquee';
import { certifications } from '../../data/compliance';
import { Check } from '../icons/UiIcons';
import { useI18n } from '../../i18n/useI18n';

const featured = certifications.filter((c) => c.id === 'kosher' || c.id === 'halal' || c.id === 'organic');
const rest = certifications.filter((c) => !featured.includes(c));

export function Compliance() {
  const { t, tx } = useI18n();

  return (
    <section id="compliance" className="relative scroll-mt-20 border-t border-line bg-ink-900 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('comp.eyebrow')}
          title={
            <>
              {t('comp.title1')}
              <br />
              <span className="text-muted">{t('comp.title2')}</span>
            </>
          }
          body={t('comp.body')}
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {featured.map((cert, i) => (
            <motion.article key={cert.id} variants={staggerItem} className="relative bg-ink-950 p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-fluid-xs text-faint">0{i + 1}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-atlantic/40 text-atlantic">
                  <Check width={16} height={16} />
                </span>
              </div>
              <h3 className="display mt-10 text-fluid-2xl">{tx(cert.label)}</h3>
              <p className="mt-2 font-mono text-fluid-xs uppercase tracking-wider text-faint">{tx(cert.authority)}</p>
              <p className="mt-6 text-pretty text-fluid-sm text-muted">{tx(cert.scope)}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {cert.markets.map((m) => (
                  <li key={m} className="rounded-full border border-line px-3 py-1 font-mono text-fluid-xs text-muted">{m}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
            {rest.map((cert) => (
              <div key={cert.id} className="bg-ink-950 p-6">
                <h4 className="text-fluid-sm font-medium text-paper">{tx(cert.label)}</h4>
                <p className="mt-1 font-mono text-fluid-xs text-faint">{tx(cert.authority)}</p>
                <p className="mt-4 text-pretty text-fluid-xs text-muted">{tx(cert.scope)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-20 border-y border-line py-6">
        <Marquee speedSeconds={60}>
          {[...certifications, ...certifications].map((cert, i) => (
            <span key={`${cert.id}-${i}`} className="mx-8 flex items-center gap-4 whitespace-nowrap">
              <span className="display text-fluid-lg">{tx(cert.label)}</span>
              <span className="h-1 w-1 rounded-full bg-atlantic" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
