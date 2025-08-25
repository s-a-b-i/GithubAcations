import React, { useState } from 'react';
import { CATEGORIES, PRICE_RANGES } from '../../utils/constants';

const ProductFilters = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSearchChange = (e) => {
    const newFilters = { ...localFilters, search: e.target.value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category) => {
    const currentCategories = localFilters.categories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    const newFilters = { ...localFilters, categories: updatedCategories };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = {
      ...localFilters,
      minPrice: range.min,
      maxPrice: range.max
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { search: '', categories: [], minPrice: null, maxPrice: null };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Products
        </label>
        <input
          type="text"
          placeholder="Search by name..."
          value={localFilters.search || ''}
          onChange={handleSearchChange}
          className="input-field"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={(localFilters.categories || []).includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={
                  localFilters.minPrice === range.min && localFilters.maxPrice === range.max
                }
                onChange={() => handlePriceRangeChange(range)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;