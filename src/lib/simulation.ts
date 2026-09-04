/**
 * Deterministic drift used to make a fully static site read as live.
 * Every value is derived from a seed plus the current minute bucket, so the
 * board moves while the page is open and any two visitors in the same minute
 * see the same numbers. No network, no backend.
 */

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** Smooth pseudo-noise in [-1, 1] for a seed at a continuous time position. */
export function drift(seed: string, tick: number): number {
  const a = hash(`${seed}:${Math.floor(tick)}`);
  const b = hash(`${seed}:${Math.floor(tick) + 1}`);
  const f = tick - Math.floor(tick);
  const smooth = f * f * (3 - 2 * f);
  return (a + (b - a) * smooth) * 2 - 1;
}

/** Number of 20-second buckets since epoch — the clock the board ticks on. */
export function currentTick(now = Date.now()): number {
  return now / 20000;
}

export function driftPrice(seed: string, base: number, volatility: number, tick: number): number {
  const slow = drift(seed, tick / 12) * 0.7;
  const fast = drift(`${seed}:f`, tick) * 0.3;
  return base * (1 + (slow + fast) * volatility);
}

export function driftPct(seed: string, base: number, tick: number): number {
  return base + drift(`${seed}:pct`, tick / 8) * 0.85;
}
