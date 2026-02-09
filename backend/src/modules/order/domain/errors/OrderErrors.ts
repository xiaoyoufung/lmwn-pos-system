import { AppError } from "../../../../core/errors/AppError.js";

// ============================================
// Order Not Found Errors
// ============================================

export class OrderNotFoundError extends AppError {
  constructor(orderId: string) {
    super(
      `Order with ID ${orderId} not found`,
      404,
      "ORDER_NOT_FOUND"
    );
  }
}

export class OrderNumberNotFoundError extends AppError {
  constructor(orderNumber: string) {
    super(
      `Order with number ${orderNumber} not found`,
      404,
      "ORDER_NUMBER_NOT_FOUND"
    );
  }
}

// ============================================
// Order Validation Errors
// ============================================

export class EmptyOrderError extends AppError {
  constructor() {
    super(
      "Order must contain at least one item",
      400,
      "EMPTY_ORDER"
    );
  }
}

export class InvalidOrderTypeError extends AppError {
  constructor(orderType: string) {
    super(
      `Invalid order type: ${orderType}. Must be DINE_IN, TAKE_AWAY, or DELIVERY`,
      400,
      "INVALID_ORDER_TYPE"
    );
  }
}

export class InvalidOrderStatusError extends AppError {
  constructor(status: string) {
    super(
      `Invalid order status: ${status}`,
      400,
      "INVALID_ORDER_STATUS"
    );
  }
}

export class TableRequiredForDineInError extends AppError {
  constructor() {
    super(
      "Table ID is required for dine-in orders",
      400,
      "TABLE_REQUIRED_FOR_DINE_IN"
    );
  }
}

export class InvalidQuantityError extends AppError {
  constructor(quantity: number) {
    super(
      `Invalid quantity: ${quantity}. Quantity must be greater than 0`,
      400,
      "INVALID_QUANTITY"
    );
  }
}

export class NegativePriceError extends AppError {
  constructor(itemName: string) {
    super(
      `Item ${itemName} has invalid price. Price cannot be negative`,
      400,
      "NEGATIVE_PRICE"
    );
  }
}

// ============================================
// Order Status Transition Errors
// ============================================

export class InvalidStatusTransitionError extends AppError {
  constructor(fromStatus: string, toStatus: string) {
    super(
      `Cannot transition order from ${fromStatus} to ${toStatus}`,
      400,
      "INVALID_STATUS_TRANSITION"
    );
  }
}

export class OrderAlreadyCancelledError extends AppError {
  constructor(orderId: string) {
    super(
      `Order ${orderId} is already cancelled and cannot be modified`,
      400,
      "ORDER_ALREADY_CANCELLED"
    );
  }
}

export class OrderAlreadyPaidError extends AppError {
  constructor(orderId: string) {
    super(
      `Order ${orderId} is already paid and cannot be modified`,
      400,
      "ORDER_ALREADY_PAID"
    );
  }
}

export class CannotCancelPaidOrderError extends AppError {
  constructor(orderId: string) {
    super(
      `Cannot cancel order ${orderId} because it has already been paid`,
      400,
      "CANNOT_CANCEL_PAID_ORDER"
    );
  }
}

// ============================================
// Item Related Errors
// ============================================

export class ItemNotFoundError extends AppError {
  constructor(itemId: string) {
    super(
      `Item with ID ${itemId} not found`,
      404,
      "ITEM_NOT_FOUND"
    );
  }
}

export class ItemNotAvailableError extends AppError {
  constructor(itemName: string) {
    super(
      `Item ${itemName} is currently not available`,
      400,
      "ITEM_NOT_AVAILABLE"
    );
  }
}

export class DuplicateOrderItemError extends AppError {
  constructor(itemId: string) {
    super(
      `Item ${itemId} is already in the order. Update quantity instead`,
      400,
      "DUPLICATE_ORDER_ITEM"
    );
  }
}

// ============================================
// Discount Related Errors
// ============================================

export class DiscountNotFoundError extends AppError {
  constructor(discountId: string) {
    super(
      `Discount with ID ${discountId} not found`,
      404,
      "DISCOUNT_NOT_FOUND"
    );
  }
}

export class DiscountExpiredError extends AppError {
  constructor(discountName: string) {
    super(
      `Discount "${discountName}" has expired`,
      400,
      "DISCOUNT_EXPIRED"
    );
  }
}

export class DiscountNotActiveError extends AppError {
  constructor(discountName: string) {
    super(
      `Discount "${discountName}" is not currently active`,
      400,
      "DISCOUNT_NOT_ACTIVE"
    );
  }
}

export class DuplicateDiscountError extends AppError {
  constructor(discountId: string) {
    super(
      `Discount ${discountId} is already applied to this order`,
      400,
      "DUPLICATE_DISCOUNT"
    );
  }
}

export class InvalidDiscountTypeError extends AppError {
  constructor(type: string) {
    super(
      `Invalid discount type: ${type}. Must be PERCENTAGE or FIXED_AMOUNT`,
      400,
      "INVALID_DISCOUNT_TYPE"
    );
  }
}

export class DiscountExceedsOrderTotalError extends AppError {
  constructor(discountAmount: number, orderTotal: number) {
    super(
      `Discount amount (${discountAmount}) exceeds order total (${orderTotal})`,
      400,
      "DISCOUNT_EXCEEDS_ORDER_TOTAL"
    );
  }
}

// ============================================
// Table Related Errors
// ============================================

export class TableNotFoundError extends AppError {
  constructor(tableId: string) {
    super(
      `Table with ID ${tableId} not found`,
      404,
      "TABLE_NOT_FOUND"
    );
  }
}

export class TableNotActiveError extends AppError {
  constructor(tableName: string) {
    super(
      `Table ${tableName} is not currently active`,
      400,
      "TABLE_NOT_ACTIVE"
    );
  }
}

export class TableAlreadyOccupiedError extends AppError {
  constructor(tableName: string) {
    super(
      `Table ${tableName} already has an active order`,
      400,
      "TABLE_ALREADY_OCCUPIED"
    );
  }
}

// ============================================
// Restaurant Related Errors
// ============================================

export class RestaurantNotFoundError extends AppError {
  constructor(restaurantId: string) {
    super(
      `Restaurant with ID ${restaurantId} not found`,
      404,
      "RESTAURANT_NOT_FOUND"
    );
  }
}

export class UnauthorizedRestaurantAccessError extends AppError {
  constructor(restaurantId: string) {
    super(
      `You do not have permission to access restaurant ${restaurantId}`,
      403,
      "UNAUTHORIZED_RESTAURANT_ACCESS"
    );
  }
}

// ============================================
// Order Counter Errors
// ============================================

export class OrderCounterError extends AppError {
  constructor(message: string) {
    super(
      `Order counter error: ${message}`,
      500,
      "ORDER_COUNTER_ERROR"
    );
  }
}

export class DailyOrderLimitReachedError extends AppError {
  constructor(limit: number) {
    super(
      `Daily order limit of ${limit} has been reached`,
      429,
      "DAILY_ORDER_LIMIT_REACHED"
    );
  }
}

// ============================================
// Permission Errors
// ============================================

export class InsufficientPermissionsError extends AppError {
  constructor(action: string) {
    super(
      `You do not have permission to ${action}`,
      403,
      "INSUFFICIENT_PERMISSIONS"
    );
  }
}

export class CannotModifyOtherUserOrderError extends AppError {
  constructor(orderId: string) {
    super(
      `You cannot modify order ${orderId} created by another user`,
      403,
      "CANNOT_MODIFY_OTHER_USER_ORDER"
    );
  }
}