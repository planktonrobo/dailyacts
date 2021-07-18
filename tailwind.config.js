module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {blur: {
      xs: '2px',
    }},
  },
  variants: {
    extend: {
      invert: ['dark'],
    },
  },
  plugins: [],
}
