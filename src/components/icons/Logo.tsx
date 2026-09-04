import { cn } from '../../lib/cn';

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Renders the ring in the current text colour so the mark works on any surface. */
  monochrome?: boolean;
}

/**
 * The Catlantic mark: an open ring (the world market) holding a grain kernel,
 * with a single point of departure at the ring's opening.
 */
export function LogoMark({ size = 32, className, monochrome = false }: LogoMarkProps) {
  const dense = size < 28;
  // Kernel colour follows the theme token (Atlantic blue), or the text colour when monochrome.
  const seedClass = monochrome ? 'fill-current' : 'fill-atlantic';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path
        d="M41.22 15.97A19 19 0 1 1 32.03 6.78"
        stroke="currentColor"
        strokeWidth={dense ? 2.8 : 2}
        strokeLinecap="round"
      />
      <g transform="rotate(-22 24 24)">
        <path d="M24 10C31.5 15 31.5 33 24 38C16.5 33 16.5 15 24 10Z" className={seedClass} />
        {!dense && (
          <path d="M24 10C31.5 15 31.5 33 24 38" className="stroke-ink-900" strokeWidth={1.6} strokeOpacity={0.9} />
        )}
      </g>
      <circle cx="42.4" cy="5.6" r={dense ? 3.6 : 3} className={seedClass} />
    </svg>
  );
}

interface LogoLockupProps {
  size?: number;
  className?: string;
  subtitle?: boolean;
}

export function LogoLockup({ size = 36, className, subtitle = true }: LogoLockupProps) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-paper', className)}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-tightest">CATLANTIC</span>
        {subtitle && (
          <span className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.34em] text-muted">
            Trade &amp; Logistics
          </span>
        )}
      </span>
    </span>
  );
}
