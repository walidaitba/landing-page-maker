/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F6FF',
          100: '#BAE3FF',
          200: '#7CC4FA',
          300: '#47A3F3',
          400: '#2196F3',
          500: '#1E88E5',
          600: '#1976D2',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0D47A1',
        },
        secondary: {
          50: '#F5F7FA',
          100: '#E4E7EB',
          200: '#CBD2D9',
          300: '#9AA5B1',
          400: '#7B8794',
          500: '#616E7C',
          600: '#52606D',
          700: '#3E4C59',
          800: '#323F4B',
          900: '#1F2933',
        },
      },
      fontFamily: {
        'modern-heading': ['Inter', 'sans-serif'],
        'modern-body': ['Open Sans', 'sans-serif'],
        'elegant-heading': ['Playfair Display', 'serif'],
        'elegant-body': ['Lato', 'sans-serif'],
        'creative-heading': ['Poppins', 'sans-serif'],
        'creative-body': ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        'modern': '0.375rem',
        'elegant': '0.5rem',
        'creative': '1rem',
      },
      boxShadow: {
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elegant': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'creative': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}