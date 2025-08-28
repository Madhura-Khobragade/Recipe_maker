import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    if (!user && path !== '/login') {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div 
          className="text-2xl font-bold text-secondary cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          Bhojan Bot
        </div>
        
        <div className="space-x-4">
          <button 
            onClick={() => handleNavigation('/')}
            className={`font-semibold transition-colors ${
              isActive('/') 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Home
          </button>
          
          <button 
            onClick={() => handleNavigation('/something-new')}
            className={`font-semibold transition-colors ${
              isActive('/something-new') 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Something New
          </button>
          
          <button 
            onClick={() => handleNavigation('/health-corner')}
            className={`font-semibold transition-colors ${
              isActive('/health-corner') 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Health Corner
          </button>
          
          {user ? (
            <button 
              onClick={onLogout}
              className="text-gray-600 hover:text-primary font-semibold transition-colors"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => handleNavigation('/login')}
              className={`font-semibold transition-colors ${
                isActive('/login') 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
