import type { L10n } from '../i18n/types';
import type { MessageKey } from '../i18n/messages';
import { l, same } from '../i18n/l';

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'textarea'
  | 'file'
  | 'checkbox';

export interface FieldOption {
  value: string;
  label: L10n;
}

export interface Field {
  id: string;
  label: L10n;
  type: FieldType;
  required?: boolean;
  placeholder?: L10n;
  help?: L10n;
  options?: FieldOption[];
  half?: boolean;
  min?: number;
  accept?: string;
  multiple?: boolean;
}

export interface Step {
  id: string;
  title: L10n;
  intro?: L10n;
  fields: Field[];
}

export type ProfileId = 'trading' | 'logistics' | 'solo' | 'producer' | 'lsp';
export type Side = 'client' | 'supplier';

export interface Profile {
  id: ProfileId;
  side: Side;
  titleKey: MessageKey;
  bodyKey: MessageKey;
  reqKey: MessageKey;
  steps: Step[];
}

/* ------------------------------------------------------------------ */
/* Option sets                                                          */
/* ------------------------------------------------------------------ */

const countries: FieldOption[] = [
  ['AR', 'Argentina', 'Argentina', '阿根廷'],
  ['BR', 'Brazil', 'Brasil', '巴西'],
  ['PY', 'Paraguay', 'Paraguay', '巴拉圭'],
  ['PE', 'Peru', 'Perú', '秘鲁'],
  ['UY', 'Uruguay', 'Uruguay', '乌拉圭'],
  ['US', 'United States', 'Estados Unidos', '美国'],
  ['CN', 'China', 'China', '中国'],
  ['HK', 'Hong Kong SAR', 'Hong Kong RAE', '中国香港'],
  ['SG', 'Singapore', 'Singapur', '新加坡'],
  ['AE', 'United Arab Emirates', 'Emiratos Árabes Unidos', '阿联酋'],
  ['SA', 'Saudi Arabia', 'Arabia Saudita', '沙特阿拉伯'],
  ['EG', 'Egypt', 'Egipto', '埃及'],
  ['TR', 'Türkiye', 'Turquía', '土耳其'],
  ['NL', 'Netherlands', 'Países Bajos', '荷兰'],
  ['DE', 'Germany', 'Alemania', '德国'],
  ['ES', 'Spain', 'España', '西班牙'],
  ['CH', 'Switzerland', 'Suiza', '瑞士'],
  ['GB', 'United Kingdom', 'Reino Unido', '英国'],
  ['IN', 'India', 'India', '印度'],
  ['JP', 'Japan', 'Japón', '日本'],
  ['KR', 'South Korea', 'Corea del Sur', '韩国'],
  ['VN', 'Vietnam', 'Vietnam', '越南'],
  ['MX', 'Mexico', 'México', '墨西哥'],
  ['OTHER', 'Other', 'Otro', '其他'],
].map(([value, en, es, zh]) => ({ value, label: l(en, es, zh) }));

const entityTypes: FieldOption[] = [
  { value: 'corp', label: l('Corporation / S.A.', 'Sociedad anónima', '股份公司') },
  { value: 'llc', label: l('LLC / S.R.L. / Ltda.', 'S.R.L. / Ltda. / LLC', '有限责任公司') },
  { value: 'coop', label: l('Cooperative', 'Cooperativa', '合作社') },
  { value: 'partnership', label: l('Partnership', 'Sociedad de personas', '合伙企业') },
  { value: 'state', label: l('State-owned enterprise', 'Empresa estatal', '国有企业') },
  { value: 'sole', label: l('Sole proprietor', 'Unipersonal', '个体经营') },
];

const yesNo: FieldOption[] = [
  { value: 'yes', label: l('Yes', 'Sí', '是') },
  { value: 'no', label: l('No', 'No', '否') },
];

const products: FieldOption[] = [
  { value: 'soybean', label: l('Soybean', 'Soja', '大豆') },
  { value: 'corn', label: l('Yellow corn', 'Maíz amarillo', '黄玉米') },
  { value: 'pulses', label: l('Pulses & beans', 'Legumbres', '豆类') },
  { value: 'chia', label: l('Chia seed', 'Chía', '奇亚籽') },
  { value: 'quinoa', label: l('Quinoa', 'Quinua', '藜麦') },
  { value: 'garlic', label: l('Garlic', 'Ajo', '大蒜') },
  { value: 'sesame', label: l('Sesame seed', 'Sésamo', '芝麻') },
  { value: 'sunflower', label: l('Sunflower kernel', 'Pepita de girasol', '葵花籽仁') },
  { value: 'manganese', label: l('Manganese ore', 'Mineral de manganeso', '锰矿') },
  { value: 'ironore', label: l('Iron ore', 'Mineral de hierro', '铁矿') },
  { value: 'other', label: l('Other (specify below)', 'Otro (especificar abajo)', '其他（下方注明）') },
];

const markets: FieldOption[] = [
  { value: 'USA', label: l('United States', 'Estados Unidos', '美国') },
  { value: 'CN', label: l('China', 'China', '中国') },
  { value: 'ASIA', label: l('Other Asia', 'Resto de Asia', '亚洲其他地区') },
  { value: 'MENA', label: l('MENA', 'MENA', '中东北非') },
  { value: 'EU', label: l('Europe', 'Europa', '欧洲') },
  { value: 'LATAM', label: l('Latin America', 'Latinoamérica', '拉丁美洲') },
];

const incoterms: FieldOption[] = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'DAP', 'DDP'].map((v) => ({ value: v, label: same(v) }));

const certOptions: FieldOption[] = [
  { value: 'kosher', label: same('Kosher') },
  { value: 'halal', label: same('Halal') },
  { value: 'organic', label: l('Organic (USDA / EU)', 'Orgánico (USDA / UE)', '有机（USDA / EU）') },
  { value: 'nongmo', label: same('Non-GMO') },
  { value: 'globalgap', label: same('GLOBALG.A.P.') },
  { value: 'haccp', label: same('HACCP / ISO 22000') },
  { value: 'brc', label: same('BRCGS / IFS') },
  { value: 'iso9001', label: same('ISO 9001') },
  { value: 'none', label: l('None yet', 'Ninguna aún', '暂无') },
];

const revenueBands: FieldOption[] = [
  { value: 'lt1', label: l('Under USD 1 million', 'Menos de USD 1 millón', '100 万美元以下') },
  { value: '1-5', label: same('USD 1–5 million') },
  { value: '5-25', label: same('USD 5–25 million') },
  { value: '25-100', label: same('USD 25–100 million') },
  { value: '100-500', label: same('USD 100–500 million') },
  { value: 'gt500', label: l('Over USD 500 million', 'Más de USD 500 millones', '5 亿美元以上') },
];

const paymentTerms: FieldOption[] = [
  { value: 'prepay', label: l('Prepayment', 'Pago anticipado', '预付款') },
  { value: 'lc', label: l('Letter of credit at sight', 'Carta de crédito a la vista', '即期信用证') },
  { value: 'lcusance', label: l('Usance letter of credit', 'Carta de crédito a plazo', '远期信用证') },
  { value: 'cad', label: l('Cash against documents', 'Pago contra documentos', '付款交单') },
  { value: 'open', label: l('Open account (with credit insurance)', 'Cuenta corriente (con seguro de crédito)', '赊销（含信用保险）') },
];

const lspServices: FieldOption[] = [
  { value: 'liner', label: l('Liner carrier', 'Naviera de línea', '班轮公司') },
  { value: 'nvocc', label: l('NVOCC / freight forwarder', 'NVOCC / forwarder', '无船承运人 / 货代') },
  { value: 'bulk', label: l('Bulk owner / operator', 'Armador / operador de granel', '散货船东 / 运营商') },
  { value: 'survey', label: l('Survey & inspection', 'Survey e inspección', '检验与监管') },
  { value: 'portagent', label: l('Port agency', 'Agencia portuaria', '港口代理') },
  { value: 'terminal', label: l('Terminal / warehouse', 'Terminal / depósito', '码头 / 仓库') },
  { value: 'customs', label: l('Customs broker', 'Despachante de aduana', '报关行') },
  { value: 'trucking', label: l('Trucking / rail', 'Transporte terrestre', '陆运') },
  { value: 'lastmile', label: l('Courier / last mile', 'Courier / última milla', '快递 / 末端配送') },
];

/* ------------------------------------------------------------------ */
/* Shared steps                                                         */
/* ------------------------------------------------------------------ */

const companyStep: Step = {
  id: 'company',
  title: l('Company & ownership', 'Empresa y titularidad', '企业与股权'),
  intro: l(
    'Legal identity of the entity that will contract. Ultimate beneficial owners are screened individually.',
    'Identidad legal de la entidad que contratará. Los beneficiarios finales se verifican individualmente.',
    '将签约实体的法律身份。最终受益人将逐一筛查。',
  ),
  fields: [
    { id: 'legalName', type: 'text', required: true, label: l('Registered legal name', 'Razón social', '注册法定名称') },
    { id: 'tradeName', type: 'text', half: true, label: l('Trading name', 'Nombre comercial', '商号') },
    { id: 'entityType', type: 'select', required: true, half: true, options: entityTypes, label: l('Entity type', 'Tipo de entidad', '实体类型') },
    { id: 'country', type: 'select', required: true, half: true, options: countries, label: l('Country of incorporation', 'País de constitución', '注册国家') },
    { id: 'taxId', type: 'text', required: true, half: true, label: l('Tax ID / registration number', 'CUIT / RUT / CNPJ / EIN', '税号 / 注册号') },
    { id: 'incorporationYear', type: 'number', required: true, half: true, min: 1800, label: l('Year of incorporation', 'Año de constitución', '成立年份') },
    { id: 'lei', type: 'text', half: true, label: l('LEI (if any)', 'LEI (si tiene)', 'LEI（如有）') },
    { id: 'address', type: 'textarea', required: true, label: l('Registered address', 'Domicilio legal', '注册地址') },
    { id: 'website', type: 'url', half: true, label: l('Website', 'Sitio web', '网站') },
    { id: 'employees', type: 'number', half: true, min: 0, label: l('Employees', 'Empleados', '员工人数') },
    {
      id: 'ubo',
      type: 'textarea',
      required: true,
      label: l('Ultimate beneficial owners (≥ 10 %)', 'Beneficiarios finales (≥ 10 %)', '最终受益人（≥10%）'),
      placeholder: l('Full name · nationality · % held · PEP status (yes/no)', 'Nombre completo · nacionalidad · % · PEP (sí/no)', '姓名 · 国籍 · 持股比例 · 是否政治敏感人物'),
    },
    { id: 'directors', type: 'textarea', required: true, label: l('Directors and authorised signatories', 'Directores y firmantes autorizados', '董事及授权签字人') },
    { id: 'groupStructure', type: 'textarea', label: l('Group structure / parent company', 'Estructura de grupo / casa matriz', '集团结构 / 母公司') },
    { id: 'sanctionsExposure', type: 'radio', required: true, options: yesNo, label: l('Any owner, director or affiliate subject to sanctions, PEP status or ongoing litigation?', '¿Algún titular, director o afiliada bajo sanciones, condición PEP o litigio en curso?', '是否有任何所有者、董事或关联方受制裁、属政治敏感人物或涉及未决诉讼？') },
  ],
};

const contactsStep: Step = {
  id: 'contacts',
  title: l('Contacts', 'Contactos', '联系人'),
  fields: [
    { id: 'contactName', type: 'text', required: true, half: true, label: l('Primary contact · full name', 'Contacto principal · nombre completo', '主要联系人 · 姓名') },
    { id: 'contactTitle', type: 'text', required: true, half: true, label: l('Position', 'Cargo', '职位') },
    { id: 'contactEmail', type: 'email', required: true, half: true, label: l('Corporate email', 'Email corporativo', '企业邮箱'), help: l('Free webmail addresses are not accepted.', 'No se aceptan casillas de webmail gratuito.', '不接受免费邮箱。') },
    { id: 'contactPhone', type: 'tel', required: true, half: true, label: l('Phone (with country code)', 'Teléfono (con código de país)', '电话（含国家代码）') },
    { id: 'financeContact', type: 'text', required: true, half: true, label: l('Finance / treasury contact', 'Contacto de finanzas / tesorería', '财务 / 资金联系人') },
    { id: 'financeEmail', type: 'email', required: true, half: true, label: l('Finance email', 'Email de finanzas', '财务邮箱') },
    { id: 'opsContact', type: 'text', half: true, label: l('Operations / logistics contact', 'Contacto de operaciones / logística', '运营 / 物流联系人') },
    { id: 'opsEmail', type: 'email', half: true, label: l('Operations email', 'Email de operaciones', '运营邮箱') },
    { id: 'languages', type: 'multiselect', required: true, options: [
      { value: 'en', label: same('English') }, { value: 'es', label: same('Español') }, { value: 'pt', label: same('Português') }, { value: 'zh', label: same('中文') }, { value: 'ar', label: same('العربية') },
    ], label: l('Working languages', 'Idiomas de trabajo', '工作语言') },
  ],
};

const financialStep: Step = {
  id: 'financial',
  title: l('Financial capacity', 'Capacidad financiera', '财务能力'),
  intro: l(
    'We size credit and payment terms against audited figures. Estimates are accepted at this stage and verified in the data room.',
    'Dimensionamos crédito y condiciones de pago sobre cifras auditadas. En esta etapa se aceptan estimaciones, que se verifican en el data room.',
    '我们根据经审计的数据确定信用额度与付款条件。本阶段接受估算值，将在数据室核实。',
  ),
  fields: [
    { id: 'revenueLast', type: 'select', required: true, half: true, options: revenueBands, label: l('Revenue · last fiscal year', 'Facturación · último ejercicio', '上一财年营收') },
    { id: 'revenueEst', type: 'select', required: true, half: true, options: revenueBands, label: l('Revenue · current year estimate', 'Facturación · estimación del año en curso', '本年度营收预估') },
    { id: 'netWorth', type: 'number', required: true, half: true, min: 0, label: l('Net worth (USD)', 'Patrimonio neto (USD)', '净资产（美元）') },
    { id: 'tradeVolumeUsd', type: 'number', required: true, half: true, min: 0, label: l('Expected annual business with Catlantic (USD)', 'Negocio anual esperado con Catlantic (USD)', '预计与 Catlantic 的年度业务额（美元）') },
    { id: 'creditLines', type: 'textarea', required: true, label: l('Existing bank credit lines and trade-finance facilities', 'Líneas de crédito bancarias y facilidades de trade finance vigentes', '现有银行授信与贸易金融额度'), placeholder: l('Bank · facility type · limit · currency', 'Banco · tipo · límite · moneda', '银行 · 类型 · 额度 · 币种') },
    { id: 'preferredTerms', type: 'multiselect', required: true, options: paymentTerms, label: l('Payment terms you can operate under', 'Condiciones de pago con las que puede operar', '可接受的付款条件') },
    { id: 'auditor', type: 'text', required: true, half: true, label: l('External auditor', 'Auditor externo', '外部审计师') },
    { id: 'fiscalYearEnd', type: 'text', required: true, half: true, label: l('Fiscal year end', 'Cierre de ejercicio', '财年截止日'), placeholder: same('31 Dec') },
    { id: 'bankRefs', type: 'textarea', required: true, label: l('Bank references (two)', 'Referencias bancarias (dos)', '银行推荐（两家）'), placeholder: l('Bank · branch · relationship manager · years as client', 'Banco · sucursal · ejecutivo · años como cliente', '银行 · 分行 · 客户经理 · 合作年限') },
    { id: 'tradeRefs', type: 'textarea', required: true, label: l('Trade references (three counterparties)', 'Referencias comerciales (tres contrapartes)', '贸易推荐（三家交易对手）'), placeholder: l('Company · contact · email · nature and years of relationship', 'Empresa · contacto · email · tipo y años de relación', '公司 · 联系人 · 邮箱 · 关系性质与年限') },
    { id: 'insolvency', type: 'radio', required: true, options: yesNo, label: l('Any insolvency, restructuring or payment default in the last 5 years?', '¿Insolvencia, reestructuración o incumplimiento de pago en los últimos 5 años?', '过去五年是否有破产、重组或付款违约？') },
  ],
};

const documentsStep: Step = {
  id: 'documents',
  title: l('Documents', 'Documentos', '文件'),
  intro: l(
    'Attach what you have now. Originals and any missing items are requested through the secure data room after preliminary screening.',
    'Adjunte lo que tenga ahora. Los originales y lo faltante se solicitan por el data room seguro tras la evaluación preliminar.',
    '请先附上现有文件。原件及缺失项将在初步审核后通过安全数据室索取。',
  ),
  fields: [
    { id: 'docIncorporation', type: 'file', required: true, accept: '.pdf', label: l('Certificate of incorporation / bylaws', 'Estatuto / contrato social', '公司注册证书 / 章程') },
    { id: 'docTax', type: 'file', required: true, accept: '.pdf', label: l('Tax registration', 'Constancia de inscripción fiscal', '税务登记') },
    { id: 'docFinancials', type: 'file', required: true, accept: '.pdf', multiple: true, label: l('Audited financial statements · last 2 years', 'Estados financieros auditados · últimos 2 años', '经审计财务报表 · 近两年') },
    { id: 'docUboIds', type: 'file', required: true, accept: '.pdf,.jpg,.png', multiple: true, label: l('Passport copies · UBOs and signatories', 'Copias de pasaporte · beneficiarios finales y firmantes', '护照复印件 · 最终受益人及签字人') },
    { id: 'docBankLetter', type: 'file', accept: '.pdf', label: l('Bank reference letter', 'Carta de referencia bancaria', '银行推荐信') },
    { id: 'docOrgChart', type: 'file', accept: '.pdf,.png,.jpg', label: l('Ownership chart', 'Organigrama societario', '股权结构图') },
    { id: 'docOther', type: 'file', accept: '.pdf,.zip', multiple: true, label: l('Licences, certificates, other', 'Licencias, certificados, otros', '许可证、证书及其他') },
  ],
};

/* ------------------------------------------------------------------ */
/* Profile-specific steps                                               */
/* ------------------------------------------------------------------ */

const tradingStep: Step = {
  id: 'trading',
  title: l('Products, specifications & volumes', 'Productos, especificaciones y volúmenes', '产品、规格与交易量'),
  fields: [
    { id: 'role', type: 'radio', required: true, options: [
      { value: 'buyer', label: l('Buyer', 'Comprador', '买方') }, { value: 'seller', label: l('Seller', 'Vendedor', '卖方') }, { value: 'both', label: l('Both', 'Ambos', '双方') },
    ], label: l('Your role', 'Su rol', '您的角色') },
    { id: 'products', type: 'multiselect', required: true, options: products, label: l('Products of interest', 'Productos de interés', '感兴趣的产品') },
    { id: 'otherProducts', type: 'text', label: l('Other products', 'Otros productos', '其他产品') },
    { id: 'specs', type: 'textarea', required: true, label: l('Product specifications', 'Especificaciones de producto', '产品规格'), placeholder: l('Grade · moisture · protein / Fe / Mn content · foreign matter · admixture · packing · any standard (e.g. GAFTA, FOSFA)', 'Grado · humedad · proteína / Fe / Mn · materia extraña · mezcla · envase · norma (GAFTA, FOSFA)', '等级 · 水分 · 蛋白 / 铁 / 锰含量 · 杂质 · 混杂 · 包装 · 适用标准（如 GAFTA、FOSFA）') },
    { id: 'annualVolume', type: 'number', required: true, half: true, min: 0, label: l('Annual volume traded (MT)', 'Volumen anual operado (t)', '年交易量（吨）') },
    { id: 'lotSize', type: 'number', required: true, half: true, min: 0, label: l('Typical lot size (MT)', 'Lote típico (t)', '典型批量（吨）') },
    { id: 'volumeHistory', type: 'textarea', required: true, label: l('Volumes traded in the last 3 years, by product and origin/destination', 'Volúmenes operados en los últimos 3 años por producto y origen/destino', '过去三年按产品及来源/目的地划分的交易量') },
    { id: 'markets', type: 'multiselect', required: true, options: markets, label: l('Markets you buy for / sell into', 'Mercados donde compra / vende', '您采购 / 销售的市场') },
    { id: 'incoterms', type: 'multiselect', required: true, options: incoterms, label: l('Incoterms you operate under', 'Incoterms con los que opera', '您采用的贸易术语') },
    { id: 'certsRequired', type: 'multiselect', required: true, options: certOptions, label: l('Certifications required / held', 'Certificaciones requeridas / vigentes', '需要 / 持有的认证') },
    { id: 'endUse', type: 'textarea', required: true, label: l('End use and end customers', 'Uso final y clientes finales', '最终用途与终端客户') },
    { id: 'contractForms', type: 'text', label: l('Standard contract forms used', 'Modelos de contrato utilizados', '常用合同范本'), placeholder: same('GAFTA 64 · FOSFA 54 · own form') },
    { id: 'disputes', type: 'radio', required: true, options: yesNo, label: l('Any quality or payment disputes in the last 3 years?', '¿Disputas de calidad o pago en los últimos 3 años?', '过去三年是否有质量或付款争议？') },
  ],
};

const logisticsStep: Step = {
  id: 'logistics',
  title: l('Services, corridors & cargo', 'Servicios, corredores y carga', '服务、航线与货物'),
  fields: [
    { id: 'services', type: 'multiselect', required: true, options: [
      { value: 'ocean', label: l('Ocean freight (FCL / LCL / bulk)', 'Flete marítimo (FCL / LCL / granel)', '海运（整箱 / 拼箱 / 散货）') },
      { value: 'portcontrol', label: l('Port cargo control & verification', 'Control y verificación de cargas en puerto', '港口货物监管与核验') },
      { value: 'ecommerce', label: l('Cross-border e-commerce & last mile', 'E-commerce transfronterizo y última milla', '跨境电商与末端配送') },
      { value: 'customs', label: l('Customs & documentation', 'Aduana y documentación', '海关与单证') },
    ], label: l('Services required', 'Servicios requeridos', '所需服务') },
    { id: 'corridors', type: 'textarea', required: true, label: l('Corridors (origin → destination) and monthly frequency', 'Corredores (origen → destino) y frecuencia mensual', '航线（起运地 → 目的地）及每月频次') },
    { id: 'annualTeu', type: 'number', half: true, min: 0, label: l('Annual volume · TEU', 'Volumen anual · TEU', '年货量 · TEU') },
    { id: 'annualMt', type: 'number', half: true, min: 0, label: l('Annual volume · bulk MT', 'Volumen anual · granel t', '年货量 · 散货吨') },
    { id: 'parcelsMonth', type: 'number', half: true, min: 0, label: l('E-commerce parcels per month', 'Paquetes e-commerce por mes', '每月电商包裹数') },
    { id: 'avgParcelValue', type: 'number', half: true, min: 0, label: l('Average parcel value (USD)', 'Valor promedio por paquete (USD)', '包裹平均货值（美元）') },
    { id: 'cargoProfile', type: 'textarea', required: true, label: l('Cargo profile', 'Perfil de carga', '货物概况'), placeholder: l('Commodity · HS codes · hazardous? · reefer? · packaging · value per shipment', 'Mercadería · posiciones HS · peligrosa · reefer · embalaje · valor por embarque', '商品 · HS 编码 · 是否危险品 · 是否冷藏 · 包装 · 单票货值') },
    { id: 'destCountries', type: 'multiselect', required: true, options: [
      { value: 'AR', label: same('Argentina') }, { value: 'BR', label: l('Brazil', 'Brasil', '巴西') }, { value: 'PE', label: l('Peru', 'Perú', '秘鲁') },
    ], label: l('Destination countries (last mile)', 'Países de destino (última milla)', '目的国（末端配送）') },
    { id: 'customsRegime', type: 'select', required: true, half: true, options: [
      { value: 'courier', label: l('Courier / simplified', 'Courier / simplificado', '快件 / 简化') }, { value: 'formal', label: l('Formal import', 'Importación formal', '一般贸易进口') }, { value: 'both', label: l('Both', 'Ambos', '两者') }, { value: 'unsure', label: l('Need advice', 'Necesito asesoría', '需要咨询') },
    ], label: l('Customs regime', 'Régimen aduanero', '海关制度') },
    { id: 'importerOfRecord', type: 'radio', required: true, half: true, options: yesNo, label: l('Do you have an importer of record in the destination country?', '¿Tiene importador registrado en destino?', '在目的国是否有登记进口商？') },
    { id: 'currentProviders', type: 'textarea', required: true, label: l('Current logistics providers and reason for change', 'Proveedores logísticos actuales y motivo del cambio', '现有物流服务商及更换原因') },
    { id: 'integration', type: 'select', required: true, half: true, options: [
      { value: 'api', label: l('REST API integration', 'Integración por API REST', 'REST API 集成') }, { value: 'edi', label: same('EDI') }, { value: 'portal', label: l('Web portal only', 'Solo portal web', '仅网页门户') }, { value: 'files', label: l('File exchange (CSV/Excel)', 'Intercambio de archivos (CSV/Excel)', '文件交换（CSV/Excel）') },
    ], label: l('Systems integration', 'Integración de sistemas', '系统集成') },
    { id: 'systems', type: 'text', half: true, label: l('ERP / OMS / WMS in use', 'ERP / OMS / WMS en uso', '在用 ERP / OMS / WMS') },
    { id: 'insurance', type: 'radio', required: true, options: yesNo, label: l('Do you hold your own cargo insurance?', '¿Tiene seguro de carga propio?', '是否自有货物保险？') },
    { id: 'surveyPreference', type: 'multiselect', options: ['SGS', 'Bureau Veritas', 'Intertek', 'Control Union', 'Cotecna', 'QIMA'].map((v) => ({ value: v, label: same(v) })), label: l('Preferred survey companies', 'Surveyors preferidos', '首选检验公司') },
  ],
};

const soloIdentityStep: Step = {
  id: 'identity',
  title: l('Identity & residency', 'Identidad y residencia', '身份与居住地'),
  intro: l(
    'Independent traders are onboarded as individuals or through their personal vehicle. Screening is the same as for a company.',
    'Los traders independientes se habilitan como personas físicas o a través de su vehículo personal. El screening es el mismo que para una empresa.',
    '独立贸易商以个人或其个人载体身份准入。筛查标准与企业相同。',
  ),
  fields: [
    { id: 'fullName', type: 'text', required: true, half: true, label: l('Full legal name', 'Nombre legal completo', '法定全名') },
    { id: 'nationality', type: 'select', required: true, half: true, options: countries, label: l('Nationality', 'Nacionalidad', '国籍') },
    { id: 'residency', type: 'select', required: true, half: true, options: countries, label: l('Country of tax residency', 'País de residencia fiscal', '税务居住国') },
    { id: 'taxNumber', type: 'text', required: true, half: true, label: l('Personal tax number', 'Número de identificación fiscal', '个人税号') },
    { id: 'vehicle', type: 'text', label: l('Personal company / vehicle (if any)', 'Sociedad / vehículo personal (si tiene)', '个人公司 / 载体（如有）') },
    { id: 'address', type: 'textarea', required: true, label: l('Residential address', 'Domicilio', '居住地址') },
    { id: 'contactEmail', type: 'email', required: true, half: true, label: l('Email', 'Email', '邮箱') },
    { id: 'contactPhone', type: 'tel', required: true, half: true, label: l('Phone', 'Teléfono', '电话') },
    { id: 'pep', type: 'radio', required: true, options: yesNo, label: l('Are you, or a close family member, a politically exposed person?', '¿Usted o un familiar cercano es persona políticamente expuesta?', '您或您的近亲属是否为政治敏感人物？') },
  ],
};

const soloTrackStep: Step = {
  id: 'track',
  title: l('Track record & pipeline', 'Trayectoria y pipeline', '交易记录与管线'),
  fields: [
    { id: 'yearsTrading', type: 'number', required: true, half: true, min: 0, label: l('Years trading physical commodities', 'Años operando físicos', '实货交易年限') },
    { id: 'previousHouses', type: 'text', required: true, half: true, label: l('Previous employers / trading houses', 'Empleadores / casas anteriores', '曾任职公司 / 贸易行') },
    { id: 'products', type: 'multiselect', required: true, options: products, label: l('Products you originate', 'Productos que origina', '您发起交易的产品') },
    { id: 'markets', type: 'multiselect', required: true, options: markets, label: l('Markets', 'Mercados', '市场') },
    { id: 'volumeHistory', type: 'textarea', required: true, label: l('Deals closed in the last 3 years (product, volume, counterparties, value)', 'Negocios cerrados en los últimos 3 años (producto, volumen, contrapartes, valor)', '过去三年完成的交易（产品、数量、交易对手、金额）') },
    { id: 'pipeline', type: 'textarea', required: true, label: l('Current pipeline', 'Pipeline actual', '当前交易管线'), placeholder: l('Product · volume · buyer · seller · stage · expected closing', 'Producto · volumen · comprador · vendedor · etapa · cierre esperado', '产品 · 数量 · 买方 · 卖方 · 阶段 · 预计成交') },
    { id: 'financingNeed', type: 'multiselect', required: true, options: [
      { value: 'preexport', label: l('Pre-export finance', 'Prefinanciación de exportación', '出口预融资') },
      { value: 'lc', label: l('Letter of credit issuance / confirmation', 'Emisión / confirmación de cartas de crédito', '信用证开立 / 保兑') },
      { value: 'discount', label: l('Receivables discounting', 'Descuento de cobranzas', '应收账款贴现') },
      { value: 'principal', label: l('Catlantic as contracting principal', 'Catlantic como principal contratante', 'Catlantic 作为签约主体') },
      { value: 'execution', label: l('Execution & logistics only', 'Solo ejecución y logística', '仅执行与物流') },
    ], label: l('What you need from Catlantic', 'Qué necesita de Catlantic', '您需要 Catlantic 提供什么') },
    { id: 'dealSize', type: 'number', required: true, half: true, min: 0, label: l('Typical deal size (USD)', 'Tamaño típico de operación (USD)', '典型交易规模（美元）') },
    { id: 'marginExpectation', type: 'text', required: true, half: true, label: l('Expected margin share', 'Participación de margen esperada', '预期利润分成') },
    { id: 'references', type: 'textarea', required: true, label: l('Three professional references', 'Tres referencias profesionales', '三位专业推荐人') },
    { id: 'exclusivity', type: 'radio', required: true, options: yesNo, label: l('Are you bound by any non-compete or exclusivity?', '¿Está sujeto a alguna exclusividad o no competencia?', '您是否受任何竞业限制或排他协议约束？') },
  ],
};

const soloDocsStep: Step = {
  id: 'documents',
  title: l('Documents', 'Documentos', '文件'),
  fields: [
    { id: 'docPassport', type: 'file', required: true, accept: '.pdf,.jpg,.png', label: l('Passport', 'Pasaporte', '护照') },
    { id: 'docAddress', type: 'file', required: true, accept: '.pdf,.jpg,.png', label: l('Proof of address', 'Comprobante de domicilio', '地址证明') },
    { id: 'docCv', type: 'file', required: true, accept: '.pdf', label: l('CV / track record', 'CV / trayectoria', '简历 / 交易记录') },
    { id: 'docBank', type: 'file', accept: '.pdf', label: l('Bank reference', 'Referencia bancaria', '银行推荐') },
  ],
};

const producerStep: Step = {
  id: 'production',
  title: l('Products, capacity & quality', 'Productos, capacidad y calidad', '产品、产能与质量'),
  fields: [
    { id: 'activity', type: 'multiselect', required: true, options: [
      { value: 'grower', label: l('Grower', 'Productor', '种植户') }, { value: 'processor', label: l('Processor / packer', 'Procesador / empacador', '加工 / 包装') }, { value: 'exporter', label: l('Exporter', 'Exportador', '出口商') }, { value: 'miner', label: l('Mining operator', 'Operador minero', '矿业运营商') }, { value: 'coop', label: l('Cooperative', 'Cooperativa', '合作社') },
    ], label: l('Activity', 'Actividad', '业务类型') },
    { id: 'products', type: 'multiselect', required: true, options: products, label: l('Products', 'Productos', '产品') },
    { id: 'specs', type: 'textarea', required: true, label: l('Specifications you can guarantee', 'Especificaciones que puede garantizar', '可保证的规格'), placeholder: l('Grade · moisture · protein / Fe / Mn · foreign matter · packing', 'Grado · humedad · proteína / Fe / Mn · materia extraña · envase', '等级 · 水分 · 蛋白 / 铁 / 锰 · 杂质 · 包装') },
    { id: 'annualCapacity', type: 'number', required: true, half: true, min: 0, label: l('Annual capacity (MT)', 'Capacidad anual (t)', '年产能（吨）') },
    { id: 'availableVolume', type: 'number', required: true, half: true, min: 0, label: l('Volume available for export next season (MT)', 'Volumen disponible para exportar próxima campaña (t)', '下一季可供出口量（吨）') },
    { id: 'hectares', type: 'number', half: true, min: 0, label: l('Hectares / mine output', 'Hectáreas / producción de mina', '公顷数 / 矿山产量') },
    { id: 'seasonality', type: 'text', required: true, half: true, label: l('Harvest / shipping window', 'Ventana de cosecha / embarque', '收获 / 装运窗口') },
    { id: 'certsHeld', type: 'multiselect', required: true, options: certOptions, label: l('Certifications held', 'Certificaciones vigentes', '持有的认证') },
    { id: 'qc', type: 'textarea', required: true, label: l('Quality control: lab, sampling protocol, traceability system', 'Control de calidad: laboratorio, protocolo de muestreo, trazabilidad', '质量控制：实验室、取样规程、追溯系统') },
    { id: 'ports', type: 'text', required: true, half: true, label: l('Ports of loading', 'Puertos de embarque', '装货港') },
    { id: 'loadingCapacity', type: 'text', required: true, half: true, label: l('Loading capacity (containers / bulk per week)', 'Capacidad de carga (contenedores / granel por semana)', '装运能力（每周集装箱 / 散货）') },
    { id: 'exportHistory', type: 'textarea', required: true, label: l('Export history · last 3 years (volumes, destinations, buyers)', 'Historial exportador · últimos 3 años (volúmenes, destinos, compradores)', '出口记录 · 近三年（数量、目的地、买家）') },
    { id: 'exclusivity', type: 'radio', required: true, options: yesNo, label: l('Any exclusivity with other trading houses?', '¿Exclusividad con otras casas comerciales?', '是否与其他贸易商存在排他协议？') },
  ],
};

const lspStep: Step = {
  id: 'lsp',
  title: l('Services, coverage & assets', 'Servicios, cobertura y activos', '服务、覆盖与资产'),
  fields: [
    { id: 'services', type: 'multiselect', required: true, options: lspServices, label: l('Services provided', 'Servicios que provee', '提供的服务') },
    { id: 'coverage', type: 'textarea', required: true, label: l('Geographic coverage (ports, cities, regions)', 'Cobertura geográfica (puertos, ciudades, regiones)', '地理覆盖（港口、城市、区域）') },
    { id: 'licences', type: 'textarea', required: true, label: l('Licences and registrations', 'Licencias y registros', '许可与登记'), placeholder: l('FMC / OTI · customs broker licence · IATA · postal / courier licence · ISO 9001 · others', 'FMC / OTI · licencia de despachante · IATA · licencia postal/courier · ISO 9001 · otros', 'FMC / OTI · 报关许可 · IATA · 邮政/快递许可 · ISO 9001 · 其他') },
    { id: 'assets', type: 'textarea', required: true, label: l('Assets and capacity', 'Activos y capacidad', '资产与运力'), placeholder: l('Vehicles · warehouses (m²) · staff · daily parcel capacity · vessels / TEU allocation', 'Vehículos · depósitos (m²) · personal · capacidad diaria de paquetes · buques / asignación TEU', '车辆 · 仓库（㎡） · 人员 · 日包裹处理能力 · 船舶 / TEU 舱位') },
    { id: 'monthlyVolume', type: 'text', required: true, half: true, label: l('Current monthly volume', 'Volumen mensual actual', '当前月度业务量') },
    { id: 'sla', type: 'text', required: true, half: true, label: l('Standard SLA (transit / delivery time)', 'SLA estándar (tránsito / entrega)', '标准服务水平（运输 / 配送时效）') },
    { id: 'tracking', type: 'select', required: true, half: true, options: [
      { value: 'api', label: l('Real-time API / webhooks', 'API / webhooks en tiempo real', '实时 API / Webhook') }, { value: 'portal', label: l('Web portal', 'Portal web', '网页门户') }, { value: 'manual', label: l('Manual reporting', 'Reporte manual', '人工报告') },
    ], label: l('Tracking & data exchange', 'Tracking e intercambio de datos', '追踪与数据交换') },
    { id: 'insuranceCover', type: 'text', required: true, half: true, label: l('Liability insurance and limit', 'Seguro de responsabilidad y límite', '责任保险及限额') },
    { id: 'majorClients', type: 'textarea', required: true, label: l('Principal clients (three) and years of service', 'Principales clientes (tres) y años de servicio', '主要客户（三家）及服务年限') },
    { id: 'incidents', type: 'radio', required: true, options: yesNo, label: l('Any major cargo loss, licence suspension or regulatory sanction in the last 5 years?', '¿Pérdida mayor de carga, suspensión de licencia o sanción regulatoria en los últimos 5 años?', '过去五年是否有重大货损、许可暂停或监管处罚？') },
  ],
};

/* ------------------------------------------------------------------ */
/* Profiles                                                             */
/* ------------------------------------------------------------------ */

export const profiles: Profile[] = [
  {
    id: 'trading',
    side: 'client',
    titleKey: 'profile.trading.title',
    bodyKey: 'profile.trading.body',
    reqKey: 'profile.trading.req',
    steps: [companyStep, contactsStep, tradingStep, financialStep, documentsStep],
  },
  {
    id: 'logistics',
    side: 'client',
    titleKey: 'profile.logistics.title',
    bodyKey: 'profile.logistics.body',
    reqKey: 'profile.logistics.req',
    steps: [companyStep, contactsStep, logisticsStep, financialStep, documentsStep],
  },
  {
    id: 'solo',
    side: 'client',
    titleKey: 'profile.solo.title',
    bodyKey: 'profile.solo.body',
    reqKey: 'profile.solo.req',
    steps: [soloIdentityStep, soloTrackStep, soloDocsStep],
  },
  {
    id: 'producer',
    side: 'supplier',
    titleKey: 'profile.producer.title',
    bodyKey: 'profile.producer.body',
    reqKey: 'profile.producer.req',
    steps: [companyStep, contactsStep, producerStep, financialStep, documentsStep],
  },
  {
    id: 'lsp',
    side: 'supplier',
    titleKey: 'profile.lsp.title',
    bodyKey: 'profile.lsp.body',
    reqKey: 'profile.lsp.req',
    steps: [companyStep, contactsStep, lspStep, financialStep, documentsStep],
  },
];

/**
 * Where applications go. FormSubmit's AJAX endpoint forwards the JSON payload to
 * this mailbox without a backend; the first submission triggers a one-time
 * activation email to the address. Replace with your own endpoint if preferred.
 */
export const APPLICATION_ENDPOINT = 'https://formsubmit.co/ajax/onboarding@catlanticpartners.com';
