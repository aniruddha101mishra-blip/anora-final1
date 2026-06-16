'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { COMBO_PACK } from '@/data/products'
import type { Product } from '@/types'

// Treat the combo as a single Product for cart purposes
const COMBO_AS_PRODUCT: Product = {
  id:       COMBO_PACK.id,
  name:     COMBO_PACK.name,
  tagline:  COMBO_PACK.tagline,
  size:     COMBO_PACK.size,
  price:    COMBO_PACK.price,
  image:    COMBO_PACK.image,
  notes:    COMBO_PACK.notes,
  category: COMBO_PACK.category,
}

export function ComboCard() {
  const { addToCart } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(COMBO_AS_PRODUCT)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    addToCart(COMBO_AS_PRODUCT)
    router.push('/checkout')
  }

  const savings = COMBO_PACK.originalPrice - COMBO_PACK.price
  const discountPct = Math.round((savings / COMBO_PACK.originalPrice) * 100)

  return (
    <article className="w-full max-w-2xl mx-auto bg-anora-card border border-gold-DEFAULT/35 hover:border-gold-DEFAULT/70 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">

      {/* Offer badge */}
      <div className="absolute top-4 left-4 z-10 bg-gold-DEFAULT text-anora-espresso text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5">
        Save ₹{savings.toLocaleString('en-IN')}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">

        {/* Image */}
        <div className="relative h-72 sm:h-full min-h-[280px] overflow-hidden">
          <Image
            src={COMBO_PACK.image}
            alt={COMBO_PACK.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-anora-card/40" />
        </div>

        {/* Info */}
        <div className="p-7 flex flex-col justify-between">
          <div>
            {/* Main Sanskrit tag */}
            <p className="font-serif text-2xl text-gold-DEFAULT italic mb-1">
              त्रयी कीर्तिः
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold-DEFAULT/55 mb-4">
              Exclusive Combo · Pack of Three
            </p>

            <h3 className="font-serif text-xl text-anora-vanilla mb-1">
              Pack of Three
            </h3>
            <p className="text-xs text-anora-vanilla/40 tracking-wider mb-4">
              {COMBO_PACK.size}
            </p>

            {/* Included fragrances */}
            <div className="space-y-1.5 mb-6">
              {COMBO_PACK.notes.map((n, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-anora-vanilla/55">
                  <span className="text-gold-DEFAULT">✦</span>
                  <span>Anora — {n} · 10ml</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-anora-vanilla/35 leading-relaxed italic mb-5">
              &ldquo;{COMBO_PACK.tagline}&rdquo;
            </p>
          </div>

          {/* Price + buttons */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl text-gold-DEFAULT">
                ₹{COMBO_PACK.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-anora-vanilla/30 line-through">
                ₹{COMBO_PACK.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-green-400/70 tracking-wider">
                {discountPct}% off
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className={`flex-1 text-[10px] tracking-[0.14em] uppercase px-3 py-2.5 border transition-all duration-200 ${
                  added
                    ? 'bg-gold-DEFAULT text-anora-espresso border-gold-DEFAULT'
                    : 'border-gold-DEFAULT/35 text-gold-DEFAULT hover:bg-gold-DEFAULT/12 hover:border-gold-DEFAULT/60'
                }`}
              >
                {added ? 'Added ✦' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 text-[10px] tracking-[0.14em] uppercase px-3 py-2.5 gold-gradient text-anora-espresso hover:opacity-90 transition-opacity"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
