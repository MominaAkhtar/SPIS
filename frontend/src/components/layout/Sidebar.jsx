import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Crosshair,
  FileText,
  Share2,
  AlertTriangle,
  X,
  LogOut,
  Radio,
} from 'lucide-react';
import Logo from '../common/Logo';
import Avatar from '../common/Avatar';
import TopicSelectorModal from '../common/TopicSelectorModal';
import { ROUTES } from '../../constants/routes';
import { useTopic } from '../../context/TopicContext';
import { useAuth } from '../../context/AuthContext';

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
  const { selectedTopic } = useTopic() || {};
  const { user, logout } = useAuth() || {};
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  const activeTopicTitle = selectedTopic?.title || 'Pakistan Elections 2026';

  const navItems = [
    {
      label: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: 'Topic Monitoring',
      path: ROUTES.TOPIC_MONITORING,
      icon: Crosshair,
    },
    {
      label: 'Content Analysis',
      path: ROUTES.CONTENT_ANALYSIS,
      icon: FileText,
    },
    {
      label: 'Network Analysis',
      path: ROUTES.NETWORK_ANALYSIS,
      icon: Share2,
    },
    {
      label: 'Alerts & Predictions',
      path: ROUTES.ALERTS_PREDICTIONS,
      icon: AlertTriangle,
    },
  ];

  return (
    <>
      <aside className="w-64 bg-[#080D18] border-r border-[#172338] text-slate-100 min-h-screen flex flex-col flex-shrink-0 select-none">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#172338] flex items-center justify-between">
          <Logo variant="horizontal" size="sm" showSubtitle={true} />
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#00D284]/10 text-[#00D284] border-l-2 border-[#00D284] shadow-sm shadow-[#00D284]/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#111D33] border-l-2 border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-[#00D284]' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section: Current Topic Card */}
        <div className="p-3 border-t border-[#172338] space-y-3 bg-[#070B14]">
          {/* Current Topic Indicator Widget */}
          <div className="p-3 rounded-xl bg-[#0D1527] border border-[#172338] relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D284] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D284]"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Current Topic
              </span>
            </div>

            <p className="text-xs font-bold text-white tracking-wide truncate">
              {activeTopicTitle}
            </p>

            <button
              type="button"
              onClick={() => setIsTopicModalOpen(true)}
              className="mt-2 text-[11px] font-semibold text-[#00D284] hover:text-[#05DF8E] transition-colors flex items-center gap-1 group-hover:underline"
            >
              <span>Change Topic</span>
            </button>
          </div>

          {/* User Profile / Status Footer (Page 7 Prototype match) */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar name={user?.name || 'Raima Faisal'} size="xs" />
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {user?.name || 'Raima Faisal'}
                </p>
                <p className="text-[9px] text-slate-500 truncate">Researcher</p>
              </div>
            </div>
            {logout && (
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
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
