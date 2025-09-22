import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, Star, Bus, Plane, Car } from 'lucide-react';
import Header from './Header';
import EventCard from './EventCard';
import BookingModal from './BookingModal';
import MyBookings from './MyBookings';
import TransportationDashboard from '../Transportation/TransportationDashboard';
import { Event, Booking } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'bookings' | 'transportation'>('events');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['all', 'Music', 'Sports', 'Theater', 'Comedy', 'Conference'];

  useEffect(() => {
    loadEvents();
    loadBookings();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, categoryFilter]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      // Generate mock events with real images from Unsplash
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Summer Music Festival 2024',
          description: 'Join us for the biggest music festival of the year featuring top artists from around the world.',
          date: '2024-07-15',
          time: '18:00',
          venue: 'Central Park Amphitheater',
          price: 89.99,
          category: 'Music',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
          availableSeats: 500
        },
        {
          id: '2',
          title: 'Championship Basketball Game',
          description: 'Experience the excitement of professional basketball at its finest.',
          date: '2024-06-20',
          time: '19:30',
          venue: 'Sports Arena Downtown',
          price: 125.00,
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
          availableSeats: 0
        },
        {
          id: '3',
          title: 'Shakespeare in the Park',
          description: 'A magical evening of classic theater under the stars.',
          date: '2024-08-05',
          time: '20:00',
          venue: 'Riverside Theater',
          price: 45.00,
          category: 'Theater',
          image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=300&fit=crop',
          availableSeats: 150
        },
        {
          id: '4',
          title: 'Stand-Up Comedy Night',
          description: 'Laugh out loud with the best comedians in the city.',
          date: '2024-07-01',
          time: '21:00',
          venue: 'Comedy Club Central',
          price: 35.00,
          category: 'Comedy',
          image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
          availableSeats: 80
        },
        {
          id: '5',
          title: 'Tech Innovation Conference',
          description: 'Discover the latest trends in technology and innovation.',
          date: '2024-09-12',
          time: '09:00',
          venue: 'Convention Center',
          price: 199.99,
          category: 'Conference',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
          availableSeats: 300
        },
        {
          id: '6',
          title: 'Jazz Evening with Local Artists',
          description: 'Enjoy smooth jazz music in an intimate setting.',
          date: '2024-06-25',
          time: '20:30',
          venue: 'Blue Note Jazz Club',
          price: 55.00,
          category: 'Music',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
          availableSeats: 120
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBookings = () => {
    const storedBookings = localStorage.getItem('ticketBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  };

  const filterEvents = () => {
    if (categoryFilter === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === categoryFilter));
    }
  };

  const handleBookNow = (event: Event) => {
    setSelectedEvent(event);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString().split('T')[0],
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('ticketBookings', JSON.stringify(updatedBookings));

    // Update available seats
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === bookingData.eventId
          ? { ...event, availableSeats: event.availableSeats - bookingData.seats }
          : event
      )
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('ticketBookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'events'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Discover Events
            </div>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'bookings'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              My Bookings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('transportation')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'transportation'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Transportation
            </div>
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Amazing Events</h2>
              <p className="text-gray-600 text-lg">Find and book tickets for the best events in your city</p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by category:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        categoryFilter === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-300'
                      }`}
                    >
                      {category === 'all' ? 'All Events' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="lg" color="purple" />
                  <p className="mt-4 text-gray-600">Loading amazing events...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more events.</p>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <MyBookings bookings={bookings} onCancelBooking={handleCancelBooking} />
        )}

        {/* Transportation Tab */}
        {activeTab === 'transportation' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <TransportationDashboard />
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        event={selectedEvent}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default Dashboard;