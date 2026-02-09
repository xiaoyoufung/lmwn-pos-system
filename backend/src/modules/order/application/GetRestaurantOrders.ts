import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../core/di/tokens.js";
import { IOrderRepository } from "../domain/repositories/IOrderRepository.js";
import { Order } from "../domain/entities/Order.js";

export interface IGetOrdersByRestaurantId {
    execute(restaurantId: string): Promise<Order[]>;
}

@injectable()
export class GetOrdersByRestaurantId implements IGetOrdersByRestaurantId {
    constructor(
        @inject(TOKENS.OrderRepository) private readonly repository: IOrderRepository
    ) {}

    async execute(restaurantId: string): Promise<Order[]> {
        if (!restaurantId) {
            return [];
        }
        return this.repository.findAllByRestaurantId(restaurantId);
    }
}