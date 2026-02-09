export class DailyOrderCounter{
    constructor(
        public readonly restaurantId: string,
        public readonly dateKey: Date,
        public readonly lastVal: number
    ){}
}