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
    <nav aria-label="Breadcrumb" className="flex items-center text-xs">
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-1.5 text-slate-600 font-light select-none">/</span>
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-slate-400 hover:text-white transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-white' : 'text-slate-400'}`}>
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
