/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        primary: "#ff0000",
        secondary: "#0066ff",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'main-gradient': 'linear-gradient(135deg, #000000 0%, #1a0000 35%, #001a33 70%, #000000 100%)',
      },
    },
  },
  plugins: [],
}