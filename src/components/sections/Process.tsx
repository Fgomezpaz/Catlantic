import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processStages } from '../../data/compliance';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useI18n } from '../../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

/**
 * Layout classes applied only while the pinned horizontal scroll is active.
 * Kept as literal strings so Tailwind's scanner includes them in the build.
 */
const TRACK_HORIZONTAL = ['h-[calc(100svh-15rem)]', 'flex-row', 'items-stretch'];
const PANEL_HORIZONTAL = ['w-[min(62vw,58rem)]', 'shrink-0', 'border-r', 'border-t-0', 'py-16'];

/**
 * Pinned horizontal scroll on pointer devices at desktop widths; a plain
 * vertical stack everywhere else (touch, narrow viewports, reduced motion),
 * where pinning fights the browser.
 */
export function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t, tx } = useI18n();

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (hover: hover)', () => {
      const trackEl = track.current;
      const sectionEl = section.current;
      if (!trackEl || !sectionEl) return;

      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', trackEl);
      trackEl.classList.add(...TRACK_HORIZONTAL);
      panels.forEach((p) => p.classList.add(...PANEL_HORIZONTAL));

      const distance = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll('[data-panel-copy]'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      return () => {
        trackEl.classList.remove(...TRACK_HORIZONTAL);
        panels.forEach((p) => p.classList.remove(...PANEL_HORIZONTAL));
        gsap.set(trackEl, { clearProps: 'x' });
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="process" ref={section} className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink-950">
      <div className="shell flex items-end justify-between pb-6 pt-24 lg:pt-28">
        <div>
          <p className="eyebrow mb-5">{t('proc.eyebrow')}</p>
          <h2 className="display text-fluid-2xl">
            {t('proc.title1')}
            <br />
            <span className="text-muted">{t('proc.title2')}</span>
          </h2>
        </div>
        <div className="hidden w-48 lg:block">
          <div className="h-px w-full bg-line">
            <div ref={progress} className="h-px w-full origin-left bg-clay" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>

      <div ref={track} className="flex flex-col">
        {processStages.map((stage, i) => (
          <article
            key={stage.id}
            data-panel
            className="relative flex flex-col justify-between border-t border-line px-[var(--shell-x)] py-14"
          >
            <span data-panel-copy className="font-mono text-fluid-xs text-faint">
              {stage.index} / 0{processStages.length}
            </span>
            <div className="mt-12 max-w-xl">
              <h3 data-panel-copy className="display text-fluid-2xl">
                {tx(stage.title)}
              </h3>
              <p data-panel-copy className="mt-6 text-pretty text-fluid-lg text-muted">
                {tx(stage.body)}
              </p>
              <ul data-panel-copy className="mt-10 space-y-3">
                {stage.markers.map((m) => (
                  <li key={m.en} className="flex items-center gap-3 text-fluid-sm text-paper/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {tx(m)}
                  </li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 right-[var(--shell-x)] select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none tracking-tightest text-paper/[0.035] lg:-bottom-10"
            >
              {i + 1}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
