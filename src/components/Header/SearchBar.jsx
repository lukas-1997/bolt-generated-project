import React from 'react';

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  dates, 
  onDateChange,
  guests,
  onGuestChange,
  onSearch 
}) {
  return (
    <form onSubmit={onSearch} className="flex items-center gap-4 p-2 border rounded-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 px-4">
        <div className="text-sm font-medium">Where</div>
        <input
          type="text"
          placeholder="Search destinations"
          className="w-full outline-none text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="border-l px-4">
        <div className="text-sm font-medium">Check in</div>
        <input
          type="date"
          className="outline-none text-sm"
          value={dates.checkIn}
          onChange={(e) => onDateChange('checkIn', e.target.value)}
        />
      </div>
      <div className="border-l px-4">
        <div className="text-sm font-medium">Check out</div>
        <input
          type="date"
          className="outline-none text-sm"
          value={dates.checkOut}
          onChange={(e) => onDateChange('checkOut', e.target.value)}
        />
      </div>
      <div className="border-l px-4">
        <div className="text-sm font-medium">Guests</div>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => onGuestChange(parseInt(e.target.value))}
          className="outline-none text-sm w-20"
        />
      </div>
      <button 
        type="submit"
        className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}
