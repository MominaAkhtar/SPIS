import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SPIS Tabs Component
 * Supports both pill-style navigation (as seen in Network Analysis screens)
 * and underline tabs. Can work with route links or callback state.
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'pills',
  className = '',
}) {
  if (variant === 'underline') {
    return (
      <div className={`border-b border-[#172338] ${className}`}>
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const content = (
              <>
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full ${
                      isActive ? 'bg-[#00D284]/20 text-[#00D284]' : 'bg-[#172338] text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </>
            );

            if (tab.to) {
              return (
                <Link
                  key={tab.id}
                  to={tab.to}
                  className={`py-3 px-1 border-b-2 font-medium text-xs whitespace-nowrap transition-colors flex items-center ${
                    isActive
                      ? 'border-[#00D284] text-[#00D284]'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-xs whitespace-nowrap transition-colors flex items-center ${
                  isActive
                    ? 'border-[#00D284] text-[#00D284]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {content}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  // Default: Sleek Cyber Pills (matching Figma/PDF sub-navigation)
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-[#09101C] border border-[#172338] rounded-xl overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const content = (
          <>
            {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                  isActive ? 'bg-[#061510] text-[#00D284]' : 'bg-[#111D33] text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </>
        );

        const baseClass = `px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center ${
          isActive
            ? 'bg-[#00D284] text-[#061510] shadow-sm shadow-[#00D284]/20'
            : 'text-slate-400 hover:text-white hover:bg-[#111D33]'
        }`;

        if (tab.to) {
          return (
            <Link key={tab.id} to={tab.to} className={baseClass}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={baseClass}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
