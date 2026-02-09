import { OrderStatus } from "../value-objects/OrderStatus.js";

export class OrderStatusHistory{
    constructor(
        public readonly id: string,
        public readonly orderId: string,
        public readonly toStatus: OrderStatus,
        public readonly changedByUserId: string,
        public readonly changedAt: Date,
        public readonly fromStatus: OrderStatus | null = null, 
        public readonly notes: string | null = null
    ) {}
}