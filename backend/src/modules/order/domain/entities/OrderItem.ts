export class OrderItem {
    constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly itemId: string,
    public readonly itemNameSnapshot: string,
    public readonly itemDescriptionSnapshot: string,
    public readonly itemImageUrlSnapshot: string,
    public readonly unitPriceMinorSnapshot: number,
    public readonly quantity: number,
    public readonly lineSubtotalMinor: number,
    public readonly lineDiscountMinor: number,
    public readonly lineTotalMinor: number,
    ){}
}