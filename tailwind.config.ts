import type { Config } from 'tailwindcss';

/**
 * Catlantic design tokens.
 * Warm luxury dark: paper-white ink on near-black clay-tinted surfaces,
 * with a single clay accent and a restrained wheat-gold secondary.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0A09',
          900: '#100F0C',
          850: '#17150F',
          800: '#1D1B16',
          700: '#26231C',
          600: '#332F26',
        },
        line: {
          DEFAULT: 'rgba(250,249,245,0.10)',
          strong: 'rgba(250,249,245,0.18)',
        },
        paper: '#FAF9F5',
        muted: '#A9A296',
        faint: '#6F6960',
        clay: {
          DEFAULT: '#D97757',
          soft: '#E8A088',
          deep: '#B4553A',
        },
        wheat: '#C9A961',
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
