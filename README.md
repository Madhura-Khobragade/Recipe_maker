# 🍳 Bhojan Bot - Recipe Suggester

A smart, AI-powered recipe recommendation web application that helps you discover delicious recipes based on the ingredients you have in your kitchen. Built with modern web technologies and integrated with Google's Gemini AI for intelligent recipe suggestions.

## ✨ Features

### 🏠 **Smart Recipe Search**
- Input your available ingredients and get personalized recipe suggestions
- AI-powered recommendations from various cuisines worldwide
- Detailed cooking instructions and ingredient lists

### 🌟 **Something New**
- Generate creative, unique Indian fusion recipes
- Discover innovative dishes you've never tried before
- Perfect for adventurous home cooks

### 🥗 **Health Corner**
- Curated collection of healthy Indian recipes
- Nutritious drink suggestions with health benefits
- Ayurvedic and wellness-focused options

### 🎥 **Video Integration**
- Direct links to YouTube cooking videos
- Search for recipe tutorials and cooking tips
- Learn from expert chefs and home cooks

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: Google Gemini AI API
- **External Services**: YouTube Search API
- **Design**: Responsive, mobile-first approach

## 📋 Prerequisites

Before running this application, you'll need:

1. **Google Gemini AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key for configuration

2. **Modern Web Browser**
   - Chrome, Firefox, Safari, or Edge (latest versions)
   - JavaScript enabled

## 🛠️ Installation & Setup

### Option 1: Quick Start (Recommended)
1. Clone or download this repository
2. Open `recipe-app.html` in your web browser
3. **Important**: Update the API key in the JavaScript code (see Configuration section)

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Recipe_maker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open `recipe-app.html` in your browser

## ⚙️ Configuration

### Setting Up Google Gemini AI API

1. **Locate the API Key in the code:**
   ```javascript
   const apiKey = "AIzaSyDeY02OHbOWpTH0k_Q6vy0RwctJ4LDhYGc";
   ```

2. **Replace with your actual API key:**
   ```javascript
   const apiKey = "YOUR_ACTUAL_API_KEY_HERE";
   ```

3. **API Key Location in Code:**
   - File: `recipe-app.html`
   - Line: ~580 (in the `callGeminiAPI` function)

### Environment Variables (Optional)
For production deployment, consider moving the API key to environment variables or a secure configuration file.

## 🎯 Usage Guide

### 1. **Getting Started**
   - Open the application in your browser
   - Enter your name and location on the login page
   - Click "Start Cooking" to begin

### 2. **Finding Recipes**
   - Navigate to the Home page
   - Enter your available ingredients in the text area
   - Click "Suggest Recipes" to get AI-powered suggestions
   - Browse through the recommended recipes

### 3. **Exploring New Dishes**
   - Visit the "Something New" page
   - Click "Generate a New Dish" for creative fusion recipes
   - Discover unique culinary combinations

### 4. **Healthy Eating**
   - Check out the "Health Corner"
   - Generate healthy Indian dishes and drinks
   - Learn about nutritional benefits

### 5. **Recipe Details**
   - Click on any recipe card to expand details
   - View ingredients, instructions, and health benefits
   - Use the "Watch Video" button to find cooking tutorials

## 🔧 Customization

### Styling
- Modify colors in the CSS variables
- Adjust animations and transitions
- Customize the Indian cultural theme elements

### Recipe Generation
- Modify AI prompts for different cuisines
- Adjust the number of recipes displayed
- Customize recipe card layouts

### Features
- Add new recipe categories
- Integrate additional APIs
- Implement user preferences and favorites

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern web browsers

## 🚨 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your Google Gemini AI API key is correctly set
   - Check if the API key has proper permissions
   - Verify the API is enabled in your Google Cloud Console

2. **Recipe Generation Fails**
   - Check your internet connection
   - Verify the API key is valid
   - Try refreshing the page

3. **Styling Issues**
   - Ensure Tailwind CSS is loading properly
   - Check browser console for CSS errors
   - Verify all font files are accessible

### Debug Mode
Open browser developer tools (F12) to:
- View console logs for errors
- Inspect network requests
- Debug JavaScript functionality

## 🔒 Security Considerations

- **API Key Protection**: Never expose your API key in public repositories
- **Rate Limiting**: Be aware of API usage limits
- **User Data**: The application doesn't store personal data permanently

## 🚀 Deployment

### Static Hosting
- **Netlify**: Drag and drop the HTML file
- **Vercel**: Deploy as a static site
- **GitHub Pages**: Host directly from your repository

### Production Considerations
- Minify CSS and JavaScript
- Optimize images and assets
- Implement proper error handling
- Add analytics and monitoring

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Improvement
- Add more cuisines and recipe types
- Implement user accounts and favorites
- Add recipe rating and reviews
- Integrate with recipe databases
- Add nutritional information

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent recipe generation
- **Tailwind CSS** for the beautiful UI framework
- **Indian Culinary Community** for inspiration
- **Open Source Community** for tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify your API key configuration

---

**Happy Cooking! 🍽️**

*Bhojan Bot - Making cooking accessible, one recipe at a time.*
