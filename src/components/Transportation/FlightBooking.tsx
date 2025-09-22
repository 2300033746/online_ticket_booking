import React, { useState, useEffect } from 'react';
import { Plane, Clock, MapPin, Users, Search, Star } from 'lucide-react';
import { FlightRoute, TransportationBooking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';
import BookingModal from './BookingModal';

const FlightBooking: React.FC = () => {
  const [flights, setFlights] = useState<FlightRoute[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<FlightRoute | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'Economy' as 'Economy' | 'Business' | 'First'
  });

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    filterFlights();
  }, [flights, searchForm]);

  const loadFlights = async () => {
    setIsLoading(true);
    try {
      const mockFlights: FlightRoute[] = [
        {
          id: 'flight-1',
          from: 'New York (JFK)',
          to: 'Los Angeles (LAX)',
          departureTime: '08:30',
          arrivalTime: '11:45',
          duration: '6h 15m',
          price: 299.99,
          airline: 'American Airlines',
          flightNumber: 'AA 1234',
          aircraft: 'Boeing 737',
          availableSeats: 45,
          class: 'Economy',
          date: '2024-06-25',
          stops: 0
        },
        {
          id: 'flight-2',
          from: 'Chicago (ORD)',
          to: 'Miami (MIA)',
          departureTime: '14:20',
          arrivalTime: '18:30',
          duration: '3h 10m',
          price: 189.50,
          airline: 'Delta Airlines',
          flightNumber: 'DL 5678',
          aircraft: 'Airbus A320',
          availableSeats: 23,
          class: 'Economy',
          date: '2024-06-25',
          stops: 0
        },
        {
          id: 'flight-3',
          from: 'San Francisco (SFO)',
          to: 'Seattle (SEA)',
          departureTime: '16:45',
          arrivalTime: '19:15',
          duration: '2h 30m',
          price: 149.99,
          airline: 'Alaska Airlines',
          flightNumber: 'AS 9012',
          aircraft: 'Boeing 737',
          availableSeats: 67,
          class: 'Economy',
          date: '2024-06-25',
          stops: 0
        },
        {
          id: 'flight-4',
          from: 'Boston (BOS)',
          to: 'Washington (DCA)',
          departureTime: '12:00',
          arrivalTime: '13:45',
          duration: '1h 45m',
          price: 129.75,
          airline: 'JetBlue Airways',
          flightNumber: 'B6 3456',
          aircraft: 'Embraer E190',
          availableSeats: 0,
          class: 'Economy',
          date: '2024-06-25',
          stops: 0
        },
        {
          id: 'flight-5',
          from: 'New York (JFK)',
          to: 'London (LHR)',
          departureTime: '22:30',
          arrivalTime: '10:15+1',
          duration: '7h 45m',
          price: 899.99,
          airline: 'British Airways',
          flightNumber: 'BA 7890',
          aircraft: 'Boeing 777',
          availableSeats: 12,
          class: 'Business',
          date: '2024-06-25',
          stops: 0
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1500));
      setFlights(mockFlights);
    } catch (error) {
      console.error('Error loading flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFlights = () => {
    let filtered = flights;
    
    if (searchForm.from) {
      filtered = filtered.filter(flight => 
        flight.from.toLowerCase().includes(searchForm.from.toLowerCase())
      );
    }
    
    if (searchForm.to) {
      filtered = filtered.filter(flight => 
        flight.to.toLowerCase().includes(searchForm.to.toLowerCase())
      );
    }

    if (searchForm.class) {
      filtered = filtered.filter(flight => flight.class === searchForm.class);
    }
    
    setFilteredFlights(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterFlights();
  };

  const handleBooking = (flight: FlightRoute) => {
    setSelectedFlight(flight);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: Omit<TransportationBooking, 'id' | 'bookingDate'>) => {
    console.log('Flight booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
  };

  const getClassColor = (flightClass: string) => {
    switch (flightClass) {
      case 'Business': return 'bg-yellow-100 text-yellow-800';
      case 'First': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plane className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Flight Booking</h2>
        <p className="text-gray-600">Find and book flights to your destination</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              value={searchForm.from}
              onChange={(e) => setSearchForm(prev => ({ ...prev, from: e.target.value }))}
              placeholder="Departure airport"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              value={searchForm.to}
              onChange={(e) => setSearchForm(prev => ({ ...prev, to: e.target.value }))}
              placeholder="Destination airport"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={searchForm.date}
              onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={searchForm.class}
              onChange={(e) => setSearchForm(prev => ({ ...prev, class: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search Flights
            </button>
          </div>
        </form>
      </div>

      {/* Flight Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" color="purple" />
            <p className="mt-4 text-gray-600">Searching for flights...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{flight.airline}</h3>
                      <p className="text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getClassColor(flight.class)}`}>
                      {flight.class}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {flight.from} → {flight.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {flight.departureTime} - {flight.arrivalTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {flight.availableSeats} seats available
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">4.5 rating</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                    <div className="text-sm text-gray-600">
                      Duration: {flight.duration}
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${flight.price}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    per person
                  </div>
                  <button
                    onClick={() => handleBooking(flight)}
                    disabled={flight.availableSeats === 0}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {flight.availableSeats === 0 ? 'Sold Out' : 'Book Flight'}
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
        bookingData={selectedFlight}
        bookingType="flight"
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default FlightBooking;