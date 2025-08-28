const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = process.env.REACT_APP_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';

class ApiService {
  constructor() {
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key not configured. Please set REACT_APP_GEMINI_API_KEY in your environment variables.');
    }
  }

  async callGeminiAPI(prompt) {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API call failed with status: ${response.status}. ${errorBody}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response structure:', result);
        throw new Error('Could not extract text from API response.');
      }
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  // Recipe generation methods
  async generateRecipesFromIngredients(userName, userLocation, ingredients) {
    const prompt = `
      You are an expert chef specializing in authentic, home-style cooking from all over the world.
      A user named ${userName} from ${userLocation} has the following ingredients available: ${ingredients}.
      Based *only* on these ingredients and common pantry staples (like salt, sugar, water, oil), suggest up to 3 simple and delicious dishes. The dishes can be from any cuisine.
      For each dish, your response must be structured as follows and separated by "---":
      **Dish Name:** The name of the dish.
      **Cuisine:** The cuisine of the dish (e.g., Indian, Italian, Mexican).
      **Description:** A brief, enticing one-sentence description.
      **YouTube Search Query:** A concise search query for finding a cooking video of the dish on YouTube (e.g., "Aloo Gobi Recipe").
      **Ingredients:** A bulleted list of ALL ingredients required.
      **Instructions:** A numbered list of clear, step-by-step cooking instructions.`;

    return await this.callGeminiAPI(prompt);
  }

  async generateNewFusionDish() {
    const prompt = `
      You are a highly creative and innovative chef. Invent a completely new, unique, and delicious-sounding Indian fusion recipe that a home cook can make. The dish should not be a standard or well-known recipe. Give it a creative name.
      Your response must be structured as follows:
      **Dish Name:** The creative name of the dish.
      **Cuisine:** A fusion or inventive cuisine style (e.g., "Modern Indian", "Global Fusion with Indian Spices").
      **Description:** A brief, enticing one-sentence description of your creation.
      **YouTube Search Query:** A concise, creative search query for a video that might inspire a similar dish (e.g., "Tandoori Paneer Tacos").
      **Ingredients:** A bulleted list of ALL ingredients required.
      **Instructions:** A numbered list of clear, step-by-step cooking instructions.`;

    return await this.callGeminiAPI(prompt);
  }

  async generateHealthyRecipe(type) {
    const prompt = `
      You are a nutritionist and chef specializing in healthy Indian cuisine. Generate a single, simple, and healthy Indian recipe for a ${type}.
      Your response must be structured as follows:
      **Dish Name:** The name of the healthy Indian ${type}.
      **Cuisine:** The cuisine style (e.g., "Ayurvedic", "Healthy Indian").
      **Description:** A brief, enticing one-sentence description.
      **Health Benefits:** A short paragraph explaining why this recipe is healthy according to Indian wellness principles. For example, mention key vitamins or benefits like "good for digestion" or "boosts immunity".
      **YouTube Search Query:** A concise search query for finding a video of the recipe.
      **Ingredients:** A bulleted list of ALL ingredients required.
      **Instructions:** A numbered list of clear, step-by-step cooking instructions.`;

    return await this.callGeminiAPI(prompt);
  }
}

export default ApiService;
