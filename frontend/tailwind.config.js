/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#59aeff',
          500: '#338dff',
          600: '#1a6df5',
          700: '#1357e1',
          800: '#1646b6',
          900: '#183e8f',
          950: '#142757',
        },
        status: {
          operational: '#10b981',
          degraded: '#f59e0b',
          partial: '#f97316',
          major: '#ef4444',
          maintenance: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}
