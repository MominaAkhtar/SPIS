/**
 * SPIS Theme Definition
 * Matches the dark cyber-intelligence UI design system seen in the SPIS Figma & PDF designs.
 */

export const theme = {
  colors: {
    // Base platform backgrounds
    background: {
      DEFAULT: '#0B0F19',
      dark: '#0B0D0E',
      subtle: '#090C14',
    },
    // Surface & card levels
    surface: {
      DEFAULT: '#111827',
      elevated: '#151E32',
      hover: '#19253D',
      active: '#1E2D4A',
      subtle: '#0D1424',
    },
    // Borders
    border: {
      DEFAULT: '#1E2638',
      subtle: '#172338',
      strong: '#2A3B57',
      focus: '#00BFA5',
    },
    // Brand Primary (Vibrant Teal / Mint Green)
    primary: {
      light: '#42D9C8',
      DEFAULT: '#00BFA5',
      dark: '#008E7B',
      hover: '#14B8A6',
      glow: 'rgba(0, 191, 165, 0.2)',
      subtle: '#142222',
    },
    // Secondary Accent Palette
    accent: {
      cyan: '#06B6D4',
      blue: '#3498DB',
      purple: '#8B5CF6',
      pink: '#EC4899',
      magenta: '#E91E63',
      orange: '#F39C12',
      amber: '#FFA500',
      green: '#2ECC71',
      red: '#E74C3C',
    },
    // Risk & Status Colors
    status: {
      low: {
        text: '#2ECC71',
        bg: 'rgba(46, 204, 113, 0.12)',
        border: 'rgba(46, 204, 113, 0.3)',
      },
      medium: {
        text: '#F39C12',
        bg: 'rgba(243, 156, 18, 0.12)',
        border: 'rgba(243, 156, 18, 0.3)',
      },
      high: {
        text: '#E74C3C',
        bg: 'rgba(231, 76, 60, 0.12)',
        border: 'rgba(231, 76, 60, 0.3)',
      },
      critical: {
        text: '#E74C3C',
        bg: 'rgba(231, 76, 60, 0.18)',
        border: 'rgba(231, 76, 60, 0.4)',
      },
      info: {
        text: '#00BFA5',
        bg: 'rgba(0, 191, 165, 0.12)',
        border: 'rgba(0, 191, 165, 0.3)',
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
