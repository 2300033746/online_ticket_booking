export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  category: string;
  image: string;
  availableSeats: number;
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  seats: number;
  totalPrice: number;
  bookingDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Transportation Types
export interface BusRoute {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  busOperator: string;
  busType: string;
  availableSeats: number;
  amenities: string[];
  date: string;
}

export interface FlightRoute {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  airline: string;
  flightNumber: string;
  aircraft: string;
  availableSeats: number;
  class: 'Economy' | 'Business' | 'First';
  date: string;
  stops: number;
}

export interface CarRental {
  id: string;
  carModel: string;
  carBrand: string;
  carType: string;
  pricePerDay: number;
  location: string;
  available: boolean;
  features: string[];
  fuelType: string;
  transmission: string;
  seats: number;
  image: string;
  rating: number;
}

export interface TransportationBooking {
  id: string;
  type: 'bus' | 'flight' | 'car';
  bookingDetails: BusRoute | FlightRoute | CarRental;
  passengers?: number;
  rentalDays?: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}