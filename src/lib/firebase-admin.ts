/**
 * Firebase Admin SDK — Vercel-safe singleton.
 *
 * FIX: module-level `let adminDb` variable was unreliable across
 * Vercel serverless function invocations. Now we check getApps()
 * on every call and initialise only if needed.
 */

import { getApps, initializeApp, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

function getAdminApp(): App {
  const existing = getApps()
  if (existing.length > 0) return existing[0]

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  if (!raw) {
    throw new Error(
      '[Firebase Admin] FIREBASE_SERVICE_ACCOUNT env var is not set. ' +
      'Paste your service account JSON as a single-line string in Vercel env vars.'
    )
  }

  let serviceAccount: object
  try {
    serviceAccount = JSON.parse(raw)
  } catch {
    throw new Error(
      '[Firebase Admin] FIREBASE_SERVICE_ACCOUNT is not valid JSON. ' +
      'Make sure the entire service account JSON is on one line with escaped newlines.'
    )
  }

  return initializeApp({ credential: cert(serviceAccount as Parameters<typeof cert>[0]) })
}

export function getAdminDb(): Firestore {
  getAdminApp() // ensures initialisation
  return getFirestore()
}
