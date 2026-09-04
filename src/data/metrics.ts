import type { MessageKey } from '../i18n/messages';
import { lanes } from './lanes';

export interface Metric {
  id: string;
  value: number;
  suffix?: string;
  decimals?: number;
  labelKey: MessageKey;
  captionKey: MessageKey;
}

export const metrics: Metric[] = [
  { id: 'origins', value: 4, labelKey: 'metric.origins', captionKey: 'metric.origins.cap' },
  { id: 'lanes', value: lanes.length, labelKey: 'metric.lanes', captionKey: 'metric.lanes.cap' },
  { id: 'certifications', value: 8, labelKey: 'metric.certs', captionKey: 'metric.certs.cap' },
  { id: 'transit', value: 21, suffix: 'd', labelKey: 'metric.transit', captionKey: 'metric.transit.cap' },
];
