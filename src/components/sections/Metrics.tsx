import { motion } from 'framer-motion';
import { Stagger } from '../ui/Reveal';
import { staggerItem } from '../../lib/motion';
import { Counter } from '../ui/Counter';
import { metrics } from '../../data/metrics';
import { useI18n } from '../../i18n/useI18n';

export function Metrics() {
  const { t } = useI18n();
  return (
    <section className="relative border-t border-line bg-ink-900 py-20 lg:py-28">
      <div className="shell">
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div key={metric.id} variants={staggerItem} className="bg-ink-950 p-8 lg:p-10">
              <div className="display text-fluid-3xl leading-none">
                <Counter value={metric.value} decimals={metric.decimals} suffix={metric.suffix} />
              </div>
              <div className="mt-6 text-fluid-base font-medium text-paper">{t(metric.labelKey)}</div>
              <p className="mt-2 text-pretty text-fluid-xs text-faint">{t(metric.captionKey)}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
