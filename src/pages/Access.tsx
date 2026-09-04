import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { LogoMark } from '../components/icons/Logo';
import { Button } from '../components/ui/Button';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { ApplicationWizard } from '../components/access/ApplicationWizard';
import { Alert, ArrowRight, Lock } from '../components/icons/UiIcons';
import { profiles, type ProfileId, type Side } from '../data/onboarding';
import { company } from '../data/site';
import { useI18n } from '../i18n/useI18n';
import { cn } from '../lib/cn';

type Stage = 'choose' | 'signin' | 'profile' | 'apply';

function isSide(v: string | null): v is Side {
  return v === 'client' || v === 'supplier';
}
function isProfile(v: string | null): v is ProfileId {
  return profiles.some((p) => p.id === v);
}

export default function Access() {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const [side, setSide] = useState<Side | null>(isSide(params.get('side')) ? (params.get('side') as Side) : null);
  const [profileId, setProfileId] = useState<ProfileId | null>(isProfile(params.get('profile')) ? (params.get('profile') as ProfileId) : null);
  const [stage, setStage] = useState<Stage>(() => (profileId ? 'apply' : side ? 'signin' : 'choose'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  const signIn = (e: FormEvent): void => {
    e.preventDefault();
    setPending(true);
    setDenied(false);
    window.setTimeout(() => {
      setPending(false);
      setDenied(true);
    }, 700);
  };

  const profile = profiles.find((p) => p.id === profileId) ?? null;
  const sideProfiles = profiles.filter((p) => p.side === side);

  return (
    <div className="relative min-h-screen bg-ink-950">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgb(var(--c-atlantic)/0.12),transparent_70%)]" />

      <header className="shell relative flex h-[4.5rem] items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-paper" aria-label="Catlantic">
          <LogoMark size={34} />
          <span className="font-display text-fluid-base font-semibold tracking-tightest">CATLANTIC</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/" className="hidden text-fluid-sm text-muted hover:text-paper sm:inline">
            {t('nav.home')}
          </Link>
        </div>
      </header>

      <main className="shell relative pb-24 pt-10 lg:pt-16">
        <div className={cn('mx-auto', stage === 'apply' ? 'max-w-4xl' : 'max-w-3xl')}>
          <p className="eyebrow mb-4">{t('acc.eyebrow')}</p>

          <AnimatePresence mode="wait">
            {stage === 'choose' && (
              <motion.section key="choose" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <h1 className="display text-fluid-2xl">{t('acc.title')}</h1>
                <p className="mt-4 max-w-2xl text-pretty text-fluid-base text-muted">{t('acc.body')}</p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {(['client', 'supplier'] as Side[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSide(s);
                        setStage('signin');
                      }}
                      className="group flex min-h-[14rem] flex-col justify-between rounded-3xl border border-line bg-ink-900 p-7 text-left transition-colors hover:border-atlantic/50 hover:bg-ink-850"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-faint transition-colors group-hover:border-atlantic/50 group-hover:text-atlantic">
                        <Lock width={17} height={17} />
                      </span>
                      <span>
                        <span className="display block text-fluid-xl">{t(s === 'client' ? 'acc.client' : 'acc.supplier')}</span>
                        <span className="mt-2 block text-pretty text-fluid-sm text-muted">{t(s === 'client' ? 'acc.clientBody' : 'acc.supplierBody')}</span>
                        <span className="mt-5 inline-flex items-center gap-2 font-mono text-fluid-xs uppercase tracking-wider text-atlantic">
                          {t('acc.continue')} <ArrowRight width={14} height={14} />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-10 max-w-2xl border-l-2 border-atlantic/40 pl-4 font-mono text-fluid-xs leading-relaxed text-faint">{t('acc.standard')}</p>
              </motion.section>
            )}

            {stage === 'signin' && side && (
              <motion.section key="signin" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <h1 className="display text-fluid-2xl">{t(side === 'client' ? 'acc.client' : 'acc.supplier')}</h1>
                <p className="mt-3 text-fluid-sm text-muted">{t('acc.signInBody')}</p>

                <form onSubmit={signIn} noValidate className="mt-8 max-w-md space-y-5">
                  <label className="block">
                    <span className="eyebrow">{t('acc.email')}</span>
                    <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line bg-ink-900 px-4 text-fluid-sm text-paper placeholder:text-faint focus:border-atlantic" placeholder="you@company.com" required />
                  </label>
                  <label className="block">
                    <span className="eyebrow">{t('acc.password')}</span>
                    <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line bg-ink-900 px-4 text-fluid-sm text-paper placeholder:text-faint focus:border-atlantic" placeholder="••••••••••••" required />
                  </label>

                  <AnimatePresence>
                    {denied && (
                      <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-status-critical/30 bg-status-critical/10 p-4">
                        <p className="flex items-center gap-2 text-fluid-sm font-medium text-paper">
                          <Alert width={16} height={16} className="shrink-0 text-status-critical" />
                          {t('acc.notRegistered')}
                        </p>
                        <p className="mt-2 text-fluid-xs text-muted">{t('acc.notRegisteredBody')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" size="lg" icon={<ArrowRight />} disabled={pending} magnetic={false} className="sm:flex-1">
                      {pending ? t('acc.checking') : t('acc.signIn')}
                    </Button>
                    <Button type="button" size="lg" variant={denied ? 'primary' : 'outline'} magnetic={false} onClick={() => setStage('profile')} className="sm:flex-1">
                      {t('acc.register')}
                    </Button>
                  </div>
                </form>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-fluid-xs">
                  <button type="button" onClick={() => setStage('choose')} className="text-muted hover:text-paper">
                    ← {t('acc.back')}
                  </button>
                  {side === 'client' && (
                    <Link to="/dashboard" className="text-atlantic hover:text-atlantic-soft">
                      {t('acc.previewDashboard')} →
                    </Link>
                  )}
                </div>
              </motion.section>
            )}

            {stage === 'profile' && side && (
              <motion.section key="profile" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <h1 className="display text-fluid-2xl">{t('acc.chooseProfile')}</h1>
                <p className="mt-3 max-w-2xl text-fluid-sm text-muted">{t('acc.chooseProfileBody')}</p>

                <div className="mt-8 grid gap-4">
                  {sideProfiles.map((p) => {
                    const selected = profileId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setProfileId(p.id)}
                        aria-pressed={selected}
                        className={cn(
                          'grid gap-4 rounded-2xl border p-6 text-left transition-colors lg:grid-cols-12',
                          selected ? 'border-atlantic/60 bg-ink-900' : 'border-line bg-ink-900/40 hover:border-paper/30',
                        )}
                      >
                        <div className="lg:col-span-5">
                          <span className="display block text-fluid-lg">{t(p.titleKey)}</span>
                          <span className="mt-2 block text-pretty text-fluid-sm text-muted">{t(p.bodyKey)}</span>
                        </div>
                        <div className="lg:col-span-7">
                          <span className="eyebrow block">{t('acc.requirements')}</span>
                          <span className="mt-2 block text-fluid-xs leading-relaxed text-paper/75">{t(p.reqKey)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={() => setStage('signin')} className="text-fluid-sm text-muted hover:text-paper">
                    ← {t('acc.back')}
                  </button>
                  <Button type="button" size="lg" icon={<ArrowRight />} disabled={!profileId} magnetic={false} onClick={() => setStage('apply')} className="disabled:cursor-not-allowed disabled:opacity-40">
                    {t('acc.startApplication')}
                  </Button>
                </div>
              </motion.section>
            )}

            {stage === 'apply' && profile && (
              <motion.section key="apply" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <h1 className="display text-fluid-2xl">{t(profile.titleKey)}</h1>
                <p className="mt-2 mb-10 text-fluid-sm text-muted">{t(profile.bodyKey)}</p>
                <ApplicationWizard profile={profile} onBack={() => setStage('profile')} />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="shell relative border-t border-line py-6 font-mono text-[0.66rem] text-faint">
        © {new Date().getFullYear()} {company.name} · {company.address.line1}, {company.address.city}, {company.address.region} {company.address.postal}, {company.address.country}
      </footer>
    </div>
  );
}
