/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    screens: {
      xs: '550px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    // options: https://github.com/theMosaad/tailwindcss-delicious-hamburgers/blob/main/src/index.js
    deliciousHamburgers: {
      size: '24px',
      color: '#d6d3d1',
      colorLight: '#fff8f4',
      padding: '0px',
      barSpacing: '7px',
      animationSpeed: 1,
    },
    variants: {
      fill: ['hover', 'focus'],
    },
    extend: {
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-delicious-hamburgers'), require('tailwind-scrollbar')({ nocompatible: true })],
};
