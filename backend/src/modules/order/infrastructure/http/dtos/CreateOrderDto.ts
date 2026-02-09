import z from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        restaurantId: z.string().uuid(),
        orderType: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]),
        tableId: z.string().uuid().nullable().optional(),
        items: z.array(z.object({
            itemId: z.string().uuid(),
            quantity: z.number().min(1),
            unitPriceMinor: z.number().min(0)
        })),
        discounts: z.array(z.object({
            discountId: z.string().uuid(),
            amountMinor: z.number().min(0)
        })).optional()
    })
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>; 