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
        'md': '25px',
        'lg': '30px',
        'xl': '40px',
        'bottom-lg': '30px',
      },
      colors: {
        brown: "#8a3834",
        gradientStart: "#93b9ff",
        skyblue: "#8aceff",
        redColor: "#d14204",
        skinColor: "#cfae8c", 
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
};
