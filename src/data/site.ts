import type { MessageKey } from '../i18n/messages';

export const company = {
  name: 'Catlantic Trade and Logistics Partners LLC',
  shortName: 'Catlantic',
  legalSuffix: 'LLC',
  founded: 2024,
  phone: '+1 (385) 219-7700',
  website: 'www.catlanticpartners.com',
  address: {
    line1: '30 North Gould Street, Ste R',
    city: 'Sheridan',
    region: 'WY',
    postal: '82801',
    country: 'United States',
  },
  emails: {
    general: 'info@catlanticpartners.com',
    trade: 'trade@catlanticpartners.com',
    logistics: 'logistics@catlanticpartners.com',
    onboarding: 'onboarding@catlanticpartners.com',
  },
} as const;

export const navigation: ReadonlyArray<{ id: string; labelKey: MessageKey; href: string }> = [
  { id: 'origination', labelKey: 'nav.origination', href: '#origination' },
  { id: 'quotes', labelKey: 'nav.market', href: '#quotes' },
  { id: 'lanes', labelKey: 'nav.lanes', href: '#lanes' },
  { id: 'logistics', labelKey: 'nav.logistics', href: '#logistics' },
  { id: 'partners', labelKey: 'nav.partners', href: '#partners' },
  { id: 'compliance', labelKey: 'nav.compliance', href: '#compliance' },
  { id: 'team', labelKey: 'nav.team', href: '#team' },
];

/**
 * Independent survey and inspection companies Catlantic appoints on client
 * instruction. Names only — each company's logo is its own trademark and should
 * be added to /public/surveyors only with that company's written permission.
 */
export const surveyors = [
  { id: 'sgs', name: 'SGS', verifyUrl: 'https://www.sgs.com/en/verify-documents' },
  { id: 'bv', name: 'Bureau Veritas', verifyUrl: 'https://www.bureauveritas.com' },
  { id: 'intertek', name: 'Intertek', verifyUrl: 'https://www.intertek.com' },
  { id: 'controlunion', name: 'Control Union', verifyUrl: 'https://www.controlunion.com' },
  { id: 'cotecna', name: 'Cotecna', verifyUrl: 'https://www.cotecna.com' },
  { id: 'qima', name: 'QIMA', verifyUrl: 'https://www.qima.com' },
] as const;
