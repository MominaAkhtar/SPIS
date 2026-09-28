/**
 * SPIS Theme Definition
 * Matches the dark cyber-intelligence UI design system seen in the SPIS Figma & PDF designs.
 */

export const theme = {
  colors: {
    // Base platform backgrounds
    background: {
      DEFAULT: '#0B0F19',
      dark: '#090B13',
      subtle: '#111416',
    },
    // Surface & card levels
    surface: {
      DEFAULT: '#111827',
      elevated: '#152033',
      hover: '#1A2840',
      active: '#1E304D',
      subtle: '#0E1420',
    },
    // Borders
    border: {
      DEFAULT: '#1B2638',
      subtle: '#191E26',
      strong: '#263954',
      focus: '#00BFA5',
    },
    // Brand Primary (Vibrant Emerald / Mint Green)
    primary: {
      light: '#2DCCA7',
      DEFAULT: '#00BFA5',
      dark: '#009984',
      hover: '#2DCCA7',
      glow: 'rgba(0, 191, 165, 0.15)',
      subtle: '#07231F',
    },
    // Secondary Accent Palette
    accent: {
      cyan: '#00C7FF',
      blue: '#3B82F6',
      purple: '#8B5CF6',
      pink: '#EC4899',
      indigo: '#6366F1',
    },
    // Risk & Status Colors
    status: {
      low: {
        text: '#00BFA5',
        bg: 'rgba(0, 191, 165, 0.12)',
        border: 'rgba(0, 191, 165, 0.3)',
      },
      medium: {
        text: '#F59E0B',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.3)',
      },
      high: {
        text: '#F97316',
        bg: 'rgba(249, 115, 22, 0.12)',
        border: 'rgba(249, 115, 22, 0.3)',
      },
      critical: {
        text: '#EF4444',
        bg: 'rgba(239, 68, 68, 0.12)',
        border: 'rgba(239, 68, 68, 0.3)',
      },
      info: {
        text: '#00C7FF',
        bg: 'rgba(0, 199, 255, 0.12)',
        border: 'rgba(0, 199, 255, 0.3)',
      },
    },
    // Typography Text Colors
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      dimmed: '#475569',
      inverse: '#090B13',
      brand: '#00BFA5',
    },
  },
  borderRadius: {
    xs: '0.25rem',  // 4px
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
  shadows: {
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
    glowEmerald: '0 0 16px rgba(0, 191, 165, 0.25)',
    glowCyan: '0 0 16px rgba(0, 199, 255, 0.25)',
    popover: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
  },
};

export default theme;
