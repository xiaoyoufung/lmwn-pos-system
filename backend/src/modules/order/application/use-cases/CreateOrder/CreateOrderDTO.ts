import { OrderType } from "../../../domain/value-objects/OrderType.js";

export interface CreateOrderDTO {
  restaurantId: string;
  orderType: OrderType;
  tableId?: string | null;
  createdByUserId: string;
  items: Array<CreateOrderItemDTO>;
  discountIds?: string[];
}

export interface CreateOrderItemDTO {
  itemId: string;
  quantity: number;
}