import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Stagger } from '../ui/Reveal';
import { staggerItem } from '../../lib/motion';
import { team } from '../../data/team';
import { ArrowUpRight } from '../icons/UiIcons';
import { useI18n } from '../../i18n/useI18n';

export function Team() {
  const { t, tx } = useI18n();
  return (
    <section id="team" className="relative scroll-mt-20 border-t border-line bg-ink-950 py-28 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow={t('team.eyebrow')}
          title={
            <>
              {t('team.title1')}
              <br />
              <span className="text-muted">{t('team.title2')}</span>
            </>
          }
          body={t('team.body')}
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <motion.article key={member.id} variants={staggerItem} className="group relative flex min-h-[22rem] flex-col bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900">
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-ink-900 font-display text-fluid-base font-semibold tracking-tightest text-paper transition-colors group-hover:border-atlantic/50">
                  {member.initials}
                </span>
                <span className="font-mono text-fluid-xs text-faint">{member.base}</span>
              </div>
              <h3 className="display mt-8 text-fluid-xl">{member.name}</h3>
              <p className="mt-1 text-fluid-sm font-medium text-atlantic">{tx(member.role)}</p>
              <p className="mt-1 font-mono text-fluid-xs text-faint">{tx(member.focus)}</p>
              <p className="mt-5 text-pretty text-fluid-sm text-muted">{tx(member.bio)}</p>
              <a href={`mailto:${member.email}`} className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-fluid-xs text-paper/80 transition-colors hover:text-atlantic">
                {member.email}
                <ArrowUpRight width={14} height={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
