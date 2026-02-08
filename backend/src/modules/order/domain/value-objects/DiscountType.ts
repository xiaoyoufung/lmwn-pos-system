import { InvalidDiscountTypeError } from "../errors/OrderErrors.js";

export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED_AMOUNT = 'FIXED_AMOUNT'
}

const validDiscountTypes = new Set(Object.values(DiscountType));

export const isValidDiscountType = (type: string): type is DiscountType => {
    return validDiscountTypes.has(type as DiscountType);
};

export const toDiscountType = (type: string): DiscountType => {
    if (!isValidDiscountType(type)) {
        throw new InvalidDiscountTypeError(type);
    }
    return type as DiscountType;
};