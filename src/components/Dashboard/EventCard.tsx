import React from 'react';
import { Calendar, Clock, MapPin, DollarSign, Users } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onBookNow: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBookNow }) => {
  const isAvailable = event.availableSeats > 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">${event.price}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{event.availableSeats} seats left</span>
          </div>
        </div>

        <button
          onClick={() => onBookNow(event)}
          disabled={!isAvailable}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-blue-600"
        >
          {isAvailable ? 'Book Now' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;