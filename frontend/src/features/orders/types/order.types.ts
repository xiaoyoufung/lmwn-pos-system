export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  unitPrice: number // satang
  totalPrice: number // satang
  notes?: string
}

export interface OrderStatusHistory {
  id: string
  fromStatus: OrderStatus | null
  toStatus: OrderStatus
  reason?: string
  changedBy: string
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  subtotalAmount: number // satang
  discountAmount: number // satang
  totalAmount: number // satang
  status: OrderStatus
  items: OrderItem[]
  statusHistory?: OrderStatusHistory[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderInput {
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
  }>
  discounts?: {
    percentOff?: number
    fixedOff?: number
  }
  notes?: string
}

export interface UpdateOrderStatusInput {
  status: OrderStatus
  reason?: string
  changedBy: string
}