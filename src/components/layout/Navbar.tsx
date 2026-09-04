import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogoLockup } from '../icons/Logo';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Close, Lock, Menu } from '../icons/UiIcons';
import { navigation } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../lib/cn';

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'shell flex h-[4.5rem] items-center justify-between transition-[background-color] duration-500',
          scrolled ? 'bg-ink-950/75' : 'bg-transparent',
        )}
        style={{ backdropFilter: scrolled ? 'blur(18px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none' }}
      >
        <Link to="/" aria-label="Catlantic" className="relative z-10">
          <LogoLockup size={34} />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative whitespace-nowrap text-fluid-sm font-medium text-paper/70 transition-colors hover:text-paper"
            >
              {t(item.labelKey)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-atlantic transition-all duration-300 ease-swift group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle className="hidden sm:grid" />
          <LanguageSwitcher />
          <Button to="/access" size="sm" variant="outline" icon={<Lock width={15} height={15} />} className="hidden sm:inline-flex">
            {t('nav.accessShort')}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-line text-paper xl:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={cn('shell pointer-events-none h-px transition-opacity duration-500', scrolled ? 'opacity-100' : 'opacity-0')}>
        <div className="h-px w-full bg-line" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[-1] flex flex-col overflow-y-auto bg-ink-950/95 pt-[4.5rem] backdrop-blur-2xl xl:hidden"
          >
            <nav className="shell flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Mobile">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="display border-b border-line py-4 text-fluid-xl font-medium"
                >
                  {t(item.labelKey)}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-3 pt-8">
                <Button to="/access" size="lg" icon={<Lock />} className="flex-1">
                  {t('nav.access')}
                </Button>
                <ThemeToggle className="h-[3.25rem] w-[3.25rem] sm:hidden" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
