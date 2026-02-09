import { DiscountType } from "../value-objects/DiscountType.js";

export class OrderDiscount {
    constructor(
        public readonly id: string,
        public readonly orderId: string,
        public readonly discountId: string,
        public readonly discountNameSnapshot: string,
        public readonly typeSnapshot: DiscountType,
        public readonly percentageValueSnapshot: number | null = null,
        public readonly fixedAmountMinorSnapshot: number | null = null,
        public readonly appliedAmountMinor: number,
        public readonly createdAt: Date
    ) {}
}