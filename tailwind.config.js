/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-fade-up': 'bounce-fade-up 1s ease-in-out infinite',
        'bounce-fade-down': 'bounce-fade-down 1s ease-in-out infinite',
      },
      keyframes: {
        'bounce-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(0.4rem)' },
          '50%': { opacity: '1', transform: 'translateY(0rem)' },
          '100%': { opacity: '0', transform: 'translateY(-0.4rem)'}
        },
        'bounce-fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-0.4rem)' },
          '50%': { opacity: '1', transform: 'translateY(0rem)' },
          '100%': { opacity: '0', transform: 'translateY(0.4rem)'}
        }
      },
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