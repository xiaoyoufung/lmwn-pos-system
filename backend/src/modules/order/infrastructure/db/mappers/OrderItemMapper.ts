import { Prisma } from "@prisma/client";
import { OrderItem } from "../../../domain/entities/OrderItem.js";

type PrismaOrderItem = Prisma.OrderItemsGetPayload<{}>;
type PrismaOrderItemCreateInput = Prisma.OrderItemsUncheckedCreateInput;

export class OrderItemMapper {
    static toDomain(prismaOrderItem: PrismaOrderItem): OrderItem {
       return new OrderItem(
            prismaOrderItem.id,
            prismaOrderItem.orderId,
            prismaOrderItem.itemId,
            prismaOrderItem.itemNameSnapshot,
            prismaOrderItem.itemDescriptionSnapshot,
            prismaOrderItem.itemImageUrlSnapshot,
            prismaOrderItem.unitPriceMinorSnapshot,
            prismaOrderItem.quantity,
            prismaOrderItem.lineSubtotalMinor,
            prismaOrderItem.lineDiscountMinor,
            prismaOrderItem.lineTotalMinor
       ); 
    }
    static toPrismaCreate(orderItem: OrderItem): PrismaOrderItemCreateInput {
        return {
            id: orderItem.id,
            orderId: orderItem.orderId,
            itemId: orderItem.itemId,
            itemNameSnapshot: orderItem.itemNameSnapshot,
            itemDescriptionSnapshot: orderItem.itemDescriptionSnapshot,
            itemImageUrlSnapshot: orderItem.itemImageUrlSnapshot,
            quantity: orderItem.quantity,
            unitPriceMinorSnapshot: orderItem.unitPriceMinorSnapshot,
            lineSubtotalMinor: orderItem.lineSubtotalMinor,
            lineDiscountMinor: orderItem.lineDiscountMinor,
            lineTotalMinor: orderItem.lineTotalMinor,
        };
    }
}