import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoRmbg from '../assets/images/logo_rmbg.png';

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
    <header className="sticky top-0 z-50 border-0 shadow-none">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center py-4">
        {/* Expanding Header Container */}
        <div className="relative group">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center group-hover:justify-start group-hover:px-6 group-hover:rounded-full transition-all duration-500 ease-in-out overflow-hidden py-2 px-3">
            {/* Logo */}
                          <div 
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => handleNavigation('/')}
              >
              <img 
                src={logoRmbg} 
                alt="Bhojan Bot Logo" 
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            
            {/* Navigation Links - Hidden by default, appear on hover */}
            <div className="flex items-center space-x-6 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out w-0 group-hover:w-auto overflow-hidden">
              <button 
                onClick={() => handleNavigation('/')}
                className={`font-medium text-base transition-all duration-300 ease-in-out whitespace-nowrap ${
                  isActive('/') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Home
              </button>
              
              <button 
                onClick={() => handleNavigation('/something-new')}
                className={`font-medium text-base transition-all duration-300 ease-in-out whitespace-nowrap ${
                  isActive('/something-new') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Something New
              </button>
              
              <button 
                onClick={() => handleNavigation('/health-corner')}
                className={`font-medium text-base transition-all duration-300 ease-in-out whitespace-nowrap ${
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
                  className="font-medium text-base text-gray-600 hover:text-primary transition-all duration-300 ease-in-out whitespace-nowrap"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => handleNavigation('/login')}
                  className={`font-medium text-base transition-all duration-300 ease-in-out whitespace-nowrap ${
                    isActive('/login') 
                      ? 'text-primary' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
