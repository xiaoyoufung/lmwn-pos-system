import { Prisma, Orders as PrismaOrder } from "@prisma/client";
import { Order } from "../../../domain/entities/Order.js";
import { toOrderStatus } from "../../../domain/value-objects/OrderStatus.js";
import { toOrderType } from "../../../domain/value-objects/OrderType.js";
import { OrderItemMapper } from "./OrderItemMapper.js";
import { OrderDiscountMapper } from "./OrderDiscountMapper.js";

type PrismaOrderWithRelations = Prisma.OrdersGetPayload<{
    include: {
        orderItems: true;
        orderDiscounts: true;
    };
}>;

type PrismaOrderCreateInput = Prisma.OrdersUncheckedCreateInput;
type PrismaOrderUpdateInput = Prisma.OrdersUncheckedUpdateInput;

export class OrderMapper{

    // Converts Prisma order data to domain entity
    static toDomain(prismaOrder: PrismaOrderWithRelations): Order {
        const items = (prismaOrder.orderItems ?? []).map(OrderItemMapper.toDomain);
        const discounts = (prismaOrder.orderDiscounts ?? []).map(OrderDiscountMapper.toDomain);

        return new Order(
            prismaOrder.id,
            prismaOrder.restaurantId,
            prismaOrder.displayId,
            prismaOrder.orderNumber,
            toOrderType(prismaOrder.orderType),
            prismaOrder.tableId,
            toOrderStatus(prismaOrder.status),
            prismaOrder.subtotalMinor,
            prismaOrder.discountTotalMinor,
            prismaOrder.totalMinor,
            prismaOrder.createdByUserId,
            prismaOrder.createdAt,
            prismaOrder.updatedAt,
            items,
            discounts
        );
    }

    static toPrismaCreate(order: Order): PrismaOrderCreateInput {
        return {
            id: order.id,
            restaurantId: order.restaurantId,
            displayId: order.displayId,
            orderNumber: order.orderNumber,
            orderType: order.orderType,
            tableId: order.tableId,
            status: order.status,
            subtotalMinor: order.subtotalMinor,
            discountTotalMinor: order.discountTotalMinor,
            totalMinor: order.totalMinor,
            createdByUserId: order.createdByUserId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderItems: {
                create: order.items.map(OrderItemMapper.toPrismaCreate)
            }
        };
    }

    static toPrismaUpdate(order: Order): PrismaOrderUpdateInput {
        return {
            restaurantId: order.restaurantId,
            displayId: order.displayId,
            orderNumber: order.orderNumber,
            orderType: order.orderType,
            tableId: order.tableId,
            status: order.status,
            subtotalMinor: order.subtotalMinor,
            discountTotalMinor: order.discountTotalMinor,
            totalMinor: order.totalMinor,
            createdByUserId: order.createdByUserId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    }
}
 