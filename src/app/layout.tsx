/**
 * Root layout — wraps everything in CartProvider so all components
 * share ONE cart state instance.
 *
 * FIX: CartProvider added here. Previously missing, causing each
 * component to have its own isolated useCart() state.
 */

import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-anora-bg text-anora-espresso font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
