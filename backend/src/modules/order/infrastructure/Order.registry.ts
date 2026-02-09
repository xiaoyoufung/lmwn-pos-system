import { registry } from "tsyringe";
import { TOKENS } from "../../../core/di/tokens.js";
import { PrismaOrderRepository } from "./db/PrismaOrderRepository.js";
import { GetOrdersByRestaurantId } from "../application/GetRestaurantOrders.js";
import { CreateOrder } from "../application/use-cases/CreateOrder/CreateOrder.js";

@registry([
    {
        token: TOKENS.OrderRepository,
        useClass: PrismaOrderRepository
    },{
        token: TOKENS.GetOrdersByRestaurantId,
        useClass: GetOrdersByRestaurantId
    },
    {
        token: TOKENS.CreateOrder,
        useClass: CreateOrder
    }
])

export class OrderRegistry {}