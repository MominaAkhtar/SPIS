import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * SPIS Breadcrumb Component
 * Automatically resolves current route or accepts explicit items array.
 * Matches: Home / Network Analysis / Interaction Types
 */
export default function Breadcrumb({ items }) {
  const location = useLocation();

  // Route map for automatic breadcrumbs
  const routeNames = {
    [ROUTES.DASHBOARD]: 'Dashboard',
    [ROUTES.TOPIC_MONITORING]: 'Topic Monitoring',
    [ROUTES.CONTENT_ANALYSIS]: 'Content Analysis',
    [ROUTES.NETWORK_ANALYSIS]: 'Network Analysis',
    [ROUTES.ALERTS_PREDICTIONS]: 'Alerts & Predictions',
  };

  let breadcrumbs = items;

  if (!breadcrumbs) {
    const currentPath = location.pathname;
    const currentName = routeNames[currentPath] || 'Overview';

    breadcrumbs = [
      { label: 'Home', to: ROUTES.DASHBOARD },
      { label: currentName, to: currentPath === ROUTES.DASHBOARD ? null : currentPath },
    ];
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <ol className="inline-flex items-center">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-slate-600 select-none">/</span>
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`hover:text-white transition-colors ${
                    index === 0
                      ? 'text-[#9E9E9E] font-normal'
                      : 'text-slate-400 font-semibold'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-teal-500' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
