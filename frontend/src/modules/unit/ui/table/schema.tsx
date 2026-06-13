import z from "zod";
import { unitSchema } from "../../schema";

export const tableUnitSchema = unitSchema.pick({
    id: true,
    name: true,
    stats: true,
    unit_size: true
}).extend({
    revenue: z.number().nonnegative(),
    cost: z.number().nonnegative()
}).transform((data) => {
    const { unit_size, ...rest } = data;

    return {
        ...rest,
        unitSize: unit_size,
    };
});

export type tableUnit = z.output<typeof tableUnitSchema>;