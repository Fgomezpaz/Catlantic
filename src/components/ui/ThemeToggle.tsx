import { useI18n } from '../../i18n/useI18n';
import { useTheme } from '../../theme/useTheme';
import type { ThemePreference } from '../../theme/types';
import { Clock, Moon, Sun } from '../icons/UiIcons';
import { cn } from '../../lib/cn';

interface ThemeToggleProps {
  className?: string;
}

/**
 * One-tap switch between dark and light. Tapping pins the choice; the
 * segmented control in the footer (ThemeControl) is where "auto" lives.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(next === 'light' ? 'theme.toLight' : 'theme.toDark')}
      title={t(next === 'light' ? 'theme.toLight' : 'theme.toDark')}
      className={cn(
        'grid h-10 w-10 place-items-center rounded-full border border-line text-paper transition-colors hover:border-paper/40',
        className,
      )}
    >
      {theme === 'dark' ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
    </button>
  );
}

const options: ReadonlyArray<{ value: ThemePreference; icon: typeof Sun }> = [
  { value: 'auto', icon: Clock },
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
];

/** Three-way appearance control: auto (follows the clock), light, dark. */
export function ThemeControl({ className }: ThemeToggleProps) {
  const { t } = useI18n();
  const { preference, setPreference } = useTheme();

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <span className="eyebrow">{t('theme.label')}</span>
      <div role="radiogroup" aria-label={t('theme.label')} className="inline-flex rounded-full border border-line p-1">
        {options.map(({ value, icon: Icon }) => {
          const active = preference === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setPreference(value)}
              className={cn(
                'flex h-8 items-center gap-1.5 rounded-full px-3 font-mono text-fluid-xs transition-colors',
                active ? 'bg-paper text-ink-950' : 'text-muted hover:text-paper',
              )}
            >
              <Icon width={13} height={13} />
              {t(`theme.${value}`)}
            </button>
          );
        })}
      </div>
      <span className="font-mono text-[0.68rem] text-faint">{t('theme.autoHint')}</span>
    </div>
  );
}
