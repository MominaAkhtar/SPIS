import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * SPIS Breadcrumb Component
 * Matches screenshot: HOME / DASHBOARD
 */
export default function Breadcrumb({ items }) {
  const location = useLocation();

  const routeNames = {
    [ROUTES.DASHBOARD]: 'DASHBOARD',
    [ROUTES.TOPIC_MONITORING]: 'TOPIC MONITORING',
    [ROUTES.CONTENT_ANALYSIS]: 'CONTENT ANALYSIS',
    [ROUTES.NETWORK_ANALYSIS]: 'NETWORK ANALYSIS',
    [ROUTES.ALERTS_PREDICTIONS]: 'ALERTS & PREDICTIONS',
  };

  let breadcrumbs = items;

  if (!breadcrumbs) {
    const currentPath = location.pathname;
    const currentName = routeNames[currentPath] || 'DASHBOARD';

    breadcrumbs = [
      { label: 'HOME', to: ROUTES.DASHBOARD },
      { label: currentName, to: null },
    ];
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs tracking-wider select-none">
      <ol className="inline-flex items-center">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-[#616A75] font-normal">/</span>
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-[#9E9E9E] hover:text-white transition-colors uppercase font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-white uppercase">
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
