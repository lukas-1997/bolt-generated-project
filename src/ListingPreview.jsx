import React from 'react';

export default function ListingPreview({ listing }) {
  return (
    <div className="text-sm">
      <h3 className="font-semibold">{listing.title}</h3>
      <p className="text-gray-600">{listing.description}</p>
      <p className="text-blue-600 font-medium">€{listing.price}/night</p>
    </div>
  );
}
