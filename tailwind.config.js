module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {

    colors: {
      'white': '#fff',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'cyan': '#7df9ff',
      'cyan2': '#00ffff',
      'light-cyan': '#e0ffff',
      'light-green': '#5dbea3',
      'off-white': '#f5f5f5',
      'indigo-white': '#ebf6f7',
      'off-green': '#D4F2B8',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#bebcc1',
      'gray-light': '#d3dce6',
    },

    fontFamily: {

      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {

      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}