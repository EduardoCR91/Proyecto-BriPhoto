/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f6f4ef',
        paper: '#ffffff',
        ink: '#151515',
        accent: '#bb8a2a',
        deep: '#11151d',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(22,18,9,.08)',
      },
    },
  },
  plugins: [],
}
