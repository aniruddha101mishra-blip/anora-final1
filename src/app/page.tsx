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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          src="https://res.cloudinary.com/dtips5xbg/video/upload/v1780985161/anora_compressed_pbygd9.mp4"
          aria-hidden="true"
          style={{ WebkitMediaControlsPanel: 'none' } as React.CSSProperties}
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
      <section id="collection" className="py-32 px-4 bg-anora-vanilla">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold-dark mb-5">
              Signature Collection
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-anora-espresso font-light">
              The Art of Scent
            </h2>
            <p className="text-sm text-anora-espresso/50 mt-4 max-w-md mx-auto leading-relaxed">
              Each fragrance tells a story drawn from the finest ingredients across the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section
        id="heritage"
        className="py-32 px-4 bg-anora-vanilla border-y border-gold-DEFAULT/15"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Video */}
            <div className="relative aspect-[3/4] max-h-[560px] overflow-hidden border border-gold-DEFAULT/25">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label="ANORA brand heritage"
              >
                <source src="https://res.cloudinary.com/dtips5xbg/video/upload/v1780985925/anora-1_odehtj.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Text */}
            <div className="text-left">
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold-dark mb-5">
                Brand Heritage
              </p>
              <h2 className="font-serif text-5xl text-anora-espresso font-light mb-2">
                The Art of <em className="text-gold-dark">ANORA</em>
              </h2>
              <p className="font-serif text-lg text-anora-espresso/60 italic mb-8">
                विशिष्टजनानां कृते निर्मितम्
              </p>
              <p className="font-sans text-[15px] text-anora-espresso/70 leading-[1.75] mb-6">
                Designed exclusively for those who love to leave a memorable, sophisticated
                impression wherever they step.
              </p>
              <p className="font-sans text-[15px] text-anora-espresso/55 leading-[1.75] mb-10">
                Every fragrance note is chosen with intention. Every bottle crafted with care.
                Every drop carries the promise of an unforgettable impression.
              </p>
              <a
                href="#collection"
                className="inline-block border border-anora-espresso/30 text-anora-espresso text-xs tracking-[0.22em] uppercase px-8 py-3 hover:bg-anora-espresso hover:text-anora-vanilla transition-all duration-300"
              >
                Explore Collection
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 bg-anora-vanilla border-t border-anora-espresso/10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-gold-dark mb-5">Get in Touch</p>
          <h2 className="font-serif text-4xl text-anora-espresso font-light mb-4">Contact Us</h2>
          <p className="font-sans text-[15px] text-anora-espresso/60 leading-[1.75] mb-10">
            Have a question about your order, or want to know more about our fragrances?
            We&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/anora.lab?igsh=MTc3cjZ6dGoycWZlbw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-anora-espresso/20 px-6 py-3 hover:border-anora-espresso hover:bg-anora-espresso hover:text-anora-vanilla transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-anora-espresso group-hover:text-anora-vanilla transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span className="text-[13px] tracking-[0.1em] uppercase font-medium text-anora-espresso group-hover:text-anora-vanilla transition-colors">@anora.lab</span>
            </a>

            {/* Email */}
            <a
              href="mailto:contact.anoralab@gmail.com"
              className="flex items-center gap-3 border border-anora-espresso/20 px-6 py-3 hover:border-anora-espresso hover:bg-anora-espresso hover:text-anora-vanilla transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-anora-espresso group-hover:text-anora-vanilla transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="text-[13px] tracking-[0.1em] uppercase font-medium text-anora-espresso group-hover:text-anora-vanilla transition-colors">contact.anoralab@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-anora-espresso/10 py-12 px-6 bg-anora-vanilla">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <p className="font-serif text-xl text-anora-espresso tracking-[0.2em]">ANORA</p>
              <p className="text-[13px] font-sans text-anora-espresso/50 tracking-wide mt-1">The Art of Lasting Presence</p>
            </div>
            <div className="flex gap-6 text-[13px] tracking-[0.1em] uppercase font-medium text-anora-espresso/50">
              <a href="https://www.instagram.com/anora.lab" target="_blank" rel="noopener noreferrer" className="hover:text-anora-espresso transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Policy links */}
          <div className="border-t border-anora-espresso/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
              {[
                { label: 'About Us',           href: '/about' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy',     href: '/privacy' },
                { label: 'Disclaimer',         href: '/disclaimer' },
                { label: 'Shipping Policy',    href: '/shipping' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[12px] tracking-[0.08em] font-sans text-anora-espresso/45 hover:text-anora-espresso transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-[12px] text-anora-espresso/30 tracking-wide flex-shrink-0">
              © 2026 ANORA. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </main>
  )
}
