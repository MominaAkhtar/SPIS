import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PanelsTopLeft, FileText, Users, Bell, X } from 'lucide-react';
import Logo from '../common/Logo';
import Avatar from '../common/Avatar';
import TopicSelectorModal from '../common/TopicSelectorModal';
import { ROUTES } from '../../constants/routes';
import { useTopic } from '../../context/TopicContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Custom "Topic Monitoring" icon: ring + faint tick marks + centre sparkle.
 * Uses currentColor, so it follows the gray / teal colour of the nav item.
 */
function TopicMonitoringIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" />
      <path d="M12 4.8V6.4M12 17.6V19.2M4.8 12H6.4M17.6 12H19.2" strokeWidth="1.5" opacity="0.45" />
      <path
        d="M12 9.6L12.8 11.2L14.4 12L12.8 12.8L12 14.4L11.2 12.8L9.6 12L11.2 11.2Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * SPIS Sidebar Navigation
 * Matches the official prototype navigation layout:
 * - Brand Logo with Compass/Radar Mark
 * - 5 Core Modules: Dashboard, Topic Monitoring, Content Analysis, Network Analysis, Alerts & Predictions
 * - Active State: Emerald highlight, left accent indicator, high contrast
 * - Bottom Current Topic Card with "Change Topic" action
 * - Bottom Researcher Profile Footer
 */
export default function Sidebar({ onCloseMobile }) {
  const location = useLocation();
  const { selectedTopic } = useTopic() || {};
  const { user, logout } = useAuth() || {};
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  const activeTopicTitle = selectedTopic?.title || 'Pakistan Elections 2026';

  const navItems = [
    {
      label: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: PanelsTopLeft,
    },
    {
      label: 'Topic Monitoring',
      path: ROUTES.TOPIC_MONITORING,
      icon: TopicMonitoringIcon,
    },
    {
      label: 'Content Analysis',
      path: ROUTES.CONTENT_ANALYSIS,
      icon: FileText,
    },
    {
      label: 'Network Analysis',
      path: ROUTES.NETWORK_ANALYSIS,
      icon: Users,
    },
    {
      label: 'Alerts & Predictions',
      path: ROUTES.ALERTS_PREDICTIONS,
      icon: Bell,
    },
  ];

  const isNavActive = (path) => {
    if (path === ROUTES.NETWORK_ANALYSIS) {
      return (
        location.pathname === ROUTES.NETWORK_ANALYSIS ||
        location.pathname === '/bridge-users' ||
        location.pathname === '/'
      );
    }
    return location.pathname === path;
  };

  return (
    <>
      <aside className="w-[220px] bg-[#0B0D0E] border-r border-[#2A2D32] text-slate-100 flex flex-col flex-shrink-0 select-none">
        {/* Brand Header */}
        <div className="relative px-5 pt-[22px] pb-4 border-b border-[#2A2D32]">
          <div className="flex items-center gap-2.5">
            <Logo size={24} glow={false} radius={14} className="flex-shrink-0" />
            <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
              SPIS
            </span>
          </div>

          <div className="mt-1 flex flex-col">
            <span className="text-[8px] leading-[14px] font-bold text-[#00BFA5] uppercase">
              Societal Polarization
            </span>
            <span className="text-[8px] leading-[14px] font-semibold text-[#9E9E9E] uppercase">
              Intelligence System
            </span>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden absolute top-3 right-3 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="px-2 pt-6 pb-6 flex flex-col gap-[3px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={`flex h-[42px] items-center gap-3 rounded-l-sm rounded-r-md border-l-4 px-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-[#00BFA5] bg-[#00BFA5]/[0.08] text-[#00BFA5]'
                    : 'border-transparent text-[#9E9E9E] hover:font-semibold'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section: Current Topic Card */}
        <div className="p-3.5 border-t border-[#2A2D32] bg-[#0B0D0E] mt-auto">
          <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1E2638]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ECC71]"></span>
              </span>
              <span className="text-[11px] font-medium text-[#8A94A6]">
                Current Topic
              </span>
            </div>

            <p className="text-xs font-bold text-white tracking-wide truncate">
              {activeTopicTitle}
            </p>

            <p className="text-[10px] text-[#8A94A6] mt-0.5 mb-2.5">
              X (Twitter) · Last 7 Days
            </p>

            <button
              type="button"
              onClick={() => setIsTopicModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg bg-[#142222] border border-[#00BFA5]/30 text-[#00BFA5] text-xs font-semibold hover:bg-[#00BFA5]/20 hover:border-[#00BFA5]/50 transition-all text-center block"
            >
              Change Topic
            </button>
          </div>
        </div>
      </aside>

      {/* Change Topic Modal */}
      <TopicSelectorModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
      />
    </>
  );
}
