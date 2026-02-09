import { Order } from "../entities/Order.js";

export interface IOrderRepository {
  findById(id: string): Promise<Order>;
  findAllByRestaurantId(restaurantId: string): Promise<Order[]>;
  save(order: Order): Promise<void>;
}