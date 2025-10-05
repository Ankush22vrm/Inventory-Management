import React from 'react';
import { Search } from 'lucide-react';
import Button from '../shared/Button';
import { CATEGORIES } from '../../utils/constants';

const ProductFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="">All Status</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
        <Button variant="secondary" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;