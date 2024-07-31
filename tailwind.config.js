/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],


  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      number: ['nunito', 'sans-serif'],
    },
    colors: {
      'ghost': {
        50: '#F3F4F6',
        100: '#ffffff',
        200: '#9898B1',
        300: '#444451',
      },
      'slate': {
        100: '#919196',
        200: '#86868C',
        300: '#7A7A81',
        400: '#6D6D74',
        500: '#5E5E66',
        600: '#4E4E57',
        700: '#3C3C46',
        800: '#292934',
        900: '#1C1C24',
      },
      'gold': {
        300: '#9A8D6D',
        400: '#90825E',
        500: '#85754E',
        600: '#796A47',
        700: '#6E6041',
      }
    },
    extend: {
      dropShadow: {
        'xl': [
          '0px 5px 3px rgba(0,0,0,0.02)',
          '0px 5px 3px rgba(0,0,0,0.02)'
        ]
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

