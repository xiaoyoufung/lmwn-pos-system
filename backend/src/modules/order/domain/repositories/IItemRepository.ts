import { Item } from "../entities/Item.js";

export interface IItemRepository {
  findById(id: string): Promise<Item | null>;
}