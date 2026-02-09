export class OrderNumberGenerator {
    generateOrderNumber(displayId: number): string {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    return `DIN-${date}-${displayId.toString().padStart(4, '0')}`;
  }
}