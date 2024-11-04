/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'burkina-green': '#009E49',
        'burkina-red': '#EF2B2D',
        'burkina-yellow': '#FCD116'
      }
    },
  },
  plugins: [],
};