/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradeint": 'linear-gradient(147deg, #000000 0%, #04619f 74%)'
      },
      backgroundColor:{
        'overlay':'rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}