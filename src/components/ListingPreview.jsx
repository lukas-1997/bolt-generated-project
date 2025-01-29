import React from 'react';

export default function ListingPreview({ listing }) {
  return (
    <div className="p-2">
      <h3 className="font-semibold text-lg">{listing.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{listing.description}</p>
      <div className="mt-2">
        <p className="text-blue-600 font-medium">€{listing.price}/night</p>
        <p className="text-sm text-gray-500">{listing.location[2]}</p>
      </div>
    </div>
  );
}
