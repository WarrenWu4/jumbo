import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xs': '375px',
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        'background-dark': '#151715',
        'background-light': '#FFFFFF',
        'primary-500': '#EFCA63',
        'secondary-500': '#B087D9',
        'accent-500': '#D8644A',
      },
    },
  },
  plugins: [],
}
export default config
