import type { Series, Shipment, VolumeSlice } from '../types';
import { l, same } from '../i18n/l';

export const shipments: Shipment[] = [
  {
    id: 'CTL-24-0417',
    reference: 'CTL-24-0417',
    commodity: l('Soybean · food grade', 'Soja · grado alimenticio', '大豆 · 食品级'),
    quantityMt: 1200,
    vessel: 'MV Aurora Bay',
    lane: 'Rosario → Houston',
    etd: '2026-08-18',
    eta: '2026-09-11',
    status: 'onschedule',
    progress: 0.72,
  },
  {
    id: 'CTL-24-0421',
    reference: 'CTL-24-0421',
    commodity: l('Chia seed · organic', 'Chía · orgánica', '奇亚籽 · 有机'),
    quantityMt: 48,
    vessel: 'MSC Lucia · 2×40′',
    lane: 'Asunción → Houston',
    etd: '2026-08-24',
    eta: '2026-09-19',
    status: 'onschedule',
    progress: 0.41,
  },
  {
    id: 'CTL-24-0409',
    reference: 'CTL-24-0409',
    commodity: l('Yellow corn · feed', 'Maíz amarillo · forrajero', '黄玉米 · 饲料级'),
    quantityMt: 3800,
    vessel: 'MV Iron Meridian',
    lane: 'Santos → Qingdao',
    etd: '2026-08-02',
    eta: '2026-09-09',
    status: 'customs',
    progress: 0.96,
  },
  {
    id: 'CTL-24-0419',
    reference: 'CTL-24-0419',
    commodity: l('Manganese ore · 44% Mn', 'Manganeso · 44 % Mn', '锰矿 · 44% Mn'),
    quantityMt: 5500,
    vessel: 'MV Cape Verde',
    lane: 'Vitória → Tianjin',
    etd: '2026-08-06',
    eta: '2026-09-16',
    status: 'onschedule',
    progress: 0.68,
  },
  {
    id: 'CTL-24-0430',
    reference: 'CTL-24-0430',
    commodity: l('E-commerce consolidation · 1×40′', 'Consolidado e-commerce · 1×40′', '电商集拼 · 1×40′'),
    quantityMt: 9,
    vessel: 'ONE Apus · Shanghai',
    lane: 'Shanghai → Buenos Aires',
    etd: '2026-08-29',
    eta: '2026-10-06',
    status: 'onschedule',
    progress: 0.15,
  },
  {
    id: 'CTL-24-0426',
    reference: 'CTL-24-0426',
    commodity: l('Chickpeas · Kabuli 9mm', 'Garbanzos · Kabuli 9 mm', '鹰嘴豆 · Kabuli 9mm'),
    quantityMt: 240,
    vessel: 'CMA CGM Tage · 10×40′',
    lane: 'Bahía Blanca → Jeddah',
    etd: '2026-09-02',
    eta: '2026-10-01',
    status: 'atorigin',
    progress: 0.08,
  },
  {
    id: 'CTL-24-0412',
    reference: 'CTL-24-0412',
    commodity: l('Sesame seed · natural', 'Sésamo · natural', '芝麻 · 原色'),
    quantityMt: 120,
    vessel: 'Maersk Elba · 5×40′',
    lane: 'Montevideo → Jebel Ali',
    etd: '2026-08-10',
    eta: '2026-09-13',
    status: 'delayed',
    progress: 0.83,
  },
  {
    id: 'CTL-24-0398',
    reference: 'CTL-24-0398',
    commodity: l('Quinoa · organic white', 'Quinua · orgánica blanca', '藜麦 · 有机白'),
    quantityMt: 60,
    vessel: 'Hapag Valparaíso · 3×40′',
    lane: 'Callao → Rotterdam',
    etd: '2026-07-28',
    eta: '2026-08-21',
    status: 'delivered',
    progress: 1,
  },
];

const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

function series(id: string, label: Series['label'], short: Series['short'], values: number[]): Series {
  return { id, label, short, unit: 'index', points: values.map((v, i) => ({ t: months[i] ?? `M${i}`, v })) };
}

/** Indexed price series (Mar = 100) — the chart compares direction, not absolute levels. */
export const priceSeries: Series[] = [
  series('soybean', same('Soybean FOB Up River'), l('Soybean', 'Soja', '大豆'), [100, 101.4, 99.2, 102.8, 104.6, 103.1, 105.9]),
  series('chia', same('Chia CFR Houston'), l('Chia', 'Chía', '奇亚籽'), [100, 103.2, 106.1, 108.4, 107.2, 110.5, 112.3]),
  series('sesame', same('Sesame FOB Montevideo'), l('Sesame', 'Sésamo', '芝麻'), [100, 98.6, 97.1, 99.4, 101.8, 100.2, 98.9]),
];

export const volumeByDestination: VolumeSlice[] = [
  { id: 'asia', label: l('Asia · incl. minerals', 'Asia · incl. minerales', '亚洲 · 含矿产'), valueMt: 9300, emphasis: true },
  { id: 'usa', label: l('United States', 'Estados Unidos', '美国'), valueMt: 2640 },
  { id: 'mena', label: same('MENA'), valueMt: 860 },
  { id: 'eu', label: l('Europe', 'Europa', '欧洲'), valueMt: 420 },
];

export const dashboardKpis = [
  { id: 'open', labelKey: 'dash.kpi.open' as const, value: 7, delta: l('+2 this week', '+2 esta semana', '本周 +2'), tone: 'neutral' as const },
  { id: 'tonnage', labelKey: 'dash.kpi.tonnage' as const, value: 10917, suffix: ' MT', delta: l('+6.4% vs Aug', '+6,4 % vs. ago.', '较 8 月 +6.4%'), tone: 'good' as const },
  { id: 'ontime', labelKey: 'dash.kpi.ontime' as const, value: 96.2, suffix: '%', decimals: 1, delta: l('+1.1 pts', '+1,1 pts', '+1.1 个百分点'), tone: 'good' as const },
  { id: 'docs', labelKey: 'dash.kpi.docs' as const, value: 3, delta: l('2 due in 48h', '2 vencen en 48 h', '2 项 48 小时内到期'), tone: 'warn' as const },
];
