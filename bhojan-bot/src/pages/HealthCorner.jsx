import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import ApiService from '../services/api';
import { parseMultipleRecipes } from '../utils/recipeParser';

// Static healthy recipes data - moved outside component to avoid dependency issues
const staticHealthyDishes = [
  {
    dishName: "Moong Dal Cheela (Savory Lentil Crepes)",
    cuisine: "Healthy Indian",
    description: "Light, protein-packed savory crepes made from yellow lentils, perfect for breakfast or a light meal.",
    healthBenefits: "Moong dal is rich in protein and fiber, making these cheelas filling and great for blood sugar control. They are low in fat and easy to digest.",
    youtubeQuery: "Moong Dal Cheela Recipe",
    recipeContent: `
      <h3>Ingredients</h3>
      <ul>
        <li>1 cup yellow moong dal, soaked for 4 hours</li>
        <li>1/2 inch ginger</li>
        <li>1 green chili</li>
        <li>1/4 cup chopped coriander</li>
        <li>1/4 tsp turmeric powder</li>
        <li>Salt to taste</li>
        <li>Oil for cooking</li>
      </ul>
      <h3>Instructions</h3>
      <ol>
        <li>Drain the soaked moong dal and grind it with ginger and green chili to a smooth batter.</li>
        <li>Add coriander, turmeric, and salt to the batter and mix well.</li>
        <li>Heat a non-stick pan and lightly grease it with oil.</li>
        <li>Pour a ladleful of batter and spread it in a circular motion to form a thin crepe.</li>
        <li>Drizzle a little oil and cook on both sides until golden brown.</li>
      </ol>
    `
  },
  {
    dishName: "Vegetable Raita (Yogurt Dip)",
    cuisine: "Healthy Indian",
    description: "A cooling and refreshing yogurt dip mixed with fresh vegetables and mild spices.",
    healthBenefits: "Yogurt is a great source of probiotics, which are essential for gut health. The raw vegetables add fiber and vitamins, making this a perfect accompaniment to any meal.",
    youtubeQuery: "Mixed Vegetable Raita Recipe",
    recipeContent: `
      <h3>Ingredients</h3>
      <ul>
        <li>1 cup plain yogurt (dahi)</li>
        <li>1/4 cup grated cucumber</li>
        <li>1/4 cup grated carrot</li>
        <li>1/4 cup finely chopped onion</li>
        <li>1/4 tsp roasted cumin powder</li>
        <li>Salt to taste</li>
        <li>Chopped coriander for garnish</li>
      </ul>
      <h3>Instructions</h3>
      <ol>
        <li>Whisk the yogurt in a bowl until smooth.</li>
        <li>Add the grated cucumber, carrot, and chopped onion.</li>
        <li>Stir in the roasted cumin powder and salt.</li>
        <li>Garnish with fresh coriander and serve chilled.</li>
      </ol>
    `
  }
];

const staticHealthyDrinks = [
  {
    dishName: "Masala Chaas (Spiced Buttermilk)",
    cuisine: "Ayurvedic Drink",
    description: "A traditional Indian digestive drink made from yogurt, water, and spices.",
    healthBenefits: "Chaas is a fantastic digestive aid that cools the body. The spices like cumin and ginger help in digestion and reduce bloating. It's a light, hydrating, and probiotic-rich drink.",
    youtubeQuery: "How to make Masala Chaas",
    recipeContent: `
      <h3>Ingredients</h3>
      <ul>
        <li>1/2 cup plain yogurt</li>
        <li>1.5 cups cold water</li>
        <li>1/2 tsp roasted cumin powder</li>
        <li>A pinch of black salt (kala namak)</li>
        <li>1/4 inch ginger, grated</li>
        <li>1 tbsp chopped coriander leaves</li>
      </ul>
      <h3>Instructions</h3>
      <ol>
        <li>In a blender, combine yogurt, water, cumin powder, black salt, and ginger.</li>
        <li>Blend for 30 seconds until frothy.</li>
        <li>Stir in the chopped coriander leaves.</li>
        <li>Serve chilled for a refreshing experience.</li>
      </ol>
    `
  },
  {
    dishName: "Amla Juice (Indian Gooseberry)",
    cuisine: "Wellness Drink",
    description: "A tangy and powerful juice renowned for its immense health benefits.",
    healthBenefits: "Amla is one of the richest sources of Vitamin C, a potent antioxidant that boosts immunity. It's excellent for skin, hair, and overall vitality.",
    youtubeQuery: "Fresh Amla Juice Recipe",
    recipeContent: `
      <h3>Ingredients</h3>
      <ul>
        <li>4-5 fresh amlas (Indian gooseberries)</li>
        <li>1 cup water</li>
        <li>1 tsp honey (optional)</li>
        <li>A pinch of black pepper</li>
      </ul>
      <h3>Instructions</h3>
      <ol>
        <li>Wash and de-seed the amlas.</li>
        <li>Chop them into small pieces and add to a blender with water.</li>
        <li>Blend until smooth.</li>
        <li>Strain the juice through a fine-mesh sieve.</li>
        <li>Stir in honey and a pinch of black pepper. Serve immediately.</li>
      </ol>
    `
  }
];

const HealthCorner = () => {
  const [healthyDishes, setHealthyDishes] = useState([]);
  const [healthyDrinks, setHealthyDrinks] = useState([]);
  const [loadingDish, setLoadingDish] = useState(false);
  const [loadingDrink, setLoadingDrink] = useState(false);
  const [errorDish, setErrorDish] = useState('');
  const [errorDrink, setErrorDrink] = useState('');

  useEffect(() => {
    setHealthyDishes(staticHealthyDishes);
    setHealthyDrinks(staticHealthyDrinks);
  }, []);

  const handleGenerateHealthyRecipe = async (type) => {
    if (type === 'dish') {
      setLoadingDish(true);
      setErrorDish('');
    } else {
      setLoadingDrink(true);
      setErrorDrink('');
    }

    try {
      const apiService = new ApiService();
      const generatedText = await apiService.generateHealthyRecipe(type);
      
      const parsedRecipes = parseMultipleRecipes(generatedText, 1);
      
      if (type === 'dish') {
        setHealthyDishes(prev => [...prev, ...parsedRecipes]);
      } else {
        setHealthyDrinks(prev => [...prev, ...parsedRecipes]);
      }
    } catch (error) {
      console.error(`Error generating healthy ${type}:`, error);
      if (type === 'dish') {
        setErrorDish(`Could not generate a healthy ${type}. Please try again.`);
      } else {
        setErrorDrink(`Could not generate a healthy ${type}. Please try again.`);
      }
    } finally {
      if (type === 'dish') {
        setLoadingDish(false);
      } else {
        setLoadingDrink(false);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
            Health Corner
          </h1>
          <p className="text-lg text-gray-500">
            Nutritious and delicious Indian recipes for a healthier you.
          </p>
        </div>
        
        {/* Healthy Dishes Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-secondary">Healthy Dishes</h2>
            <button
              onClick={() => handleGenerateHealthyRecipe('dish')}
              disabled={loadingDish}
              className="main-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingDish ? 'Generating...' : 'Generate New Dish'}
            </button>
          </div>
          
          {loadingDish && (
            <div className="flex justify-center items-center flex-col mb-6">
              <div className="loader"></div>
              <p className="mt-3 text-gray-600">Generating a healthy Indian dish...</p>
            </div>
          )}
          
          {errorDish && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline"> {errorDish}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthyDishes.map((recipe, index) => (
              <RecipeCard key={`dish-${index}`} recipe={recipe} index={index} />
            ))}
          </div>
        </div>

        {/* Healthy Drinks Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-secondary">Healthy Drinks</h2>
            <button
              onClick={() => handleGenerateHealthyRecipe('drink')}
              disabled={loadingDrink}
              className="main-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingDrink ? 'Generating...' : 'Generate New Drink'}
            </button>
          </div>
          
          {loadingDrink && (
            <div className="flex justify-center items-center flex-col mb-6">
              <div className="loader"></div>
              <p className="mt-3 text-gray-600">Generating a healthy Indian drink...</p>
            </div>
          )}
          
          {errorDrink && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline"> {errorDrink}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthyDrinks.map((recipe, index) => (
              <RecipeCard key={`drink-${index}`} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCorner;
