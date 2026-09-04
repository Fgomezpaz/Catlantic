import type { Field } from '../../data/onboarding';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../lib/cn';

export type FieldValue = string | string[] | boolean | File[] | undefined;

interface FieldControlProps {
  field: Field;
  value: FieldValue;
  error?: string;
  onChange: (value: FieldValue) => void;
}

const inputClass =
  'h-12 w-full rounded-xl border bg-ink-900 px-4 text-fluid-sm text-paper placeholder:text-faint transition-colors focus:border-clay';

export function FieldControl({ field, value, error, onChange }: FieldControlProps) {
  const { t, tx } = useI18n();
  const id = `f-${field.id}`;
  const border = error ? 'border-status-critical/60' : 'border-line';

  const label = (
    <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-fluid-sm text-paper/90">
        {tx(field.label)}
        {field.required && <span className="ml-1 text-clay">*</span>}
      </span>
      {!field.required && <span className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">{t('acc.optional')}</span>}
    </label>
  );

  let control: React.ReactNode;

  switch (field.type) {
    case 'textarea':
      control = (
        <textarea
          id={id}
          rows={3}
          value={(value as string) ?? ''}
          placeholder={field.placeholder ? tx(field.placeholder) : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, 'h-auto py-3', border)}
          aria-invalid={Boolean(error)}
        />
      );
      break;

    case 'select':
      control = (
        <select id={id} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className={cn(inputClass, 'appearance-none', border)} aria-invalid={Boolean(error)}>
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {tx(o.label)}
            </option>
          ))}
        </select>
      );
      break;

    case 'multiselect': {
      const selected = (value as string[]) ?? [];
      control = (
        <div className={cn('flex flex-wrap gap-2 rounded-xl border p-2', border)} role="group" aria-labelledby={id}>
          {field.options?.map((o) => {
            const on = selected.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(on ? selected.filter((v) => v !== o.value) : [...selected, o.value])}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-fluid-xs transition-colors',
                  on ? 'border-paper bg-paper text-ink-950' : 'border-line text-muted hover:border-paper/40 hover:text-paper',
                )}
              >
                {tx(o.label)}
              </button>
            );
          })}
        </div>
      );
      break;
    }

    case 'radio':
      control = (
        <div className={cn('flex flex-wrap gap-2 rounded-xl border p-2', border)} role="radiogroup" aria-labelledby={id}>
          {field.options?.map((o) => {
            const on = value === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange(o.value)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-fluid-xs transition-colors',
                  on ? 'border-paper bg-paper text-ink-950' : 'border-line text-muted hover:border-paper/40 hover:text-paper',
                )}
              >
                {tx(o.label)}
              </button>
            );
          })}
        </div>
      );
      break;

    case 'checkbox':
      control = (
        <label className="flex cursor-pointer items-start gap-3 text-fluid-sm text-paper/85">
          <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-clay" />
          <span>{tx(field.label)}</span>
        </label>
      );
      break;

    case 'file': {
      const files = (value as File[]) ?? [];
      control = (
        <div className={cn('flex flex-col gap-2 rounded-xl border bg-ink-900 p-3', border)}>
          <input
            id={id}
            type="file"
            accept={field.accept}
            multiple={field.multiple}
            onChange={(e) => onChange(Array.from(e.target.files ?? []))}
            className="block w-full text-fluid-xs text-muted file:mr-3 file:rounded-full file:border file:border-line file:bg-transparent file:px-3 file:py-1.5 file:text-fluid-xs file:text-paper hover:file:border-paper/40"
          />
          <span className="font-mono text-[0.66rem] text-faint">
            {files.length ? t('acc.fileChosen', { count: files.length }) : t('acc.fileNone')}
            {files.length > 0 && ` · ${files.map((f) => f.name).join(', ')}`}
          </span>
        </div>
      );
      break;
    }

    default:
      control = (
        <input
          id={id}
          type={field.type}
          inputMode={field.type === 'number' ? 'decimal' : field.type === 'tel' ? 'tel' : undefined}
          min={field.min}
          value={(value as string) ?? ''}
          placeholder={field.placeholder ? tx(field.placeholder) : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, border)}
          aria-invalid={Boolean(error)}
        />
      );
  }

  return (
    <div className={cn(field.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
      {field.type !== 'checkbox' && label}
      {control}
      {field.help && !error && <p className="mt-1.5 text-fluid-xs text-faint">{tx(field.help)}</p>}
      {error && (
        <p className="mt-1.5 text-fluid-xs text-status-critical" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
