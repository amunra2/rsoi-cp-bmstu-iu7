/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "third-color": "var(--third-color)",
        "forth-color": "var(--forth-color)",
      },
      fontSize: {
        "large-size": "var(--large-size)",
        "high-size": "var(--high-size)",
        "medium-size": "var(--medium-size)",
        "little-size": "var(--little-size)",
        "mini-size": "var(--mini-size)",
      },
      lineHeight: {
        "large-height": "var(--large-height)",
        "high-height": "var(--high-height)",
        "medium-height": "var(--medium-height)",
        "little-height": "var(--little-height)",
        "mini-height": "var(--mini-height)",
      }
    },
  },
  plugins: [],
}

