/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Custom Colors for Neon Effect
      colors: {
        'bg-primary': '#0A0A1A', // Deep dark background
        'neon-blue': '#00FFFF',   // Cyan/Electric Blue
        'neon-pink': '#FF00FF',   // Magenta/Fuchsia
        'neon-green': '#39FF14',  // Electric Green
      },
      // 2. Custom Fonts (Aapko yeh fonts HTML file mein import karne honge)
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'], 
        'mono-glitch': ['"Press Start 2P"', 'cursive'],
      },
      // 3. Custom Animation for Glow
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 1px var(--tw-neon))' },
          '50%': { filter: 'drop-shadow(0 0 5px var(--tw-neon))' },
        },
      },
      animation: {
        'neon-pulse': 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}