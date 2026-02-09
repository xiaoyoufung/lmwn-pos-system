// infrastructure/services/DisplayIdGenerator.ts
export interface IDisplayIdGenerator {
  getNextDisplayId(restaurantId: string): Promise<number>;
}

export class DisplayIdGenerator implements IDisplayIdGenerator {
  async getNextDisplayId(restaurantId: string): Promise<number> {
    // Implement Redis counter or DB sequence
    // Daily reset logic goes here
    return 1; // Placeholder implementation
  }
}