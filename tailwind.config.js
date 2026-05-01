/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          red: '#e50914',
          gray: '#808080',
        },
      },
    },
  },
  plugins: [],
};
