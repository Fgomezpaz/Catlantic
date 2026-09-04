import type { L10n } from '../i18n/types';
import { l, same } from '../i18n/l';

export interface LogisticsService {
  id: 'ocean' | 'portcontrol' | 'ecommerce' | 'customs';
  title: L10n;
  lead: L10n;
  body: L10n;
  scope: L10n[];
  corridors: L10n;
}

export const logisticsServices: LogisticsService[] = [
  {
    id: 'ocean',
    title: l('Ocean freight', 'Flete marítimo', '海运'),
    lead: l(
      'FCL, LCL and bulk chartering between Asia and South America.',
      'FCL, LCL y fletamento a granel entre Asia y Sudamérica.',
      '亚洲与南美之间的整箱、拼箱与散货租船。',
    ),
    body: l(
      'Booking, rate negotiation and space guarantees with the main carriers on the transpacific and Cape routes, plus voyage chartering for bulk minerals and grain. One file covers booking, stuffing, documentation and arrival.',
      'Reservas, negociación de tarifas y garantía de espacio con las principales navieras en las rutas transpacífica y del Cabo, más fletamento por viaje para minerales y granos a granel. Un solo legajo cubre reserva, consolidado, documentación y arribo.',
      '与跨太平洋及好望角航线的主要船公司进行订舱、运价谈判与舱位保障，并为散装矿产与谷物提供航次租船。一份档案涵盖订舱、装箱、单证与到港。',
    ),
    scope: [
      l('FCL & LCL bookings', 'Reservas FCL y LCL', '整箱与拼箱订舱'),
      l('Bulk voyage chartering', 'Fletamento a granel por viaje', '散货航次租船'),
      l('Reefer & special equipment', 'Reefer y equipos especiales', '冷藏箱与特种设备'),
      l('Cargo insurance', 'Seguro de carga', '货物保险'),
    ],
    corridors: same('Shanghai · Shenzhen · Ningbo ↔ Buenos Aires · Santos · Callao · Vitória'),
  },
  {
    id: 'portcontrol',
    title: l('Port cargo control & verification', 'Control y verificación de cargas en puerto', '港口货物监管与核验'),
    lead: l(
      'Independent eyes on your cargo at loading and discharge.',
      'Ojos independientes sobre su carga en carga y descarga.',
      '在装卸港为您的货物提供独立监管。',
    ),
    body: l(
      'Tally, weight and quality checks, container seal and stuffing supervision, draft surveys for bulk, photographic evidence and discrepancy reports — performed through our appointed survey partners at every port we serve, with results posted to the client file within 24 hours.',
      'Conteo, control de peso y calidad, supervisión de precinto y consolidado, draft survey para granel, evidencia fotográfica e informes de discrepancias — a través de nuestros surveyors designados en cada puerto que servimos, con resultados en el legajo del cliente dentro de las 24 horas.',
      '理货、重量与质量检查、集装箱铅封与装箱监督、散货水尺计量、影像证据与差异报告——由我们在各服务港口指定的检验合作伙伴执行，结果在 24 小时内上传至客户档案。',
    ),
    scope: [
      l('Loading & discharge supervision', 'Supervisión de carga y descarga', '装卸监督'),
      l('Draft survey & weighing', 'Draft survey y pesaje', '水尺计量与称重'),
      l('Seal, tally & photo evidence', 'Precinto, conteo y evidencia fotográfica', '铅封、理货与影像证据'),
      l('Discrepancy & claims reports', 'Informes de discrepancias y reclamos', '差异与索赔报告'),
    ],
    corridors: same('Rosario · Buenos Aires · Montevideo · Santos · Vitória · Paranaguá · Callao'),
  },
  {
    id: 'ecommerce',
    title: l('Cross-border e-commerce & last mile', 'E-commerce transfronterizo y última milla', '跨境电商与末端配送'),
    lead: l(
      'From Asian sellers to doorsteps in Argentina, Brazil and Peru.',
      'De vendedores asiáticos a la puerta del comprador en Argentina, Brasil y Perú.',
      '从亚洲卖家到阿根廷、巴西和秘鲁的门前。',
    ),
    body: l(
      'Consolidation at origin, ocean or air line-haul, customs clearance under courier and formal regimes, and last-mile delivery through our partner networks in each country, with parcel-level tracking shared back to the seller.',
      'Consolidación en origen, transporte troncal marítimo o aéreo, despacho bajo regímenes courier y formal, y entrega de última milla a través de nuestras redes de partners en cada país, con tracking por paquete compartido con el vendedor.',
      '产地集货、海运或空运干线、快件与一般贸易清关，以及通过我们在各国的合作伙伴网络完成末端配送，包裹级追踪回传卖家。',
    ),
    scope: [
      l('Origin consolidation', 'Consolidación en origen', '产地集货'),
      l('Courier & formal clearance', 'Despacho courier y formal', '快件与一般贸易清关'),
      l('Partner last-mile networks', 'Redes de última milla de partners', '合作伙伴末端配送网络'),
      l('Parcel-level tracking', 'Tracking por paquete', '包裹级追踪'),
    ],
    corridors: same('China & Southeast Asia → Buenos Aires · São Paulo · Lima'),
  },
  {
    id: 'customs',
    title: l('Customs & documentation', 'Aduana y documentación', '海关与单证'),
    lead: l('The paperwork that keeps cargo moving.', 'El papeleo que mantiene la carga en movimiento.', '让货物持续流转的单证工作。'),
    body: l(
      'Import and export filings, certificates of origin, phytosanitary and inspection documents, documentary credits and FSVP entries for US arrivals — prepared before the vessel sails, not after it berths.',
      'Declaraciones de importación y exportación, certificados de origen, documentos fitosanitarios y de inspección, créditos documentarios y entradas FSVP para arribos a EE. UU. — preparados antes de que zarpe el buque, no después de que atraque.',
      '进出口申报、原产地证书、植检与检验文件、跟单信用证以及美国到港的 FSVP 申报——在船舶启航前备妥，而非靠泊后补办。',
    ),
    scope: [
      l('Import & export filings', 'Declaraciones de importación y exportación', '进出口申报'),
      l('Certificates & inspections', 'Certificados e inspecciones', '证书与检验'),
      l('Documentary credits', 'Créditos documentarios', '跟单信用证'),
      l('Duty & regime advice', 'Asesoría en aranceles y regímenes', '关税与制度咨询'),
    ],
    corridors: same('Argentina · Brazil · Peru · Paraguay · United States · China'),
  },
];

export interface PartnerCategory {
  id: string;
  title: L10n;
  body: L10n;
  coverage: L10n;
  count: string;
}

/** Categories, not names — partner identities are disclosed under NDA during onboarding. */
export const partnerCategories: PartnerCategory[] = [
  {
    id: 'origination',
    title: l('Origination partners', 'Partners de originación', '货源合作伙伴'),
    body: l(
      'Growers, cooperatives, packers and mining operators under multi-season supply agreements with quality clauses.',
      'Productores, cooperativas, empacadores y operadores mineros bajo acuerdos de suministro multi-campaña con cláusulas de calidad.',
      '种植户、合作社、包装厂与矿业运营商，签订含质量条款的多季度供应协议。',
    ),
    coverage: same('Argentina · Brazil · Paraguay · Peru'),
    count: '30+',
  },
  {
    id: 'survey',
    title: l('Survey & inspection', 'Inspección y survey', '检验与监管'),
    body: l(
      'Internationally accredited surveyors appointed at every load and discharge port for quality, weight and condition.',
      'Surveyors acreditados internacionalmente designados en cada puerto de carga y descarga para calidad, peso y condición.',
      '在每个装卸港指定国际认可的检验机构，负责质量、重量与状态核验。',
    ),
    coverage: same('South America · US Gulf · China · Gulf · North Europe'),
    count: '4',
  },
  {
    id: 'carriers',
    title: l('Carriers & NVOCCs', 'Navieras y NVOCC', '船公司与无船承运人'),
    body: l(
      'Contract rates and space guarantees with liner carriers on the transpacific and Cape services, plus bulk owners and operators for voyage charters.',
      'Tarifas contractuales y garantía de espacio con navieras de línea en los servicios transpacífico y del Cabo, más armadores y operadores para fletamentos por viaje.',
      '与跨太平洋及好望角班轮公司签订合同运价与舱位保障，并与散货船东及运营商合作航次租船。',
    ),
    coverage: same('Transpacific · Cape · Atlantic'),
    count: '6',
  },
  {
    id: 'lastmile',
    title: l('Last-mile networks', 'Redes de última milla', '末端配送网络'),
    body: l(
      'Licensed courier and parcel operators in Argentina, Brazil and Peru integrated with our tracking API, covering the main metropolitan areas and regional hubs.',
      'Operadores courier y de paquetería habilitados en Argentina, Brasil y Perú integrados con nuestra API de tracking, con cobertura de las principales áreas metropolitanas y hubs regionales.',
      '阿根廷、巴西和秘鲁的持牌快递与包裹运营商，已与我们的追踪 API 集成，覆盖主要都市区和区域枢纽。',
    ),
    coverage: same('Buenos Aires · São Paulo · Rio · Lima · regional'),
    count: '3',
  },
  {
    id: 'finance',
    title: l('Trade finance & banks', 'Trade finance y bancos', '贸易金融与银行'),
    body: l(
      'Correspondent banks and trade-finance providers for documentary credits, pre-export finance and receivables discounting — the structure behind our independent trader programme.',
      'Bancos corresponsales y proveedores de trade finance para créditos documentarios, prefinanciación de exportaciones y descuento de cobranzas — la estructura detrás de nuestro programa para traders independientes.',
      '代理银行与贸易金融机构，提供跟单信用证、出口预融资与应收账款贴现——这是我们独立贸易商计划背后的架构。',
    ),
    coverage: same('United States · Switzerland · Singapore · Buenos Aires · São Paulo'),
    count: '5',
  },
  {
    id: 'certification',
    title: l('Certification bodies', 'Organismos certificadores', '认证机构'),
    body: l(
      'Kosher, Halal, organic and food-safety certifiers with supervision arrangements at partner plants and ports.',
      'Certificadores Kosher, Halal, orgánicos y de inocuidad con acuerdos de supervisión en plantas y puertos de partners.',
      '犹太洁食、清真、有机与食品安全认证机构，在合作工厂与港口设有监督安排。',
    ),
    coverage: same('Recognised in USA · EU · GCC · China'),
    count: '8',
  },
];

export const soloTraderPoints: L10n[] = [
  l('Catlantic contracts as principal with the buyer and the seller; you keep the relationship.', 'Catlantic contrata como principal con comprador y vendedor; usted conserva la relación.', 'Catlantic 作为交易主体与买卖双方签约；客户关系仍归您所有。'),
  l('Pre-export finance, documentary credits and receivables discounting through partner banks.', 'Prefinanciación, créditos documentarios y descuento de cobranzas a través de bancos partners.', '通过合作银行提供出口预融资、跟单信用证与应收账款贴现。'),
  l('Execution, survey, logistics and compliance run by our desk under your instructions.', 'Ejecución, survey, logística y compliance a cargo de nuestra mesa bajo sus instrucciones.', '执行、检验、物流与合规由我们的团队按您的指令完成。'),
  l('Margin shared under a written mandate; no capital contribution required from the trader.', 'Margen compartido bajo mandato escrito; sin aporte de capital del trader.', '利润按书面授权分成；贸易商无需出资。'),
];
