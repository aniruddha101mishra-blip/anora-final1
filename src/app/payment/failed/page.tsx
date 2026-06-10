import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-anora-bg flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-7 text-center max-w-md w-full">

        <div className="w-20 h-20 rounded-full border-2 border-red-500/38 flex items-center justify-center text-2xl text-red-400">
          ✕
        </div>

        <div>
          <h1 className="font-serif text-4xl text-red-400/72 font-light mb-2">Payment Failed</h1>
          <p className="text-[10px] tracking-[0.28em] uppercase text-red-400/35">
            Transaction could not be completed
          </p>
        </div>

        <p className="text-sm text-anora-vanilla/38 leading-relaxed">
          No amount has been charged from your account.
          Please try again or reach out to us on Instagram if the issue persists.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/checkout"
            className="gold-gradient text-anora-espresso text-xs tracking-[0.2em] uppercase px-8 py-3 hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="border border-gold-DEFAULT/28 text-anora-vanilla/45 text-xs tracking-[0.2em] uppercase px-6 py-3 hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-all"
          >
            Back to Shop
          </Link>
        </div>

      </div>
    </main>
  )
}
