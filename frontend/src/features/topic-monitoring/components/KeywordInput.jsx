import React, { useState } from 'react';
import Button from '../../../components/common/Button';

export default function KeywordInput({ onAdd }) {
  const [keyword, setKeyword] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onAdd?.(keyword.trim());
      setKeyword('');
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-2">
      <input
        type="text"
        placeholder="Add keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1"
      />
      <Button type="submit" size="sm">Add</Button>
    </form>
  );
}
