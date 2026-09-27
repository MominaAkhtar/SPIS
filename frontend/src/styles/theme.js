/**
 * SPIS Theme Definition
 * Matches the dark cyber-intelligence UI design system seen in the SPIS Figma & PDF designs.
 */

export const theme = {
  colors: {
    // Base platform backgrounds
    background: {
      DEFAULT: '#060B13',
      dark: '#04070D',
      subtle: '#09101C',
    },
    // Surface & card levels
    surface: {
      DEFAULT: '#0D1527',
      elevated: '#111D33',
      hover: '#162540',
      active: '#1A2D4D',
      subtle: '#0A1120',
    },
    // Borders
    border: {
      DEFAULT: '#172338',
      subtle: '#111A2C',
      strong: '#223654',
      focus: '#00D284',
    },
    // Brand Primary (Vibrant Emerald / Mint Green)
    primary: {
      light: '#20E29B',
      DEFAULT: '#00D284',
      dark: '#00A868',
      hover: '#05DF8E',
      glow: 'rgba(0, 210, 132, 0.15)',
      subtle: '#08261E',
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
        text: '#00D284',
        bg: 'rgba(0, 210, 132, 0.12)',
        border: 'rgba(0, 210, 132, 0.3)',
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
      inverse: '#04070D',
      brand: '#00D284',
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
    glowEmerald: '0 0 16px rgba(0, 210, 132, 0.25)',
    glowCyan: '0 0 16px rgba(0, 199, 255, 0.25)',
    popover: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
  },
};

export default theme;
