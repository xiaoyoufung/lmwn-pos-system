export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COOKING = 'COOKING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY',
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export interface OrderItem {
  id: string
  orderId: string
  itemId: string
  itemNameSnapshot: string
  itemDescriptionSnapshot: string
  itemImageUrlSnapshot: string
  unitPriceMinorSnapshot: number // minor units (cents/satang)
  quantity: number
  lineSubtotalMinor: number
  lineDiscountMinor: number
  lineTotalMinor: number
}

export interface OrderDiscount {
  id: string
  orderId: string
  discountId: string
  discountNameSnapshot: string
  typeSnapshot: DiscountType
  percentageValueSnapshot: number | null
  fixedAmountMinorSnapshot: number | null
  appliedAmountMinor: number
  createdAt: string
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
  restaurantId: string
  displayId: number
  orderNumber: string
  orderType: OrderType
  tableId: string | null
  status: OrderStatus
  subtotalMinor: number // minor units (cents/satang)
  discountTotalMinor: number // minor units (cents/satang)
  totalMinor: number // minor units (cents/satang)
  createdByUserId: string
  createdAt: string
  updatedAt: string
  _items: OrderItem[]
  _discounts: OrderDiscount[]
  statusHistory?: OrderStatusHistory[]
  notes?: string
}

export interface CreateOrderInput {
  orderType: OrderType
  tableId?: string
  items: Array<{
    itemId: string
    quantity: number
    notes?: string
  }>
  discountIds?: string[]
  notes?: string
}

export interface UpdateOrderStatusInput {
  status: OrderStatus
  reason?: string
  changedBy: string
}