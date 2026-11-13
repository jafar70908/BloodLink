/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          base: '#120709',
          crimson: '#C8102E',
          accent: '#E5243B',
          wine: '#5A0A18',
          rose: '#FFD9DE',
          coral: '#FF6B6B',
          teal: '#0E9F8E',
          heading: '#FFF9F7',
          body: 'rgba(255, 249, 247, 0.72)',
        }
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'crimson-glow': '0 0 25px rgba(200, 16, 46, 0.4)',
        'accent-glow': '0 0 35px rgba(229, 36, 59, 0.55)',
        'glass': '0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-elevated': '0 16px 48px rgba(0, 0, 0, 0.45), 0 0 30px rgba(200, 16, 46, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.14)',
      }
    },
  },
  plugins: [],
};
