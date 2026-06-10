import { NextRequest, NextResponse } from 'next/server'
import { createCashfreeOrder } from '@/lib/cashfree-api'
import { generateOrderId } from '@/lib/orderId'
import type { CustomerDetails, CartItem } from '@/types'

export const runtime = 'nodejs' // ensure Node.js runtime on Vercel

export async function POST(req: NextRequest) {
  console.info('[API /create-order] Request received')

  let body: { customer: CustomerDetails; items: CartItem[]; total: number }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { customer, items, total } = body

  // ── Validation ──────────────────────────────
  const missing: string[] = []
  if (!customer?.name?.trim())    missing.push('customer.name')
  if (!customer?.phone?.trim())   missing.push('customer.phone')
  if (!items?.length)             missing.push('items')
  if (!total || total <= 0)       missing.push('total')

  if (missing.length) {
    console.warn('[API /create-order] Missing fields:', missing)
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  const orderId = generateOrderId()
  const appUrl  = process.env.NEXT_PUBLIC_APP_URL || 'https://your-site.vercel.app'
  const phone   = customer.phone.replace(/\D/g, '').slice(-10)

  console.info('[API /create-order] Creating order:', orderId, '₹', total)

  try {
    const cfOrder = await createCashfreeOrder({
      order_id:       orderId,
      order_amount:   total,
      order_currency: 'INR',
      customer_details: {
        customer_id:    phone,
        customer_name:  customer.name.trim(),
        customer_email: customer.email?.trim() || 'customer@anora.in',
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${appUrl}/payment/result?order_id={order_id}`,
        notify_url: `${appUrl}/api/cashfree/webhook`,
      },
    })

    // ── Send order details to email via Formspree ──
    try {
      await fetch('https://formspree.io/f/xwvjodqp', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject:    `New Order ${orderId} — ANORA`,
          order_id:   orderId,
          name:       customer.name,
          phone:      customer.phone,
          email:      customer.email || '—',
          address:    `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pin}`,
          items:      items.map(i => `${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join(' | '),
          total:      `₹${total}`,
          status:     'Payment Initiated',
        }),
      })
      console.info('[API /create-order] Order notification sent to email ✓')
    } catch (e) {
      console.warn('[API /create-order] Email notification failed (non-critical):', e)
    }

    console.info('[API /create-order] Success ✓ order:', orderId)

    return NextResponse.json({
      order_id:           orderId,
      payment_session_id: cfOrder.payment_session_id,
      cf_order_id:        cfOrder.cf_order_id,
    })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[API /create-order] FAILED:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
