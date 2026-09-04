import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseCountUpOptions {
  target: number;
  durationMs?: number;
  decimals?: number;
}

export function useCountUp({ target, durationMs = 1600, decimals = 0 }: UseCountUpOptions): {
  ref: React.RefObject<HTMLSpanElement>;
  value: number;
} {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const factor = 10 ** decimals;

    const step = (now: number): void => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased * factor) / factor);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [decimals, durationMs, inView, reduced, target]);

  return { ref, value };
}
