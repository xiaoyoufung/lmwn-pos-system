export class Item {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly imageUrl: string,
        public readonly priceMinor: number,
        public readonly isAvailable: boolean,
        public readonly restaurantId: string
    ){}
}