/**
 * Cashfree REST API client — no npm package needed.
 * Works on Vercel serverless without any binary dependencies.
 */

export type CashfreeEnv = 'sandbox' | 'production'

export interface CashfreeOrderPayload {
  order_id: string
  order_amount: number
  order_currency: 'INR'
  customer_details: {
    customer_id: string
    customer_name: string
    customer_email: string
    customer_phone: string
  }
  order_meta: {
    return_url: string
    notify_url?: string
  }
}

export interface CashfreeOrderResponse {
  cf_order_id: string
  order_id: string
  order_status: string
  payment_session_id: string
  order_amount: number
  order_currency: string
  order_expiry_time: string
}

export interface CashfreeFetchResponse {
  cf_order_id: string
  order_id: string
  order_status: 'ACTIVE' | 'PAID' | 'EXPIRED' | 'CANCELLED'
  order_amount: number
  order_currency: string
  customer_details: {
    customer_id: string
    customer_name: string
    customer_email: string
    customer_phone: string
  }
}

function getBaseUrl(env: CashfreeEnv): string {
  return env === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg'
}

function getHeaders(appId: string, secretKey: string) {
  return {
    'Content-Type': 'application/json',
    'x-api-version': '2023-08-01',
    'x-client-id': appId,
    'x-client-secret': secretKey,
  }
}

/** Create a new Cashfree payment order */
export async function createCashfreeOrder(
  payload: CashfreeOrderPayload
): Promise<CashfreeOrderResponse> {
  const appId     = process.env.CASHFREE_APP_ID
  const secretKey = process.env.CASHFREE_SECRET_KEY
  const env       = (process.env.CASHFREE_ENVIRONMENT || 'sandbox') as CashfreeEnv

  if (!appId || !secretKey) {
    throw new Error(
      'CASHFREE_APP_ID and CASHFREE_SECRET_KEY must be set in environment variables'
    )
  }

  const url = `${getBaseUrl(env)}/orders`
  console.info('[Cashfree] POST', url, 'order_id:', payload.order_id)

  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(appId, secretKey),
    body: JSON.stringify(payload),
  })

  const data = await res.json() as CashfreeOrderResponse & { message?: string; code?: string }

  if (!res.ok) {
    console.error('[Cashfree] Create order failed:', data)
    throw new Error(data.message || `Cashfree error ${res.status}`)
  }

  if (!data.payment_session_id) {
    console.error('[Cashfree] Missing payment_session_id in response:', data)
    throw new Error('Cashfree did not return a payment session ID')
  }

  console.info('[Cashfree] Order created ✓ session:', data.payment_session_id.slice(0, 16) + '…')
  return data
}

/** Fetch order status from Cashfree */
export async function fetchCashfreeOrder(orderId: string): Promise<CashfreeFetchResponse> {
  const appId     = process.env.CASHFREE_APP_ID
  const secretKey = process.env.CASHFREE_SECRET_KEY
  const env       = (process.env.CASHFREE_ENVIRONMENT || 'sandbox') as CashfreeEnv

  if (!appId || !secretKey) {
    throw new Error('CASHFREE_APP_ID and CASHFREE_SECRET_KEY must be set in environment variables')
  }

  const url = `${getBaseUrl(env)}/orders/${encodeURIComponent(orderId)}`
  console.info('[Cashfree] GET', url)

  const res = await fetch(url, {
    method: 'GET',
    headers: getHeaders(appId, secretKey),
  })

  const data = await res.json() as CashfreeFetchResponse & { message?: string }

  if (!res.ok) {
    console.error('[Cashfree] Fetch order failed:', data)
    throw new Error(data.message || `Cashfree error ${res.status}`)
  }

  console.info('[Cashfree] Order status:', data.order_status)
  return data
}
