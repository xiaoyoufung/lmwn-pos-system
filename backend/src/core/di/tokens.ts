export const TOKENS = {
  Logger: Symbol.for("Logger"),
  HttpRequestLogger: Symbol.for("HttpRequestLogger"),
  UserRepository: Symbol.for("UserRepository"),
  CreateOrder: Symbol.for("CreateOrder"),
  GetOrdersByRestaurantId: Symbol.for("GetOrdersByRestaurantId"),
  GetOrderById: Symbol.for("GetOrderById"),
  UpdateOrderStatus: Symbol.for("UpdateOrderStatus"),
  CancelOrder: Symbol.for("CancelOrder"),
  RestaurantRepository: Symbol.for("RestaurantRepository"),
  TableRepository: Symbol.for("TableRepository"),
  OrderRepository: Symbol.for("OrderRepository"),
  DiscountRepository: Symbol.for("DiscountRepository"),
  MenuItemRepository: Symbol.for("MenuItemRepository"),
  DailyOrderCounterRepository: Symbol.for("DailyOrderCounterRepository"),
  ListOrders: Symbol.for("ListOrders"),
  AuthService: Symbol.for("AuthService"),
  UserPublicApi: Symbol.for("UserPublicApi"),
  GetUserProjects: Symbol.for("GetUserProjects"),
  ReportRepository: Symbol.for("ReportRepository"),
  CreateReport: Symbol.for("CreateReport"),
  EventBus: Symbol.for("EventBus"),
  DisplayIdGenerator: Symbol.for("DisplayIdGenerator"),
  OrderNumberGenerator: Symbol.for("OrderNumberGenerator"),
  ItemRepository: Symbol.for("ItemRepository"),
};


// export const TOKENS = {
//   Logger: Symbol.for("Logger"),
// } as const;
