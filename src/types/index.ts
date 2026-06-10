export interface Product {
  id: string
  name: string
  tagline: string
  size: string
  price: number
  image: string
  notes: string[]
  category: string
}

export interface CartItem extends Product {
  qty: number
}

export interface CustomerDetails {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pin: string
}

export type OrderStatus =
  | 'PAYMENT_INITIATED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_CANCELLED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'

export interface Order {
  orderId: string
  cashfreeOrderId: string
  customerName: string
  phone: string
  email: string
  address: string
  products: Array<{ id: string; name: string; size: string; price: number; qty: number }>
  totalAmount: number
  paymentMethod: string
  orderStatus: OrderStatus
  cashfreeStatus?: string
  createdAt: unknown
  updatedAt: unknown
}
