import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function NotificationArea() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const popoverRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'High Polarization Detected',
      message: 'Community A polarization reached 82% threshold',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Rising Polarization Trend',
      message: 'Significant cross-group hostility in Elections 2026',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      type: 'info',
      title: 'Echo Chamber Formation',
      message: 'New cluster of 4,812 users isolated in Chamber 01',
      time: '3h ago',
      unread: true,
    },
    {
      id: 4,
      type: 'low',
      title: 'Model Calibration Updated',
      message: 'Network modularity index recomputed successfully',
      time: '1d ago',
      unread: false,
    },
  ];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Notification Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className={`relative p-2 rounded-lg transition-all duration-150 border ${
          isOpen
            ? 'bg-[#162540] border-[#00D284]/40 text-white'
            : 'bg-[#0D1527] border-[#172338] text-slate-400 hover:text-white hover:bg-[#131F35] hover:border-[#223654]'
        }`}
      >
        <Bell className="w-4 h-4" />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#0D1527] border border-[#223654] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#172338] bg-[#0A101D]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30 rounded">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-[#00D284] hover:text-[#05DF8E] font-medium transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List of items */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#172338]">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 transition-colors flex gap-3 ${
                  item.unread ? 'bg-[#0E1B33]/60 hover:bg-[#122342]' : 'hover:bg-[#111D33]'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {item.type === 'critical' ? (
                    <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 flex">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </span>
                  ) : item.type === 'warning' ? (
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-[#00D284] border border-emerald-500/30 flex">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">{item.title}</p>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-[#172338] bg-[#0A101D] text-center">
            <Link
              to={ROUTES.ALERTS_PREDICTIONS}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#162540] rounded-lg transition-colors"
            >
              <span>View all alerts & predictions</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
