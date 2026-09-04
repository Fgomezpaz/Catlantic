import type { SVGProps } from 'react';

type GlyphProps = SVGProps<SVGSVGElement>;

const base: GlyphProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function SoybeanGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 30c0-6 5-11 11-11s9 4 9 8-4 7-9 7-11-1-11-4Z" />
      <path d="M18 22c-1-4 1-9 6-11 4-1 8 1 8 4" />
      <circle cx="28" cy="27" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="21" cy="28" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CornGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 8c6 4 8 11 8 18 0 8-4 14-8 14s-8-6-8-14c0-7 2-14 8-18Z" />
      <path d="M24 8v32M17 20h14M16.5 28h15M18 35h12" strokeOpacity={0.55} />
    </svg>
  );
}

export function ChiaGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="17" cy="19" rx="4" ry="6" transform="rotate(-25 17 19)" />
      <ellipse cx="31" cy="19" rx="4" ry="6" transform="rotate(25 31 19)" />
      <ellipse cx="24" cy="31" rx="4" ry="6" />
      <circle cx="24" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function QuinoaGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="24" r="2.2" strokeOpacity={0.6} />
      <circle cx="13" cy="15" r="2.4" />
      <circle cx="35" cy="15" r="2.4" />
      <circle cx="13" cy="33" r="2.4" />
      <circle cx="35" cy="33" r="2.4" />
    </svg>
  );
}

export function GarlicGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 12c-1 4-9 6-9 15 0 6 4 10 9 10s9-4 9-10c0-9-8-11-9-15Z" />
      <path d="M24 12c-.5-3 0-5 2-7M24 20v17M18.5 24c1 5 3 9 5.5 13M29.5 24c-1 5-3 9-5.5 13" strokeOpacity={0.55} />
    </svg>
  );
}

export function PulsesGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 16c3-4 9-4 11 0 3-4 9-4 11 0-1 9-6 15-11 18-5-3-10-9-11-18Z" />
      <path d="M23 16v18" strokeOpacity={0.55} />
    </svg>
  );
}

export function SesameGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 11c4 4 6 8 6 13 0 6-3 11-6 13-3-2-6-7-6-13 0-5 2-9 6-13Z" />
      <path d="M24 11v26" strokeOpacity={0.55} />
      <path d="M13 24h4M31 24h4" strokeOpacity={0.55} />
    </svg>
  );
}

export function ManganeseGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 32 20 16l7 6 5-9 7 19H13Z" />
      <path d="M20 16v16M27 22v10M32 13v19" strokeOpacity={0.5} />
    </svg>
  );
}

export function IronOreGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 33 18 20l6 4 5-11 7 20H12Z" />
      <circle cx="16" cy="36" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="22" cy="37" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="36" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SunflowerGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="6" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 24 + Math.cos(a) * 9;
        const y1 = 24 + Math.sin(a) * 9;
        const x2 = 24 + Math.cos(a) * 15;
        const y2 = 24 + Math.sin(a) * 15;
        return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} />;
      })}
    </svg>
  );
}
