/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F1',
        cream: '#F3EBE0',
        sand: '#E6D8C5',
        gold: { DEFAULT: '#B8894A', light: '#D9B47A', deep: '#8C6430' },
        espresso: '#2A1F17',
        cocoa: '#5B4636',
        mist: '#8A7A6C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 30px 60px -20px rgba(42,31,23,.25), 0 12px 24px -12px rgba(184,137,74,.25)',
        glow: '0 0 0 1px rgba(217,180,122,.35), 0 20px 50px -15px rgba(184,137,74,.55)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
