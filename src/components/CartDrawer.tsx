'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'

interface Props {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: Props) {
  const { cart, total, count, removeFromCart, updateQty } = useCart()
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-anora-card border-l border-gold-DEFAULT/18 z-50 flex flex-col transition-transform duration-[400ms] ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gold-DEFAULT/12 flex-shrink-0">
          <div>
            <span className="font-serif text-lg text-gold-DEFAULT">Your Cart</span>
            <span className="ml-2 text-xs text-gold-muted">
              ({count} item{count !== 1 ? 's' : ''})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gold-DEFAULT/20 text-anora-vanilla/50 hover:text-gold-DEFAULT hover:border-gold-DEFAULT transition-all flex items-center justify-center text-sm"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-anora-vanilla/25">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <p className="font-serif text-lg text-gold-DEFAULT/40">Your cart is empty</p>
            <button onClick={onClose} className="text-xs tracking-[0.15em] uppercase text-gold-DEFAULT/50 hover:text-gold-DEFAULT transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5 scrollbar-thin">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 pb-5 border-b border-gold-DEFAULT/08">
                <div className="relative w-16 h-20 flex-shrink-0 border border-gold-DEFAULT/15">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-anora-vanilla/90 truncate">{item.name}</p>
                  <p className="text-xs text-anora-vanilla/35 tracking-wider mb-3">{item.size}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 border border-gold-DEFAULT/20 rounded-full px-3 py-1">
                      <button
                        onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)}
                        className="text-gold-DEFAULT/65 hover:text-gold-DEFAULT transition-colors leading-none"
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="text-xs text-anora-vanilla min-w-[16px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-gold-DEFAULT/65 hover:text-gold-DEFAULT transition-colors leading-none"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <span className="text-gold-DEFAULT text-sm font-light">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] text-anora-vanilla/20 hover:text-red-400/65 transition-colors mt-2 tracking-[0.1em] uppercase"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gold-DEFAULT/12 px-7 py-5 bg-anora-bg/50 flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-anora-vanilla/35">Subtotal</span>
              <span className="font-serif text-2xl text-gold-DEFAULT font-light">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-anora-vanilla/22 mb-4 tracking-wide">Free shipping on all orders</p>
            <button
              onClick={handleCheckout}
              className="w-full gold-gradient text-anora-espresso text-xs tracking-[0.22em] uppercase font-normal py-4 hover:opacity-90 transition-opacity mb-2"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gold-DEFAULT/18 text-anora-vanilla/38 text-[10px] tracking-[0.18em] uppercase py-3 hover:border-gold-DEFAULT/38 hover:text-anora-vanilla/60 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
