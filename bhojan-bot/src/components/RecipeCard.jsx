import React, { useState } from 'react';
import { createSvgPlaceholder } from '../utils/recipeParser';

const RecipeCard = ({ recipe, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl = createSvgPlaceholder(recipe.dishName);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="recipe-card"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <img 
        src={imageUrl} 
        alt={recipe.dishName}
        className="w-full h-48 object-cover"
      />
      
      <div className="recipe-card-header" onClick={handleToggle}>
        <h2>{recipe.dishName}</h2>
        <p className="description">
          {recipe.cuisine && (
            <span className="font-semibold text-primary">{recipe.cuisine}</span>
          )}
          {recipe.cuisine && ' | '}
          {recipe.description}
        </p>
      </div>
      
      <div className={`recipe-details ${isExpanded ? 'open' : ''}`}>
        <div className="recipe-details-content">
          {recipe.healthBenefits && (
            <div>
              <h3>Health Benefits</h3>
              <p className="text-gray-700 mb-4">{recipe.healthBenefits}</p>
            </div>
          )}
          
          <div 
            dangerouslySetInnerHTML={{ __html: recipe.recipeContent }}
            className="text-gray-700"
          />
          
          <a 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.youtubeQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Watch Video</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
