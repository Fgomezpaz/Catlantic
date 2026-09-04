import { LogoMark } from '../icons/Logo';
import { useI18n } from '../../i18n/useI18n';

export default function RouteFallback() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950" role="status" aria-live="polite">
      <div className="flex items-center gap-4 text-paper">
        <LogoMark size={28} className="animate-breathe" />
        <span className="eyebrow">{t('loading')}</span>
      </div>
    </div>
  );
}
