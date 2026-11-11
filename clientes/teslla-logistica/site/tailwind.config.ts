import type { Config } from 'tailwindcss';

// Tokens extraídos do site atual (ver ../06-design-system.md).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '15px', screens: { xl: '1200px' } },
    extend: {
      colors: {
        primary: { DEFAULT: '#CC1111', dark: '#A80E0E' },
        dark: '#0F1B24',
        body: '#757575',
        grey: '#F9F9F9',
        line: '#DDDDDD',
        whatsapp: '#25D366',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        nav: ['var(--font-nav)', 'sans-serif'],
      },
      fontSize: { eyebrow: ['18px', '1.2'] },
      maxWidth: { container: '1170px' },
      boxShadow: {
        card: '0 3px 15px rgba(15, 27, 36, 0.1)',
        quote: '0 16px 40px rgba(15, 27, 36, 0.1)',
      },
      transitionTimingFunction: { teslla: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' },
      keyframes: { marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 30s linear infinite' },
    },
  },
  plugins: [],
};
export default config;
