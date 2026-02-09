import { PrismaClient } from "@prisma/client";
import { getDataSource } from "../../../../infrastructure/db/client.js";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository.js";
import { Order } from "../../domain/entities/Order.js";
import { OrderMapper } from "./mappers/OrderMapper.js";

export class PrismaOrderRepository implements IOrderRepository {
    private get repository(): PrismaClient {
        return getDataSource();
    }

    async findAllByRestaurantId(restaurantId: string): Promise<Order[]> {
        const prismaOrders = await this.repository.orders.findMany({
            where: { restaurantId },
            include: {
                orderItems: true,
                orderDiscounts: true
            }
        });
        return prismaOrders.map(prismaOrder => OrderMapper.toDomain(prismaOrder));
    }

    async findById(id: string): Promise<Order> {
        const prismaOrder = await this.repository.orders.findUniqueOrThrow({
            where: { id },
            include: {
                orderItems: true,
                orderDiscounts: true
            }
        });
        return OrderMapper.toDomain(prismaOrder);
    }

    async save(order: Order): Promise<void> {
        await this.repository.orders.create({
            data: OrderMapper.toPrismaCreate(order)
        });
    }
}