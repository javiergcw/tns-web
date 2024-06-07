import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const categories = ['All', 'Category 1', 'Category 2', 'Category 3'];

const SearchFilterBar = ({ searchTerm, onSearchChange, category, onCategoryChange, onClearFilters }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={onClearFilters} className="p-2 rounded-full bg-red-500 text-white">
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchFilterBar;
