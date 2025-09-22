import React from 'react';
import { Calendar, Clock, MapPin, Users, Trash2, Ticket } from 'lucide-react';
import { Booking } from '../../types';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onCancelBooking }) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-600 mb-6">Start exploring events and book your first tickets!</p>
        <button className="text-purple-600 font-semibold hover:underline">
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h2>
        <p className="text-gray-600 text-lg">Manage your event tickets and bookings</p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {booking.eventTitle}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{booking.seats} ticket{booking.seats > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-green-800">Confirmed</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Booked on {booking.bookingDate}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${booking.totalPrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total amount paid
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3">
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                    View Ticket
                  </button>
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="px-6 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;