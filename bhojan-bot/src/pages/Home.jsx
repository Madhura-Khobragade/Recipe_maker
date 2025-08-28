import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import ApiService from '../services/api';
import { parseMultipleRecipes } from '../utils/recipeParser';

const Home = ({ user }) => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecipe = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients first!');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const apiService = new ApiService();
      const generatedText = await apiService.generateRecipesFromIngredients(
        user.name,
        user.location,
        ingredients
      );
      
      const parsedRecipes = parseMultipleRecipes(generatedText, 3);
      setRecipes(parsedRecipes);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-yellow-100">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
              Find a Recipe
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Happy cooking, {user.name}! What's in your kitchen in {user.location}?
            </p>
            
            <div className="text-left">
              <label htmlFor="ingredients" className="block text-lg font-semibold mb-3 text-gray-700">
                What's in your kitchen?
              </label>
              <textarea
                id="ingredients"
                rows="4"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
                placeholder="e.g., potatoes, onions, tomatoes, ginger..."
              />
              <button
                onClick={handleGetRecipe}
                disabled={loading}
                className="main-button mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Finding Recipes...' : 'Suggest Recipes'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          {loading && (
            <div className="flex justify-center items-center flex-col">
              <div className="loader"></div>
              <p className="mt-3 text-gray-600">Finding the perfect recipes for you...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {recipes.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
              recipes.length === 1 ? 'max-w-3xl mx-auto' : ''
            }`}>
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
