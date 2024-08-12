module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '5p': '5%',   // margin-left: 5%
        '10p': '10%', // margin-left: 10%
        '25p': '25%',
      },
      colors: {
        customGreen: '#047857',
      },
      width: {
        '8/10': '80%',
        '2/10': '20%',
      }
    }
  },
  plugins: [],
}
