import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import SomethingNew from './pages/SomethingNew';
import HealthCorner from './pages/HealthCorner';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('bhojanBotUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('bhojanBotUser');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('bhojanBotUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bhojanBotUser');
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home user={user} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/something-new" 
            element={
              <ProtectedRoute>
                <SomethingNew />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/health-corner" 
            element={
              <ProtectedRoute>
                <HealthCorner />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to home if logged in, login if not */}
          <Route 
            path="*" 
            element={
              user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
