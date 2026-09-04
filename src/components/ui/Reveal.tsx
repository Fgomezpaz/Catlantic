import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'span';
}

export function Reveal({ children, delay = 0, y = 28, className, once = true, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.9, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once, margin: '-12% 0px' }}>
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
