import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseMagneticOptions {
  strength?: number;
  enabled?: boolean;
}

/**
 * Pulls an element a few pixels toward the cursor while hovered.
 * Pointer-only: touch devices and reduced-motion users get a static element.
 */
export function useMagnetic<T extends HTMLElement>({ strength = 0.3, enabled = true }: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const active = enabled && !reduced;

  const onMouseMove = useCallback(
    (event: MouseEvent<T>) => {
      if (!active || !ref.current) return;
      if (window.matchMedia('(hover: none)').matches) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      setOffset({ x, y });
    },
    [active, strength],
  );

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const style: CSSProperties = active
    ? { transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)` }
    : {};

  return { ref, style, handlers: { onMouseMove, onMouseLeave } };
}
