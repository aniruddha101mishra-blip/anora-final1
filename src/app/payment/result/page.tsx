'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Status = 'loading' | 'success' | 'pending' | 'failed'

interface VerifyData {
  order_id: string
  order_status: string
  anora_status: string
  order_amount: number
}

function ResultContent() {
  const params  = useSearchParams()
  const orderId = params.get('order_id')

  const [status, setStatus] = useState<Status>('loading')
  const [data, setData]     = useState<VerifyData | null>(null)

  // Fallback from sessionStorage if Cashfree doesn't pass order_id cleanly
  const fallbackId = orderId || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('anora_order_id') : null)

  useEffect(() => {
    if (!fallbackId) { setStatus('failed'); return }

    console.info('[Result] Verifying order:', fallbackId)

    fetch(`/api/cashfree/verify-order?order_id=${encodeURIComponent(fallbackId)}`)
      .then(r => r.json())
      .then((d: VerifyData & { error?: string }) => {
        if (d.error) { console.error('[Result] Verify error:', d.error); setStatus('failed'); return }
        setData(d)
        const s = d.order_status
        console.info('[Result] Status:', s, '→', d.anora_status)

        if (s === 'PAID')                             setStatus('success')
        else if (s === 'ACTIVE')                      setStatus('pending')
        else                                          setStatus('failed')

        if (s === 'PAID') {
          try { localStorage.removeItem('anora_cart') } catch { /* ignore */ }
        }
      })
      .catch(err => {
        console.error('[Result] Fetch failed:', err)
        setStatus('failed')
      })
  }, [fallbackId])

  if (status === 'loading') return <LoadingView />
  if (status === 'success') return <SuccessView data={data} />
  if (status === 'pending') return <PendingView data={data} orderId={fallbackId} />
  return <FailedView orderId={fallbackId} />
}

/* ── Loading ── */
function LoadingView() {
  return (
    <div className="flex flex-col items-center gap-6">
      <svg className="w-12 h-12 animate-spin text-gold-DEFAULT/40" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-15" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p className="font-serif text-2xl text-gold-DEFAULT/50 font-light">Verifying payment…</p>
    </div>
  )
}

/* ── Success ── */
function SuccessView({ data }: { data: VerifyData | null }) {
  const name  = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('anora_order_name') : null
  const total = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('anora_order_total') : null

  return (
    <Card>
      <div className="w-20 h-20 rounded-full border-2 border-gold-DEFAULT flex items-center justify-center text-3xl text-gold-DEFAULT animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        ✦
      </div>
      <div className="text-center">
        <h1 className="font-serif text-4xl text-gold-DEFAULT font-light mb-2">Payment Successful</h1>
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold-DEFAULT/38">Order Confirmed</p>
      </div>
      <div className="w-full bg-gold-DEFAULT/5 border border-gold-DEFAULT/15 rounded-sm p-5 space-y-3">
        <InfoRow label="Order ID"  value={data?.order_id    ?? '—'} />
        {name  && <InfoRow label="Name"     value={name} />}
        <InfoRow label="Amount"   value={`₹${Number(data?.order_amount ?? total ?? 0).toLocaleString('en-IN')}`} />
        <InfoRow label="Status"   value="Payment Approved ✓" vClass="text-green-400/85" />
      </div>
      <p className="text-sm text-anora-vanilla/38 leading-relaxed text-center">
        Your fragrance is on its way. We&apos;ll reach out with shipping details shortly.
      </p>
      <Link href="/" className="border border-gold-DEFAULT/28 text-anora-vanilla/45 text-xs tracking-[0.2em] uppercase px-10 py-3 hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-all">
        Back to Shop
      </Link>
    </Card>
  )
}

/* ── Pending ── */
function PendingView({ data, orderId }: { data: VerifyData | null; orderId: string | null }) {
  return (
    <Card>
      <div className="w-20 h-20 rounded-full border-2 border-yellow-500/45 flex items-center justify-center text-3xl text-yellow-400">⏳</div>
      <div className="text-center">
        <h1 className="font-serif text-4xl text-yellow-400/80 font-light mb-2">Payment Pending</h1>
        <p className="text-[10px] tracking-[0.28em] uppercase text-yellow-400/35">Verification in progress</p>
      </div>
      <div className="w-full bg-gold-DEFAULT/5 border border-gold-DEFAULT/15 rounded-sm p-5 space-y-3">
        <InfoRow label="Order ID" value={data?.order_id ?? orderId ?? '—'} />
        <InfoRow label="Status"   value="Pending Verification" vClass="text-yellow-400/70" />
      </div>
      <p className="text-sm text-anora-vanilla/38 leading-relaxed text-center">
        Your order has been received. We&apos;ll confirm once the payment is verified.
      </p>
      <Link href="/" className="border border-gold-DEFAULT/28 text-anora-vanilla/45 text-xs tracking-[0.2em] uppercase px-10 py-3 hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-all">
        Back to Shop
      </Link>
    </Card>
  )
}

/* ── Failed ── */
function FailedView({ orderId }: { orderId: string | null }) {
  return (
    <Card>
      <div className="w-20 h-20 rounded-full border-2 border-red-500/38 flex items-center justify-center text-2xl text-red-400">✕</div>
      <div className="text-center">
        <h1 className="font-serif text-4xl text-red-400/75 font-light mb-2">Payment Failed</h1>
        <p className="text-[10px] tracking-[0.28em] uppercase text-red-400/35">Transaction not completed</p>
      </div>
      {orderId && (
        <div className="w-full bg-gold-DEFAULT/5 border border-gold-DEFAULT/15 rounded-sm p-5">
          <InfoRow label="Order ID" value={orderId} />
        </div>
      )}
      <p className="text-sm text-anora-vanilla/38 leading-relaxed text-center">
        No amount has been charged. Please try again or contact us.
      </p>
      <div className="flex gap-3">
        <Link href="/checkout" className="gold-gradient text-anora-espresso text-xs tracking-[0.2em] uppercase px-8 py-3 hover:opacity-90 transition-opacity">
          Try Again
        </Link>
        <Link href="/" className="border border-gold-DEFAULT/28 text-anora-vanilla/45 text-xs tracking-[0.2em] uppercase px-6 py-3 hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-all">
          Back to Shop
        </Link>
      </div>
    </Card>
  )
}

/* ── Shared card wrapper ── */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-7 text-center max-w-md w-full">
      {children}
    </div>
  )
}

/* ── Info row ── */
function InfoRow({ label, value, vClass = '' }: { label: string; value: string; vClass?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] uppercase tracking-[0.14em] text-anora-vanilla/30">{label}</span>
      <span className={`text-sm text-anora-vanilla/70 ${vClass}`}>{value}</span>
    </div>
  )
}

export default function PaymentResultPage() {
  return (
    <main className="min-h-screen bg-anora-bg flex items-center justify-center p-6">
      <Suspense fallback={<LoadingView />}>
        <ResultContent />
      </Suspense>
    </main>
  )
}
