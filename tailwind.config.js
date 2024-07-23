/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f5f5f5',
        'secondary': '#F2F8FF',
        'danger': '#dc3545',
        'success': '#28a745',
        'warning': '#ffc107',
        'info': '#17a2b8',
        'light': '#f8f9fa',
        'dark': '#343a40',
      },
      boxShadow: {
        'custom-black': '0 2px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 4px -1px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        'xxs': '12px',
        'xs': '14px',
        'sm': '21px',
      },
      borderWidth: {
        '1': '1px',
        '3': '3px',
        '5': '5px',
        '7': '7px',
      },
    },
  },
  plugins: [],
}

