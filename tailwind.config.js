/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5f0',   // Light mint
          100: '#d1ebe1',
          200: '#a3d7c3',
          300: '#75c3a5',
          400: '#47af87',
          500: '#2b5240',   // Main MDMZE green
          600: '#244a38',
          700: '#1d3e30',
          800: '#163228',
          900: '#0f261f',
        },
        secondary: {
          50: '#f9f5ea',   // Cream background
          100: '#f3ebd5',
          200: '#e7d7ab',
          300: '#dbc381',
          400: '#cfaf57',
          500: '#da816c',  // Terracotta accent
          600: '#c4735f',
          700: '#9e5c4c',
          800: '#784539',
          900: '#522e26',
        },
        accent: {
          50: '#f0f9f4',   // Very light green
          100: '#e1f3e9',
          200: '#c3e7d3',
          300: '#a5dbbd',
          400: '#87cfa7',
          500: '#69c391',
          600: '#4bb77b',
          700: '#3d9262',
          800: '#2f6d49',
          900: '#214830',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e7e7e7',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#6b6a67',  // MDMZE gray
          600: '#5a5956',
          700: '#494845',
          800: '#383734',
          900: '#111111',  // MDMZE dark text
        }
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],        // For paragraphs and body text
        display: ['Gloock', 'Times New Roman', 'serif'],  // For headers
        body: ['Figtree', 'sans-serif'],        // For paragraphs
        mono: ['Ubuntu', 'monospace'],
      },
    },
  },
  plugins: [],
}
