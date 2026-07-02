/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Traditional Arabic"', '"Scheherazade New"', '"Amiri"', 'serif'],
      },
      colors: {
        dates: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b0',
          300: '#e9bc7c',
          400: '#df9c4a',
          500: '#d7842e',
          600: '#c56b23',
          700: '#a4521f',
          800: '#854220',
          900: '#6c381d',
          950: '#3a1b0d',
        },
      },
    },
  },
  plugins: [],
};
