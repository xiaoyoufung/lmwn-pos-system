import { InvalidOrderStatusError } from "../errors/OrderErrors.js";

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  COOKING = 'COOKING',
  SERVED = 'SERVED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

const validStatuses = new Set(Object.values(OrderStatus));

export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return validStatuses.has(status as OrderStatus);
};

export const toOrderStatus = (status: string): OrderStatus => {
  if (!isValidOrderStatus(status)) {
    throw new InvalidOrderStatusError(status);
  }
  return status as OrderStatus;
};