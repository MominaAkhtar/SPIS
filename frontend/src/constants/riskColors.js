export const RISK_COLORS = {
  low: {
    bg: 'rgba(0, 210, 132, 0.12)',
    text: '#00D284',
    border: 'rgba(0, 210, 132, 0.3)',
    label: 'Low',
    badgeClass: 'bg-emerald-500/10 text-[#00D284] border border-emerald-500/30',
  },
  medium: {
    bg: 'rgba(245, 158, 11, 0.12)',
    text: '#F59E0B',
    border: 'rgba(245, 158, 11, 0.3)',
    label: 'Medium',
    badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
  },
  high: {
    bg: 'rgba(249, 115, 22, 0.12)',
    text: '#F97316',
    border: 'rgba(249, 115, 22, 0.3)',
    label: 'High',
    badgeClass: 'bg-orange-500/10 text-orange-400 border border-orange-500/30',
  },
  critical: {
    bg: 'rgba(239, 68, 68, 0.12)',
    text: '#EF4444',
    border: 'rgba(239, 68, 68, 0.3)',
    label: 'Critical',
    badgeClass: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
  },
};

export default RISK_COLORS;
