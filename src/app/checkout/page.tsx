'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import type { CustomerDetails } from '@/types'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cashfree: (opts: { mode: string }) => any
  }
}

const EMPTY: CustomerDetails = {
  name: '', phone: '', email: '',
  address: '', city: '', state: '', pin: '',
}

/** Load the Cashfree JS SDK — handles duplicate script and load race */
function loadCashfreeSDK(mode: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.Cashfree === 'function') {
      resolve(); return
    }
    const existing = document.getElementById('cashfree-sdk')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Cashfree SDK failed')))
      return
    }
    const s   = document.createElement('script')
    s.id      = 'cashfree-sdk'
    s.src     = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    s.async   = true
    s.onload  = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Cashfree SDK. Check network.'))
    document.head.appendChild(s)
    console.info('[Checkout] Loading Cashfree SDK for mode:', mode)
  })
}

export default function CheckoutPage() {
  const { cart, total, count, mounted, clearCart } = useCart()
  const router = useRouter()

  // Read cart from URL param if coming from external HTML site
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const cartParam = params.get('cart')
    if (cartParam) {
      try {
        const externalCart = JSON.parse(decodeURIComponent(cartParam))
        if (Array.isArray(externalCart) && externalCart.length > 0) {
          localStorage.setItem('anora_cart', JSON.stringify(externalCart))
          // Clean URL without reload
          window.history.replaceState({}, '', '/checkout')
        }
      } catch (e) {
        console.warn('[Checkout] Failed to parse cart from URL:', e)
      }
    }
  }, [])

  const [form,     setForm]     = useState<CustomerDetails>(EMPTY)
  const [errors,   setErrors]   = useState<Partial<CustomerDetails>>({})
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Wait for hydration before redirecting on empty cart
  useEffect(() => {
    if (mounted && count === 0 && !loading) {
      const t = setTimeout(() => router.replace('/cart'), 500)
      return () => clearTimeout(t)
    }
  }, [mounted, count, loading, router])

  const update = (f: keyof CustomerDetails, v: string) => {
    setForm(p => ({ ...p, [f]: v }))
    setApiError(null)
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }))
  }

  const validate = (): boolean => {
    const e: Partial<CustomerDetails> = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.phone.trim())   e.phone   = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim())    e.city    = 'Required'
    if (!form.state.trim())   e.state   = 'Required'
    if (!/^\d{6}$/.test(form.pin.trim())) e.pin = 'Enter 6-digit PIN'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async () => {
    setApiError(null)
    if (!validate()) return
    setLoading(true)
    console.info('[Checkout] Starting. Items:', cart.length, 'Total: ₹', total)

    try {
      // ── Step 1: Create order on server ──────────────────
      const res  = await fetch('/api/cashfree/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ customer: form, items: cart, total }),
      })
      const data = await res.json() as { payment_session_id?: string; order_id?: string; error?: string }

      if (!res.ok || !data.payment_session_id) {
        throw new Error(data.error || `Server responded with ${res.status}`)
      }
      console.info('[Checkout] Order created ✓ id:', data.order_id)

      // Save order id locally so success page can read it
      try {
        sessionStorage.setItem('anora_order_id',     data.order_id ?? '')
        sessionStorage.setItem('anora_order_total',  String(total))
        sessionStorage.setItem('anora_order_name',   form.name)
      } catch { /* ignore */ }

      // ── Step 2: Load Cashfree SDK ────────────────────────
      const mode = process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT === 'production'
        ? 'production'
        : 'sandbox'

      await loadCashfreeSDK(mode)

      if (typeof window.Cashfree !== 'function') {
        throw new Error('Cashfree SDK loaded but window.Cashfree is unavailable')
      }

      // ── Step 3: Open Cashfree checkout ───────────────────
      console.info('[Checkout] Opening Cashfree in mode:', mode)
      window.Cashfree({ mode }).checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget:   '_self',
      })

      // Cashfree redirects the page — clearCart after return
      clearCart()

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[Checkout] FAILED:', msg)
      setApiError(msg)
      setLoading(false)
    }
  }

  // Skeleton while hydrating
  if (!mounted) {
    return (
      <Shell step="details">
        <div className="flex items-center justify-center py-32">
          <Spinner />
        </div>
      </Shell>
    )
  }

  if (count === 0 && !loading) {
    return (
      <Shell step="details">
        <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
          <p className="font-serif text-2xl text-gold-DEFAULT/45 font-light">Your cart is empty</p>
          <Link href="/" className="text-xs tracking-[0.2em] uppercase text-gold-DEFAULT hover:text-gold-light transition-colors">
            ← Back to Shop
          </Link>
        </div>
      </Shell>
    )
  }

  return (
    <Shell step="details">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">

          {/* ── Left: Order summary + Billing form ── */}
          <div className="space-y-6">

            {/* Order summary */}
            <section className="bg-anora-card border border-gold-DEFAULT/15 p-7">
              <h2 className="font-serif text-lg text-gold-DEFAULT pb-4 mb-5 border-b border-gold-DEFAULT/10">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-14 h-[68px] flex-shrink-0 border border-gold-DEFAULT/12">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-anora-vanilla/88 truncate">{item.name}</p>
                      <p className="text-[10px] text-anora-vanilla/30 mb-0.5">{item.size}</p>
                      <p className="text-[10px] text-gold-DEFAULT/45">Qty: {item.qty}</p>
                    </div>
                    <span className="text-gold-DEFAULT text-sm flex-shrink-0">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gold-DEFAULT/10 pt-4 mt-4 space-y-1.5">
                <Row label="Subtotal"  value={`₹${total.toLocaleString('en-IN')}`} />
                <Row label="Shipping"  value="Free" valueClass="text-green-400/65" />
                <Row label="Total"     value={`₹${total.toLocaleString('en-IN')}`} bold />
              </div>
            </section>

            {/* Billing form */}
            <section className="bg-anora-card border border-gold-DEFAULT/15 p-7">
              <h2 className="font-serif text-lg text-gold-DEFAULT pb-4 mb-5 border-b border-gold-DEFAULT/10">
                Billing Details
              </h2>
              <div className="space-y-4">
                <Field id="co-name"    label="Full Name"        required value={form.name}    onChange={v => update('name',    v)} error={errors.name}    placeholder="Your full name"       autoComplete="name" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="co-phone" label="Phone Number"     required value={form.phone}   onChange={v => update('phone',   v)} error={errors.phone}   placeholder="+91 XXXXX XXXXX"     autoComplete="tel" inputMode="tel" />
                  <Field id="co-email" label="Email (optional)"          value={form.email}   onChange={v => update('email',   v)} error={errors.email}   placeholder="you@email.com"       autoComplete="email" type="email" />
                </div>
                <Field id="co-addr"    label="Delivery Address" required value={form.address} onChange={v => update('address', v)} error={errors.address} placeholder="House, Street, Landmark" autoComplete="street-address" />
                <div className="grid grid-cols-3 gap-3">
                  <Field id="co-city"  label="City"             required value={form.city}    onChange={v => update('city',    v)} error={errors.city}    placeholder="City" />
                  <Field id="co-state" label="State"            required value={form.state}   onChange={v => update('state',   v)} error={errors.state}   placeholder="State" />
                  <Field id="co-pin"   label="PIN Code"         required value={form.pin}     onChange={v => update('pin',     v)} error={errors.pin}     placeholder="6 digits" maxLength={6} inputMode="numeric" />
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Pay ── */}
          <div className="lg:sticky lg:top-24">
            <section className="bg-anora-card border border-gold-DEFAULT/15 p-7">
              <h2 className="font-serif text-lg text-gold-DEFAULT pb-4 mb-5 border-b border-gold-DEFAULT/10">
                Payment
              </h2>

              <div className="flex gap-3 bg-gold-DEFAULT/5 border border-gold-DEFAULT/12 p-4 mb-6 rounded-sm">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 stroke-gold-DEFAULT/40" fill="none" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="1" y1="10" x2="23" y2="10" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-anora-vanilla/42 leading-relaxed">
                  Secured via Cashfree · Card, UPI, Net Banking, Wallets accepted
                </p>
              </div>

              <div className="text-center mb-7">
                <p className="text-[9px] tracking-[0.22em] uppercase text-anora-vanilla/28 mb-1">Amount</p>
                <p className="font-serif text-5xl text-gold-DEFAULT font-light">
                  ₹{total.toLocaleString('en-IN')}
                </p>
              </div>

              {apiError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/22 rounded-sm">
                  <p className="text-xs text-red-400/85 leading-relaxed">⚠ {apiError}</p>
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full gold-gradient text-anora-espresso text-xs tracking-[0.22em] uppercase font-medium py-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-3"
              >
                {loading ? (
                  <>
                    <Spinner size={14} />
                    Initialising Payment…
                  </>
                ) : (
                  `Pay ₹${total.toLocaleString('en-IN')} via Cashfree`
                )}
              </button>

              <p className="text-center text-[9px] text-anora-vanilla/18 tracking-wide">
                🔒 256-bit encrypted · PCI DSS compliant
              </p>

              <div className="mt-4 pt-4 border-t border-gold-DEFAULT/08">
                <Link href="/cart" className="block text-center text-[10px] uppercase tracking-[0.15em] text-anora-vanilla/25 hover:text-anora-vanilla/50 transition-colors">
                  ← Edit Cart
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ── Shared layout shell ── */
function Shell({ children, step }: { children: React.ReactNode; step: string }) {
  return (
    <main className="min-h-screen bg-anora-bg">
      <header className="sticky top-0 z-10 border-b border-gold-DEFAULT/12 bg-anora-bg/96 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-[0.25em] text-gold-DEFAULT">ANORA</Link>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase">
            {['Cart','Details','Payment'].map((s, i) => {
              const active = (step === 'cart' && i === 0) || (step === 'details' && i <= 1) || (step === 'payment' && i <= 2)
              return (
                <span key={s} className={active ? 'text-gold-DEFAULT' : 'text-anora-vanilla/22'}>
                  {i > 0 && <span className="mr-2 text-gold-DEFAULT/15">—</span>}
                  {s}
                </span>
              )
            })}
          </div>
        </div>
      </header>
      {children}
    </main>
  )
}

/* ── Field component ── */
interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string; label: string; required?: boolean
  value: string; onChange: (v: string) => void; error?: string
}
function Field({ id, label, required, value, onChange, error, ...rest }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[9px] tracking-[0.18em] uppercase text-anora-vanilla/38">
        {label} {required && <span className="text-gold-DEFAULT">*</span>}
      </label>
      <input
        id={id} name={id} value={value}
        onChange={e => onChange(e.target.value)}
        className={`bg-gold-DEFAULT/5 border rounded-sm px-3.5 py-2.5 text-sm text-anora-vanilla placeholder:text-anora-vanilla/18 outline-none transition-colors ${
          error ? 'border-red-500/55 focus:border-red-500/75' : 'border-gold-DEFAULT/18 focus:border-gold-DEFAULT/50'
        }`}
        {...rest}
      />
      {error && <span className="text-[10px] text-red-400/80">⚠ {error}</span>}
    </div>
  )
}

/* ── Row ── */
function Row({ label, value, valueClass = '', bold = false }: { label: string; value: string; valueClass?: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-[10px] uppercase tracking-[0.18em] ${bold ? 'text-anora-vanilla/45' : 'text-anora-vanilla/30'}`}>{label}</span>
      <span className={`${bold ? 'font-serif text-xl text-gold-DEFAULT' : 'text-sm text-anora-vanilla/55'} ${valueClass}`}>{value}</span>
    </div>
  )
}

/* ── Spinner ── */
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg style={{ width: size, height: size }} className="animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
