'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    addToCart(product)
    router.push('/checkout')
  }

  return (
    <article className="w-full max-w-sm bg-anora-card border border-gold-DEFAULT/20 hover:border-gold-DEFAULT/55 transition-all duration-500 hover:-translate-y-2 group cursor-default">
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 384px"
          priority
        />
        {/* Hover overlay */}
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
      <div className="p-6">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gold-muted mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-xl text-anora-vanilla mb-1">{product.name}</h3>
        <p className="text-[10px] text-anora-vanilla/35 tracking-[0.12em] mb-4">{product.size}</p>

        <div className="flex items-center justify-between">
          <span className="font-sans text-lg text-gold-DEFAULT font-light">
            ₹{product.price.toLocaleString('en-IN')}
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
