/**
 * Home page — marked 'use client' because it renders Navbar which
 * contains CartDrawer and useCart() hooks.
 *
 * FIX: Missing 'use client' directive caused React hook errors since
 * Server Components cannot render hook-dependent children.
 */
'use client'

import { PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-anora-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          src="https://res.cloudinary.com/dtips5xbg/video/upload/v1780985161/anora_compressed_pbygd9.mp4"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative z-10 text-center px-6 animate-fadeUp">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold-DEFAULT/60 mb-5">
            Luxury Fragrances
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-gold-DEFAULT font-light tracking-[0.18em] mb-4">
            ANORA
          </h1>
          <p className="font-sans text-xs tracking-[0.28em] uppercase text-anora-vanilla/50 mb-10">
            The Art of Lasting Presence
          </p>
          <a
            href="#collection"
            className="inline-block gold-gradient text-anora-espresso text-xs tracking-[0.24em] uppercase font-normal px-10 py-4 transition-opacity hover:opacity-88"
          >
            Explore Collection
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.3em] uppercase text-anora-vanilla">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-DEFAULT to-transparent" />
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold-DEFAULT mb-5">
              Signature Collection
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-gold-DEFAULT font-light">
              The Art of Scent
            </h2>
            <p className="text-sm text-anora-vanilla/40 mt-4 max-w-md mx-auto leading-relaxed">
              Each fragrance tells a story drawn from the finest ingredients across the world.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section
        id="heritage"
        className="py-32 px-4 bg-anora-card border-y border-gold-DEFAULT/10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-gold-DEFAULT mb-5">
            Brand Heritage
          </p>
          <h2 className="font-serif text-5xl text-gold-DEFAULT font-light mb-2">
            The Art of <em>ANORA</em>
          </h2>
          <p className="font-serif text-lg text-gold-DEFAULT/55 italic mb-8">
            विशिष्टजनानां कृते निर्मितम्
          </p>
          <p className="text-sm text-anora-vanilla/50 leading-relaxed max-w-xl mx-auto">
            Designed exclusively for those who love to leave a memorable, sophisticated
            impression wherever they step.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gold-DEFAULT/12 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-serif text-xl text-gold-DEFAULT tracking-[0.2em]">ANORA</p>
            <p className="text-xs text-anora-vanilla/30 tracking-wide mt-1">The Art of Lasting Presence</p>
          </div>
          <div className="flex gap-6 text-xs tracking-[0.15em] uppercase text-anora-vanilla/35">
            <a
              href="https://www.instagram.com/anora.lab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-DEFAULT transition-colors"
            >
              Instagram
            </a>
          </div>
          <p className="text-[10px] text-anora-vanilla/20 tracking-wide">
            © 2026 ANORA. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
