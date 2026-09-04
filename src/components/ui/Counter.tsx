import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../lib/format';

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }: CounterProps) {
  const { ref, value: current } = useCountUp({ target: value, decimals });
  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular">{formatNumber(current, decimals)}</span>
      {suffix}
    </span>
  );
}
