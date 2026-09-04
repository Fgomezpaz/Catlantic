import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { ArrowRight, Lock } from '../icons/UiIcons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { LiveTicker } from '../sections/LiveTicker';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';

const GrainFieldCanvas = lazy(() => import('./GrainFieldCanvas').then((m) => ({ default: m.GrainFieldCanvas })));

const headlineKeys: MessageKey[] = ['hero.w1', 'hero.w2', 'hero.w3', 'hero.w4', 'hero.w5'];
const accentIndex = new Set([1, 4]);

export function Hero() {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words.current.filter(Boolean),
        { yPercent: 110, opacity: 0, rotateX: -18 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.09, ease: 'expo.out', delay: 0.25 },
      );
      gsap.fromTo(
        '[data-hero-fade]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.9 },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced, locale]);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950">
      <motion.div style={{ scale: canvasScale }} className="absolute inset-0 -z-10">
        <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
          <GrainFieldCanvas className="h-full w-full" />
        </Suspense>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pb-16">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-hero-fade className="eyebrow mb-8 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-atlantic" />
              {t('hero.eyebrow')}
            </p>
            <h1 key={locale} className="display text-fluid-3xl" style={{ perspective: '900px' }}>
              {headlineKeys.map((key, i) => (
                <span key={key} className="inline-block overflow-hidden pb-[0.08em] pr-[0.22em] align-top">
                  <span
                    ref={(el) => {
                      if (el) words.current[i] = el;
                    }}
                    className={accentIndex.has(i) ? 'inline-block text-atlantic' : 'inline-block'}
                    style={{ transformOrigin: '0% 100%' }}
                  >
                    {t(key)}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p data-hero-fade className="max-w-md text-pretty text-fluid-lg text-paper/80">
              {t('hero.body')}
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#origination" size="lg" icon={<ArrowRight />}>
                {t('hero.cta1')}
              </Button>
              <Button to="/access" size="lg" variant="outline" icon={<Lock />}>
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
        </motion.div>

        <div data-hero-fade className="mt-14 border-t border-line pt-5 lg:mt-20">
          <LiveTicker />
        </div>
      </div>
    </section>
  );
}
