import { InvalidOrderTypeError } from "../errors/OrderErrors.js";

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY'
}

export const isValidOrderType = (orderType: string): orderType is OrderType => {
  return Object.values(OrderType).includes(orderType as OrderType);
};

export const toOrderType = (orderType: string): OrderType => {
  if (!isValidOrderType(orderType)) {
    throw new InvalidOrderTypeError(orderType);
  }
  return orderType as OrderType;
}