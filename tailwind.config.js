/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'sm': '20px',
        'md': '25px', // Fixed missing value
        'lg': '30px', // Fixed missing value
        'xl': '40px', // Fixed missing value
        'bottom-lg': '30px',
      },
      colors: {
        'brown': '#8a3834',
      }
    },
  },
  plugins: [],
};
