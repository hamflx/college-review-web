import {colors, nextui} from '@nextui-org/theme'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        'seat-na': '#444450',
        'seat-available': '#939393',
        'seat-selected': '#70eaf7',
        'seat-occupied': '#feffff',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function({ matchUtilities }) {
      matchUtilities(
        {
          perspective: (value) => ({
            perspective: `${value}`,
          }),
          'rotate-x': (value) => ({
            transform: `rotateX(${value})`,
          }),
        },
      )
    }),
  ],
}
