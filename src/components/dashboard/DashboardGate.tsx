import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogoMark } from '../icons/Logo';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Alert, ArrowRight } from '../icons/UiIcons';
import { company } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';

export const DEMO_CREDENTIALS = {
  email: 'demo@catlanticpartners.com',
  password: 'catlantic-2026',
} as const;

interface DashboardGateProps {
  onAuthenticated: () => void;
}

export function DashboardGate({ onAuthenticated }: DashboardGateProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    setPending(true);
    setError(null);
    window.setTimeout(() => {
      const ok = email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
      setPending(false);
      if (ok) onAuthenticated();
      else setError(t('dash.gate.denied'));
    }, 650);
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-950 px-5 py-20">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(217,119,87,0.14),transparent_70%)]" />
      <div className="absolute right-5 top-5">
        <LanguageSwitcher />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-md">
        <Link to="/" className="mb-10 flex items-center gap-3 text-paper" aria-label="Catlantic">
          <LogoMark size={36} />
          <span className="font-display text-fluid-base font-semibold tracking-tightest">CATLANTIC</span>
        </Link>

        <h1 className="display text-fluid-2xl">{t('dash.gate.title')}</h1>
        <p className="mt-3 text-pretty text-fluid-sm text-muted">{t('dash.gate.body')}</p>

        <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
          <label className="block">
            <span className="eyebrow">{t('acc.email')}</span>
            <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line bg-ink-900 px-4 text-fluid-sm text-paper placeholder:text-faint focus:border-clay" placeholder="you@company.com" required />
          </label>
          <label className="block">
            <span className="eyebrow">{t('acc.password')}</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line bg-ink-900 px-4 text-fluid-sm text-paper placeholder:text-faint focus:border-clay" placeholder="••••••••••••" required />
          </label>

          <AnimatePresence>
            {error && (
              <motion.p role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2.5 rounded-xl border border-status-critical/30 bg-status-critical/10 p-3.5 text-fluid-xs text-paper/85">
                <Alert width={16} height={16} className="mt-0.5 shrink-0 text-status-critical" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button type="submit" size="lg" className="w-full" icon={<ArrowRight />} disabled={pending} magnetic={false}>
            {pending ? t('acc.checking') : t('acc.signIn')}
          </Button>
        </form>

        <div className="mt-8 rounded-xl border border-line bg-ink-900/60 p-4 font-mono text-fluid-xs text-muted">
          <div className="eyebrow mb-2">{t('dash.gate.demo')}</div>
          <div>
            {DEMO_CREDENTIALS.email}
            <span className="mx-2 text-faint">/</span>
            {DEMO_CREDENTIALS.password}
          </div>
        </div>

        <p className="mt-6 text-fluid-xs">
          <Link to="/access" className="text-clay hover:text-clay-soft">
            {t('dash.gate.gateway')} →
          </Link>
        </p>

        <p className="mt-8 font-mono text-[0.66rem] leading-relaxed text-faint">
          {company.name}. {t('dash.demo')}
        </p>
      </motion.div>
    </div>
  );
}
