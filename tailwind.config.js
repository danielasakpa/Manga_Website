/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Roboto': ["Roboto"],
      },
      maxWidth: {
        '2/3': '90%',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      dropShadow: {
        'x': '4px 4px 0px #F4B333',
      },
      colors: {
        'Light-Ice-Blue': 'rgba(250, 252, 252, 0.5)',
      }
    },
  },
  plugins: []
};
