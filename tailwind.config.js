/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // define screens to enable max-width and dynamic breakpoints https://tailwindcss.com/blog/tailwindcss-v3-2
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    // options: https://github.com/theMosaad/tailwindcss-delicious-hamburgers/blob/main/src/index.js
    deliciousHamburgers: {
      size: '24px', // must be in px.
      color: '#d6d3d1',
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
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('tailwindcss-delicious-hamburgers')],
};
