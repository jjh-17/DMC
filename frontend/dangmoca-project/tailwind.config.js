/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#A97952',
        'primary2': '#A46560',
        'primary3': '#BEA600',
        'white': '#FFFFFF',
        'black': '#000000',
        'gray': '#EFEFEF',
      }
    },
  },
  plugins: [],
}

