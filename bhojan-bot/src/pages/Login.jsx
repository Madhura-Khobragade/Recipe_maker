import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(formData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-secondary bg-opacity-95">
      <div className="max-w-md w-full">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
            <svg 
              className="w-10 h-10 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 15a2.25 2.25 0 002.25-2.25V5.25A2.25 0 0012 3v12z" 
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome!</h1>
          <p className="text-lg text-gray-300 mt-2">Please log in to continue.</p>
        </header>
        
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-50 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 ${
                  errors.name ? 'border-red-400' : 'border-gray-200'
                }`}
                placeholder="e.g., Rohan"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-50 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 ${
                  errors.location ? 'border-red-400' : 'border-gray-200'
                }`}
                placeholder="e.g., Mumbai, India"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="main-button w-full"
            >
              Start Cooking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
