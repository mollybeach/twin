/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        critter: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          accent: 'var(--accent)',
          background: 'var(--background)',
          surface: 'var(--surface)',
        }
      },
      fontFamily: {
        pixel: ['PixelFont', 'sans-serif']
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite'
      },
      borderWidth: {
        pixel: 'var(--pixel-border)'
      }
    },
  },
  plugins: [],
};