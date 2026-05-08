/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'jic-navy': '#1e3a5f',
        'jic-navy-light': '#2a4a73',
        'jic-navy-dark': '#152a45',
        'jic-gold': '#c9a227',
        'jic-gold-light': '#d4b43a',
        'jic-white': '#ffffff',
        'jic-gray': '#f5f5f5',
        'jic-gray-dark': '#333333',
        'gw-blue': '#033C5A',
      },
      fontFamily: {
        'arabic': ['"Noto Sans Arabic"', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}