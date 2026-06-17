import { unitSchema } from "@/modules/unit/schema";
import z from "zod";

export const franchiseTableSchema = unitSchema.pick({
    id: true,
    name: true,
    royalties_percentage: true,
    stats: true,
    unit_size: true,
}).extend({
    revenue: z.number().nonnegative(),
    cost: z.number().nonnegative(),
    payment_risk: z.enum(["BOM", "REGULAR", "RUIM"]),
}).transform((data) => {
    const { royalties_percentage, unit_size, payment_risk, ...rest } = data;

    return {
        ...rest,
        royaltiesPercentage: royalties_percentage,
        unitSize: unit_size,
        paymentRisk: payment_risk,
    };
});

export type franchiseTable = z.output<typeof franchiseTableSchema>;