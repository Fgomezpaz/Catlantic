import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FieldControl, type FieldValue } from './FieldControl';
import { Button } from '../ui/Button';
import { APPLICATION_ENDPOINT, type Field, type Profile } from '../../data/onboarding';
import { company } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';
import { ArrowRight, Check } from '../icons/UiIcons';
import { cn } from '../../lib/cn';

type Values = Record<string, FieldValue>;
type ErrorCode = 'required' | 'email' | 'number';
type Errors = Record<string, ErrorCode | ''>;
type Phase = 'form' | 'review' | 'submitting' | 'done' | 'failed';

interface ApplicationWizardProps {
  profile: Profile;
  onBack: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errorKey: Record<ErrorCode, MessageKey> = { required: 'acc.required', email: 'acc.invalidEmail', number: 'acc.invalidNumber' };

function makeReference(profileId: string): string {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CTL-${profileId.slice(0, 3).toUpperCase()}-${stamp}-${rand}`;
}

export function ApplicationWizard({ profile, onBack }: ApplicationWizardProps) {
  const { t, tx, locale } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>('form');
  const [declarations, setDeclarations] = useState({ accuracy: false, kyc: false, terms: false });
  const [showSummary, setShowSummary] = useState(true);
  const [reference] = useState(() => makeReference(profile.id));

  const steps = profile.steps;
  const step = steps[stepIndex];
  const total = steps.length + 1;

  const validate = (fields: Field[]): Errors => {
    const next: Errors = {};
    for (const f of fields) {
      const v = values[f.id];
      const empty =
        v === undefined || v === '' || v === false || (Array.isArray(v) && v.length === 0);
      if (f.required && empty) {
        next[f.id] = 'required';
        continue;
      }
      if (empty) continue;
      if (f.type === 'email' && typeof v === 'string' && !EMAIL_RE.test(v)) next[f.id] = 'email';
      if (f.type === 'number' && typeof v === 'string' && Number.isNaN(Number(v))) next[f.id] = 'number';
    }
    return next;
  };

  const goNext = (): void => {
    const next = validate(step.fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = (): void => {
    if (phase === 'review') {
      setPhase('form');
      return;
    }
    if (stepIndex === 0) onBack();
    else setStepIndex((i) => i - 1);
  };

  const summary = useMemo(() => {
    const rows: Array<{ step: string; label: string; value: string }> = [];
    for (const s of steps) {
      for (const f of s.fields) {
        const v = values[f.id];
        let text = '—';
        if (Array.isArray(v)) {
          text = v.length
            ? v.map((item) => (item instanceof File ? item.name : f.options?.find((o) => o.value === item)?.label[locale] ?? item)).join(', ')
            : '—';
        } else if (typeof v === 'boolean') text = v ? '✓' : '—';
        else if (typeof v === 'string' && v) text = f.options ? (f.options.find((o) => o.value === v)?.label[locale] ?? v) : v;
        rows.push({ step: tx(s.title), label: tx(f.label), value: text });
      }
    }
    return rows;
  }, [steps, values, locale, tx]);

  const payloadText = useMemo(
    () =>
      [
        `Catlantic onboarding application · ${reference}`,
        `Profile: ${t(profile.titleKey)} (${profile.side})`,
        `Language: ${locale}`,
        '',
        ...summary.map((r) => `[${r.step}] ${r.label}: ${r.value}`),
      ].join('\n'),
    [reference, profile, locale, summary, t],
  );

  const submit = async (): Promise<void> => {
    setPhase('submitting');
    const body: Record<string, string> = {
      _subject: `Onboarding application ${reference} · ${t(profile.titleKey)}`,
      reference,
      profile: profile.id,
      side: profile.side,
      language: locale,
    };
    for (const r of summary) body[`${r.step} · ${r.label}`] = r.value;
    try {
      const res = await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(String(res.status));
      setPhase('done');
    } catch {
      setPhase('failed');
    }
  };

  const mailto = `mailto:${company.emails.onboarding}?subject=${encodeURIComponent(`Onboarding application ${reference}`)}&body=${encodeURIComponent(payloadText.slice(0, 1800))}`;

  if (phase === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-line bg-ink-900 p-8 lg:p-12">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-status-good/40 text-status-good">
          <Check width={20} height={20} />
        </span>
        <h2 className="display mt-8 text-fluid-2xl">{t('acc.success.title')}</h2>
        <p className="mt-4 max-w-2xl text-pretty text-fluid-base text-muted">{t('acc.success.body', { ref: reference })}</p>
        <p className="mt-6 font-mono text-fluid-sm text-paper">{reference}</p>
        <div className="mt-10">
          <Button to="/" size="lg" variant="outline" magnetic={false}>
            {t('acc.success.home')}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="font-mono text-fluid-xs uppercase tracking-wider text-faint">
          {t('acc.stepOf', { current: phase === 'form' ? stepIndex + 1 : total, total })}
        </div>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-500',
                (phase === 'form' ? i <= stepIndex : true) ? 'bg-atlantic' : 'bg-ink-700',
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'form' ? (
          <motion.div key={step.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="display text-fluid-xl">{tx(step.title)}</h2>
            {step.intro && <p className="mt-3 max-w-2xl text-pretty text-fluid-sm text-muted">{tx(step.intro)}</p>}
            {step.id === 'documents' && <p className="mt-3 max-w-2xl text-fluid-xs text-faint">{t('acc.docsNote')}</p>}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {step.fields.map((f) => (
                <FieldControl
                  key={f.id}
                  field={f}
                  value={values[f.id]}
                  error={errors[f.id] ? t(errorKey[errors[f.id] as ErrorCode]) : undefined}
                  onChange={(v) => {
                    setValues((prev) => ({ ...prev, [f.id]: v }));
                    if (errors[f.id]) setErrors((prev) => ({ ...prev, [f.id]: '' }));
                  }}
                />
              ))}
            </div>

            {Object.values(errors).some(Boolean) && (
              <p className="mt-6 text-fluid-xs text-status-critical" role="alert">
                {t('acc.fixErrors')}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="review" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
            <h2 className="display text-fluid-xl">{t('acc.reviewTitle')}</h2>
            <p className="mt-3 max-w-2xl text-fluid-sm text-muted">{t('acc.reviewBody')}</p>

            <button type="button" onClick={() => setShowSummary((v) => !v)} className="mt-6 font-mono text-fluid-xs text-atlantic hover:text-atlantic-soft">
              {showSummary ? t('acc.summaryHide') : t('acc.summaryShow')}
            </button>
            {showSummary && (
              <div className="mt-4 max-h-[26rem] overflow-y-auto rounded-2xl border border-line bg-ink-950">
                <table className="w-full border-collapse text-left text-fluid-xs">
                  <tbody>
                    {summary.map((r, i) => (
                      <tr key={`${r.label}-${i}`} className="border-b border-line last:border-b-0">
                        <td className="w-1/3 px-4 py-2.5 align-top text-faint">
                          <span className="block font-mono text-[0.62rem] uppercase tracking-wider">{r.step}</span>
                          {r.label}
                        </td>
                        <td className="px-4 py-2.5 align-top text-paper/85">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-8 space-y-4">
              {(['accuracy', 'kyc', 'terms'] as const).map((k) => (
                <label key={k} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-ink-900 p-4 text-fluid-sm text-paper/85">
                  <input type="checkbox" checked={declarations[k]} onChange={(e) => setDeclarations((d) => ({ ...d, [k]: e.target.checked }))} className="mt-1 h-4 w-4 shrink-0 accent-atlantic" />
                  <span>{t(`acc.decl.${k}`, { company: company.name })}</span>
                </label>
              ))}
            </div>

            {phase === 'failed' && (
              <div className="mt-8 rounded-xl border border-status-critical/30 bg-status-critical/10 p-5">
                <p className="text-fluid-sm font-medium text-paper">{t('acc.fail.title')}</p>
                <p className="mt-2 text-fluid-xs text-muted">{t('acc.fail.body')}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href={mailto} size="sm" magnetic={false}>
                    {t('acc.fail.mail')}
                  </Button>
                  <Button type="button" size="sm" variant="outline" magnetic={false} onClick={() => setPhase('review')}>
                    {t('acc.retry')}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={goPrev} className="text-fluid-sm text-muted transition-colors hover:text-paper">
          ← {t('acc.prev')}
        </button>
        {phase === 'form' ? (
          <Button type="button" size="lg" icon={<ArrowRight />} onClick={goNext} magnetic={false}>
            {t('acc.next')}
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            icon={<ArrowRight />}
            onClick={() => void submit()}
            disabled={phase === 'submitting' || !declarations.accuracy || !declarations.kyc || !declarations.terms}
            magnetic={false}
            className="disabled:cursor-not-allowed disabled:opacity-40"
          >
            {phase === 'submitting' ? t('acc.submitting') : t('acc.submit')}
          </Button>
        )}
      </div>

      <p className="mt-6 font-mono text-[0.66rem] leading-relaxed text-faint">
        {company.name} ·{' '}
        <Link to="/" className="hover:text-paper">
          catlanticpartners.com
        </Link>
      </p>
    </div>
  );
}
