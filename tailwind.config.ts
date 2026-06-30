import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Emerald green replaces gold throughout
        gold: {
          DEFAULT: '#065f46',  // emerald-800 — primary green
          light:   '#059669',  // emerald-600
          dark:    '#064e3b',  // emerald-900
        },
        anora: {
          bg:       '#ecfdf5',  // emerald-50 — very light green-white
          card:     '#d1fae5',  // emerald-100
          espresso: '#064e3b',  // emerald-900 — dark text
          vanilla:  '#ecfdf5',  // light bg
          dark:     '#022c22',  // darkest green
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      keyframes: {
        pop: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
      animation: {
        pop:    'pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        fadeUp: 'fadeUp 0.4s ease both',
      },
    },
  },
  plugins: [],
}

export default config
