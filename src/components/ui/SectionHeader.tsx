import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  aside?: ReactNode;
}

export function SectionHeader({ eyebrow, title, body, align = 'left', className, aside }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'grid gap-8 lg:grid-cols-12 lg:items-end',
        align === 'center' && 'text-center lg:grid-cols-1',
        className,
      )}
    >
      <Reveal className={cn(align === 'left' ? 'lg:col-span-8' : 'mx-auto max-w-3xl')}>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="display text-balance text-fluid-2xl">{title}</h2>
        {body && <p className="mt-6 max-w-2xl text-pretty text-fluid-lg text-muted">{body}</p>}
      </Reveal>
      {aside && (
        <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
