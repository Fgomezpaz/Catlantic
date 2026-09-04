import type { Variants } from 'framer-motion';

export const EASE_SWIFT = [0.22, 1, 0.36, 1] as const;

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SWIFT } },
};
