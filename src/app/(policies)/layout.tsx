'use client'

import Link from 'next/link'

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-anora-bg">
      <header className="sticky top-0 z-10 border-b border-gold-DEFAULT/12 bg-anora-bg/96 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-[0.25em] text-gold-DEFAULT">ANORA</Link>
          <Link href="/" className="text-[10px] tracking-[0.18em] uppercase text-anora-vanilla/35 hover:text-gold-DEFAULT transition-colors">
            ← Back to Shop
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {children}
      </div>

      <footer className="border-t border-gold-DEFAULT/08 py-8 px-6 mt-16">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { label: 'About Us',          href: '/about' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Privacy Policy',    href: '/privacy' },
            { label: 'Disclaimer',        href: '/disclaimer' },
            { label: 'Shipping Policy',   href: '/shipping' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-[10px] tracking-[0.14em] uppercase text-anora-vanilla/28 hover:text-gold-DEFAULT transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-center text-[10px] text-anora-vanilla/15 tracking-wide mt-4">
          © 2026 ANORA. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
