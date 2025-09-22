import React, { useState } from 'react';
import { X, Plus, Minus, CreditCard, Calendar, Users } from 'lucide-react';
import { BusRoute, FlightRoute, CarRental, TransportationBooking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BusRoute | FlightRoute | CarRental | null;
  bookingType: 'bus' | 'flight' | 'car';
  onConfirmBooking: (booking: Omit<TransportationBooking, 'id' | 'bookingDate'>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  bookingType,
  onConfirmBooking,
}) => {
  const [passengers, setPassengers] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !bookingData) return null;

  const handlePassengerChange = (change: number) => {
    const newPassengers = passengers + change;
    if (newPassengers >= 1 && newPassengers <= 10) {
      setPassengers(newPassengers);
    }
  };

  const handleRentalDaysChange = (change: number) => {
    const newDays = rentalDays + change;
    if (newDays >= 1 && newDays <= 30) {
      setRentalDays(newDays);
    }
  };

  const calculateTotalPrice = () => {
    if (bookingType === 'car') {
      const car = bookingData as CarRental;
      return car.pricePerDay * rentalDays;
    } else {
      const transport = bookingData as BusRoute | FlightRoute;
      return transport.price * passengers;
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const booking: Omit<TransportationBooking, 'id' | 'bookingDate'> = {
      type: bookingType,
      bookingDetails: bookingData,
      passengers: bookingType !== 'car' ? passengers : undefined,
      rentalDays: bookingType === 'car' ? rentalDays : undefined,
      totalPrice: calculateTotalPrice(),
      status: 'confirmed',
    };
    
    onConfirmBooking(booking);
    setIsLoading(false);
    setPassengers(1);
    setRentalDays(1);
    onClose();
  };

  const renderBookingDetails = () => {
    switch (bookingType) {
      case 'bus':
        const bus = bookingData as BusRoute;
        return (
          <div className="space-y-4">
            <div className="relative">
              <div className="w-full h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold">{bus.busOperator}</h3>
                  <p className="text-sm opacity-90">{bus.busType}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">{bus.from} → {bus.to}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{bus.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{bus.departureTime} - {bus.arrivalTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{bus.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per seat:</span>
                <span className="font-medium text-green-600">${bus.price}</span>
              </div>
            </div>
          </div>
        );

      case 'flight':
        const flight = bookingData as FlightRoute;
        return (
          <div className="space-y-4">
            <div className="relative">
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold">{flight.airline}</h3>
                  <p className="text-sm opacity-90">{flight.flightNumber} • {flight.aircraft}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">{flight.from} → {flight.to}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{flight.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{flight.departureTime} - {flight.arrivalTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{flight.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{flight.class}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per ticket:</span>
                <span className="font-medium text-blue-600">${flight.price}</span>
              </div>
            </div>
          </div>
        );

      case 'car':
        const car = bookingData as CarRental;
        return (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={car.image}
                alt={`${car.carBrand} ${car.carModel}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {car.carBrand} {car.carModel}
              </h3>
              <p className="text-gray-600">{car.carType} • {car.location}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{car.seats} passengers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-medium">{car.transmission}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per day:</span>
                <span className="font-medium text-orange-600">${car.pricePerDay}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Features:</h4>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {bookingType === 'bus' && 'Book Bus Ticket'}
            {bookingType === 'flight' && 'Book Flight'}
            {bookingType === 'car' && 'Rent Car'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {renderBookingDetails()}

          {/* Quantity Selection */}
          {bookingType !== 'car' ? (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Number of passengers
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePassengerChange(-1)}
                  disabled={passengers <= 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                  {passengers}
                </span>
                <button
                  onClick={() => handlePassengerChange(1)}
                  disabled={passengers >= 10}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Maximum 10 passengers per booking</p>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Rental duration (days)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleRentalDaysChange(-1)}
                  disabled={rentalDays <= 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                  {rentalDays}
                </span>
                <button
                  onClick={() => handleRentalDaysChange(1)}
                  disabled={rentalDays >= 30}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Maximum 30 days rental period</p>
            </div>
          )}

          {/* Total */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-purple-600">
                ${calculateTotalPrice().toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {bookingType === 'car' 
                ? `${rentalDays} day${rentalDays > 1 ? 's' : ''} × $${(bookingData as CarRental).pricePerDay}`
                : `${passengers} passenger${passengers > 1 ? 's' : ''} × $${(bookingData as BusRoute | FlightRoute).price}`
              }
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