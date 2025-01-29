import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function FilterModal({ isOpen, onClose, onApply, initialPriceRange }) {
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [amenities, setAmenities] = useState([]);
  
  const amenityOptions = [
    { id: 'wifi', label: 'Wifi' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'washer', label: 'Washer' },
    { id: 'dryer', label: 'Dryer' },
    { id: 'ac', label: 'Air conditioning' },
    { id: 'heating', label: 'Heating' },
    { id: 'workspace', label: 'Dedicated workspace' },
    { id: 'tv', label: 'TV' },
    { id: 'parking', label: 'Free parking' },
    { id: 'pool', label: 'Pool' }
  ];

  const handleAmenityToggle = (amenityId) => {
    setAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleApply = () => {
    onApply({ priceRange, amenities });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-xl max-w-2xl w-full mx-4">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <button onClick={onClose} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>

          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Price range</h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Min price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full pl-7 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Max price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full pl-7 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {amenityOptions.map(amenity => (
                  <label key={amenity.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex justify-between items-center">
            <button
              onClick={() => {
                setPriceRange({ min: 0, max: 1000 });
                setAmenities([]);
              }}
              className="text-sm font-semibold underline"
            >
              Clear all
            </button>
            <button
              onClick={handleApply}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Show places
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
