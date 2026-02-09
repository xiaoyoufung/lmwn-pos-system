import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../../../core/di/tokens.js";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository.js";
import { Order } from "../../../domain/entities/Order.js";
import { OrderType } from "../../../domain/value-objects/OrderType.js";
import { OrderStatus } from "../../../domain/value-objects/OrderStatus.js";
import { CreateOrderDTO, CreateOrderItemDTO } from "./CreateOrderDTO.js";
import { EmptyOrderError, InvalidQuantityError, ItemNotAvailableError, ItemNotFoundError, TableRequiredForDineInError } from "../../../domain/errors/OrderErrors.js";
import { OrderItem } from "../../../domain/entities/OrderItem.js";
import { OrderNumberGenerator } from "../../../domain/services/OrderNumberGenerator.js";
import { IDisplayIdGenerator } from "../../../infrastructure/services/DisplayIdGenerator.js";
import { IItemRepository } from "../../../domain/repositories/IItemRepository.js";

export interface ICreateOrder {
    execute(dto: CreateOrderDTO): Promise<Order>;
}

export class CreateOrder implements ICreateOrder {
    constructor(
        @inject(TOKENS.OrderRepository) private readonly orderRepository: IOrderRepository,
        @inject(TOKENS.ItemRepository) private readonly itemRepository: IItemRepository,
        @inject(TOKENS.DisplayIdGenerator) private readonly displayIdGenerator: IDisplayIdGenerator,
        @inject(TOKENS.OrderNumberGenerator) private readonly orderNumberGenerator: OrderNumberGenerator,
    ) {}

    async execute(dto: CreateOrderDTO): Promise<Order> {
        // 1. Validate DTO
        this.validate(dto);

        // 2. Generate IDs
        const orderId = crypto.randomUUID();
        const displayId = await this.displayIdGenerator.getNextDisplayId(dto.restaurantId);
        const orderNumber = this.orderNumberGenerator.generateOrderNumber(displayId);

        // 3. Load and validate items
        const orderItems = await this.createOrderItems(orderId, dto.items);

        // 4. Calculate totals
        const subtotalMinor = orderItems.reduce(
            (sum, item) => sum + item.lineSubtotalMinor, 0
        );
        const discountTotalMinor = 0;
        const totalMinor = subtotalMinor - discountTotalMinor;

        // 5. Create order entity
        const order = new Order(
          orderId,
          dto.restaurantId,
          displayId,
          orderNumber,
          dto.orderType,
          dto.tableId || null,
          OrderStatus.CREATED,
          subtotalMinor,
          discountTotalMinor,
          totalMinor,
          dto.createdByUserId,
          new Date(),
          new Date(),
          orderItems,
          [],
        );
        // 6. Save to repository
        await this.orderRepository.save(order);
        return order;
    }

    private async createOrderItems(
    orderId: string, 
    itemDtos: Array<CreateOrderItemDTO>
  ): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = [];

    for (const itemDto of itemDtos) {
      // Load item from repository
      const item = await this.itemRepository.findById(itemDto.itemId);

      if (!item) {
        throw new ItemNotFoundError(itemDto.itemId);
      }

      // if (!item) {
      //   throw new ItemNotAvailableError(item);
      // }

      const orderItem = new OrderItem(
        crypto.randomUUID(),
        orderId,
        item.id,
        item.name,
        item.description,
        item.imageUrl,
        item.priceMinor,
        itemDto.quantity,
        itemDto.quantity * item.priceMinor,
        itemDto.quantity * item.priceMinor,
        itemDto.quantity * item.priceMinor
      );

      orderItems.push(orderItem);
    }

    return orderItems;
  }

    private validate(dto: CreateOrderDTO): void {
        // Validate items exist
        if (!dto.items || dto.items.length === 0) {
        throw new EmptyOrderError();
        }

        // Validate table for dine-in
        if (dto.orderType === OrderType.DINE_IN && !dto.tableId) {
        throw new TableRequiredForDineInError();
        }

        // Validate quantities
        for (const item of dto.items) {
        if (item.quantity <= 0) {
            throw new InvalidQuantityError(item.quantity);
        }
        }
    }

}