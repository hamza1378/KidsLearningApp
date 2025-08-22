/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins_700Bold', 'System'],
        heading: ['Poppins_600SemiBold', 'System'],
        body: ['Poppins_400Regular', 'System'],
      },
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
        greenColor: "#65f79d",
        skinColor: "#cfae8c",
        lightGreen: "#bdf0d1",
        primary: {
          DEFAULT: '#38bdf8',
          light: '#7dd3fc',
          dark: '#0ea5e9',
        },
        secondary: {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
        },
        success: '#22c55e',
        warning: '#fbbf24',
        danger: '#ef4444',
        text: {
          primary: '#101519',
          secondary: '#5a748c',
          muted: '#9ca3af',
        },
        card: {
          bg: '#ffffff',
          border: '#f3f4f6',
        },
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px rgba(0, 0, 0, 0.8)',
      },
      spacing: {
        'safe-b': '48px',
        'screen-px': '16px',
      },
    },
  },
  plugins: [],
};
