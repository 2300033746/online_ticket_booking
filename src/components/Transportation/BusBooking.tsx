import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Users, Wifi, Coffee, Tv, Search } from 'lucide-react';
import { BusRoute, TransportationBooking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';
import BookingModal from './BookingModal';

const BusBooking: React.FC = () => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<BusRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadBusRoutes();
  }, []);

  useEffect(() => {
    filterRoutes();
  }, [busRoutes, searchForm]);

  const loadBusRoutes = async () => {
    setIsLoading(true);
    try {
      // Mock bus routes data
      const mockRoutes: BusRoute[] = [
        {
          id: 'bus-1',
          from: 'New York',
          to: 'Boston',
          departureTime: '08:00',
          arrivalTime: '12:30',
          duration: '4h 30m',
          price: 45.99,
          busOperator: 'Greyhound',
          busType: 'Luxury Coach',
          availableSeats: 28,
          amenities: ['WiFi', 'AC', 'Reclining Seats', 'USB Charging'],
          date: '2024-06-25'
        },
        {
          id: 'bus-2',
          from: 'Los Angeles',
          to: 'San Francisco',
          departureTime: '14:00',
          arrivalTime: '20:45',
          duration: '6h 45m',
          price: 65.50,
          busOperator: 'Megabus',
          busType: 'Double Decker',
          availableSeats: 15,
          amenities: ['WiFi', 'AC', 'Entertainment System', 'Snack Bar'],
          date: '2024-06-25'
        },
        {
          id: 'bus-3',
          from: 'Chicago',
          to: 'Detroit',
          departureTime: '10:30',
          arrivalTime: '15:15',
          duration: '4h 45m',
          price: 38.75,
          busOperator: 'FlixBus',
          busType: 'Standard Coach',
          availableSeats: 42,
          amenities: ['WiFi', 'AC', 'Power Outlets'],
          date: '2024-06-25'
        },
        {
          id: 'bus-4',
          from: 'Miami',
          to: 'Orlando',
          departureTime: '16:20',
          arrivalTime: '20:00',
          duration: '3h 40m',
          price: 29.99,
          busOperator: 'RedCoach',
          busType: 'Premium',
          availableSeats: 0,
          amenities: ['WiFi', 'AC', 'Leather Seats', 'Entertainment'],
          date: '2024-06-25'
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1500));
      setBusRoutes(mockRoutes);
    } catch (error) {
      console.error('Error loading bus routes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRoutes = () => {
    let filtered = busRoutes;
    
    if (searchForm.from) {
      filtered = filtered.filter(route => 
        route.from.toLowerCase().includes(searchForm.from.toLowerCase())
      );
    }
    
    if (searchForm.to) {
      filtered = filtered.filter(route => 
        route.to.toLowerCase().includes(searchForm.to.toLowerCase())
      );
    }
    
    setFilteredRoutes(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterRoutes();
  };

  const handleBooking = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: Omit<TransportationBooking, 'id' | 'bookingDate'>) => {
    // Handle booking confirmation
    console.log('Bus booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'snack bar': return <Coffee className="w-4 h-4" />;
      case 'entertainment system': return <Tv className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bus Booking</h2>
        <p className="text-gray-600">Find and book comfortable bus journeys</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              value={searchForm.from}
              onChange={(e) => setSearchForm(prev => ({ ...prev, from: e.target.value }))}
              placeholder="Departure city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              value={searchForm.to}
              onChange={(e) => setSearchForm(prev => ({ ...prev, to: e.target.value }))}
              placeholder="Destination city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={searchForm.date}
              onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search Buses
            </button>
          </div>
        </form>
      </div>

      {/* Bus Routes */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" color="purple" />
            <p className="mt-4 text-gray-600">Finding available buses...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Bus className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{route.busOperator}</h3>
                      <p className="text-gray-600">{route.busType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {route.from} → {route.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {route.departureTime} - {route.arrivalTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {route.availableSeats} seats available
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                        {getAmenityIcon(amenity)}
                        <span className="text-xs text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${route.price}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Duration: {route.duration}
                  </div>
                  <button
                    onClick={() => handleBooking(route)}
                    disabled={route.availableSeats === 0}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {route.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingData={selectedRoute}
        bookingType="bus"
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default BusBooking;