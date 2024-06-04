
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        // Añade más tamaños según lo necesites
      },
      colors: {
        bluePrimary: '#007bff', // Reemplaza esto con el color azul que prefieras
        greenPrimary: '#96C11F',
        grayPrimary: '#9F9F9F',
        bgPrimary: '#F0F1F5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
