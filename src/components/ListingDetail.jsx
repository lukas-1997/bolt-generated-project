import React, { useState } from 'react';
import { format } from 'date-fns';
import ChatWindow from './Chat/ChatWindow';
import BookingModal from './Booking/BookingModal';

export default function ListingDetail({ listing, onClose }) {
  const [showChat, setShowChat] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        <div className="relative">
          <img
            src={listing.images[selectedImage]}
            alt={listing.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="flex gap-2 p-4 overflow-x-auto">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.title} - ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all
                  ${selectedImage === index ? 'ring-2 ring-red-500' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
            </div>
            <p className="text-2xl font-bold">€{listing.price}/night</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About this place</h3>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Available Dates</h3>
            <p className="text-gray-600">
              {format(new Date(listing.availableFrom), 'MMM d, yyyy')} - {format(new Date(listing.availableTo), 'MMM d, yyyy')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowBooking(true)}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="flex-1 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              Contact Host
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatWindow
          listingId={listing.id}
          hostId={listing.hostId}
          onClose={() => setShowChat(false)}
        />
      )}

      {showBooking && (
        <BookingModal
          listing={listing}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
