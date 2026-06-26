import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const runtime = 'nodejs'

const STATUS_MAP: Record<string, string> = {
  SUCCESS:      'PAYMENT_SUCCESS',
  FAILED:       'PAYMENT_FAILED',
  USER_DROPPED: 'PAYMENT_CANCELLED',
  PENDING:      'PAYMENT_INITIATED',
}

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
  const orderId   = (eventData?.order   as Record<string, unknown>)?.order_id       as string | undefined
  const cfStatus  = (eventData?.payment as Record<string, unknown>)?.payment_status as string | undefined

  console.info('[Webhook] Received:', payload?.type, 'order:', orderId, 'status:', cfStatus)

  // Update Firestore order status
  if (orderId && cfStatus) {
    try {
      const db   = getAdminDb()
      const snap = await db.collection('orders')
        .where('cashfreeOrderId', '==', orderId)
        .limit(1)
        .get()

      if (!snap.empty) {
        await snap.docs[0].ref.update({
          orderStatus:    STATUS_MAP[cfStatus] ?? cfStatus,
          cashfreeStatus: cfStatus,
          updatedAt:      FieldValue.serverTimestamp(),
        })
        console.info('[Webhook] Firestore updated:', orderId, '→', cfStatus)
      }
    } catch (err) {
      console.error('[Webhook] Firestore update failed:', err)
    }
  }

  return NextResponse.json({ received: true })
}
