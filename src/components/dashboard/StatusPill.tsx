import type { ShipmentStatus } from '../../types';
import { Alert, Anchor, Check, Clock, Ship } from '../icons/UiIcons';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';
import { cn } from '../../lib/cn';

const config: Record<ShipmentStatus, { className: string; Icon: typeof Ship; key: MessageKey }> = {
  onschedule: { className: 'text-status-good border-status-good/30 bg-status-good/10', Icon: Ship, key: 'status.onschedule' },
  atorigin: { className: 'text-muted border-line bg-ink-800', Icon: Anchor, key: 'status.atorigin' },
  customs: { className: 'text-status-warn border-status-warn/30 bg-status-warn/10', Icon: Clock, key: 'status.customs' },
  delayed: { className: 'text-status-critical border-status-critical/30 bg-status-critical/10', Icon: Alert, key: 'status.delayed' },
  delivered: { className: 'text-paper border-line bg-ink-800', Icon: Check, key: 'status.delivered' },
};

export function StatusPill({ status }: { status: ShipmentStatus }) {
  const { t } = useI18n();
  const { className, Icon, key } = config[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-wider', className)}>
      <Icon width={12} height={12} />
      {t(key)}
    </span>
  );
}
