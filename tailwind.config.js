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
          50: '#f0f9f4',
          100: '#e1f3e9',
          200: '#c3e7d3',
          300: '#a5dbbd',
          400: '#87cfa7',
          500: '#18402e',   // Your exact button color
          600: '#153020',
          700: '#12281c',
          800: '#0f2018',
          900: '#0c1814',
        },
        secondary: {
          50: '#f8f5ea',   // Your exact header color
          100: '#f3ebd5',
          200: '#e7d7ab',
          300: '#dbc381',
          400: '#cfaf57',
          500: '#da816c',  // Your exact button color
          600: '#c4735f',
          700: '#9e5c4c',
          800: '#784539',
          900: '#522e26',
        },
        accent: {
          50: '#f8f5ea',   // Your exact below masthead background
          100: '#f3ebd5',
          200: '#e7d7ab',
          300: '#dbc381',
          400: '#cfaf57',
          500: '#e7d0b9',  // Your exact main masthead background
          600: '#d4c4a8',
          700: '#c1b897',
          800: '#aeac86',
          900: '#9ba075',
        },
        neutral: {
          50: '#f8f5ea',   // Your exact header color
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
