import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export default function LiveAlertsCard() {
  const alerts = [
    {
      id: 'alert-1',
      severity: 'CRITICAL',
      time: '2m ago',
      borderColor: 'border-[#E74C3C]',
      tagColor: 'text-[#EF5350]',
      text: 'Immigration cluster PI exceeded 89 — intervention recommended.',
    },
    {
      id: 'alert-2',
      severity: 'CRITICAL',
      time: '11m ago',
      borderColor: 'border-[#E74C3C]',
      tagColor: 'text-[#EF5350]',
      text: 'Coordinated amplification pattern detected across 1,400 accounts.',
    },
    {
      id: 'alert-3',
      severity: 'HIGH',
      time: '19m ago',
      borderColor: 'border-[#F97316]',
      tagColor: 'text-[#F97316]',
      text: 'New echo chamber formed in economic discourse — 4,300 accounts.',
    },
  ];

  return (
    <div className="bg-[#111827] border border-[#1E2227] rounded-xl p-5 sm:p-6 shadow-none flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1E2227]">
          <h3 className="text-xs font-bold text-white tracking-wider uppercase select-none">
            LIVE ALERTS
          </h3>

          <div className="flex items-center gap-1.5 select-none">
            <span className="text-[11px] font-medium text-[#8A94A6]">
              2 critical • 2 high
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E74C3C]" />
          </div>
        </div>

        {/* Alerts List */}
        <div className="divide-y divide-[#1E2227]">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`py-3.5 pl-3 border-l-2 ${alert.borderColor} transition-colors hover:bg-white/[0.02]`}
            >
              <div className="flex items-center justify-between text-[11px] select-none">
                <span className={`font-black tracking-wider ${alert.tagColor}`}>
                  [{alert.severity}]
                </span>
                <span className="text-[#8A94A6]">{alert.time}</span>
              </div>
              <p className="text-xs text-[#D9D9D9] mt-1.5 leading-relaxed">
                {alert.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Link centered */}
      <div className="flex justify-center pt-3.5 border-t border-[#1E2227] mt-3">
        <Link
          to={ROUTES.ALERTS_PREDICTIONS || '/alerts-predictions'}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00BFA5] hover:text-[#42D9C8] transition-colors group"
        >
          <span>View Analysis Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
