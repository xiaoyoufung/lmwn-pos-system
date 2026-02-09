import { OrderType } from "../value-objects/OrderType.js";
import { OrderStatus } from "../value-objects/OrderStatus.js";
import { OrderDiscount } from "./OrderDiscount.js";
import { OrderItem } from "./OrderItem.js";

export class Order{
    items: any;
    constructor(
        public readonly id: string,
        public readonly restaurantId: string,
        public readonly displayId: number,
        public readonly orderNumber: string,
        public readonly orderType: OrderType,
        public readonly tableId: string | null,
        public readonly status: OrderStatus,
        public readonly subtotalMinor: number,
        public readonly discountTotalMinor: number,
        public readonly totalMinor: number,
        public readonly createdByUserId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        private _items: OrderItem[],
        private _discounts: OrderDiscount[]
    ) {}
}