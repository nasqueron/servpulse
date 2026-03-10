import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
]
export const darkMode = 'class'
export const theme = {
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
}
export const plugins = [
  plugin(function ({ addBase }) {
    addBase({
      html: { scrollbarGutter: 'stable', overflowY: 'scroll' },
    })
  }),
]
