/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316', // Tamil Nadu temple terracotta/saffron orange
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
        },
        cultural: {
          green: '#047857', // Ghats & Paddy
          blue: '#0284c7',  // Confluence Ocean
          gold: '#d97706',  // Traditional Halwa & Temple gopuram gold
        }
      }
    },
  },
  plugins: [],
}
