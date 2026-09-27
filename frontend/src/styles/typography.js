/**
 * SPIS Typography Guidelines
 * Matches the fonts, scales, weights, and tracking used across the SPIS platform.
 */

export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ],
    mono: [
      '"JetBrains Mono"',
      '"Fira Code"',
      'Consolas',
      'monospace',
    ],
  },
  fontSize: {
    '2xs': ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.04em' }], // 11px
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],          // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],      // 14px
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],               // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],     // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],       // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],    // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  headingStyles: {
    pageTitle: 'text-2xl font-bold text-white tracking-tight',
    pageSubtitle: 'text-sm text-slate-400 mt-1 font-normal',
    sectionTitle: 'text-base font-semibold text-white tracking-tight',
    cardTitle: 'text-sm font-semibold text-slate-200 uppercase tracking-wider',
    statValue: 'text-2xl font-bold text-white tracking-tight font-mono-numbers',
    statLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wider',
    navItem: 'text-sm font-medium tracking-wide',
    badge: 'text-[11px] font-semibold tracking-wider uppercase',
  },
};

export default typography;
