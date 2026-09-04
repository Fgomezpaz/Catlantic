import { Link } from 'react-router-dom';
import { LogoMark } from '../icons/Logo';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { company, navigation } from '../../data/site';
import { useI18n } from '../../i18n/useI18n';
import type { MessageKey } from '../../i18n/messages';

const legalLinks: MessageKey[] = ['legal.privacy', 'legal.terms', 'legal.compliance', 'legal.carriage'];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div className="shell grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 text-paper">
            <LogoMark size={44} />
            <div className="leading-none">
              <div className="font-display text-fluid-lg font-semibold tracking-tightest">CATLANTIC</div>
              <div className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.34em] text-muted">Trade &amp; Logistics</div>
            </div>
          </div>
          <p className="mt-8 max-w-sm text-pretty text-fluid-sm text-muted">{t('foot.about', { company: company.name })}</p>
          <p className="mt-6 max-w-sm font-mono text-fluid-xs text-faint">{t('foot.disclaimer')}</p>
          <LanguageSwitcher className="mt-8" align="left" />
        </div>

        <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
          <div>
            <h3 className="eyebrow mb-6">{t('foot.office')}</h3>
            <address className="not-italic text-fluid-sm leading-relaxed text-paper/80">
              {company.name}
              <br />
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.region} {company.address.postal}
              <br />
              {company.address.country}
              <br />
              <span className="font-mono text-fluid-xs text-muted">{company.phone}</span>
            </address>
          </div>
          <div>
            <h3 className="eyebrow mb-6">{t('foot.contact')}</h3>
            <ul className="space-y-3 text-fluid-sm">
              {(Object.keys(company.emails) as Array<keyof typeof company.emails>).map((key) => (
                <li key={key}>
                  <a href={`mailto:${company.emails[key]}`} className="text-paper/80 transition-colors hover:text-clay">
                    {company.emails[key]}
                  </a>
                  <span className="ml-2 font-mono text-fluid-xs uppercase tracking-wider text-faint">{t(`email.${key}` as MessageKey)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-6">{t('foot.navigate')}</h3>
            <ul className="space-y-3 text-fluid-sm">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="text-paper/80 transition-colors hover:text-clay">
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/access" className="text-paper/80 transition-colors hover:text-clay">
                  {t('nav.access')}
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-paper/80 transition-colors hover:text-clay">
                  {t('foot.api')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-fluid-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. {t('foot.rights')}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((key) => (
              <li key={key}>
                <a href="#" className="transition-colors hover:text-paper">
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
