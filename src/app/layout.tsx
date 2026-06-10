/**
 * Root layout — wraps everything in CartProvider so all components
 * share ONE cart state instance.
 *
 * FIX: CartProvider added here. Previously missing, causing each
 * component to have its own isolated useCart() state.
 */

import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ANORA — Luxury Fragrances',
  description:
    'ANORA — Luxury niche fragrances crafted for those who leave a lasting impression.',
  keywords: ['ANORA', 'luxury perfume', 'niche fragrance', 'artisanal'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-anora-bg text-anora-vanilla font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
