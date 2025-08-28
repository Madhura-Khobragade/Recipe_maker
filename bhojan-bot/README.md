# 🍳 Bhojan Bot - Recipe Suggester (React Version)

A modern, React-based recipe recommendation web application that helps you discover delicious recipes based on the ingredients you have in your kitchen. Built with React.js, Tailwind CSS, and integrated with Google's Gemini AI for intelligent recipe suggestions.

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

- **Frontend Framework**: React.js 19.1.1
- **Routing**: React Router DOM with Hash Routing
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: Google Gemini AI API
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App
- **External Services**: YouTube Search API

## 📋 Prerequisites

Before running this application, you'll need:

1. **Node.js** (version 16 or higher)
2. **Google Gemini AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key for configuration

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bhojan-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
# Copy the example file
cp env.example .env

# Edit .env and add your API key
REACT_APP_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

The application uses the following environment variables:

- `REACT_APP_GEMINI_API_KEY`: Your Google Gemini AI API key
- `REACT_APP_GEMINI_API_URL`: API endpoint (optional, has default)
- `REACT_APP_APP_NAME`: Application name (optional)
- `REACT_APP_APP_VERSION`: Application version (optional)

### API Key Security

**IMPORTANT**: Never commit your `.env` file to version control. The `.env` file is already added to `.gitignore`.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── RecipeCard.jsx  # Recipe display component
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Home.jsx        # Main recipe search
│   ├── SomethingNew.jsx # Fusion recipe generator
│   └── HealthCorner.jsx # Healthy recipes page
├── services/           # API and external services
│   └── api.js         # Gemini AI API service
├── utils/              # Utility functions
│   └── recipeParser.js # Recipe text parsing utilities
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

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

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern web browsers

## 🚨 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your `.env` file is in the root directory
   - Verify the API key starts with `REACT_APP_`
   - Check if the API key has proper permissions

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check browser console for CSS errors

### Debug Mode
Open browser developer tools (F12) to:
- View console logs for errors
- Inspect network requests
- Debug React components

## 🔒 Security Considerations

- **API Key Protection**: API keys are stored in environment variables
- **Route Protection**: Protected routes require authentication
- **Input Validation**: Form inputs are validated before submission
- **Error Handling**: Sensitive information is not exposed in error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository for automatic deployment
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload the `build` folder to S3

### Production Environment Variables

Set the same environment variables in your production environment:
- `REACT_APP_GEMINI_API_KEY`
- `REACT_APP_GEMINI_API_URL` (if different)

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
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Indian Culinary Community** for inspiration
- **Open Source Community** for tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify your environment variables are set correctly

---

**Happy Cooking! 🍽️**

*Bhojan Bot - Making cooking accessible, one recipe at a time.*
