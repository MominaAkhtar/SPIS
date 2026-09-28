/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0F19',
          dark: '#090B13',
          subtle: '#111416',
        },
        surface: {
          DEFAULT: '#111827',
          elevated: '#152033',
          hover: '#1A2840',
          active: '#1E304D',
          subtle: '#0E1420',
          card: '#111827',
        },
        border: {
          DEFAULT: '#1B2638',
          subtle: '#191E26',
          strong: '#263954',
          focus: '#00BFA5',
        },
        primary: {
          light: '#2DCCA7',
          DEFAULT: '#00BFA5',
          dark: '#009984',
          hover: '#2DCCA7',
          glow: 'rgba(0, 191, 165, 0.15)',
          subtle: '#07231F',
        },
        accent: {
          cyan: '#00C7FF',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
          amber: '#F59E0B',
          orange: '#F97316',
          rose: '#EF4444',
        },
        spis: {
          bg: '#0B0F19',
          sidebar: '#0D111E',
          card: '#111827',
          cardElevated: '#152033',
          cardHover: '#1A2840',
          border: '#1B2638',
          borderLight: '#263954',
          green: '#00BFA5',
          greenHover: '#2DCCA7',
          greenDark: '#07231F',
          cyan: '#00C7FF',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          red: '#EF4444',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        glowGreen: '0 0 16px rgba(0, 210, 132, 0.25)',
        glowCyan: '0 0 16px rgba(0, 199, 255, 0.25)',
        popover: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
      },
      letterSpacing: {
        widest: '.15em',
      },
    },
  },
  plugins: [],
};
