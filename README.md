# ANORA — Next.js + Cashfree Payment

## Project Structure

```
anora-next/
├── src/
│   ├── app/
│   │   ├── page.tsx                        # Homepage
│   │   ├── layout.tsx                      # Root layout
│   │   ├── globals.css                     # Tailwind base
│   │   ├── checkout/page.tsx               # Checkout page
│   │   ├── payment/
│   │   │   ├── result/page.tsx             # Payment result (success/pending/fail)
│   │   │   └── failed/page.tsx             # Hard fail screen
│   │   └── api/cashfree/
│   │       ├── create-order/route.ts       # Creates Cashfree order + saves to Firestore
│   │       ├── verify-order/route.ts       # Verifies payment after redirect
│   │       └── webhook/route.ts            # Cashfree webhook listener
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── CartDrawer.tsx
│   ├── hooks/useCart.ts                    # Cart state (localStorage)
│   ├── data/products.ts                    # Product catalogue
│   ├── lib/
│   │   ├── cashfree.ts                     # Cashfree SDK init
│   │   ├── firebase-client.ts              # Firebase client SDK
│   │   ├── firebase-admin.ts               # Firebase Admin SDK
│   │   └── orderId.ts                      # ANORA-XXXXXX generator
│   └── types/index.ts                      # TypeScript types
└── .env.local                              # Environment variables (not committed)
```

## Setup

### 1. Install dependencies
```bash
cd anora-next
npm install
```

### 2. Configure environment variables
Edit `.env.local` and fill in:
- `CASHFREE_APP_ID` and `CASHFREE_SECRET_KEY` from [merchant.cashfree.com](https://merchant.cashfree.com)
- Firebase config from [console.firebase.google.com](https://console.firebase.google.com)
- `FIREBASE_SERVICE_ACCOUNT` — paste your service account JSON as a single line
- `CASHFREE_ENV=sandbox` for testing, `production` for live

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel

1. Push `anora-next/` folder to GitHub (or as a separate repo)
2. Connect to Vercel → select the folder as root
3. Add all `.env.local` variables under **Settings → Environment Variables**
4. Deploy

## Cashfree Webhook

In Cashfree Dashboard → Webhooks, set:
```
https://your-site.vercel.app/api/cashfree/webhook
```
Select events: `PAYMENT_SUCCESS`, `PAYMENT_FAILED`, `PAYMENT_USER_DROPPED`

## Testing

Use Cashfree sandbox credentials and test UPI: `success@cashfree`
