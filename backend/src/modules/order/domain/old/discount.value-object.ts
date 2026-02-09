// export enum DiscountType {
//   PERCENTAGE = 'PERCENTAGE',
//   FIXED_AMOUNT = 'FIXED_AMOUNT',
// }

// export class Discount {
//   constructor(
//     public readonly type: DiscountType,
//     public readonly value: number, // percentage (0-100) or amount in satang
//   ) {
//     this.validate();
//   }

//   // ============================================
//   // Business Logic
//   // ============================================

//   calculateDiscount(subtotal: number): number {
//     if (subtotal < 0) {
//       throw new Error('Subtotal cannot be negative');
//     }

//     if (this.type === DiscountType.PERCENTAGE) {
//       return Math.round((subtotal * this.value) / 100);
//     }

//     // Fixed amount
//     return Math.min(this.value, subtotal); // Cannot exceed subtotal
//   }

//   // ============================================
//   // Validation
//   // ============================================

//   private validate(): void {
//     if (this.type === DiscountType.PERCENTAGE) {
//       if (this.value < 0 || this.value > 100) {
//         throw new Error('Percentage discount must be between 0 and 100');
//       }
//     } else if (this.type === DiscountType.FIXED_AMOUNT) {
//       if (this.value < 0) {
//         throw new Error('Fixed discount amount cannot be negative');
//       }
//     }
//   }

//   // ============================================
//   // Factory Methods
//   // ============================================

//   static createPercentage(percentage: number): Discount {
//     return new Discount(DiscountType.PERCENTAGE, percentage);
//   }

//   static createFixedAmount(amount: number): Discount {
//     return new Discount(DiscountType.FIXED_AMOUNT, amount);
//   }

//   // ============================================
//   // Equality
//   // ============================================

//   equals(other: Discount): boolean {
//     return this.type === other.type && this.value === other.value;
//   }
// }