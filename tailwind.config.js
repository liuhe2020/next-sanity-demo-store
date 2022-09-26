/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // options: https://github.com/theMosaad/tailwindcss-delicious-hamburgers/blob/main/src/index.js
    deliciousHamburgers: {
      size: '24px', // must be in px.
      color: '#fff',
      colorLight: '#fff8f4',
      padding: '0px', // must be in px.
      barSpacing: '7px',
      animationSpeed: 1,
    },
    extend: {},
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-delicious-hamburgers'),
  ],
};
