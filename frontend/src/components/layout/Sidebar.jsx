import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function Sidebar() {
  const navItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
    { label: 'Topic Monitoring', path: ROUTES.TOPIC_MONITORING },
    { label: 'Content Analysis', path: ROUTES.CONTENT_ANALYSIS },
    { label: 'Network Analysis', path: ROUTES.NETWORK_ANALYSIS },
    { label: 'Alerts & Predictions', path: ROUTES.ALERTS_PREDICTIONS },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-slate-800">
        SPIS Platform
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
