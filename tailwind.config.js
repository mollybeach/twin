/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Include all files in the app directory
        './components/**/*.{js,ts,jsx,tsx}', // Include all files in the components directory
        './styles/**/*.{css}', // Include all CSS files in the styles directory
        './public/**/*.{html}', // Include HTML files in the public directory if needed
    ],
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