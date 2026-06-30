'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const router = useRouter()

  // Only one variant (100ml)
  const variant  = product.variants[0]
  const cartItem = { ...product, price: variant.price, size: variant.size, id: `${product.id}-${variant.ml}ml` }

  const handleAdd = () => {
    addToCart(cartItem)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    addToCart(cartItem)
    router.push('/checkout')
  }

  return (
    <article className="w-full max-w-sm bg-white border border-gold-DEFAULT/20 hover:border-gold-DEFAULT/55 transition-all duration-500 hover:-translate-y-2 group cursor-default flex flex-col shadow-sm hover:shadow-md">

      {/* Image */}
      <div className="relative h-80 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 384px"
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <div className="text-center px-5">
            <p className="text-anora-vanilla/80 text-sm mb-1">{product.tagline}</p>
            <p className="text-gold-DEFAULT/75 text-xs tracking-widest">
              {product.notes.join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gold-dark/70 mb-1">
          {product.category}
        </p>
        <h3 className="font-sans text-[22px] font-bold leading-tight tracking-tight text-anora-espresso mb-1">
          {product.name}
        </h3>

        {/* Size — single option, just show label */}
        <p className="text-[13px] font-sans font-normal text-anora-espresso/40 leading-relaxed mb-4">
          {variant.size}
        </p>

        {/* Price + buttons */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-sans text-xl font-bold text-anora-espresso">
            ₹{variant.price.toLocaleString('en-IN')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className={`text-[10px] tracking-[0.14em] uppercase px-3 py-2 border transition-all duration-200 ${
                added
                  ? 'bg-gold-DEFAULT text-anora-espresso border-gold-DEFAULT'
                  : 'border-gold-DEFAULT/35 text-gold-DEFAULT hover:bg-gold-DEFAULT/12 hover:border-gold-DEFAULT/60'
              }`}
            >
              {added ? 'Added ✦' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="text-[10px] tracking-[0.14em] uppercase px-3 py-2 gold-gradient text-anora-espresso hover:opacity-90 transition-opacity"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
