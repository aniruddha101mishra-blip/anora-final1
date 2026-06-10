'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const { cart, total, count, mounted, removeFromCart, updateQty, clearCart } = useCart()
  const router = useRouter()

  // Loading skeleton while localStorage hydrates
  if (!mounted) {
    return (
      <PageShell>
        <div className="flex items-center justify-center py-32">
          <Spinner />
        </div>
      </PageShell>
    )
  }

  if (count === 0) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
          <svg className="w-16 h-16 text-gold-DEFAULT/20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          <p className="font-serif text-2xl text-gold-DEFAULT/50 font-light">Your cart is empty</p>
          <p className="text-sm text-anora-vanilla/35">Add a fragrance to begin your journey.</p>
          <Link href="/" className="gold-gradient text-anora-espresso text-xs tracking-[0.22em] uppercase px-8 py-3 hover:opacity-90 transition-opacity">
            Explore Collection
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl text-gold-DEFAULT font-light">
            Your Cart
            <span className="ml-3 text-sm font-sans text-gold-DEFAULT/50 font-light tracking-wide">
              ({count} item{count !== 1 ? 's' : ''})
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-[10px] tracking-[0.15em] uppercase text-anora-vanilla/25 hover:text-red-400/60 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Cart items */}
          <div className="space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-anora-card border border-gold-DEFAULT/15 p-5 flex gap-5 items-start"
              >
                {/* Image */}
                <div className="relative w-20 h-24 flex-shrink-0 border border-gold-DEFAULT/12">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base text-anora-vanilla/90 mb-0.5">{item.name}</p>
                  <p className="text-xs text-anora-vanilla/35 tracking-wider mb-3">{item.size}</p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    {/* Qty control */}
                    <div className="flex items-center gap-3 border border-gold-DEFAULT/22 rounded-full px-3 py-1.5">
                      <button
                        onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)}
                        className="text-gold-DEFAULT/60 hover:text-gold-DEFAULT transition-colors w-4 text-center leading-none"
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="text-sm text-anora-vanilla min-w-[20px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-gold-DEFAULT/60 hover:text-gold-DEFAULT transition-colors w-4 text-center leading-none"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <span className="font-serif text-lg text-gold-DEFAULT">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-[10px] uppercase tracking-[0.12em] text-anora-vanilla/22 hover:text-red-400/65 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-anora-card border border-gold-DEFAULT/15 p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-lg text-gold-DEFAULT mb-5 pb-4 border-b border-gold-DEFAULT/10">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-anora-vanilla/50 truncate pr-2">
                    {item.name} × {item.qty}
                  </span>
                  <span className="text-anora-vanilla/65 flex-shrink-0">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gold-DEFAULT/10 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className="text-anora-vanilla/35">Shipping</span>
                <span className="text-green-400/65">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] uppercase tracking-wider text-anora-vanilla/45">Total</span>
                <span className="font-serif text-2xl text-gold-DEFAULT">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full gold-gradient text-anora-espresso text-xs tracking-[0.22em] uppercase font-medium py-4 hover:opacity-90 transition-opacity mb-2"
            >
              Proceed to Checkout
            </button>
            <Link
              href="/"
              className="block text-center text-[10px] uppercase tracking-[0.18em] text-anora-vanilla/30 hover:text-anora-vanilla/55 transition-colors py-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-anora-bg">
      <header className="sticky top-0 z-10 border-b border-gold-DEFAULT/12 bg-anora-bg/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-[0.25em] text-gold-DEFAULT">
            ANORA
          </Link>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase">
            <span className="text-gold-DEFAULT">Cart</span>
            <span className="text-gold-DEFAULT/20">—</span>
            <span className="text-anora-vanilla/25">Details</span>
            <span className="text-gold-DEFAULT/20">—</span>
            <span className="text-anora-vanilla/25">Payment</span>
          </div>
        </div>
      </header>
      {children}
    </main>
  )
}

function Spinner() {
  return (
    <svg className="w-8 h-8 animate-spin text-gold-DEFAULT/40" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
