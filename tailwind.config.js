/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          purple: '#6b00ff',
          pink: '#ff64a5',
          dark: '#0a0908',
          light: '#ffffff',
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            800: '#1f2937',
            900: '#111827'
          },
          surface: '#1a1917',
        },
      },
      backgroundImage: {
        'auth-pattern': 'linear-gradient(to right bottom, rgba(107, 0, 255, 0.05), rgba(255, 100, 165, 0.05))',
      },
    },
  },
  plugins: [],
}