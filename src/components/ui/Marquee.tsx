import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speedSeconds?: number;
  reverse?: boolean;
}

/** Infinite horizontal band; content is duplicated so the loop is seamless. */
export function Marquee({ children, className, speedSeconds = 48, reverse = false }: MarqueeProps) {
  return (
    <div className={cn('mask-fade-x relative overflow-hidden', className)} role="presentation">
      <div
        className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none"
        style={{ animationDuration: `${speedSeconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
