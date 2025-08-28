export const createSvgPlaceholder = (text) => {
  const sanitizedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
      <rect width="100%" height="100%" fill="#F5F5DC"></rect>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="30" fill="#2F4F4F">${sanitizedText}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const parseRecipeText = (text) => {
  const dishNameMatch = text.match(/\*\*Dish Name:\*\*\s*(.*)/);
  const cuisineMatch = text.match(/\*\*Cuisine:\*\*\s*(.*)/);
  const descriptionMatch = text.match(/\*\*Description:\*\*\s*(.*)/);
  const youtubeQueryMatch = text.match(/\*\*YouTube Search Query:\*\*\s*(.*)/);
  const healthBenefitsMatch = text.match(/\*\*Health Benefits:\*\*\s*(.*)/);
  
  const dishName = dishNameMatch ? dishNameMatch[1].trim() : "Suggested Recipe";
  const cuisine = cuisineMatch ? cuisineMatch[1].trim() : "";
  const description = descriptionMatch ? descriptionMatch[1].trim() : "A delicious dish based on your ingredients.";
  const youtubeQuery = youtubeQueryMatch ? youtubeQueryMatch[1].trim() : dishName;
  const healthBenefits = healthBenefitsMatch ? healthBenefitsMatch[1].trim() : "";

  // Parse the remaining content
  let recipeContent = text
    .replace(/\*\*Dish Name:\*\*\s*(.*)/, '')
    .replace(/\*\*Cuisine:\*\*\s*(.*)/, '')
    .replace(/\*\*Description:\*\*\s*(.*)/, '')
    .replace(/\*\*Health Benefits:\*\*\s*(.*)/, '')
    .replace(/\*\*YouTube Search Query:\*\*\s*(.*)/, '')
    .replace(/\*\*(.*?)\*\*/g, '<h3>$1</h3>')
    .replace(/^\s*\*/gm, '<ul><li>')
    .replace(/(\n\s*\*)/gm, '</li><li>')
    .replace(/<li>(.*?)<\/li>/gs, (match, p1) => `<li>${p1.trim()}</li>`)
    .replace(/<\/li>$/, '</li></ul>')
    .replace(/^\s*\d\./gm, '<ol><li>')
    .replace(/(\n\s*\d\.)/gm, '</li><li>')
    .replace(/<\/li>$/, '</li></ol>')
    .replace(/\n/g, '<br>');

  return {
    dishName,
    cuisine,
    description,
    youtubeQuery,
    healthBenefits,
    recipeContent
  };
};

export const parseMultipleRecipes = (text, maxRecipes = 3) => {
  const recipeStrings = text.split('---').filter(s => s.trim().length > 10).slice(0, maxRecipes);
  
  if (recipeStrings.length === 0 && text.includes('**Dish Name:**')) {
    recipeStrings.push(text); // Handle single recipe responses that don't use '---'
  }

  return recipeStrings.map(recipeText => parseRecipeText(recipeText));
};
