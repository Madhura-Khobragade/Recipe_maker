import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  // Initialize ingredients with random positions and movement directions
  useEffect(() => {
    const generateIngredients = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      const ingredientTypes = [
        { emoji: '🍅', color: 'red', size: 'w-24 h-24', textSize: 'text-4xl' },
        { emoji: '🧅', color: 'orange', size: 'w-20 h-20', textSize: 'text-3xl' },
        { emoji: '🥬', color: 'green', size: 'w-18 h-18', textSize: 'text-2xl' },
        { emoji: '🍆', color: 'purple', size: 'w-22 h-22', textSize: 'text-3xl' },
        { emoji: '🥕', color: 'red-orange', size: 'w-20 h-20', textSize: 'text-2xl' },
        { emoji: '🌶️', color: 'yellow', size: 'w-18 h-18', textSize: 'text-2xl' },
        { emoji: '🌿', color: 'amber', size: 'w-16 h-16', textSize: 'text-xl' },
        { emoji: '🫘', color: 'brown', size: 'w-18 h-18', textSize: 'text-lg' },
        { emoji: '🌱', color: 'emerald', size: 'w-16 h-16', textSize: 'text-lg' },
        { emoji: '🧄', color: 'blue', size: 'w-18 h-18', textSize: 'text-lg' },
        { emoji: '🍠', color: 'pink', size: 'w-20 h-20', textSize: 'text-xl' },
        { emoji: '🥒', color: 'teal', size: 'w-22 h-22', textSize: 'text-2xl' },
        { emoji: '🥑', color: 'lime', size: 'w-24 h-24', textSize: 'text-3xl' },
        { emoji: '🍎', color: 'red', size: 'w-16 h-16', textSize: 'text-lg' },
        { emoji: '🍊', color: 'orange', size: 'w-18 h-18', textSize: 'text-xl' },
        { emoji: '🥝', color: 'green', size: 'w-20 h-20', textSize: 'text-2xl' },
        { emoji: '🫐', color: 'purple', size: 'w-16 h-16', textSize: 'text-lg' },
        { emoji: '🍋', color: 'yellow', size: 'w-18 h-18', textSize: 'text-xl' },
        { emoji: '🧂', color: 'blue', size: 'w-14 h-14', textSize: 'text-sm' },
        { emoji: '🥜', color: 'brown', size: 'w-16 h-16', textSize: 'text-sm' },
        { emoji: '🌰', color: 'amber', size: 'w-18 h-18', textSize: 'text-lg' },
        { emoji: '🥜', color: 'brown', size: 'w-16 h-16', textSize: 'text-sm' },
        { emoji: '🍯', color: 'yellow', size: 'w-14 h-14', textSize: 'text-sm' },
        { emoji: '🥛', color: 'blue', size: 'w-16 h-16', textSize: 'text-sm' },
        { emoji: '🥚', color: 'yellow', size: 'w-18 h-18', textSize: 'text-lg' }
      ];

      const newIngredients = ingredientTypes.map((ingredient, index) => ({
        id: index,
        ...ingredient,
        x: Math.random() * (windowWidth - 100),
        y: Math.random() * (windowHeight - 100),
        velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
        velocityY: (Math.random() - 0.5) * 2, // Random vertical velocity
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
        isHovered: false
      }));

      setIngredients(newIngredients);
    };

    generateIngredients();
    
    // Regenerate on window resize
    const handleResize = () => generateIngredients();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop for automatic movement
  useEffect(() => {
    const animateIngredients = () => {
      setIngredients(prev => prev.map(ingredient => {
        if (ingredient.isDragging || ingredient.isHovered) return ingredient;
        
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        let newX = ingredient.x + ingredient.velocityX;
        let newY = ingredient.y + ingredient.velocityY;
        
        // Bounce off walls
        if (newX <= 0 || newX >= windowWidth - 100) {
          newX = Math.max(0, Math.min(windowWidth - 100, newX));
          ingredient.velocityX *= -1;
        }
        
        if (newY <= 0 || newY >= windowHeight - 100) {
          newY = Math.max(0, Math.min(windowHeight - 100, newY));
          ingredient.velocityY *= -1;
        }
        
        return {
          ...ingredient,
          x: newX,
          y: newY,
          velocityX: ingredient.velocityX,
          velocityY: ingredient.velocityY
        };
      }));
    };

    const animationInterval = setInterval(animateIngredients, 50); // 20 FPS
    
    return () => clearInterval(animationInterval);
  }, []);

  const handleMouseDown = (e, ingredient) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setIngredients(prev => prev.map(ing => 
      ing.id === ingredient.id 
        ? { ...ing, isDragging: true, dragOffset: { x: offsetX, y: offsetY } }
        : ing
    ));
  };

  const handleMouseMove = (e) => {
    if (ingredients.some(ing => ing.isDragging)) {
      setIngredients(prev => prev.map(ing => {
        if (ing.isDragging) {
          const newX = e.clientX - ing.dragOffset.x;
          const newY = e.clientY - ing.dragOffset.y;
          return { ...ing, x: newX, y: newY };
        }
        return ing;
      }));
    }
  };

  const handleMouseUp = () => {
    setIngredients(prev => prev.map(ing => ({ ...ing, isDragging: false })));
  };

  const handleMouseEnter = (ingredientId) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === ingredientId 
        ? { ...ing, isHovered: true }
        : ing
    ));
  };

  const handleMouseLeave = (ingredientId) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === ingredientId 
        ? { ...ing, isHovered: false }
        : ing
    ));
  };

  useEffect(() => {
    if (ingredients.some(ing => ing.isDragging)) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [ingredients]);

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

  const getGlowClass = (color) => {
    const glowMap = {
      'red': 'animate-glow-red',
      'orange': 'animate-glow-orange',
      'green': 'animate-glow-green',
      'purple': 'animate-glow-purple',
      'red-orange': 'animate-glow-red-orange',
      'yellow': 'animate-glow-yellow',
      'amber': 'animate-glow-amber',
      'brown': 'animate-glow-brown',
      'emerald': 'animate-glow-emerald',
      'blue': 'animate-glow-blue',
      'pink': 'animate-glow-pink',
      'teal': 'animate-glow-teal',
      'lime': 'animate-glow-lime'
    };
    return glowMap[color] || 'animate-glow-red';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
      {/* Enhanced Background Ingredients Section - Full Window Coverage */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving Ingredients */}
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 ease-in-out ${
              ingredient.isDragging ? 'z-50' : ingredient.isHovered ? 'z-40' : 'z-10'
            }`}
            style={{
              left: ingredient.x,
              top: ingredient.y,
              transform: ingredient.isDragging 
                ? 'scale(1.1) rotate(5deg)' 
                : ingredient.isHovered 
                ? 'scale(1.2) rotate(10deg)' 
                : 'scale(1) rotate(0deg)'
            }}
            onMouseDown={(e) => handleMouseDown(e, ingredient)}
            onMouseEnter={() => handleMouseEnter(ingredient.id)}
            onMouseLeave={() => handleMouseLeave(ingredient.id)}
          >
            <div className={`${ingredient.size} bg-gradient-to-br rounded-full shadow-2xl hover:scale-125 hover:rotate-12 transition-all duration-500 ease-in-out ${getGlowClass(ingredient.color)} pointer-events-auto`}>
              <div className={`w-full h-full flex items-center justify-center text-white ${ingredient.textSize}`}>
                {ingredient.emoji}
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-200 via-transparent to-orange-200"></div>
        </div>
        
        {/* Floating Particles Effect - Full Coverage */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-3/4 right-1/6 w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-1/6 left-3/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-5/6 right-3/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-1/2 left-1/8 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-1/2 right-1/8 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-1/8 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-7/8 right-1/2 w-2 h-2 bg-rose-400 rounded-full animate-pulse opacity-60"></div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-white/30 backdrop-blur-md rounded-full p-6 mb-6 shadow-2xl border border-white/30 animate-float-slow hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out">
              <svg 
                className="w-12 h-12 text-white drop-shadow-lg" 
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
                  d="M12 15a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0012 3v12z" 
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-3 drop-shadow-lg animate-fade-in hover:scale-105 transition-transform duration-300 ease-in-out">Welcome!</h1>
            <p className="text-xl text-gray-600 mt-3 animate-fade-in-delay hover:text-gray-800 transition-colors duration-300 ease-in-out">Please log in to continue.</p>
          </header>
          
          <div className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30 transform hover:scale-105 hover:shadow-3xl transition-all duration-500 ease-in-out">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 group">
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-2 group-hover:text-green-600 transition-colors duration-300 ease-in-out">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-50/90 border-2 rounded-xl focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all duration-300 ease-in-out text-lg group-hover:bg-gray-50/95 group-hover:border-green-300 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="e.g., Rohan"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 animate-shake">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-8 group">
                <label htmlFor="location" className="block text-base font-semibold text-gray-700 mb-2 group-hover:text-green-600 transition-colors duration-300 ease-in-out">
                  Your Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-50/90 border-2 rounded-xl focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all duration-300 ease-in-out text-lg group-hover:bg-gray-50/95 group-hover:border-green-300 ${
                    errors.location ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="e.g., Mumbai, India"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-2 animate-shake">{errors.location}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out shadow-xl animate-pulse-slow"
              >
                Start Cooking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
