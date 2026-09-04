import type { Config } from 'tailwindcss';

/**
 * Catlantic design tokens.
 *
 * Every colour resolves through a CSS custom property (see src/styles/index.css)
 * so the same utility classes render the dark theme by default and the light
 * theme when <html data-theme="light"> is set. "ink" is always the surface
 * scale and "paper" the foreground: in light mode the scale is simply flipped.
 * Accent: Atlantic blue with a lighter celeste and a deeper marine step.
 */
const v = (name: string): string => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: v('ink-950'),
          900: v('ink-900'),
          850: v('ink-850'),
          800: v('ink-800'),
          700: v('ink-700'),
          600: v('ink-600'),
        },
        line: {
          DEFAULT: 'rgb(var(--c-paper) / 0.10)',
          strong: 'rgb(var(--c-paper) / 0.18)',
        },
        paper: v('paper'),
        muted: v('muted'),
        faint: v('faint'),
        atlantic: {
          DEFAULT: v('atlantic'),
          soft: v('atlantic-soft'),
          deep: v('atlantic-deep'),
        },
        slate: v('slate'),
        series: {
          1: '#3987E5',
          2: '#D95926',
          3: '#199E70',
        },
        status: {
          good: '#3FB27F',
          warn: '#D9A441',
          serious: '#DC7633',
          critical: '#E05C5C',
        },
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid scale — mobile through ultra-wide with no breakpoint jumps.
        'fluid-xs': ['clamp(0.72rem, 0.70rem + 0.10vw, 0.78rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.82rem, 0.79rem + 0.15vw, 0.92rem)', { lineHeight: '1.55' }],
        'fluid-base': ['clamp(0.95rem, 0.90rem + 0.25vw, 1.12rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1.10rem, 1.00rem + 0.50vw, 1.45rem)', { lineHeight: '1.45' }],
        'fluid-xl': ['clamp(1.45rem, 1.20rem + 1.20vw, 2.30rem)', { lineHeight: '1.20' }],
        'fluid-2xl': ['clamp(2.00rem, 1.40rem + 2.80vw, 4.00rem)', { lineHeight: '1.05' }],
        'fluid-3xl': ['clamp(2.60rem, 1.40rem + 5.20vw, 6.25rem)', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        wider: '0.12em',
        widest: '0.24em',
      },
      maxWidth: {
        shell: '96rem',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        breathe: 'breathe 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
