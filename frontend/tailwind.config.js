/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF',
        'primary-dark': '#3b47c0',
        'periwinkle': '#a8b6ff'
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #2b32b2 0%, #1488cc 100%)',
        'gradient-soft': 'linear-gradient(135deg, #5F6FFF 0%, #a8b6ff 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}