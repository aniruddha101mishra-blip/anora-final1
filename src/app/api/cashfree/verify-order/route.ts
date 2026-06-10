import { NextRequest, NextResponse } from 'next/server'
import { fetchCashfreeOrder } from '@/lib/cashfree-api'

export const runtime = 'nodejs'

const STATUS_MAP: Record<string, string> = {
  PAID:      'PAYMENT_SUCCESS',
  ACTIVE:    'PAYMENT_PENDING',
  EXPIRED:   'PAYMENT_FAILED',
  CANCELLED: 'PAYMENT_CANCELLED',
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('order_id')

  if (!orderId?.trim()) {
    return NextResponse.json(
      { error: 'order_id query param is required' },
      { status: 400 }
    )
  }

  console.info('[API /verify-order] Verifying:', orderId)

  try {
    const data = await fetchCashfreeOrder(orderId)
    const anoraStatus = STATUS_MAP[data.order_status] ?? 'PAYMENT_UNKNOWN'

    console.info('[API /verify-order]', orderId, '→', data.order_status, '→', anoraStatus)

    return NextResponse.json({
      order_id:     data.order_id,
      cf_order_id:  data.cf_order_id,
      order_status: data.order_status,   // raw Cashfree status: PAID | ACTIVE | EXPIRED
      anora_status: anoraStatus,          // mapped: PAYMENT_SUCCESS | PAYMENT_PENDING | PAYMENT_FAILED
      order_amount: data.order_amount,
      customer:     data.customer_details,
    })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[API /verify-order] FAILED:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
