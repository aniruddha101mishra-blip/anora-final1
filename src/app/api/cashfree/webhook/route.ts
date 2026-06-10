import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const rawBody   = await req.text()
  const timestamp = req.headers.get('x-webhook-timestamp') ?? ''
  const signature = req.headers.get('x-webhook-signature') ?? ''
  const secret    = process.env.CASHFREE_SECRET_KEY ?? ''

  // Verify HMAC signature
  if (timestamp && signature && secret) {
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}${rawBody}`)
      .digest('base64')

    if (expected !== signature) {
      console.warn('[Webhook] Signature mismatch — rejecting')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventData = payload?.data as Record<string, unknown> | undefined
  const orderId   = (eventData?.order  as Record<string, unknown>)?.order_id      as string | undefined
  const cfStatus  = (eventData?.payment as Record<string, unknown>)?.payment_status as string | undefined

  console.info('[Webhook] Received:', payload?.type, 'order:', orderId, 'status:', cfStatus)

  // Add Firebase order update here if needed

  return NextResponse.json({ received: true })
}
