/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'islamic-blue': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d3ff',
          300: '#a5b8ff',
          400: '#8193ff',
          500: '#5b6bff',
          600: '#3d4bff',
          700: '#2d3bff',
          800: '#1a2bff',
          900: '#0a1bff',
        },
        'islamic-gold': {
          50: '#fffbf0',
          100: '#fff7e0',
          200: '#ffedc7',
          300: '#ffe0a5',
          400: '#ffd081',
          500: '#ffc05b',
          600: '#ffb03d',
          700: '#ffa02d',
          800: '#ff901a',
          900: '#ff800a',
        },
        'deep-navy': '#0f172a',
        'rich-gold': '#d4af37',
      },
      fontFamily: {
        'arabic': ['Noto Naskh Arabic', 'serif'],
        'english': ['Inter', 'Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d4af37\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} 