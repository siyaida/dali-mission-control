/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'jic-gold': '#C9A227',
        'jic-dark': '#1a1a2e',
        'gw-blue': '#033C5A',
        'gw-gold': '#A8996E',
      },
      fontFamily: {
        'arabic': ['"Noto Sans Arabic"', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
