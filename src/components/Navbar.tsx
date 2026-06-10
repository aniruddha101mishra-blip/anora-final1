'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CartDrawer } from './CartDrawer'
import { useCart } from '@/hooks/useCart'

export function Navbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const { count } = useCart()

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-gold-DEFAULT/15 bg-anora-bg/92 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="#collection"
              className="text-xs tracking-[0.2em] uppercase text-anora-vanilla/55 hover:text-gold-DEFAULT transition-colors hidden sm:block"
            >
              Collection
            </Link>
            <Link
              href="#heritage"
              className="text-xs tracking-[0.2em] uppercase text-anora-vanilla/55 hover:text-gold-DEFAULT transition-colors hidden sm:block"
            >
              Heritage
            </Link>
          </div>

          <Link
            href="/"
            className="font-serif text-xl tracking-[0.28em] text-gold-DEFAULT"
          >
            ANORA
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="#contact"
              className="text-xs tracking-[0.2em] uppercase text-anora-vanilla/55 hover:text-gold-DEFAULT transition-colors hidden sm:block"
            >
              Contact
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-gold-DEFAULT hover:text-gold-light transition-colors"
              aria-label="Open cart"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-3 w-4 h-4 bg-gold-DEFAULT text-anora-espresso text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {count > 0 && (
              <Link href="/cart" className="text-[9px] tracking-[0.12em] uppercase text-gold-DEFAULT/45 hover:text-gold-DEFAULT transition-colors hidden sm:block border-l border-gold-DEFAULT/15 pl-3">
                View
              </Link>
            )}
          </div>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
