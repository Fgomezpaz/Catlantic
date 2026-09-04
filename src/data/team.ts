import type { L10n } from '../i18n/types';
import { l, same } from '../i18n/l';

/**
 * PLACEHOLDER PROFILES — replace with the real team before going live.
 * Names, roles and biographies below are illustrative. Emails follow the
 * firstname@catlanticpartners.com convention so mailboxes can be created to match.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: L10n;
  focus: L10n;
  bio: L10n;
  email: string;
  base: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    id: 'managing-partner',
    name: 'Damián Rosenberg',
    role: l('Managing Partner', 'Socio Director', '管理合伙人'),
    focus: l('Strategy · Counterparties', 'Estrategia · Contrapartes', '战略 · 交易对手'),
    bio: l(
      'Leads the desk, counterparty relationships in the United States and China, and the origination programme with South American growers and miners.',
      'Lidera la mesa, las relaciones con contrapartes en Estados Unidos y China, y el programa de originación con productores y mineras de Sudamérica.',
      '领导交易台，负责美国与中国的交易对手关系，以及与南美种植户和矿业公司的货源计划。',
    ),
    email: 'damian@catlanticpartners.com',
    base: 'Sheridan · Buenos Aires',
    initials: 'DR',
  },
  {
    id: 'head-trading',
    name: 'Lucía Ferreyra',
    role: l('Head of Trading', 'Directora de Trading', '贸易主管'),
    focus: l('Grains · Organics · Minerals', 'Granos · Orgánicos · Minerales', '谷物 · 有机 · 矿产'),
    bio: l(
      'Prices and structures physical contracts, manages the quote book and runs execution against specification on every lot.',
      'Cotiza y estructura contratos físicos, administra el libro de cotizaciones y ejecuta cada lote contra especificación.',
      '负责实货合同定价与架构，管理报价簿，并按规格执行每一批次。',
    ),
    email: 'lucia@catlanticpartners.com',
    base: 'Rosario',
    initials: 'LF',
  },
  {
    id: 'head-logistics',
    name: 'Rafael Nakamura',
    role: l('Head of Logistics', 'Director de Logística', '物流主管'),
    focus: l('Ocean freight · Port control · E-commerce', 'Flete marítimo · Control en puerto · E-commerce', '海运 · 港口监管 · 电商'),
    bio: l(
      'Runs carrier relationships on the transpacific, bulk chartering, port survey partners and the last-mile networks in Argentina, Brazil and Peru.',
      'Gestiona las relaciones con navieras en el transpacífico, el fletamento a granel, los surveyors en puerto y las redes de última milla en Argentina, Brasil y Perú.',
      '负责跨太平洋船公司关系、散货租船、港口检验合作伙伴以及阿根廷、巴西和秘鲁的末端配送网络。',
    ),
    email: 'rafael@catlanticpartners.com',
    base: 'São Paulo',
    initials: 'RN',
  },
  {
    id: 'compliance',
    name: 'Amira Haddad',
    role: l('Compliance & Documentation', 'Compliance y Documentación', '合规与单证'),
    focus: same('Kosher · Halal · KYC · Customs'),
    bio: l(
      'Owns onboarding due diligence, certification chain of custody, documentary credits and customs filings so every shipment arrives with a complete file.',
      'Responsable del due diligence de onboarding, la cadena de custodia de certificaciones, los créditos documentarios y las declaraciones aduaneras, para que cada embarque llegue con el legajo completo.',
      '负责准入尽职调查、认证监管链、跟单信用证与报关，确保每票货物抵达时档案完整。',
    ),
    email: 'amira@catlanticpartners.com',
    base: 'Lima',
    initials: 'AH',
  },
];
