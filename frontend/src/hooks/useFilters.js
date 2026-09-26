import { useState } from 'react';

export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, setFilter, resetFilters };
}

export default useFilters;
