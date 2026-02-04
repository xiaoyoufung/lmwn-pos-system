import { OrderStatus } from "./order-status.enum";

export class OrderStatusHistory {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly fromStatus: OrderStatus | null,
    public readonly toStatus: OrderStatus,
    public readonly reason: string | null,
    public readonly changedAt: Date,
    public readonly changedBy: string | null, // Future: user ID
  ) {
    this.validate();
  }

  // ============================================
  // Validation
  // ============================================

  private validate(): void {
    if (!this.orderId || this.orderId.trim().length === 0) {
      throw new Error('Order ID is required');
    }

    if (this.toStatus === OrderStatus.CANCELLED && !this.reason) {
      throw new Error('Reason is required for cancellation');
    }
  }

  // ============================================
  // Factory Methods
  // ============================================

  static create(
    id: string,
    orderId: string,
    fromStatus: OrderStatus | null,
    toStatus: OrderStatus,
    reason: string | null = null,
    changedBy: string | null = null,
  ): OrderStatusHistory {
    return new OrderStatusHistory(
      id,
      orderId,
      fromStatus,
      toStatus,
      reason,
      new Date(),
      changedBy,
    );
  }
}