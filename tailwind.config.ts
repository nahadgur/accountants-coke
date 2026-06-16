import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      colors: {
        // charcoal / slate ink — brand surfaces (hero, footer) + text
        navy: {
          50: '#f5f6f7',
          100: '#e6e8ea',
          200: '#c9cdd3',
          300: '#a3a9b2',
          400: '#6d7480',
          600: '#39414e',
          700: '#2c3440',
          800: '#1e2530',
          900: '#14181f',
          950: '#0e1116',
        },
        // teal — single functional accent (CTAs, links, verified)
        brand: {
          50: '#eefbf9',
          100: '#d4f5f0',
          200: '#aceae2',
          300: '#76d9ce',
          400: '#38c3b6',
          500: '#16b1a4',
          600: '#11a39a',
          700: '#0d7f78',
          800: '#0f6660',
          900: '#11534f',
        },
        // alias kept pointing at teal so legacy `emerald-*` usages stay on-palette
        emerald: {
          50: '#eefbf9',
          100: '#d4f5f0',
          200: '#aceae2',
          500: '#16b1a4',
          600: '#11a39a',
          700: '#0d7f78',
          800: '#0f6660',
        },
        // gold — reserved strictly for the Premium badge, used sparingly
        gold: {
          50: '#fbf6e9',
          100: '#f5ebcf',
          400: '#d9b85e',
          500: '#c9a24b',
          600: '#a9863a',
          700: '#866a2e',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(20,24,31,0.05), 0 4px 12px -3px rgba(20,24,31,0.08)',
        lift: '0 2px 6px -2px rgba(20,24,31,0.08), 0 12px 28px -8px rgba(20,24,31,0.16)',
        panel:
          '0 2px 8px -2px rgba(20,24,31,0.10), 0 32px 64px -24px rgba(20,24,31,0.34)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(to right, rgba(20,24,31,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,24,31,0.05) 1px, transparent 1px)',
        'brand-fade':
          'radial-gradient(60% 60% at 75% 10%, rgba(17,163,154,0.12) 0%, transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
