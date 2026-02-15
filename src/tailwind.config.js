/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Swiggy_src.jsx",
    "./Store/**/*.{js,jsx,ts,tsx}",
    "./Utils/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
