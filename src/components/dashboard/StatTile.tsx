import { Counter } from '../ui/Counter';
import { cn } from '../../lib/cn';

type Tone = 'neutral' | 'good' | 'warn';

interface StatTileProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  delta: string;
  tone?: Tone;
}

const toneClass: Record<Tone, string> = {
  neutral: 'text-muted',
  good: 'text-status-good',
  warn: 'text-status-warn',
};

export function StatTile({ label, value, suffix = '', decimals = 0, delta, tone = 'neutral' }: StatTileProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink-900 p-6">
      <div className="eyebrow">{label}</div>
      <div className="mt-6">
        <div className="display whitespace-nowrap text-fluid-2xl leading-none">
          <Counter value={value} decimals={decimals} />
          {suffix && <span className="ml-1 text-fluid-base font-medium text-muted">{suffix.trim()}</span>}
        </div>
        <div className={cn('mt-3 font-mono text-fluid-xs', toneClass[tone])}>{delta}</div>
      </div>
    </div>
  );
}
