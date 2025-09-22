import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('ticketBookingUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({ user, isAuthenticated: true });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation (in real app, this would be server-side)
    const storedUsers = JSON.parse(localStorage.getItem('ticketBookingUsers') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userData: User = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      };
      setAuthState({ user: userData, isAuthenticated: true });
      localStorage.setItem('ticketBookingUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('ticketBookingUsers') || '[]');
    
    // Check if user already exists
    const existingUser = storedUsers.find((u: any) => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('ticketBookingUsers', JSON.stringify(storedUsers));
    
    // Auto login after signup
    const user: User = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone,
    };
    setAuthState({ user, isAuthenticated: true });
    localStorage.setItem('ticketBookingUser', JSON.stringify(user));
    
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('ticketBookingUser');
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};