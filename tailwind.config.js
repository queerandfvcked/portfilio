/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* All values resolve to CSS custom properties declared in src/index.css.
         Keep hex codes out of this file — change them in :root instead. */
      colors: {
        // Accent (mint). The 100–900 scale collapses onto three mint steps,
        // because only one accent hue exists — see --accent* tokens.
        // Every entry uses the <alpha-value> form so opacity modifiers work.
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          100: 'rgb(var(--accent-soft-rgb) / <alpha-value>)',
          200: 'rgb(var(--accent-soft-rgb) / <alpha-value>)',
          300: 'rgb(var(--accent-soft-rgb) / <alpha-value>)',
          400: 'rgb(var(--accent-rgb) / <alpha-value>)',
          500: 'rgb(var(--accent-rgb) / <alpha-value>)',
          600: 'rgb(var(--accent-deep-rgb) / <alpha-value>)',
          700: 'rgb(var(--accent-deep-rgb) / <alpha-value>)',
          800: 'rgb(var(--accent-deep-rgb) / <alpha-value>)',
          900: 'rgb(var(--accent-deep-rgb) / <alpha-value>)',
        },

        // Neutrals
        bg: 'var(--bg)',
        bg2: 'var(--bg-2)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        line2: 'var(--line-2)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        dim: 'var(--dim)',
        'accent-ink': 'var(--accent-ink)',
      },

      fontFamily: {
        sans: ['var(--font-text)'],
        // Unbounded — hero name + short homepage section headings only
        display: ['var(--font-display)'],
        // Onest 700 — every other heading (weight comes from font-bold at call site)
        heading: ['var(--font-heading)'],
        mono: ['var(--font-mono)'],
      },

      boxShadow: {
        accent: 'var(--shadow-accent)',
        card: 'var(--shadow-card)',
      },

      borderRadius: {
        card: 'var(--card)',
      },

      backgroundImage: {
        'accent-sheen': 'linear-gradient(95deg, var(--text) 8%, var(--accent) 58%, var(--accent-deep) 100%)',
      },
    },
  },
  plugins: [],
}
