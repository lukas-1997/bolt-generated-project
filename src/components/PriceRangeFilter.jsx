import React from 'react';

export default function PriceRangeFilter({ priceRange, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">€</span>
            <input
              type="number"
              min="0"
              value={priceRange.min}
              onChange={(e) => onChange({ ...priceRange, min: parseInt(e.target.value) })}
              className="w-full pl-7 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">€</span>
            <input
              type="number"
              min={priceRange.min}
              value={priceRange.max}
              onChange={(e) => onChange({ ...priceRange, max: parseInt(e.target.value) })}
              className="w-full pl-7 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
