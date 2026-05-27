import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0066CC',
          hover:   '#0052A3',
          light:   '#E6F0FA',
        },
        surface: {
          light:    '#FFFFFF',
          'light-2':'#F9F9F9',
          dark:     '#000000',
          'dark-2': '#0D0D0D',
          'dark-3': '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
