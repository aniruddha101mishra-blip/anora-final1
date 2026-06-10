import type { ReactNode } from 'react'

interface PolicyPageProps {
  eyebrow: string
  title: string
  children: ReactNode
}

export function PolicyPage({ eyebrow, title, children }: PolicyPageProps) {
  return (
    <article>
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-gold-DEFAULT/12">
        <p className="text-[10px] tracking-[0.35em] uppercase text-gold-DEFAULT mb-4">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-gold-DEFAULT font-light">
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {children}
      </div>
    </article>
  )
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl text-anora-vanilla font-light mb-4 pb-2 border-b border-gold-DEFAULT/08">
        {heading}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  )
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-anora-vanilla/55 leading-relaxed font-sans font-light">
      {children}
    </p>
  )
}
