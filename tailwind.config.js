/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    boxShadow: {
      sm:'0 0 35px cyan'
    },
    fontSize: {
      sm: '0.4rem',
      xs:'0.7rem',
      '4xl': '2.25rem',
      '6xl': '3.75rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    letterSpacing: {
      tightest: '2rem',
    }

  },
  plugins: [],
}
