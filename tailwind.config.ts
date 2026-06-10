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
        gold: {
          DEFAULT: '#C8A46A',
          light:   '#dbb87a',
          dark:    '#b8904a',
        },
        anora: {
          bg:       '#0e0a05',
          card:     '#160f07',
          espresso: '#2A1F1A',
          vanilla:  '#E5D3B3',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-jost)', 'system-ui', 'sans-serif'],
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
