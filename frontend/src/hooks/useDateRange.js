import { useState } from 'react';

export function useDateRange(initialStart = null, initialEnd = null) {
  const [dateRange, setDateRange] = useState({
    startDate: initialStart,
    endDate: initialEnd,
  });

  const updateRange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return { ...dateRange, updateRange, setDateRange };
}

export default useDateRange;
