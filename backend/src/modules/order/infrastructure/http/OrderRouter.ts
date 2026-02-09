import { Router } from "express";
import { OrderController } from "./OrderController.js";
import { validateRequest } from "../../../../infrastructure/http/middleware/validateRequest.js";
import { createOrderSchema } from "./dtos/CreateOrderDto.js";

const orderRouter = Router();

orderRouter.get("/:restaurantId", OrderController.getOrdersByRestaurantId);
orderRouter.post(
  "/",
  validateRequest(createOrderSchema),
  OrderController.create
);

export { orderRouter };