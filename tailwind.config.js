/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
        },
        accent: {
          DEFAULT: '#6C8CFF',
          50: '#eef1ff',
          100: '#dde4ff',
          200: '#c5d2ff',
          300: '#a3b6ff',
          400: '#849dff',
          500: '#6C8CFF',
          600: '#5470e8',
          700: '#3f55c6',
          800: '#3041a0',
          900: '#262f7e',
        },
        dark: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6C8CFF 0%, #5470e8 100%)',
      },
    },
  },
  plugins: [],
}
