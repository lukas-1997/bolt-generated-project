import React, { useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../../supabase';

export default function BookingModal({ listing, onClose }) {
  const [dates, setDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const start = new Date(dates.checkIn);
    const end = new Date(dates.checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights * listing.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            listing_id: listing.id,
            user_id: user.id,
            check_in: dates.checkIn,
            check_out: dates.checkOut,
            guests: guests,
            total_price: calculateTotal(),
            status: 'pending'
          }
        ]);

      if (error) throw error;
      alert('Booking request sent successfully!');
      onClose();
    } catch (error) {
      alert('Error creating booking!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book Your Stay</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Check In</label>
            <input
              type="date"
              min={listing.availableFrom}
              max={listing.availableTo}
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Check Out</label>
            <input
              type="date"
              min={dates.checkIn || listing.availableFrom}
              max={listing.availableTo}
              value={dates.checkOut}
              onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Guests</label>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>€{listing.price} × {calculateTotal() / listing.price} nights</span>
              <span>€{calculateTotal()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>€{calculateTotal()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Request to Book'}
          </button>
        </form>
      </div>
    </div>
  );
}
