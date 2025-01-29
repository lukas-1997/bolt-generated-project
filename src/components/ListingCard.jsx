import React from 'react';
import { format } from 'date-fns';

export default function ListingCard({ listing, onClick }) {
  return (
    <div 
      onClick={() => onClick(listing)}
      className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            €{listing.price}/night
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-gray-500 mt-1">
          Available: {format(new Date(listing.availableFrom), 'MMM d')} - {format(new Date(listing.availableTo), 'MMM d')}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <span>★</span>
          <span>{listing.rating}</span>
        </div>
      </div>
    </div>
  );
}
