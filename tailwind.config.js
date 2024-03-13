/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#151715",
        "light": "#FFFFFF",
        "primary": "#EFCA63",
        "secondary": "#B087D9",
        "accent": "#D8644A",
        "success": "#59B863",
        "info": "#4896C2",
        "warning": "#E9A43D",
        "error": "#E64848"
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}