import { useEffect, useState } from 'react';
import { currentTick } from '../lib/simulation';

interface UseLiveTickOptions {
  intervalMs?: number;
  enabled?: boolean;
}

/**
 * Advances a shared clock so simulated market values re-render on a cadence.
 * Pauses while the tab is hidden so a backgrounded page costs nothing.
 */
export function useLiveTick({ intervalMs = 2400, enabled = true }: UseLiveTickOptions = {}): number {
  const [tick, setTick] = useState(() => currentTick());

  useEffect(() => {
    if (!enabled) return;

    let frame = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setTick(currentTick());
      }
    }, intervalMs);

    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') setTick(currentTick());
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(frame);
      frame = 0;
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, intervalMs]);

  return tick;
}
