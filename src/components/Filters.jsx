import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function Filters({ priceRange, onPriceChange, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState({ min: 0, max: 500 });
  const maxPrice = 1000;

  // Generate mock histogram data
  const histogramData = Array.from({ length: 20 }, () => 
    Math.floor(Math.random() * 50)
  );

  const handlePriceChange = (type, value) => {
    const newRange = { ...localPriceRange, [type]: parseInt(value) };
    setLocalPriceRange(newRange);
  };

  const applyFilters = () => {
    onPriceChange(localPriceRange);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto py-2">
          {['Alle Arten', 'Zimmer', 'Gesamte Unterkunft'].map((type) => (
            <button
              key={type}
              className="px-4 py-2 border rounded-full hover:border-gray-900 whitespace-nowrap"
            >
              {type}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded-full hover:border-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filter
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="border-b pb-4 mb-4">
              <Dialog.Title className="text-xl font-semibold">Filter</Dialog.Title>
            </div>

            <div className="space-y-6">
              {/* Price Range Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preisspanne</h3>
                <p className="text-sm text-gray-600 mb-4">Preise pro Nacht inklusive Gebühren & Steuern</p>

                {/* Price Histogram */}
                <div className="h-24 flex items-end mb-4">
                  {histogramData.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gray-200 mx-0.5"
                      style={{
                        height: `${height}%`,
                        backgroundColor: index >= (localPriceRange.min / maxPrice) * 20 &&
                                       index <= (localPriceRange.max / maxPrice) * 20
                                       ? '#FF385C'
                                       : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>

                {/* Price Inputs */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">€</span>
                      <input
                        type="number"
                        value={localPriceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="pl-7 pr-4 py-2 w-full border rounded-lg"
                        min="0"
                        max={localPriceRange.max}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">€</span>
                      <input
                        type="number"
                        value={localPriceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="pl-7 pr-4 py-2 w-full border rounded-lg"
                        min={localPriceRange.min}
                        max={maxPrice}
                      />
                    </div>
                  </div>
                </div>

                {/* Rooms and Beds Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Zimmer und Betten</h3>
                  
                  {['Schlafzimmer', 'Betten', 'Badezimmer'].map((type) => (
                    <div key={type} className="flex justify-between items-center">
                      <span>{type}</span>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full border hover:border-gray-900 flex items-center justify-center">
                          Beliebig
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setLocalPriceRange({ min: 0, max: maxPrice });
                }}
                className="text-gray-900 underline font-medium"
              >
                Filter löschen
              </button>
              <button
                onClick={applyFilters}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Anzeigen
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
