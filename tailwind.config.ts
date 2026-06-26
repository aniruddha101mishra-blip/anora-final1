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
          bg:       '#E5D3B3',   // vanilla — default page background
          card:     '#f0e8d8',   // slightly lighter vanilla for cards
          espresso: '#2A1F1A',   // dark text
          vanilla:  '#E5D3B3',   // vanilla accent
          dark:     '#0e0a05',   // for hero/dark sections
        },
      },
      fontFamily: {
        // Inter for UI — nav, buttons, body text
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Cormorant for headings — product names, section titles
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Navigation
        'nav':     ['15px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        // Body text
        'body':    ['15px', { lineHeight: '1.7', letterSpacing: '0em'    }],
        // Product name
        'product': ['22px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
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
