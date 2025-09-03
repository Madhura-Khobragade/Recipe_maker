import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import ApiService from '../services/api';
import { parseMultipleRecipes } from '../utils/recipeParser';

const SomethingNew = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateNewDish = async () => {
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const apiService = new ApiService();
      const generatedText = await apiService.generateNewFusionDish();
      
      const parsedRecipes = parseMultipleRecipes(generatedText, 1);
      setRecipes(parsedRecipes);
    } catch (error) {
      console.error('Error generating new dish:', error);
      setError('Could not generate a new dish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-3xl text-center">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
            Feeling Adventurous?
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Let's discover a brand new Indian fusion dish for you to try!
          </p>
          <button
            onClick={handleGenerateNewDish}
            disabled={loading}
            className="main-button text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Inventing...' : 'Generate a New Dish'}
          </button>
        </div>
        
        <div>
          {loading && (
            <div className="flex justify-center items-center flex-col">
              <div className="loader"></div>
              <p className="mt-3 text-gray-600">Inventing a new recipe...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {recipes.length > 0 && (
            <div className="max-w-3xl mx-auto">
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

export default SomethingNew;
