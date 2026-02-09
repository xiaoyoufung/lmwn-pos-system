import { container } from "tsyringe";
import { TOKENS } from "../../../../core/di/tokens.js";
import { NextFunction, Request, Response } from "express";
import { ICreateOrder } from "../../application/use-cases/CreateOrder/CreateOrder.js";
import { CreateOrderDTO } from "../../application/use-cases/CreateOrder/CreateOrderDTO.js";
import { IGetOrdersByRestaurantId } from "../../application/GetRestaurantOrders.js";

export class OrderController {
    static async getOrdersByRestaurantId(req: Request, res: Response, next: NextFunction) {
        const restaurantId = req.params.restaurantId as string;
        const getOrdersByRestaurantId = container.resolve<IGetOrdersByRestaurantId>(TOKENS.GetOrdersByRestaurantId);
        try {
            const orders =  await getOrdersByRestaurantId.execute(restaurantId);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try{
            const createOrder = container.resolve<ICreateOrder>(TOKENS.CreateOrder);

            const dto: CreateOrderDTO = {
                restaurantId: req.body.restaurantId,
                orderType: req.body.orderType,
                tableId: req.body.tableId,
                createdByUserId: req.body.createdByUserId,
                items: req.body.items,
                discountIds: req.body.discountIds
            }
            const order =  await createOrder.execute(dto);

            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }
}