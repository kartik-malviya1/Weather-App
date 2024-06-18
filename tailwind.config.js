/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          'gradient-45deg': 'linear-gradient(45deg, #2f4680, #500ae4)',
        },
      colors: {
        "primary": '#e2d4ff',
        "secondary": '#ebfffc',
        "custom-gray": '#626262',
      }
    },
  },
  plugins: [],
}