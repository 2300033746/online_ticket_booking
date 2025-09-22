import React, { useState, useEffect } from 'react';
import { Car, Users, Fuel, Settings, Star, Search, MapPin } from 'lucide-react';
import { CarRental as CarRentalType, TransportationBooking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';
import BookingModal from './BookingModal';

const CarRental: React.FC = () => {
  const [cars, setCars] = useState<CarRentalType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarRentalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarRentalType | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    location: '',
    carType: 'all',
    priceRange: 'all'
  });

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    filterCars();
  }, [cars, searchForm]);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const mockCars: CarRentalType[] = [
        {
          id: 'car-1',
          carModel: 'Camry',
          carBrand: 'Toyota',
          carType: 'Sedan',
          pricePerDay: 45.99,
          location: 'Downtown',
          available: true,
          features: ['GPS Navigation', 'Bluetooth', 'Backup Camera', 'USB Ports'],
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          seats: 5,
          image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
          rating: 4.5
        },
        {
          id: 'car-2',
          carModel: 'Model 3',
          carBrand: 'Tesla',
          carType: 'Electric',
          pricePerDay: 89.99,
          location: 'Airport',
          available: true,
          features: ['Autopilot', 'Premium Audio', 'Supercharging', 'Mobile App'],
          fuelType: 'Electric',
          transmission: 'Automatic',
          seats: 5,
          image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
          rating: 4.8
        },
        {
          id: 'car-3',
          carModel: 'Wrangler',
          carBrand: 'Jeep',
          carType: 'SUV',
          pricePerDay: 75.50,
          location: 'City Center',
          available: true,
          features: ['4WD', 'Removable Doors', 'Off-road Tires', 'Roof Rack'],
          fuelType: 'Gasoline',
          transmission: 'Manual',
          seats: 4,
          image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
          rating: 4.3
        },
        {
          id: 'car-4',
          carModel: 'Mustang',
          carBrand: 'Ford',
          carType: 'Sports',
          pricePerDay: 120.00,
          location: 'Downtown',
          available: false,
          features: ['V8 Engine', 'Sport Mode', 'Premium Interior', 'Performance Tires'],
          fuelType: 'Gasoline',
          transmission: 'Manual',
          seats: 4,
          image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
          rating: 4.7
        },
        {
          id: 'car-5',
          carModel: 'Prius',
          carBrand: 'Toyota',
          carType: 'Hybrid',
          pricePerDay: 39.99,
          location: 'Airport',
          available: true,
          features: ['Hybrid Engine', 'Eco Mode', 'Fuel Efficient', 'Quiet Ride'],
          fuelType: 'Hybrid',
          transmission: 'Automatic',
          seats: 5,
          image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
          rating: 4.2
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1500));
      setCars(mockCars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = cars;
    
    if (searchForm.location) {
      filtered = filtered.filter(car => 
        car.location.toLowerCase().includes(searchForm.location.toLowerCase())
      );
    }
    
    if (searchForm.carType !== 'all') {
      filtered = filtered.filter(car => car.carType === searchForm.carType);
    }

    if (searchForm.priceRange !== 'all') {
      const [min, max] = searchForm.priceRange.split('-').map(Number);
      filtered = filtered.filter(car => {
        if (max) {
          return car.pricePerDay >= min && car.pricePerDay <= max;
        } else {
          return car.pricePerDay >= min;
        }
      });
    }
    
    setFilteredCars(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCars();
  };

  const handleBooking = (car: CarRentalType) => {
    setSelectedCar(car);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: Omit<TransportationBooking, 'id' | 'bookingDate'>) => {
    console.log('Car rental booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Car Rental</h2>
        <p className="text-gray-600">Rent the perfect car for your journey</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={searchForm.location}
              onChange={(e) => setSearchForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Pickup location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
            <select
              value={searchForm.carType}
              onChange={(e) => setSearchForm(prev => ({ ...prev, carType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={searchForm.priceRange}
              onChange={(e) => setSearchForm(prev => ({ ...prev, priceRange: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100">$100+</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search Cars
            </button>
          </div>
        </form>
      </div>

      {/* Car Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" color="purple" />
            <p className="mt-4 text-gray-600">Finding available cars...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.carBrand} ${car.carModel}`}
                  className="w-full h-48 object-cover"
                />
                {!car.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                      Not Available
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {car.carType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {car.carBrand} {car.carModel}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(car.rating)}
                    <span className="text-sm text-gray-600 ml-1">{car.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{car.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Settings className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {car.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 2 && (
                      <span className="text-gray-500 text-xs">
                        +{car.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      ${car.pricePerDay}
                    </div>
                    <div className="text-sm text-gray-600">per day</div>
                  </div>
                  <button
                    onClick={() => handleBooking(car)}
                    disabled={!car.available}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {car.available ? 'Rent Now' : 'Unavailable'}
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
        bookingData={selectedCar}
        bookingType="car"
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default CarRental;