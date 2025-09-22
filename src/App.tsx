import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';

const AppContent: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      {authMode === 'login' ? (
        <LoginPage onSwitchToSignup={() => setAuthMode('signup')} />
      ) : (
        <SignupPage onSwitchToLogin={() => setAuthMode('login')} />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;