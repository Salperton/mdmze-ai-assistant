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
          50: '#f0f9f4',   // Very light green
          100: '#e1f3e9',
          200: '#c3e7d3',
          300: '#a5dbbd',
          400: '#87cfa7',
          500: '#18402e',   // Your exact primary dark green
          600: '#2b5240',   // Your exact secondary green
          700: '#1a3828',
          800: '#153020',
          900: '#102818',
        },
        secondary: {
          50: '#f9f5ea',   // Your exact cream background
          100: '#f3ebd5',
          200: '#e7d7ab',
          300: '#dbc381',
          400: '#cfaf57',
          500: '#da816c',  // Your exact terracotta accent
          600: '#c4735f',
          700: '#9e5c4c',
          800: '#784539',
          900: '#522e26',
        },
        accent: {
          50: '#fef7f7',   // Very light pink
          100: '#fdeaea',
          200: '#fbd5d5',
          300: '#f9c0c0',
          400: '#f7abab',
          500: '#f39d99',  // Your exact pink accent
          600: '#da8d89',
          700: '#c17d79',
          800: '#a86d69',
          900: '#8f5d59',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e7e7e7',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#6b6a67',
          600: '#5a5956',
          700: '#494845',
          800: '#383734',
          900: '#111111',
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
