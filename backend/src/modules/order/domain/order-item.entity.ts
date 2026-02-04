export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: number, // in satang (smallest currency unit)
  ) {
    this.validate();
  }

  // ============================================
  // Getters
  // ============================================

  get lineTotal(): number {
    return this.quantity * this.unitPrice;
  }

  // ============================================
  // Business Logic
  // ============================================

  increaseQuantity(amount: number): OrderItem {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    return new OrderItem(
      this.id,
      this.productId,
      this.productName,
      this.quantity + amount,
      this.unitPrice,
    );
  }

  decreaseQuantity(amount: number): OrderItem {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    const newQuantity = this.quantity - amount;
    if (newQuantity < 1) {
      throw new Error('Quantity cannot be less than 1');
    }

    return new OrderItem(
      this.id,
      this.productId,
      this.productName,
      newQuantity,
      this.unitPrice,
    );
  }

  updateQuantity(newQuantity: number): OrderItem {
    if (newQuantity < 1) {
      throw new Error('Quantity must be at least 1');
    }

    return new OrderItem(
      this.id,
      this.productId,
      this.productName,
      newQuantity,
      this.unitPrice,
    );
  }

  // ============================================
  // Validation
  // ============================================

  private validate(): void {
    if (!this.productId || this.productId.trim().length === 0) {
      throw new Error('Product ID is required');
    }

    if (!this.productName || this.productName.trim().length === 0) {
      throw new Error('Product name is required');
    }

    if (this.quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }

    if (this.unitPrice < 0) {
      throw new Error('Unit price cannot be negative');
    }
  }

  // ============================================
  // Factory Methods
  // ============================================

  static create(
    id: string,
    productId: string,
    productName: string,
    quantity: number,
    unitPrice: number,
  ): OrderItem {
    return new OrderItem(id, productId, productName, quantity, unitPrice);
  }

  // ============================================
  // Equality
  // ============================================

  equals(other: OrderItem): boolean {
    return this.id === other.id;
  }
}