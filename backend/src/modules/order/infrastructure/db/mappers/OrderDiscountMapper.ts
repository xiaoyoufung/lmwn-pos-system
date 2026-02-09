import { Prisma } from "@prisma/client";
import { OrderDiscount } from "../../../domain/entities/OrderDiscount.js";
import { toDiscountType } from "../../../domain/value-objects/DiscountType.js";

type PrismaOrderDiscount = Prisma.OrderDiscountsGetPayload<{}>;

export class OrderDiscountMapper {
    static toDomain(prismaOrderDiscount: PrismaOrderDiscount): OrderDiscount {
        return {
            id: prismaOrderDiscount.id,
            orderId: prismaOrderDiscount.orderId,
            discountId: prismaOrderDiscount.discountId,
            discountNameSnapshot: prismaOrderDiscount.discountNameSnapshot,
            typeSnapshot: toDiscountType(prismaOrderDiscount.typeSnapshot),
            percentageValueSnapshot: prismaOrderDiscount.percentageValueSnapshot,
            fixedAmountMinorSnapshot: prismaOrderDiscount.fixedAmountMinorSnapshot,
            appliedAmountMinor: prismaOrderDiscount.appliedAmountMinor,
            createdAt: prismaOrderDiscount.createdAt
        };
    }
}