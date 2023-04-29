/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#FF6B6B',
        'secondary': '#4ECDC4',
        'highlight': '#FFF',
      },
      textColor: {
        'primary': '#FF6B6B',
        'secondary': '#4ECDC4',
        'highlight': '#FFF',
      },
      borderColor: {
        'primary': '#FF6B6B',
        'secondary': '#4ECDC4',
        'highlight': '#FFF',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
}

