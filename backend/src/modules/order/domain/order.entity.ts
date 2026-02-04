import { OrderItem } from './order-item.entity';
import { OrderStatus, OrderStatusTransition } from './order-status.enum';
import { Discount } from './discount.value-object';

export class Order {
  constructor(
    public readonly id: string,
    public readonly orderNumber: string,
    private _items: OrderItem[],
    private _discount: Discount | null,
    private _status: OrderStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.validate();
  }

  // ============================================
  // Getters
  // ============================================

  get items(): ReadonlyArray<OrderItem> {
    return [...this._items];
  }

  get discount(): Discount | null {
    return this._discount;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get subtotal(): number {
    return this._items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  get discountAmount(): number {
    if (!this._discount) return 0;
    return this._discount.calculateDiscount(this.subtotal);
  }

  get total(): number {
    return Math.max(0, this.subtotal - this.discountAmount);
  }

  get itemCount(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // ============================================
  // Business Logic Methods
  // ============================================

  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error('Cannot add items to non-pending order');
    }

    const existingItem = this._items.find(
      (i) => i.productId === item.productId,
    );

    if (existingItem) {
      // Increase quantity of existing item
      const updatedItem = existingItem.increaseQuantity(item.quantity);
      this._items = this._items.map((i) =>
        i.productId === item.productId ? updatedItem : i,
      );
    } else {
      this._items.push(item);
    }
  }

  removeItem(itemId: string): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error('Cannot remove items from non-pending order');
    }

    const index = this._items.findIndex((i) => i.id === itemId);
    if (index === -1) {
      throw new Error(`Item ${itemId} not found in order`);
    }

    this._items.splice(index, 1);

    if (this._items.length === 0) {
      throw new Error('Order must have at least one item');
    }
  }

  updateItemQuantity(itemId: string, quantity: number): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error('Cannot update items in non-pending order');
    }

    const item = this._items.find((i) => i.id === itemId);
    if (!item) {
      throw new Error(`Item ${itemId} not found in order`);
    }

    const updatedItem = item.updateQuantity(quantity);
    this._items = this._items.map((i) => (i.id === itemId ? updatedItem : i));
  }

  applyDiscount(discount: Discount): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error('Cannot apply discount to non-pending order');
    }

    this._discount = discount;
  }

  removeDiscount(): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error('Cannot remove discount from non-pending order');
    }

    this._discount = null;
  }

  // ============================================
  // Status Management
  // ============================================

  changeStatus(newStatus: OrderStatus, reason?: string): void {
    if (!this.canTransitionTo(newStatus)) {
      throw new Error(
        `Invalid status transition from ${this._status} to ${newStatus}`,
      );
    }

    this._status = newStatus;
  }

  canTransitionTo(newStatus: OrderStatus): boolean {
    const allowedTransitions = OrderStatusTransition[this._status] || [];
    return allowedTransitions.includes(newStatus);
  }

  confirm(): void {
    this.changeStatus(OrderStatus.CONFIRMED);
  }

  prepare(): void {
    this.changeStatus(OrderStatus.PREPARING);
  }

  ready(): void {
    this.changeStatus(OrderStatus.READY);
  }

  complete(): void {
    this.changeStatus(OrderStatus.COMPLETED);
  }

  cancel(reason: string): void {
    if (!reason || reason.trim().length === 0) {
      throw new Error('Cancellation reason is required');
    }
    
    this.changeStatus(OrderStatus.CANCELLED);
  }

  // ============================================
  // Validation
  // ============================================

  private validate(): void {
    if (!this.orderNumber || this.orderNumber.trim().length === 0) {
      throw new Error('Order number is required');
    }

    if (!this._items || this._items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    if (this.subtotal < 0) {
      throw new Error('Subtotal cannot be negative');
    }

    if (this.total < 0) {
      throw new Error('Total cannot be negative');
    }
  }

  // ============================================
  // Factory Methods
  // ============================================

  static create(
    id: string,
    orderNumber: string,
    items: OrderItem[],
    discount: Discount | null = null,
  ): Order {
    return new Order(
      id,
      orderNumber,
      items,
      discount,
      OrderStatus.PENDING,
      new Date(),
      new Date(),
    );
  }

  static reconstitute(
    id: string,
    orderNumber: string,
    items: OrderItem[],
    discount: Discount | null,
    status: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
  ): Order {
    return new Order(
      id,
      orderNumber,
      items,
      discount,
      status,
      createdAt,
      updatedAt,
    );
  }

  // ============================================
  // Equality
  // ============================================

  equals(other: Order): boolean {
    return this.id === other.id;
  }
}