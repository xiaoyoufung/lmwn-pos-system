import { InvalidOrderTypeError } from "../errors/OrderErrors.js";

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY'
}

const validOrderTypes = new Set(Object.values(OrderType));

export const isValidOrderType = (orderType: string): orderType is OrderType => {
  return validOrderTypes.has(orderType as OrderType);
};

export const toOrderType = (orderType: string): OrderType => {
  if (!isValidOrderType(orderType)) {
    throw new InvalidOrderTypeError(orderType);
  }
  return orderType as OrderType;
};