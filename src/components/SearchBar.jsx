import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, ...dates });
  };

  return (
    <div className="bg-white rounded-full shadow-lg p-3 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border-none focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dates.checkIn}
            onChange={(e) => setDates(prev => ({ ...prev, checkIn: e.target.value }))}
            className="px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="date"
            value={dates.checkOut}
            onChange={(e) => setDates(prev => ({ ...prev, checkOut: e.target.value }))}
            className="px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
}
