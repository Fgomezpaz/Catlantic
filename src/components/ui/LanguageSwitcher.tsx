import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../../i18n/useI18n';
import { localeMeta, locales } from '../../i18n/types';
import { Globe } from '../icons/UiIcons';
import { cn } from '../../lib/cn';

interface LanguageSwitcherProps {
  className?: string;
  align?: 'left' | 'right';
}

export function LanguageSwitcher({ className, align = 'right' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent): void => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-full border border-line px-3 font-mono text-fluid-xs text-paper transition-colors hover:border-paper/40"
      >
        <Globe width={15} height={15} className="text-atlantic" />
        {localeMeta[locale].short}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute top-12 z-50 min-w-[10rem] overflow-hidden rounded-xl border border-line bg-ink-900/95 p-1 shadow-2xl backdrop-blur-xl',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === code}
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-fluid-sm transition-colors',
                    locale === code ? 'bg-paper/[0.06] text-paper' : 'text-muted hover:bg-paper/[0.04] hover:text-paper',
                  )}
                >
                  {localeMeta[code].label}
                  <span className="font-mono text-fluid-xs text-faint">{localeMeta[code].short}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
