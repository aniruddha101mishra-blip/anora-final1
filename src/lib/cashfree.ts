/**
 * Cashfree server-side SDK initialisation.
 *
 * FIX: Previously set properties at module load time, which threw on
 * Vercel cold starts before env vars were available.
 * Now exported as a lazy getter — safe for serverless.
 */

import { Cashfree as CashfreeSDK } from 'cashfree-pg'

export function getCashfree() {
  const appId  = process.env.CASHFREE_APP_ID
  const secret = process.env.CASHFREE_SECRET_KEY
  const env    = process.env.CASHFREE_ENV

  if (!appId || !secret) {
    throw new Error(
      '[Cashfree] CASHFREE_APP_ID and CASHFREE_SECRET_KEY must be set in environment variables'
    )
  }

  CashfreeSDK.XClientId     = appId
  CashfreeSDK.XClientSecret = secret
  CashfreeSDK.XEnvironment  =
    env === 'production'
      ? CashfreeSDK.Environment.PRODUCTION
      : CashfreeSDK.Environment.SANDBOX

  return CashfreeSDK
}
