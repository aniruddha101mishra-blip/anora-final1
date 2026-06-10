'use client'

/**
 * CartContext — single source of truth for cart state.
 *
 * FIX: Previously useCart() was called independently in every component,
 * creating isolated React state islands that never shared updates.
 * Now all components read from one context provider mounted in layout.tsx.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '@/types'

const CART_KEY = 'anora_cart'

interface CartContextValue {
  cart: CartItem[]
  total: number
  count: number
  mounted: boolean
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart]       = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage once on client
  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setCart(JSON.parse(raw) as CartItem[])
    } catch (e) {
      console.warn('[Cart] Failed to load from localStorage:', e)
    }
  }, [])

  /** Persist helper — always called after state update */
  const save = (items: CartItem[]) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('[Cart] Failed to persist to localStorage:', e)
    }
  }

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      const next = existing
        ? prev.map(i =>
            i.id === product.id ? { ...i, qty: Math.min(i.qty + 1, 10) } : i
          )
        : [...prev, { ...product, qty: 1 }]
      save(next)
      console.info('[Cart] addToCart:', product.id, '→ count:', next.reduce((s, i) => s + i.qty, 0))
      return next
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const next = prev.filter(i => i.id !== id)
      save(next)
      return next
    })
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setCart(prev => {
      const next = prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i
      )
      save(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    try { localStorage.removeItem(CART_KEY) } catch { /* ignore */ }
  }, [])

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])

  const value = useMemo<CartContextValue>(
    () => ({ cart, total, count, mounted, addToCart, removeFromCart, updateQty, clearCart }),
    [cart, total, count, mounted, addToCart, removeFromCart, updateQty, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>. Check layout.tsx.')
  }
  return ctx
}
