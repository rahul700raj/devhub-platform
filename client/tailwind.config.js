/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          muted: '#8b949e'
        },
        light: {
          bg: '#ffffff',
          card: '#f6f8fa',
          border: '#d0d7de',
          text: '#24292f',
          muted: '#57606a'
        },
        accent: {
          green: '#2ea043',
          blue: '#0969da',
          purple: '#8250df'
        }
      }
    },
  },
  plugins: [],
}