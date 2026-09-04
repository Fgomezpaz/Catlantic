import type { L10n } from '../i18n/types';

export type MarketRegion = 'USA' | 'Asia' | 'MENA' | 'EU';

export type CommodityFamily = 'grain' | 'organics' | 'raw';

export interface Commodity {
  id: string;
  name: L10n;
  family: CommodityFamily;
  origins: string[];
  incoterms: string[];
  packing: L10n;
  note: L10n;
}

export interface Quote {
  id: string;
  commodity: L10n;
  grade: L10n;
  basis: string;
  origin: string;
  destination: MarketRegion;
  price: number;
  unit: string;
  decimals?: number;
  changePct: number;
}

export type LaneDirection = 'export' | 'import';
export type Cadence = 'weekly' | 'fortnightly' | 'monthly';
export type LaneMode = 'bulk' | 'container' | 'ecommerce' | 'minerals';

export interface TradeLane {
  id: string;
  direction: LaneDirection;
  from: { label: string; lat: number; lon: number };
  to: { label: string; lat: number; lon: number };
  region: MarketRegion;
  transitDays: number;
  cadence: Cadence;
  modes: LaneMode[];
}

export interface Certification {
  id: string;
  label: L10n;
  authority: L10n;
  scope: L10n;
  markets: MarketRegion[];
}

export interface ProcessStage {
  id: string;
  index: string;
  title: L10n;
  body: L10n;
  markers: L10n[];
}

export type ShipmentStatus = 'onschedule' | 'atorigin' | 'customs' | 'delayed' | 'delivered';

export interface Shipment {
  id: string;
  reference: string;
  commodity: L10n;
  quantityMt: number;
  vessel: string;
  lane: string;
  etd: string;
  eta: string;
  status: ShipmentStatus;
  progress: number;
}

export interface SeriesPoint {
  t: string;
  v: number;
}

export interface Series {
  id: string;
  label: L10n;
  short: L10n;
  unit: string;
  points: SeriesPoint[];
}

export interface VolumeSlice {
  id: string;
  label: L10n;
  valueMt: number;
  emphasis?: boolean;
}
