import type { Certification, ProcessStage } from '../types';
import { l, same } from '../i18n/l';

export const certifications: Certification[] = [
  {
    id: 'kosher',
    label: l('Kosher', 'Kosher', '犹太洁食'),
    authority: l('Recognised certifying agency', 'Agencia certificadora reconocida', '获认可的认证机构'),
    scope: l(
      'Plant, line and lot certification with supervision at packing.',
      'Certificación de planta, línea y lote con supervisión en el empaque.',
      '工厂、生产线与批次认证，包装环节现场监督。',
    ),
    markets: ['USA', 'Asia', 'MENA', 'EU'],
  },
  {
    id: 'halal',
    label: l('Halal', 'Halal', '清真'),
    authority: l('Accredited certification body', 'Organismo de certificación acreditado', '经认可的认证机构'),
    scope: l(
      'Origin-to-port chain of custody with segregated storage.',
      'Cadena de custodia de origen a puerto con almacenaje segregado.',
      '产地到港口的监管链，隔离存储。',
    ),
    markets: ['MENA', 'Asia'],
  },
  {
    id: 'organic',
    label: l('Organic', 'Orgánico', '有机'),
    authority: same('USDA NOP / EU'),
    scope: l(
      'Certified operator, transaction certificates issued per shipment.',
      'Operador certificado, certificados de transacción emitidos por embarque.',
      '认证经营者，按船次出具交易证书。',
    ),
    markets: ['USA', 'EU'],
  },
  {
    id: 'nongmo',
    label: l('Non-GMO', 'Non-GMO', '非转基因'),
    authority: l('Third-party verification', 'Verificación de terceros', '第三方验证'),
    scope: l(
      'Identity-preserved lots with PCR testing on request.',
      'Lotes con identidad preservada y análisis PCR a pedido.',
      '身份保持批次，可按需进行 PCR 检测。',
    ),
    markets: ['USA', 'EU'],
  },
  {
    id: 'globalgap',
    label: same('GLOBALG.A.P.'),
    authority: l('Farm assurance', 'Aseguramiento en finca', '农场保证'),
    scope: l('Good agricultural practice at grower level.', 'Buenas prácticas agrícolas a nivel de productor.', '种植户层面的良好农业规范。'),
    markets: ['EU', 'USA'],
  },
  {
    id: 'haccp',
    label: same('HACCP / ISO 22000'),
    authority: l('Food safety management', 'Gestión de inocuidad', '食品安全管理'),
    scope: l(
      'Documented hazard control across handling and packing.',
      'Control de peligros documentado en manipulación y empaque.',
      '装卸与包装环节的书面危害控制。',
    ),
    markets: ['USA', 'Asia', 'MENA', 'EU'],
  },
  {
    id: 'fsvp',
    label: same('FSVP & Prior Notice'),
    authority: same('US FDA'),
    scope: l(
      'Foreign supplier verification and entry filing for US arrivals.',
      'Verificación de proveedor extranjero y declaración de ingreso para arribos a EE. UU.',
      '面向美国到港货物的境外供应商验证与入境申报。',
    ),
    markets: ['USA'],
  },
  {
    id: 'sgs',
    label: l('Independent inspection', 'Inspección independiente', '独立检验'),
    authority: same('SGS / Control Union'),
    scope: l(
      'Quality, weight and fumigation certificates at loading.',
      'Certificados de calidad, peso y fumigación al embarque.',
      '装货时出具质量、重量与熏蒸证书。',
    ),
    markets: ['USA', 'Asia', 'MENA', 'EU'],
  },
];

export const processStages: ProcessStage[] = [
  {
    id: 'origination',
    index: '01',
    title: l('Origination', 'Originación', '货源'),
    body: l(
      'We contract directly with growers and processing plants across Argentina, Brazil, Paraguay and Peru, holding the grade specification before a single bag is filled.',
      'Contratamos directamente con productores y plantas procesadoras en Argentina, Brasil, Paraguay y Perú, fijando la especificación de grado antes de llenar la primera bolsa.',
      '我们直接与阿根廷、巴西、巴拉圭和秘鲁的种植户与加工厂签约，在装第一袋之前锁定等级规格。',
    ),
    markers: [
      l('Grower contracts', 'Contratos con productores', '种植户合同'),
      l('Crop calendar planning', 'Planificación por calendario de cosecha', '作物日历规划'),
      l('Counterparty due diligence', 'Due diligence de contrapartes', '交易对手尽职调查'),
    ],
  },
  {
    id: 'quality',
    index: '02',
    title: l('Quality & certification', 'Calidad y certificación', '质量与认证'),
    body: l(
      'Every lot is sampled, tested and certified at origin. Kosher, Halal and organic supervision happens on the line, not on paper after the fact.',
      'Cada lote se muestrea, analiza y certifica en origen. La supervisión Kosher, Halal y orgánica ocurre en la línea, no en papel después del hecho.',
      '每个批次在产地取样、检测并认证。犹太洁食、清真与有机监督在生产线上进行，而非事后补办。',
    ),
    markers: [
      l('Lot sampling', 'Muestreo por lote', '批次取样'),
      l('Third-party inspection', 'Inspección de terceros', '第三方检验'),
      l('Certificates issued per shipment', 'Certificados por embarque', '按船次出具证书'),
    ],
  },
  {
    id: 'logistics',
    index: '03',
    title: l('Logistics execution', 'Ejecución logística', '物流执行'),
    body: l(
      'Booking, stuffing supervision, documentation and customs filing run as one file. Bulk and container move under the same control desk.',
      'Reserva, supervisión de consolidado, documentación y despacho aduanero corren como un solo legajo. Granel y contenedor bajo la misma mesa de control.',
      '订舱、装箱监督、单证与报关作为一份档案运行。散货与集装箱由同一控制台管理。',
    ),
    markers: [
      l('Vessel & box booking', 'Reserva de buque y contenedor', '船舶与箱位订舱'),
      l('Stuffing supervision', 'Supervisión de consolidado', '装箱监督'),
      l('Documentary credit handling', 'Gestión de créditos documentarios', '跟单信用证处理'),
    ],
  },
  {
    id: 'delivery',
    index: '04',
    title: l('Delivery & settlement', 'Entrega y liquidación', '交付与结算'),
    body: l(
      'Arrival is managed through to the buyer’s warehouse, with discharge supervision, claims handling and settlement against agreed terms.',
      'El arribo se gestiona hasta el depósito del comprador, con supervisión de descarga, gestión de reclamos y liquidación según lo acordado.',
      '到港后管理直至买方仓库，包括卸货监督、索赔处理及按约定条款结算。',
    ),
    markers: [
      l('Discharge supervision', 'Supervisión de descarga', '卸货监督'),
      l('Claims & quality resolution', 'Reclamos y resolución de calidad', '索赔与质量争议解决'),
      l('Settlement', 'Liquidación', '结算'),
    ],
  },
];
