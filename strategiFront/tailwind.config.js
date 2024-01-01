/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#EA7064',
        customGreen: '#507D50',
        customOrange: '#E05E00',
      },
    },
  },
  plugins: [],
}
