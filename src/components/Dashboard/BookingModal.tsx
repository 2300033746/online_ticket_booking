import React, { useState } from 'react';
import { X, Plus, Minus, CreditCard } from 'lucide-react';
import { Event, Booking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface BookingModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  event,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [seats, setSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !event) return null;

  const handleSeatChange = (change: number) => {
    const newSeats = seats + change;
    if (newSeats >= 1 && newSeats <= Math.min(10, event.availableSeats)) {
      setSeats(newSeats);
    }
  };

  const totalPrice = seats * event.price;

  const handleBooking = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const booking: Omit<Booking, 'id' | 'bookingDate'> = {
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      seats,
      totalPrice,
    };
    
    onConfirmBooking(booking);
    setIsLoading(false);
    setSeats(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Book Tickets</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Details */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Venue:</span>
              <span className="font-medium">{event.venue}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price per ticket:</span>
              <span className="font-medium text-green-600">${event.price}</span>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Number of tickets
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSeatChange(-1)}
                disabled={seats <= 1}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                {seats}
              </span>
              <button
                onClick={() => handleSeatChange(1)}
                disabled={seats >= Math.min(10, event.availableSeats)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Maximum 10 tickets per booking • {event.availableSeats} available
            </p>
          </div>

          {/* Total */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-purple-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {seats} ticket{seats > 1 ? 's' : ''} × ${event.price}
            </p>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;