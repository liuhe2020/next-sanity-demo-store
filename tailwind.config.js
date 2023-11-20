/** @type {import('tailwindcss').Config} */

export const content = ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  // define screens to enable max-width and dynamic breakpoints https://tailwindcss.com/blog/tailwindcss-v3-2
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
};
export const variants = {
  fill: ['hover', 'focus'],
};
export const plugins = [require('@tailwindcss/forms'), require('tailwindcss-delicious-hamburgers'), require('tailwind-scrollbar')({ nocompatible: true })];
