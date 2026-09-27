import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * SPIS DashboardLayout Component
 * Serves as the primary application scaffold across all platform pages:
 * - Persistent or responsive Sidebar
 * - Sticky Topbar with full actions & profile
 * - Deep dark background `#060B13`
 * - Platform disclaimer footer bar
 */
export default function DashboardLayout({
  children,
  breadcrumbs,
  showDisclaimer = true,
  disclaimerText = 'SPIS ANALYZES PUBLIC POLITICAL DISCUSSIONS ON X (TWITTER) TO IDENTIFY POLARIZATION, COMMUNITIES, AND BRIDGE USERS.',
  secondaryDisclaimer,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#060B13] text-slate-100 antialiased font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10">
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          breadcrumbs={breadcrumbs}
          onToggleSidebar={() => setMobileSidebarOpen(true)}
          filterActive={filterActive}
          onToggleFilter={() => setFilterActive((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          <div className="flex-1 max-w-[1600px] w-full mx-auto">
            {children}
          </div>

          {/* Bottom Platform Disclaimer Bar */}
          {showDisclaimer && (
            <footer className="mt-10 pt-6 pb-4 border-t border-[#172338]/60 text-center select-none">
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {disclaimerText}
              </p>
              {secondaryDisclaimer && (
                <p className="text-[10px] text-slate-500 mt-1">
                  {secondaryDisclaimer}
                </p>
              )}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
