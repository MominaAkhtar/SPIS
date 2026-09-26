import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex mb-4 text-sm text-gray-500">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-gray-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
