import React, { useState } from 'react';
import { Bus, Plane, Car, Calendar, MapPin } from 'lucide-react';
import BusBooking from './BusBooking';
import FlightBooking from './FlightBooking';
import CarRental from './CarRental';

const TransportationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bus' | 'flight' | 'car'>('bus');

  const tabs = [
    {
      id: 'bus' as const,
      label: 'Bus Booking',
      icon: Bus,
      color: 'from-green-500 to-blue-500',
      description: 'Comfortable bus journeys'
    },
    {
      id: 'flight' as const,
      label: 'Flight Booking',
      icon: Plane,
      color: 'from-blue-500 to-purple-500',
      description: 'Quick air travel'
    },
    {
      id: 'car' as const,
      label: 'Car Rental',
      icon: Car,
      color: 'from-orange-500 to-red-500',
      description: 'Flexible car rentals'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transportation Booking</h1>
          <p className="text-xl text-gray-600">Book buses, flights, and rental cars all in one place</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-xl`
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{tab.label}</h3>
                    <p className={`text-sm ${
                      activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'bus' && <BusBooking />}
          {activeTab === 'flight' && <FlightBooking />}
          {activeTab === 'car' && <CarRental />}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">Simple and intuitive booking process with instant confirmation</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Coverage</h3>
            <p className="text-gray-600">Extensive network covering major cities and destinations</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing with no hidden fees or charges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationDashboard;