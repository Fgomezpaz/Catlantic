import type { Commodity, CommodityFamily } from '../types';
import { l } from '../i18n/l';

export const commodities: Commodity[] = [
  {
    id: 'soybean',
    name: l('Soybean', 'Soja', '大豆'),
    family: 'grain',
    origins: ['Argentina', 'Brazil', 'Paraguay'],
    incoterms: ['FOB', 'CFR', 'CIF'],
    packing: l('Bulk · 25kg / 50kg PP bags · 1MT big bags', 'Granel · bolsas PP 25/50 kg · big bags 1 t', '散装 · 25/50kg 编织袋 · 1吨吨袋'),
    note: l(
      'Food-grade and crush-grade lots, protein and moisture specified per contract.',
      'Lotes grado alimenticio y para molienda, con proteína y humedad especificadas por contrato.',
      '食品级与压榨级批次，蛋白质与水分按合同规定。',
    ),
  },
  {
    id: 'corn',
    name: l('Yellow Corn', 'Maíz amarillo', '黄玉米'),
    family: 'grain',
    origins: ['Argentina', 'Brazil'],
    incoterms: ['FOB', 'CFR'],
    packing: l('Bulk · 50kg PP bags', 'Granel · bolsas PP 50 kg', '散装 · 50kg 编织袋'),
    note: l(
      'Feed and industrial grades, aflatoxin tested at loading.',
      'Grados forrajero e industrial, con análisis de aflatoxinas al embarque.',
      '饲料级与工业级，装货时进行黄曲霉毒素检测。',
    ),
  },
  {
    id: 'chia',
    name: l('Chia Seed', 'Semilla de chía', '奇亚籽'),
    family: 'organics',
    origins: ['Paraguay', 'Argentina'],
    incoterms: ['FOB', 'CFR', 'DAP'],
    packing: l('25kg kraft · 1MT big bags', 'Kraft 25 kg · big bags 1 t', '25kg 牛皮纸袋 · 1吨吨袋'),
    note: l(
      'Certified organic lots with purity above 99.9% and full lot traceability.',
      'Lotes orgánicos certificados con pureza superior al 99,9 % y trazabilidad completa.',
      '有机认证批次，纯度高于 99.9%，全程批次可追溯。',
    ),
  },
  {
    id: 'quinoa',
    name: l('Quinoa', 'Quinua', '藜麦'),
    family: 'organics',
    origins: ['Peru'],
    incoterms: ['FOB', 'CFR'],
    packing: l('25kg kraft · 1MT big bags', 'Kraft 25 kg · big bags 1 t', '25kg 牛皮纸袋 · 1吨吨袋'),
    note: l(
      'White, red and tricolor. Saponin-washed, ready for retail packing.',
      'Blanca, roja y tricolor. Lavada de saponina, lista para envasado minorista.',
      '白色、红色与三色。已脱皂苷，可直接零售分装。',
    ),
  },
  {
    id: 'garlic',
    name: l('Garlic', 'Ajo', '大蒜'),
    family: 'organics',
    origins: ['Argentina', 'Peru'],
    incoterms: ['FOB', 'CFR'],
    packing: l('10kg cartons · mesh bags', 'Cajas 10 kg · bolsas malla', '10kg 纸箱 · 网袋'),
    note: l(
      'Purple and white varieties, cold-chain from packhouse to port.',
      'Variedades morada y blanca, cadena de frío del empaque al puerto.',
      '紫皮与白皮品种，从包装厂到港口全程冷链。',
    ),
  },
  {
    id: 'pulses',
    name: l('Pulses & Beans', 'Legumbres', '豆类'),
    family: 'grain',
    origins: ['Argentina', 'Peru', 'Brazil'],
    incoterms: ['FOB', 'CFR'],
    packing: l('25kg / 50kg PP bags', 'Bolsas PP 25/50 kg', '25/50kg 编织袋'),
    note: l(
      'Chickpeas, black beans, lentils and mung — machine-cleaned and colour-sorted.',
      'Garbanzos, porotos negros, lentejas y mung — limpiados a máquina y seleccionados por color.',
      '鹰嘴豆、黑豆、扁豆与绿豆——机械清选与色选。',
    ),
  },
  {
    id: 'sesame',
    name: l('Sesame Seed', 'Sésamo', '芝麻'),
    family: 'raw',
    origins: ['Paraguay'],
    incoterms: ['FOB', 'CFR'],
    packing: l('25kg / 50kg PP bags', 'Bolsas PP 25/50 kg', '25/50kg 编织袋'),
    note: l(
      'Natural and hulled, oil content specified, sortex-cleaned.',
      'Natural y pelado, contenido de aceite especificado, limpieza Sortex.',
      '原色与脱皮，含油量按规格，Sortex 色选。',
    ),
  },
  {
    id: 'manganese',
    name: l('Manganese Ore', 'Mineral de manganeso', '锰矿'),
    family: 'raw',
    origins: ['Brazil'],
    incoterms: ['FOB', 'CIF'],
    packing: l('Bulk · Supramax / Panamax', 'Granel · Supramax / Panamax', '散货 · 超灵便型 / 巴拿马型'),
    note: l(
      '38–44% Mn lumps and fines for the Chinese alloy market, assayed at loading and discharge.',
      'Terrones y finos de 38–44 % Mn para el mercado chino de aleaciones, con ensayo en carga y descarga.',
      '38–44% 锰块矿与粉矿，面向中国合金市场，装卸港双检。',
    ),
  },
  {
    id: 'ironore',
    name: l('Iron Ore Fines', 'Finos de mineral de hierro', '铁矿粉'),
    family: 'raw',
    origins: ['Brazil'],
    incoterms: ['FOB', 'CFR'],
    packing: l('Bulk · Panamax / Capesize', 'Granel · Panamax / Capesize', '散货 · 巴拿马型 / 好望角型'),
    note: l(
      '62–65% Fe sinter feed and pellet feed, contracted against index with quality adjustments.',
      'Sinter feed y pellet feed de 62–65 % Fe, contratados contra índice con ajustes por calidad.',
      '62–65% 铁烧结粉与球团粉，按指数定价并作质量调整。',
    ),
  },
  {
    id: 'sunflower',
    name: l('Sunflower Kernel', 'Pepita de girasol', '葵花籽仁'),
    family: 'raw',
    origins: ['Argentina'],
    incoterms: ['FOB', 'CFR'],
    packing: l('25kg vacuum · 1MT big bags', 'Vacío 25 kg · big bags 1 t', '25kg 真空袋 · 1吨吨袋'),
    note: l(
      'Bakery and confectionery grades, kernel size graded on request.',
      'Grados panadería y confitería, con calibrado de pepita a pedido.',
      '烘焙级与糖果级，可按需分级籽仁大小。',
    ),
  },
];

export const commodityFamilies: CommodityFamily[] = ['grain', 'organics', 'raw'];
