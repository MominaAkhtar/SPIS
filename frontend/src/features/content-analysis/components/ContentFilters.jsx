import React from 'react';
import SearchInput from '../../../components/common/SearchInput';
import Dropdown from '../../../components/common/Dropdown';

export default function ContentFilters({ onFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <SearchInput className="flex-1" placeholder="Filter content..." />
      <Dropdown label="Sentiment" options={['All', 'Positive', 'Neutral', 'Negative']} onSelect={(opt) => onFilterChange?.('sentiment', opt)} />
      <Dropdown label="Platform" options={['All', 'Twitter / X', 'Reddit', 'Facebook']} onSelect={(opt) => onFilterChange?.('platform', opt)} />
    </div>
  );
}
