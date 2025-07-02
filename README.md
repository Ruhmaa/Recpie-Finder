# Recpie-Finder


This is a responsive Recipe Finder web application built using ReactJS and styled with Tailwind CSS. The application allows users to search for recipes and view relevant details such as ingredients and cooking instructions.

## Features

 Search for recipes by keyword
 Display recipe images, ingredients, and instructions
 Clean, modular React components
 Responsive design with Tailwind CSS

## Technology Stack

- ReactJS
- Tailwind CSS
- API Reference: https://themealdb.com/api.php (By the way API  key Already available in my app.js file) 

## Follow the steps below to run the project locally:

### 1. Set up a new React project

npx create-react-app recipe-finder
cd recipe-finder

### 2. Install Tailwind CSS
Follow the official Tailwind CSS installation for Create React App:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
#### Then update tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
#### In src/index.css, replace everything with:

@tailwind base;
@tailwind components;
@tailwind utilities;
Import index.css in your src/index.js or src/main.jsx.

### 3. Copy project files
Replace the contents of the src folder with the files from this repository.

Ensure all component and CSS files are copied correctly.

### 4. Run the project
npm start

